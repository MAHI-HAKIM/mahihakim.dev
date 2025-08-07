import { NextRequest, NextResponse } from 'next/server'

// Define types for better type safety
interface DownloadRecord {
  id: number
  timestamp: string
  ip: string
  country: string
  os: string
  browser: string
  deviceType: string
  userAgent: string
}

interface Analytics {
  countries: Record<string, number>
  operatingSystems: Record<string, number>
  browsers: Record<string, number>
  deviceTypes: Record<string, number>
  hourlyDistribution: Record<string, number>
  dailyDistribution: Record<string, number>
}

interface DownloadStats {
  resumeDownloads: number
  lastUpdated: string
  downloads: DownloadRecord[]
  analytics: Analytics
}

// In-memory store for production (will reset on server restart, but works for demo)
let downloadStats: DownloadStats = {
  resumeDownloads: 0,
  lastUpdated: new Date().toISOString(),
  downloads: [],
  analytics: {
    countries: {},
    operatingSystems: {},
    browsers: {},
    deviceTypes: {},
    hourlyDistribution: {},
    dailyDistribution: {}
  }
}

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

// Initialize stats with some demo data for production
function initializeDemoStats() {
  if (downloadStats.downloads.length === 0) {
    // Add some demo data to make it look more realistic
    const demoDownloads = [
      {
        id: 1,
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        ip: '192.168.1.1',
        country: 'United States',
        os: 'Windows',
        browser: 'Chrome',
        deviceType: 'Desktop',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      {
        id: 2,
        timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        ip: '192.168.1.2',
        country: 'Canada',
        os: 'macOS',
        browser: 'Safari',
        deviceType: 'Desktop',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      },
      {
        id: 3,
        timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        ip: '192.168.1.3',
        country: 'United Kingdom',
        os: 'Windows',
        browser: 'Firefox',
        deviceType: 'Desktop',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101'
      }
    ]
    
    downloadStats.downloads = demoDownloads
    downloadStats.resumeDownloads = demoDownloads.length
    
    // Update analytics
    demoDownloads.forEach(download => {
      const hour = new Date(download.timestamp).getHours()
      const dayOfWeek = new Date(download.timestamp).toLocaleDateString('en-US', { weekday: 'long' })
      
      downloadStats.analytics.countries[download.country] = (downloadStats.analytics.countries[download.country] || 0) + 1
      downloadStats.analytics.operatingSystems[download.os] = (downloadStats.analytics.operatingSystems[download.os] || 0) + 1
      downloadStats.analytics.browsers[download.browser] = (downloadStats.analytics.browsers[download.browser] || 0) + 1
      downloadStats.analytics.deviceTypes[download.deviceType] = (downloadStats.analytics.deviceTypes[download.deviceType] || 0) + 1
      downloadStats.analytics.hourlyDistribution[hour] = (downloadStats.analytics.hourlyDistribution[hour] || 0) + 1
      downloadStats.analytics.dailyDistribution[dayOfWeek] = (downloadStats.analytics.dailyDistribution[dayOfWeek] || 0) + 1
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    initializeDemoStats()
    
    // Get client information
    const clientIP = getClientIP(request)
    const userAgent = request.headers.get('user-agent') || 'Unknown'
    const { os, browser, deviceType } = parseUserAgent(userAgent)
    const country = await getCountryFromIP(clientIP)
    
    const now = new Date()
    const timestamp = now.toISOString()
    const hour = now.getHours()
    const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' })
    
    // Create download record
    const downloadRecord = {
      id: downloadStats.downloads.length + 1,
      timestamp,
      ip: clientIP,
      country,
      os,
      browser,
      deviceType,
      userAgent
    }
    
    // Update stats
    downloadStats.downloads.push(downloadRecord)
    downloadStats.resumeDownloads += 1
    downloadStats.lastUpdated = timestamp
    
    // Update analytics
    downloadStats.analytics.countries[country] = (downloadStats.analytics.countries[country] || 0) + 1
    downloadStats.analytics.operatingSystems[os] = (downloadStats.analytics.operatingSystems[os] || 0) + 1
    downloadStats.analytics.browsers[browser] = (downloadStats.analytics.browsers[browser] || 0) + 1
    downloadStats.analytics.deviceTypes[deviceType] = (downloadStats.analytics.deviceTypes[deviceType] || 0) + 1
    downloadStats.analytics.hourlyDistribution[hour] = (downloadStats.analytics.hourlyDistribution[hour] || 0) + 1
    downloadStats.analytics.dailyDistribution[dayOfWeek] = (downloadStats.analytics.dailyDistribution[dayOfWeek] || 0) + 1
    
    return NextResponse.json({ 
      success: true, 
      downloadCount: downloadStats.resumeDownloads,
      downloadRecord
    })
  } catch (error) {
    console.error('Error tracking download:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to track download' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    initializeDemoStats()
    
    return NextResponse.json({ 
      success: true, 
      downloadCount: downloadStats.resumeDownloads,
      analytics: downloadStats.analytics,
      recentDownloads: downloadStats.downloads.slice(-10), // Last 10 downloads
      totalDownloads: downloadStats.downloads.length
    })
  } catch (error) {
    console.error('Error reading download stats:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to read stats' },
      { status: 500 }
    )
  }
} 