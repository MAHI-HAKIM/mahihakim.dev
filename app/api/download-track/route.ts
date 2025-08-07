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
    // Use HTTPS for better reliability
    const response = await fetch(`https://ipapi.co/${ip}/country_name/`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      signal: AbortSignal.timeout(5000) // 5 second timeout
    })
    
    if (response.ok) {
      const country = await response.text()
      return country.trim() || 'Unknown'
    }
    return 'Unknown'
  } catch (error) {
    console.warn('Error getting country from IP:', error)
    return 'Unknown'
  }
}

// Initialize database with demo data - run only once
async function initializeDatabase() {
  try {
    // Use a more efficient check
    const statsCount = await prisma.downloadStats.count()
    
    if (statsCount === 0) {
      console.log('Initializing database with demo data...')
      
      // Use transaction for better performance and consistency
      await prisma.$transaction(async (tx) => {
        // Create download stats first
        await tx.downloadStats.create({
          data: {
            resumeDownloads: 3,
            lastUpdated: new Date()
          }
        })

        // Create download records
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

        await tx.downloadRecord.createMany({ data: demoDownloads })

        // Initialize analytics with createMany
        await tx.countryAnalytics.createMany({
          data: [
            { country: 'United States', count: 1 },
            { country: 'Canada', count: 1 },
            { country: 'United Kingdom', count: 1 }
          ]
        })

        await tx.oSAnalytics.createMany({
          data: [
            { os: 'Windows', count: 2 },
            { os: 'macOS', count: 1 }
          ]
        })

        await tx.browserAnalytics.createMany({
          data: [
            { browser: 'Chrome', count: 1 },
            { browser: 'Safari', count: 1 },
            { browser: 'Firefox', count: 1 }
          ]
        })

        await tx.deviceTypeAnalytics.createMany({
          data: [{ deviceType: 'Desktop', count: 3 }]
        })

        await tx.hourlyAnalytics.createMany({
          data: [
            { hour: 10, count: 1 },
            { hour: 14, count: 1 },
            { hour: 16, count: 1 }
          ]
        })

        await tx.dailyAnalytics.createMany({
          data: [
            { dayOfWeek: 'Monday', count: 1 },
            { dayOfWeek: 'Tuesday', count: 1 },
            { dayOfWeek: 'Wednesday', count: 1 }
          ]
        })
      })
      
      console.log('Database initialized successfully')
    }
  } catch (error) {
    console.error('Error initializing database:', error)
    // Don't throw - let the app continue even if initialization fails
  }
}

