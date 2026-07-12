import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    const artworks = await prisma.artwork.findMany({ take: 1 })
    console.log("DB Connection SUCCESS!", artworks)
  } catch (error) {
    console.error("DB Connection FAILED!", error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
