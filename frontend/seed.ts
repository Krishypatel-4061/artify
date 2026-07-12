import { PrismaClient } from '@prisma/client';
import { db } from './src/services/database.service'; // We can't import this directly due to Next.js specific imports, but we can copy the mock artworks here for seeding.

const prisma = new PrismaClient();

const MOCK_ARTWORKS = [
  {
    id: "luminous-etherea",
    title: "Luminous Etherea",
    description: '"Luminous Etherea" explores the boundary between digital structure and organic light. Created using advanced procedural generation techniques combined with hand-painted reflections, this piece represents the pinnacle of contemporary glassmorphism art. Every pixel is calculated to harmonize with the next, creating a sense of translucent depth that feels tangible yet otherworldly.',
    price: 9420.50,
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    artistId: "artist-2",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "neon-serenity",
    title: "Neon Serenity",
    description: "A cyberpunk inspired digital painting capturing the quiet moments in a bustling neon city.",
    price: 120.00,
    imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=800&auto=format&fit=crop",
    artistId: "68c2e21d-1618-4b16-845a-bf6ee1cc3c80",
    createdAt: new Date(),
  },
  {
    id: "glass-peaks",
    title: "Glass Peaks",
    description: "A 3D glass render of mountain peaks reflecting low sunset light, with pristine material refraction.",
    price: 450.00,
    imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop",
    artistId: "68c2e21d-1618-4b16-845a-bf6ee1cc3c80",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: "digital-oasis",
    title: "Digital Oasis",
    description: "Lush digital plants rendering inside a metallic structures in a utopian landscape.",
    price: 85.00,
    imageUrl: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?q=80&w=800&auto=format&fit=crop",
    artistId: "68c2e21d-1618-4b16-845a-bf6ee1cc3c80",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "floating-dreams",
    title: "Floating Dreams",
    description: "Surreal spheres floating above a desert reflecting the pastel sky colors.",
    price: 230.00,
    imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop",
    artistId: "68c2e21d-1618-4b16-845a-bf6ee1cc3c80",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: "chrome-echoes",
    title: "Chrome Echoes",
    description: "Liquid chrome shapes suspended in mid-air reflecting a high contrast studio scene.",
    price: 1200.00,
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop",
    artistId: "68c2e21d-1618-4b16-845a-bf6ee1cc3c80",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
  {
    id: "liquid-dreams-01",
    title: "Liquid Dreams 01",
    description: "Fluids blending smoothly into a complex pattern.",
    price: 4100.00,
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
    artistId: "68c2e21d-1618-4b16-845a-bf6ee1cc3c80",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  },
  {
    id: "cyber-citadel",
    title: "Cyber Citadel",
    description: "A dark cyberpunk skyline dominated by tall structures.",
    price: 11400.00,
    imageUrl: "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?q=80&w=800&auto=format&fit=crop",
    artistId: "68c2e21d-1618-4b16-845a-bf6ee1cc3c80",
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
  },
  {
    id: "golden-hour-fractal",
    title: "Golden Hour Fractal",
    description: "Glass structures catching light at golden hour.",
    price: 2320.00,
    imageUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=800&auto=format&fit=crop",
    artistId: "68c2e21d-1618-4b16-845a-bf6ee1cc3c80",
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
  },
  {
    id: "organic-flow-4",
    title: "Organic Flow #4",
    description: "Clay-like render showing fluid movements.",
    price: 5720.00,
    imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop",
    artistId: "68c2e21d-1618-4b16-845a-bf6ee1cc3c80",
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
  },
  {
    id: "neon-pulse",
    title: "Neon Pulse",
    description: "Abstract neon lines waving in complete darkness.",
    price: 2590.00,
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
    artistId: "68c2e21d-1618-4b16-845a-bf6ee1cc3c80",
    createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
  },
  {
    id: "marble-waves",
    title: "Marble Waves",
    description: "Waves of digital marble flowing into a swirling pattern.",
    price: 8180.00,
    imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop",
    artistId: "68c2e21d-1618-4b16-845a-bf6ee1cc3c80",
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
  },
  {
    id: "deep-space-one",
    title: "Deep Space One",
    description: "An astronomical digital artwork representing nebulas and distant starclusters.",
    price: 15000.00,
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    artistId: "68c2e21d-1618-4b16-845a-bf6ee1cc3c80",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
  },
  {
    id: "prism-glow",
    title: "Prism Glow",
    description: "Glass shards diffracting white light into a rainbow glow.",
    price: 3400.00,
    imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=800&auto=format&fit=crop",
    artistId: "68c2e21d-1618-4b16-845a-bf6ee1cc3c80",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  }
];

async function main() {
  console.log("Seeding database...");

  // Seed default artists
  const artist1 = await prisma.user.upsert({
    where: { id: "68c2e21d-1618-4b16-845a-bf6ee1cc3c80" },
    update: {},
    create: {
      id: "68c2e21d-1618-4b16-845a-bf6ee1cc3c80",
      name: "CyberPunkDude",
      email: "artist@artify.cloud",
      role: "artist"
    },
  });

  const artist2 = await prisma.user.upsert({
    where: { id: "artist-2" },
    update: {},
    create: {
      id: "artist-2",
      name: "AetherDesign_",
      email: "aether@artify.cloud",
      role: "artist"
    },
  });

  for (const artwork of MOCK_ARTWORKS) {
    await prisma.artwork.upsert({
      where: { id: artwork.id },
      update: {
        title: artwork.title,
        description: artwork.description,
        price: artwork.price,
        imageUrl: artwork.imageUrl,
        artistId: artwork.artistId,
        createdAt: artwork.createdAt,
      },
      create: {
        id: artwork.id,
        title: artwork.title,
        description: artwork.description,
        price: artwork.price,
        imageUrl: artwork.imageUrl,
        artistId: artwork.artistId,
        createdAt: artwork.createdAt,
      },
    });
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