// Retry wrapper for database operations
async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 100
): Promise<T> {
  let lastError: any
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error: any) {
      lastError = error
      
      // Check if it's a prepared statement error
      if (error.message?.includes('prepared statement') || 
          error.message?.includes('already exists') ||
          error.code === '42P05') {
        
        console.warn(`Prepared statement error on attempt ${attempt}/${maxRetries}`)
        
        if (attempt < maxRetries) {
          // Wait before retry with exponential backoff
          await new Promise(resolve => setTimeout(resolve, delayMs * attempt))
          continue
        }
      }
      
      // If it's not a retryable error or we've exceeded retries, throw
      throw error
    }
  }
  
  throw lastError
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

    // Remove manual connection management - let the pooler handle it
    // await prisma.$connect() // REMOVED

    // Initialize database if needed (only run this occasionally)
    const shouldInitialize = Math.random() < 0.01 // 1% chance to check
    if (shouldInitialize) {
      await initializeDatabase()
    }
    
    // Get client information
    const clientIP = getClientIP(request)
    const userAgent = request.headers.get('user-agent') || 'Unknown'
    const { os, browser, deviceType } = parseUserAgent(userAgent)
    
    // Get country with timeout to avoid hanging requests
    const country = await getCountryFromIP(clientIP)
    
    const now = new Date()
    const hour = now.getHours()
    const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' })
    
    // Use a single transaction for all database operations
    const result = await withRetry(async () => {
      return await prisma.$transaction(async (tx) => {
        // Create download record
        const downloadRecord = await tx.downloadRecord.create({
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
        
        // Update or create download stats
        const stats = await tx.downloadStats.findFirst()
        let updatedStats
        
        if (stats) {
          updatedStats = await tx.downloadStats.update({
            where: { id: stats.id },
            data: {
              resumeDownloads: stats.resumeDownloads + 1,
              lastUpdated: now
            }
          })
        } else {
          updatedStats = await tx.downloadStats.create({
            data: {
              resumeDownloads: 1,
              lastUpdated: now
            }
          })
        }
        
        // Update analytics using upsert operations
        await Promise.all([
          tx.countryAnalytics.upsert({
            where: { country },
            update: { count: { increment: 1 } },
            create: { country, count: 1 }
          }),
          tx.oSAnalytics.upsert({
            where: { os },
            update: { count: { increment: 1 } },
            create: { os, count: 1 }
          }),
          tx.browserAnalytics.upsert({
            where: { browser },
            update: { count: { increment: 1 } },
            create: { browser, count: 1 }
          }),
          tx.deviceTypeAnalytics.upsert({
            where: { deviceType },
            update: { count: { increment: 1 } },
            create: { deviceType, count: 1 }
          }),
          tx.hourlyAnalytics.upsert({
            where: { hour },
            update: { count: { increment: 1 } },
            create: { hour, count: 1 }
          }),
          tx.dailyAnalytics.upsert({
            where: { dayOfWeek },
            update: { count: { increment: 1 } },
            create: { dayOfWeek, count: 1 }
          })
        ])
        
        return { downloadRecord, updatedStats }
      })
    })
    
    return NextResponse.json({ 
      success: true, 
      downloadCount: result.updatedStats.resumeDownloads,
      downloadRecord: result.downloadRecord
    })
  } catch (error: any) {
    console.error('Error tracking download:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to track download',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
  // Remove finally block - let the pooler manage connections
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

    // Remove manual connection management
    // await prisma.$connect() // REMOVED
    // await initializeDatabase() // REMOVED - only initialize when needed
    
    // Use a single query transaction for better performance
    const data = await withRetry(async () => {
      return await prisma.$transaction(async (tx) => {
        // Get all data in parallel
        const [
          stats,
          recentDownloads,
          countries,
          operatingSystems,
          browsers,
          deviceTypes,
          hourlyDistribution,
          dailyDistribution
        ] = await Promise.all([
          tx.downloadStats.findFirst(),
          tx.downloadRecord.findMany({
            orderBy: { timestamp: 'desc' },
            take: 10,
            select: {
              id: true,
              timestamp: true,
              country: true,
              os: true,
              browser: true,
              deviceType: true,
              // Don't select sensitive data like IP and userAgent for GET requests
            }
          }),
          tx.countryAnalytics.findMany(),
          tx.oSAnalytics.findMany(),
          tx.browserAnalytics.findMany(),
          tx.deviceTypeAnalytics.findMany(),
          tx.hourlyAnalytics.findMany(),
          tx.dailyAnalytics.findMany()
        ])
        
        return {
          stats,
          recentDownloads,
          countries,
          operatingSystems,
          browsers,
          deviceTypes,
          hourlyDistribution,
          dailyDistribution
        }
      })
    })
    
    const downloadCount = data.stats?.resumeDownloads || 0
    
    // Convert to the expected format
    const analytics = {
      countries: Object.fromEntries(data.countries.map((c: any) => [c.country, c.count])),
      operatingSystems: Object.fromEntries(data.operatingSystems.map((os: any) => [os.os, os.count])),
      browsers: Object.fromEntries(data.browsers.map((b: any) => [b.browser, b.count])),
      deviceTypes: Object.fromEntries(data.deviceTypes.map((d: any) => [d.deviceType, d.count])),
      hourlyDistribution: Object.fromEntries(data.hourlyDistribution.map((h: any) => [h.hour.toString(), h.count])),
      dailyDistribution: Object.fromEntries(data.dailyDistribution.map((d: any) => [d.dayOfWeek, d.count]))
    }
    
    return NextResponse.json({ 
      success: true, 
      downloadCount,
      analytics,
      recentDownloads: data.recentDownloads,
      totalDownloads: data.recentDownloads.length
    })
  } catch (error: any) {
    console.error('Error reading download stats:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to read stats',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
  // Remove finally block - let the pooler manage connections
}