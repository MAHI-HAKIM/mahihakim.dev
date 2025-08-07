import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Helper function to get client IP
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  if (realIP) {
    return realIP
  }
  if (cfConnectingIP) {
    return cfConnectingIP
  }
  
  return 'Unknown'
}

// Helper function to parse user agent
function parseUserAgent(userAgent: string) {
  let os = 'Unknown'
  let browser = 'Unknown'
  let deviceType = 'Desktop'

  // OS Detection
  if (userAgent.includes('Windows')) {
    os = 'Windows'
  } else if (userAgent.includes('Mac')) {
    os = 'macOS'
  } else if (userAgent.includes('Linux')) {
    os = 'Linux'
  } else if (userAgent.includes('Android')) {
    os = 'Android'
    deviceType = 'Mobile'
  } else if (userAgent.includes('iOS') || userAgent.includes('iPhone') || userAgent.includes('iPad')) {
    os = 'iOS'
    deviceType = userAgent.includes('iPad') ? 'Tablet' : 'Mobile'
  }

  // Browser Detection
  if (userAgent.includes('Chrome')) {
    browser = 'Chrome'
  } else if (userAgent.includes('Firefox')) {
    browser = 'Firefox'
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    browser = 'Safari'
  } else if (userAgent.includes('Edge')) {
    browser = 'Edge'
  } else if (userAgent.includes('Opera')) {
    browser = 'Opera'
  }

  return { os, browser, deviceType }
}

