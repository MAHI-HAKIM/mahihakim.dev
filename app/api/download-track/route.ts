import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const downloadStatsPath = path.join(process.cwd(), 'download-stats.json')

// Function to get client IP address
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

// Function to get user agent details
function parseUserAgent(userAgent: string) {
  const ua = userAgent.toLowerCase()
  
  // OS Detection
  let os = 'Unknown'
  if (ua.includes('windows')) os = 'Windows'
  else if (ua.includes('mac os')) os = 'macOS'
  else if (ua.includes('linux')) os = 'Linux'
  else if (ua.includes('android')) os = 'Android'
  else if (ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad')) os = 'iOS'
  
  // Browser Detection
  let browser = 'Unknown'
  if (ua.includes('chrome')) browser = 'Chrome'
  else if (ua.includes('firefox')) browser = 'Firefox'
  else if (ua.includes('safari') && !ua.includes('chrome')) browser = 'Safari'
  else if (ua.includes('edge')) browser = 'Edge'
  else if (ua.includes('opera')) browser = 'Opera'
  
  // Device Type
  let deviceType = 'Desktop'
  if (ua.includes('mobile')) deviceType = 'Mobile'
  else if (ua.includes('tablet') || ua.includes('ipad')) deviceType = 'Tablet'
  
  return { os, browser, deviceType }
}

// Function to get country from IP (using a free service)
async function getCountryFromIP(ip: string): Promise<string> {
  if (ip === 'Unknown' || ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
    return 'Local/Unknown'
  }
  
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=country,countryCode,city,region`)
    const data = await response.json()
    
    if (data.status === 'success') {
      return `${data.country} (${data.countryCode})`
    }
    return 'Unknown'
  } catch (error) {
    console.error('Error fetching country:', error)
    return 'Unknown'
  }
}

// Initialize stats file if it doesn't exist
async function initializeStats() {
  try {
    await fs.access(downloadStatsPath)
  } catch {
    // File doesn't exist, create it with initial stats
    const initialStats = {
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
    await fs.writeFile(downloadStatsPath, JSON.stringify(initialStats, null, 2))
  }
}

// Read current stats
async function readStats() {
  try {
    const data = await fs.readFile(downloadStatsPath, 'utf8')
    const stats = JSON.parse(data)
    
    // Ensure backward compatibility with old format
    if (!stats.downloads) {
      stats.downloads = []
      // If we have old data, create a download record from it
      if (stats.resumeDownloads > 0) {
        stats.downloads.push({
          id: 1,
          timestamp: stats.lastUpdated || new Date().toISOString(),
          ip: 'Unknown',
          country: 'Unknown',
          os: 'Unknown',
          browser: 'Unknown',
          deviceType: 'Unknown',
          userAgent: 'Unknown'
        })
      }
    }
    
    if (!stats.analytics) {
      stats.analytics = {
        countries: {},
        operatingSystems: {},
        browsers: {},
        deviceTypes: {},
        hourlyDistribution: {},
        dailyDistribution: {}
      }
      
      // Initialize analytics from existing downloads
      stats.downloads.forEach((download: any) => {
        const country = download.country || 'Unknown'
        const os = download.os || 'Unknown'
        const browser = download.browser || 'Unknown'
        const deviceType = download.deviceType || 'Unknown'
        
        stats.analytics.countries[country] = (stats.analytics.countries[country] || 0) + 1
        stats.analytics.operatingSystems[os] = (stats.analytics.operatingSystems[os] || 0) + 1
        stats.analytics.browsers[browser] = (stats.analytics.browsers[browser] || 0) + 1
        stats.analytics.deviceTypes[deviceType] = (stats.analytics.deviceTypes[deviceType] || 0) + 1
        
        if (download.timestamp) {
          const date = new Date(download.timestamp)
          const hour = date.getHours()
          const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' })
          
          stats.analytics.hourlyDistribution[hour] = (stats.analytics.hourlyDistribution[hour] || 0) + 1
          stats.analytics.dailyDistribution[dayOfWeek] = (stats.analytics.dailyDistribution[dayOfWeek] || 0) + 1
        }
      })
    }
    
    return stats
  } catch (error) {
    console.error('Error reading stats:', error)
    return { 
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
  }
}

// Write updated stats
async function writeStats(stats: any) {
  try {
    await fs.writeFile(downloadStatsPath, JSON.stringify(stats, null, 2))
  } catch (error) {
    console.error('Error writing stats:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    await initializeStats()
    const stats = await readStats()
    
    // Get client information
    const clientIP = getClientIP(request)
    const userAgent = request.headers.get('user-agent') || 'Unknown'
    const { os, browser, deviceType } = parseUserAgent(userAgent)
    const country = await getCountryFromIP(clientIP)
    
    // Get current timestamp
    const now = new Date()
    const timestamp = now.toISOString()
    const hour = now.getHours()
    const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' })
    
    // Create download record
    const downloadRecord = {
      id: stats.resumeDownloads + 1,
      timestamp,
      ip: clientIP,
      country,
      os,
      browser,
      deviceType,
      userAgent
    }
    
    // Add to downloads array
    stats.downloads.push(downloadRecord)
    
    // Update analytics
    stats.analytics.countries[country] = (stats.analytics.countries[country] || 0) + 1
    stats.analytics.operatingSystems[os] = (stats.analytics.operatingSystems[os] || 0) + 1
    stats.analytics.browsers[browser] = (stats.analytics.browsers[browser] || 0) + 1
    stats.analytics.deviceTypes[deviceType] = (stats.analytics.deviceTypes[deviceType] || 0) + 1
    stats.analytics.hourlyDistribution[hour] = (stats.analytics.hourlyDistribution[hour] || 0) + 1
    stats.analytics.dailyDistribution[dayOfWeek] = (stats.analytics.dailyDistribution[dayOfWeek] || 0) + 1
    
    // Increment download count
    stats.resumeDownloads += 1
    stats.lastUpdated = timestamp
    
    await writeStats(stats)
    
    return NextResponse.json({ 
      success: true, 
      downloadCount: stats.resumeDownloads,
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
    await initializeStats()
    const stats = await readStats()
    
    return NextResponse.json({ 
      success: true, 
      downloadCount: stats.resumeDownloads,
      analytics: stats.analytics,
      recentDownloads: stats.downloads.slice(-10), // Last 10 downloads
      totalDownloads: stats.downloads.length
    })
  } catch (error) {
    console.error('Error reading download stats:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to read stats' },
      { status: 500 }
    )
  }
} 