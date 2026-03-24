import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const LOG_PREFIX = '[download-track]'

// --- Helper: get client IP (proxy-aware; Vercel / Cloudflare friendly) ---
function getClientIP(request: NextRequest): string {
  const fromChain = (header: string | null) => header?.split(',')[0]?.trim() || ''

  const candidates = [
    request.headers.get('cf-connecting-ip'),
    fromChain(request.headers.get('x-vercel-forwarded-for')),
    request.headers.get('x-real-ip'),
    fromChain(request.headers.get('x-forwarded-for')),
  ]

  for (const raw of candidates) {
    const ip = raw?.trim()
    if (ip) return ip
  }

  return 'Unknown'
}

function isPrivateOrLocalIPv4(ip: string): boolean {
  if (ip === '127.0.0.1') return true
  if (ip.startsWith('10.')) return true
  if (ip.startsWith('192.168.')) return true
  if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip)) return false
  const [a, b] = ip.split('.').map((n) => parseInt(n, 10))
  return a === 172 && b >= 16 && b <= 31
}

/** True when geolocation APIs cannot infer a real public country (local dev, LAN, etc.). */
function isPrivateOrLocalIP(ip: string): boolean {
  const normalized = ip.trim().toLowerCase()
  if (!normalized || normalized === 'unknown') return true
  if (normalized === 'localhost' || normalized === '::1') return true
  if (normalized.startsWith('::ffff:')) {
    return isPrivateOrLocalIPv4(normalized.slice(7))
  }
  if (normalized.includes(':')) {
    if (normalized.startsWith('fe80:')) return true
    if (normalized.startsWith('fc') || normalized.startsWith('fd')) return true
  }
  return isPrivateOrLocalIPv4(normalized)
}

// --- Helper: parse user-agent ---
function parseUserAgent(userAgent: string) {
  let os = 'Unknown'
  let browser = 'Unknown'
  let deviceType: string = 'Desktop'

  // OS Detection
  if (/Windows/i.test(userAgent)) os = 'Windows'
  else if (/Mac/i.test(userAgent)) os = 'macOS'
  else if (/Linux/i.test(userAgent)) os = 'Linux'
  else if (/Android/i.test(userAgent)) { os = 'Android'; deviceType = 'Mobile' }
  else if (/iPhone|iPad|iOS/i.test(userAgent)) { os = 'iOS'; deviceType = userAgent.includes('iPad') ? 'Tablet' : 'Mobile' }

  // Browser Detection
  if (/Chrome/i.test(userAgent)) browser = 'Chrome'
  else if (/Firefox/i.test(userAgent)) browser = 'Firefox'
  else if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) browser = 'Safari'
  else if (/Edge/i.test(userAgent)) browser = 'Edge'
  else if (/Opera/i.test(userAgent)) browser = 'Opera'

  return { os, browser, deviceType }
}

type GeoResult = { country: string; geoDebug: Record<string, unknown> }

/** ipapi.co often 403s custom / bot User-Agents; match a normal browser like the old working code. */
const GEO_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

function pickCountryFromIpapiBody(body: Record<string, unknown>): string | null {
  if (body.error) return null
  const name = String(body.country_name ?? '').trim()
  if (name) return name
  const code = String(body.country ?? '').trim()
  if (code.length === 2) return code
  return code || null
}

/** Primary: ipapi.co JSON (same host as your old /country_name/ flow). */
async function tryIpapiCoJson(ip: string, geoDebug: Record<string, unknown>): Promise<string | null> {
  const url = `https://ipapi.co/${encodeURIComponent(ip)}/json/`
  try {
    const res = await fetch(url, {
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        'User-Agent': GEO_UA,
      },
      signal: AbortSignal.timeout(8000),
    })

    geoDebug.ipapiCoHttpStatus = res.status

    const rawText = await res.text()
    if (!res.ok) {
      geoDebug.ipapiCoErrorBody = rawText.slice(0, 300)
      return null
    }

    let body: Record<string, unknown>
    try {
      body = JSON.parse(rawText) as Record<string, unknown>
    } catch {
      geoDebug.ipapiCoParseError = 'not_json'
      return null
    }

    if (body.error) {
      geoDebug.ipapiCoApiError = body.reason ?? body.error
      return null
    }

    const country = pickCountryFromIpapiBody(body)
    if (country) geoDebug.ipapiCoCountryCode = body.country
    return country
  } catch (e: unknown) {
    geoDebug.ipapiCoException = e instanceof Error ? e.message : String(e)
    return null
  }
}

