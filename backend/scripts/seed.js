const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  try {
    const dummyId = "cm3a9b1c-9999-4d3f-b2a1-dummyartistid";
    const existing = await prisma.user.findUnique({ where: { id: dummyId } });
    if (!existing) {
      console.log("Creating dummy artist...");
      await prisma.user.create({
        data: {
          id: dummyId,
          name: "Test Artist",
          email: "artist@example.com",
          role: "artist"
        }
      });
      console.log("Dummy artist created.");
    } else {
      console.log("Dummy artist already exists.");
    }
  } catch(e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}
seed();