// Helper function to get country from IP (simplified)
async function getCountryFromIP(ip: string): Promise<string> {
  if (ip === 'Unknown' || ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
    return 'Local/Unknown'
  }
  
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=country`)
    const data = await response.json()
    return data.country || 'Unknown'
  } catch (error) {
    console.error('Error getting country from IP:', error)
    return 'Unknown'
  }
}

// Helper function to initialize database with demo data if empty
async function initializeDatabase() {
  try {
    // Check if we have any download stats
    const stats = await prisma.downloadStats.findFirst()
    
    if (!stats) {
      // Initialize with demo data
      const demoDownloads = [
        {
          ip: '192.168.1.1',
          country: 'United States',
          os: 'Windows',
          browser: 'Chrome',
          deviceType: 'Desktop',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          hour: 14,
          dayOfWeek: 'Monday'
        },
        {
          ip: '192.168.1.2',
          country: 'Canada',
          os: 'macOS',
          browser: 'Safari',
          deviceType: 'Desktop',
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          hour: 16,
          dayOfWeek: 'Tuesday'
        },
        {
          ip: '192.168.1.3',
          country: 'United Kingdom',
          os: 'Windows',
          browser: 'Firefox',
          deviceType: 'Desktop',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101',
          hour: 10,
          dayOfWeek: 'Wednesday'
        }
      ]

      // Create download records
      for (const download of demoDownloads) {
        await prisma.downloadRecord.create({
          data: download
        })
      }

      // Create download stats
      await prisma.downloadStats.create({
        data: {
          resumeDownloads: demoDownloads.length,
          lastUpdated: new Date()
        }
      })

      // Initialize analytics
      await prisma.countryAnalytics.createMany({
        data: [
          { country: 'United States', count: 1 },
          { country: 'Canada', count: 1 },
          { country: 'United Kingdom', count: 1 }
        ]
      })

      await prisma.oSAnalytics.createMany({
        data: [
          { os: 'Windows', count: 2 },
          { os: 'macOS', count: 1 }
        ]
      })

      await prisma.browserAnalytics.createMany({
        data: [
          { browser: 'Chrome', count: 1 },
          { browser: 'Safari', count: 1 },
          { browser: 'Firefox', count: 1 }
        ]
      })

      await prisma.deviceTypeAnalytics.createMany({
        data: [
          { deviceType: 'Desktop', count: 3 }
        ]
      })

      await prisma.hourlyAnalytics.createMany({
        data: [
          { hour: 10, count: 1 },
          { hour: 14, count: 1 },
          { hour: 16, count: 1 }
        ]
      })

      await prisma.dailyAnalytics.createMany({
        data: [
          { dayOfWeek: 'Monday', count: 1 },
          { dayOfWeek: 'Tuesday', count: 1 },
          { dayOfWeek: 'Wednesday', count: 1 }
        ]
      })
    }
  } catch (error) {
    console.error('Error initializing database:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if DATABASE_URL is available
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL environment variable is not set')
      return NextResponse.json(
        { success: false, error: 'Database configuration missing' },
        { status: 500 }
      )
    }

    // Ensure connection is established
    await prisma.$connect()

    // Initialize database if needed
    await initializeDatabase()
    
    // Get client information
    const clientIP = getClientIP(request)
    const userAgent = request.headers.get('user-agent') || 'Unknown'
    const { os, browser, deviceType } = parseUserAgent(userAgent)
    const country = await getCountryFromIP(clientIP)
    
    const now = new Date()
    const hour = now.getHours()
    const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' })
    
    // Create download record
    const downloadRecord = await prisma.downloadRecord.create({
      data: {
        ip: clientIP,
        country,
        os,
        browser,
        deviceType,
        userAgent,
        hour,
        dayOfWeek
      }
    })
    
    // Update download stats
    const stats = await prisma.downloadStats.findFirst()
    if (stats) {
      await prisma.downloadStats.update({
        where: { id: stats.id },
        data: {
          resumeDownloads: stats.resumeDownloads + 1,
          lastUpdated: now
        }
      })
    } else {
      await prisma.downloadStats.create({
        data: {
          resumeDownloads: 1,
          lastUpdated: now
        }
      })
    }
    
    // Update analytics using upsert operations
    await prisma.countryAnalytics.upsert({
      where: { country },
      update: { count: { increment: 1 } },
      create: { country, count: 1 }
    })

    await prisma.oSAnalytics.upsert({
      where: { os },
      update: { count: { increment: 1 } },
      create: { os, count: 1 }
    })

    await prisma.browserAnalytics.upsert({
      where: { browser },
      update: { count: { increment: 1 } },
      create: { browser, count: 1 }
    })

    await prisma.deviceTypeAnalytics.upsert({
      where: { deviceType },
      update: { count: { increment: 1 } },
      create: { deviceType, count: 1 }
    })

    await prisma.hourlyAnalytics.upsert({
      where: { hour },
      update: { count: { increment: 1 } },
      create: { hour, count: 1 }
    })

    await prisma.dailyAnalytics.upsert({
      where: { dayOfWeek },
      update: { count: { increment: 1 } },
      create: { dayOfWeek, count: 1 }
    })
    
    // Get updated count
    const updatedStats = await prisma.downloadStats.findFirst()
    const downloadCount = updatedStats?.resumeDownloads || 0
    
    return NextResponse.json({ 
      success: true, 
      downloadCount,
      downloadRecord
    })
  } catch (error) {
    console.error('Error tracking download:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to track download' },
      { status: 500 }
    )
  } finally {
    // Always disconnect to prevent connection issues
    await prisma.$disconnect()
  }
}

export async function GET() {
  try {
    // Check if DATABASE_URL is available
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL environment variable is not set')
      return NextResponse.json(
        { success: false, error: 'Database configuration missing' },
        { status: 500 }
      )
    }

    // Ensure connection is established
    await prisma.$connect()

    // Initialize database if needed
    await initializeDatabase()
    
    // Get download stats
    const stats = await prisma.downloadStats.findFirst()
    const downloadCount = stats?.resumeDownloads || 0
    
    // Get recent downloads
    const recentDownloads = await prisma.downloadRecord.findMany({
      orderBy: { timestamp: 'desc' },
      take: 10
    })
    
    // Get analytics
    const countries = await prisma.countryAnalytics.findMany()
    const operatingSystems = await prisma.oSAnalytics.findMany()
    const browsers = await prisma.browserAnalytics.findMany()
    const deviceTypes = await prisma.deviceTypeAnalytics.findMany()
    const hourlyDistribution = await prisma.hourlyAnalytics.findMany()
    const dailyDistribution = await prisma.dailyAnalytics.findMany()
    
    // Convert to the expected format
    const analytics = {
      countries: Object.fromEntries(countries.map((c: any) => [c.country, c.count])),
      operatingSystems: Object.fromEntries(operatingSystems.map((os: any) => [os.os, os.count])),
      browsers: Object.fromEntries(browsers.map((b: any) => [b.browser, b.count])),
      deviceTypes: Object.fromEntries(deviceTypes.map((d: any) => [d.deviceType, d.count])),
      hourlyDistribution: Object.fromEntries(hourlyDistribution.map((h: any) => [h.hour.toString(), h.count])),
      dailyDistribution: Object.fromEntries(dailyDistribution.map((d: any) => [d.dayOfWeek, d.count]))
    }
    
    return NextResponse.json({ 
      success: true, 
      downloadCount,
      analytics,
      recentDownloads,
      totalDownloads: recentDownloads.length
    })
  } catch (error) {
    console.error('Error reading download stats:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to read stats' },
      { status: 500 }
    )
  } finally {
    // Always disconnect to prevent connection issues
    await prisma.$disconnect()
  }
} 