/**
 * Fallback: ip-api.com (server-friendly; free tier is HTTP-only).
 * See https://ip-api.com/docs/api:json — OK for non-commercial use.
 */
async function tryIpApiCom(ip: string, geoDebug: Record<string, unknown>): Promise<string | null> {
  const url = `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,message,country,countryCode`
  try {
    const res = await fetch(url, {
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    })
    geoDebug.ipApiComHttpStatus = res.status
    if (!res.ok) {
      geoDebug.ipApiComErrorBody = (await res.text().catch(() => '')).slice(0, 200)
      return null
    }
    const body = (await res.json().catch(() => null)) as Record<string, unknown> | null
    if (!body) return null
    if (body.status !== 'success') {
      geoDebug.ipApiComFail = body.message ?? body.status
      return null
    }
    const country = String(body.country ?? '').trim()
    return country || null
  } catch (e: unknown) {
    geoDebug.ipApiComException = e instanceof Error ? e.message : String(e)
    return null
  }
}

/** Same plain-text endpoint your previous code used — last resort if JSON path fails. */
async function tryIpapiCoCountryNamePlain(ip: string, geoDebug: Record<string, unknown>): Promise<string | null> {
  const url = `https://ipapi.co/${encodeURIComponent(ip)}/country_name/`
  try {
    const res = await fetch(url, {
      cache: 'no-store',
      headers: { 'User-Agent': GEO_UA },
      signal: AbortSignal.timeout(8000),
    })
    geoDebug.ipapiCoPlainHttpStatus = res.status
    const text = (await res.text()).trim()
    if (!res.ok || !text || text.startsWith('<')) {
      geoDebug.ipapiCoPlainSnippet = text.slice(0, 120)
      return null
    }
    return text
  } catch (e: unknown) {
    geoDebug.ipapiCoPlainException = e instanceof Error ? e.message : String(e)
    return null
  }
}

// --- Helper: get country from IP (ipapi first, then ip-api.com, then plain ipapi) ---
async function getCountryFromIP(ip: string): Promise<GeoResult> {
  const geoDebug: Record<string, unknown> = { inputIp: ip }

  if (isPrivateOrLocalIP(ip)) {
    geoDebug.skippedReason = 'private_or_local_ip'
    return { country: 'Local/Unknown', geoDebug }
  }

  let from = await tryIpapiCoJson(ip, geoDebug)
  if (from) {
    geoDebug.geoProvider = 'ipapi.co/json'
    return { country: from, geoDebug }
  }

  from = await tryIpApiCom(ip, geoDebug)
  if (from) {
    geoDebug.geoProvider = 'ip-api.com'
    return { country: from, geoDebug }
  }

  from = await tryIpapiCoCountryNamePlain(ip, geoDebug)
  if (from) {
    geoDebug.geoProvider = 'ipapi.co/country_name'
    return { country: from, geoDebug }
  }

  geoDebug.geoProvider = 'none'
  return { country: 'Unknown', geoDebug }
}

// --- Helper: retry wrapper for DB ops ---
async function withRetry<T>(operation: () => Promise<T>, maxRetries = 3, delayMs = 100): Promise<T> {
  let lastError: any
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try { return await operation() } 
    catch (error: any) { 
      lastError = error
      if (attempt < maxRetries) await new Promise(r => setTimeout(r, delayMs * attempt))
    }
  }
  throw lastError
}

