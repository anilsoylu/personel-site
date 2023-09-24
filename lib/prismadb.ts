import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

let prismadb: PrismaClient

if (!global.prisma) {
  prismadb = new PrismaClient()
  if (process.env.NODE_ENV !== "production") global.prisma = prismadb
} else {
  prismadb = global.prisma
}

export default prismadb
