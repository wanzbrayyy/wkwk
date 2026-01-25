import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

let prismaClient: PrismaClient

if (process.env.NODE_ENV === "production") {
  prismaClient = new PrismaClient({
    // Tambahkan log untuk melihat aktivitas Prisma di produksi
    log: ['query', 'info', 'warn', 'error'], 
  })
  // Coba koneksi segera dan log hasilnya
  prismaClient.$connect()
    .then(() => console.log("[Prisma] Connected to database successfully."))
    .catch((e) => console.error("[Prisma] Failed to connect to database:", e))
} else {
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    })
  }
  prismaClient = globalThis.prisma
}

export const db = prismaClient