// --- POST: Track resume download ---
export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request)
    const userAgent = request.headers.get('user-agent') || 'Unknown'
    const { os, browser, deviceType } = parseUserAgent(userAgent)
    const { country, geoDebug } = await getCountryFromIP(clientIP)

    const debugPayload = {
      resolvedIp: clientIP,
      countrySaved: country,
      geo: geoDebug,
      userAgentPreview: userAgent.length > 160 ? `${userAgent.slice(0, 160)}…` : userAgent,
      forwardedHeaders: {
        'x-forwarded-for': request.headers.get('x-forwarded-for'),
        'x-vercel-forwarded-for': request.headers.get('x-vercel-forwarded-for'),
        'x-real-ip': request.headers.get('x-real-ip'),
        'cf-connecting-ip': request.headers.get('cf-connecting-ip'),
      },
    }

    console.log(`${LOG_PREFIX} POST (resume download)`, JSON.stringify(debugPayload, null, 2))

    const now = new Date()
    const hour = now.getHours()
    const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' })

    const result = await withRetry(async () => {
      return await prisma.$transaction(async (tx) => {
        const downloadRecord = await tx.downloadRecord.create({
          data: { ip: clientIP, country, os, browser, deviceType, userAgent, hour, dayOfWeek }
        })

        const stats = await tx.downloadStats.findFirst()
        let updatedStats
        if (stats) {
          updatedStats = await tx.downloadStats.update({
            where: { id: stats.id },
            data: { resumeDownloads: stats.resumeDownloads + 1, lastUpdated: now }
          })
        } else {
          updatedStats = await tx.downloadStats.create({
            data: { resumeDownloads: 1, lastUpdated: now }
          })
        }

        // Update analytics tables using upsert
        await Promise.all([
          tx.countryAnalytics.upsert({ where: { country }, update: { count: { increment: 1 } }, create: { country, count: 1 } }),
          tx.oSAnalytics.upsert({ where: { os }, update: { count: { increment: 1 } }, create: { os, count: 1 } }),
          tx.browserAnalytics.upsert({ where: { browser }, update: { count: { increment: 1 } }, create: { browser, count: 1 } }),
          tx.deviceTypeAnalytics.upsert({ where: { deviceType }, update: { count: { increment: 1 } }, create: { deviceType, count: 1 } }),
          tx.hourlyAnalytics.upsert({ where: { hour }, update: { count: { increment: 1 } }, create: { hour, count: 1 } }),
          tx.dailyAnalytics.upsert({ where: { dayOfWeek }, update: { count: { increment: 1 } }, create: { dayOfWeek, count: 1 } })
        ])

        return { downloadRecord, updatedStats }
      })
    })

    const json: Record<string, unknown> = {
      success: true,
      downloadCount: result.updatedStats.resumeDownloads,
    }
    if (process.env.NODE_ENV === 'development') {
      json.debug = debugPayload
    }

    return NextResponse.json(json)
  } catch (error: any) {
    console.error('Download tracking failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to track download' }, { status: 500 })
  }
}

// --- GET: Return analytics ---
export async function GET() {
  try {
    const data = await withRetry(async () => {
      return await prisma.$transaction(async (tx) => {
        const [stats, recentDownloads, countries, operatingSystems, browsers, deviceTypes, hourlyDistribution, dailyDistribution] =
          await Promise.all([
            tx.downloadStats.findFirst(),
            tx.downloadRecord.findMany({
              orderBy: { timestamp: 'desc' },
              take: 10,
              select: { id: true, timestamp: true, country: true, os: true, browser: true, deviceType: true }
            }),
            tx.countryAnalytics.findMany(),
            tx.oSAnalytics.findMany(),
            tx.browserAnalytics.findMany(),
            tx.deviceTypeAnalytics.findMany(),
            tx.hourlyAnalytics.findMany(),
            tx.dailyAnalytics.findMany()
          ])
        return { stats, recentDownloads, countries, operatingSystems, browsers, deviceTypes, hourlyDistribution, dailyDistribution }
      })
    })

    const downloadCount = data.stats?.resumeDownloads || 0

    const analytics = {
      countries: Object.fromEntries(data.countries.map(c => [c.country, c.count])),
      operatingSystems: Object.fromEntries(data.operatingSystems.map(o => [o.os, o.count])),
      browsers: Object.fromEntries(data.browsers.map(b => [b.browser, b.count])),
      deviceTypes: Object.fromEntries(data.deviceTypes.map(d => [d.deviceType, d.count])),
      hourlyDistribution: Object.fromEntries(data.hourlyDistribution.map(h => [h.hour.toString(), h.count])),
      dailyDistribution: Object.fromEntries(data.dailyDistribution.map(d => [d.dayOfWeek, d.count]))
    }

    return NextResponse.json({
      success: true,
      downloadCount,
      analytics,
      recentDownloads: data.recentDownloads,
      totalDownloads: downloadCount,
    })
  } catch (error: any) {
    console.error('Failed to fetch analytics:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch analytics' }, { status: 500 })
  }
}
