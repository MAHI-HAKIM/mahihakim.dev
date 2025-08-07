import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

// Handle serverless environment
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Add connection management middleware
prisma.$use(async (params, next) => {
  try {
    return await next(params)
  } catch (error) {
    // Handle prepared statement errors
    if (error instanceof Error && error.message.includes('prepared statement')) {
      console.warn('Prepared statement error detected, attempting reconnection...')
      try {
        await prisma.$disconnect()
        await prisma.$connect()
        return await next(params)
      } catch (retryError) {
        console.error('Reconnection failed:', retryError)
        throw error
      }
    }
    throw error
  }
})
