// src/db/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    // 🔧 Enhanced settings to prevent prepared statement errors
    transactionOptions: {
      timeout: 30000, // 30 seconds (increased from 10)
      maxWait: 5000, // 5 seconds max wait
      isolationLevel: "ReadCommitted", // Safer isolation
    },
    errorFormat: "pretty",
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// 🔧 Enhanced connection with prepared statement error handling
export async function connectWithRetry(retries = 3): Promise<boolean> {
  for (let i = 0; i < retries; i++) {
    try {
      // Test connection and clear stale prepared statements
      await prisma.$queryRaw`SELECT 1`;
      console.log("✅ Database connected successfully");
      return true;
    } catch (error) {
      console.log(`❌ Database connection attempt ${i + 1} failed:`, error);

      // Handle prepared statement errors specifically
      if (
        error instanceof Error &&
        error.message.includes("prepared statement")
      ) {
        console.log("🔄 Prepared statement error detected, disconnecting...");
        await prisma.$disconnect();
      }

      if (i < retries - 1) {
        console.log(`🔄 Retrying in ${(i + 1) * 1000}ms...`);
        await new Promise((resolve) => setTimeout(resolve, (i + 1) * 1000));
      }
    }
  }
  return false;
}

// 🔧 Enhanced query retry with prepared statement handling
export async function queryWithRetry<T>(
  queryFn: () => Promise<T>,
  retries = 2
): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await queryFn();
    } catch (error: any) {
      console.log(`Query attempt ${i + 1} failed:`, error?.message);

      // 🎯 Handle prepared statement errors specifically
      if (
        error?.message?.includes("prepared statement") ||
        error?.code === "P2024" ||
        error?.code === "26000"
      ) {
        console.log("🔄 Prepared statement error detected, reconnecting...");
        await prisma.$disconnect();
        await connectWithRetry(1);

        if (i < retries - 1) {
          continue;
        }
      }

      // Handle other connection errors
      if (
        error?.code === "P1001" ||
        error?.message?.includes("Can't reach database")
      ) {
        if (i < retries - 1) {
          await connectWithRetry(1);
          continue;
        }
      }
      throw error;
    }
  }
  throw new Error("Query failed after all retries");
}

// 🔧 Enhanced shutdown handling
const shutdownHandler = async () => {
  console.log("🔄 Shutting down database connections...");
  try {
    await prisma.$disconnect();
    console.log("✅ Database disconnected successfully");
  } catch (error) {
    console.error("❌ Error during database disconnect:", error);
  }
};

if (process.env.NODE_ENV === "production") {
  process.on("beforeExit", shutdownHandler);
  process.on("SIGINT", shutdownHandler);
  process.on("SIGTERM", shutdownHandler);
}

// Test connection on startup
if (process.env.NODE_ENV === "development") {
  connectWithRetry().catch(console.error);
}
