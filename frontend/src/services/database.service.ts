// Database Service for Artify Cloud
// Works in both server components (direct Prisma access) and client components (API fetch)
// Falls back to hardcoded mock data when DB is unavailable

import type { Artwork as DBArtwork, User as DBUser } from "@prisma/client";

type DBArtworkWithArtist = DBArtwork & { artist: DBUser };

export interface Artwork {
  id: string;
  title: string;
  description: string;
  price: number;
  ethPrice?: number;
  imageUrl: string;
  artistId: string;
  artistName: string;
  createdAt: Date;
  tag?: string;
  category?: string;
  style?: string;
  status?: "Published" | "Under Review" | "Draft";
  likes?: number;
  views?: number;
  resolution?: string;
  format?: string;
  license?: string;
  size?: string;
  contractAddress?: string;
  tokenStandard?: string;
  blockchain?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "artist" | "buyer";
  avatarUrl?: string;
}

// Mock data used as fallback when the API/database is unavailable or empty
const MOCK_ARTWORKS: Artwork[] = [
  {
    id: "luminous-etherea",
    title: "Luminous Etherea",
    description: '"Luminous Etherea" explores the boundary between digital structure and organic light. Created using advanced procedural generation techniques combined with hand-painted reflections, this piece represents the pinnacle of contemporary glassmorphism art. Every pixel is calculated to harmonize with the next, creating a sense of translucent depth that feels tangible yet otherworldly.',
    price: 9420.50,
    ethPrice: 3.45,
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    artistId: "artist-2",
    artistName: "AetherDesign_",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    tag: "Abstract",
    category: "Abstract",
    style: "Organic",
    status: "Published",
    likes: 128,
    views: 4520,
    resolution: "8192 x 10240 px (8K+)",
    format: "Lossless PNG + Source PSD",
    license: "Extended Commercial",
    size: "142.4 MB",
    contractAddress: "0x71C3b47A5A0b457813a29F1A44E8908B1F8Ca29f",
    tokenStandard: "ERC-721",
    blockchain: "Ethereum Mainnet"
  },
  {
    id: "neon-serenity",
    title: "Neon Serenity",
    description: "A cyberpunk inspired digital painting capturing the quiet moments in a bustling neon city.",
    price: 120.00,
    ethPrice: 0.05,
    imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=800&auto=format&fit=crop",
    artistId: "68c2e21d-1618-4b16-845a-bf6ee1cc3c80",
    artistName: "Alex Rivers",
    createdAt: new Date(),
    tag: "Cyberpunk",
    category: "Artwork",
    style: "Cyberpunk",
    status: "Published",
    likes: 245,
    views: 1250,
    resolution: "4096 x 4096 px",
    format: "PNG",
    license: "Personal Use",
    size: "24.5 MB"
  },
  {
    id: "glass-peaks",
    title: "Glass Peaks",
    description: "A 3D glass render of mountain peaks reflecting low sunset light, with pristine material refraction.",
    price: 450.00,
    ethPrice: 0.165,
    imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop",
    artistId: "68c2e21d-1618-4b16-845a-bf6ee1cc3c80",
    artistName: "Alex Rivers",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    tag: "Abstract",
    category: "Abstract",
    style: "Organic",
    status: "Under Review",
    likes: 12,
    views: 89,
    resolution: "6000 x 4000 px",
    format: "TIF",
    license: "Commercial Use",
    size: "88.2 MB"
  },
  {
    id: "digital-oasis",
    title: "Digital Oasis",
    description: "Lush digital plants rendering inside a metallic structures in a utopian landscape.",
    price: 85.00,
    ethPrice: 0.031,
    imageUrl: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?q=80&w=800&auto=format&fit=crop",
    artistId: "68c2e21d-1618-4b16-845a-bf6ee1cc3c80",
    artistName: "Alex Rivers",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    tag: "Nature",
    category: "Photography",
    style: "Organic",
    status: "Published",
    likes: 98,
    views: 610
  },
  {
    id: "floating-dreams",
    title: "Floating Dreams",
    description: "Surreal spheres floating above a desert reflecting the pastel sky colors.",
    price: 230.00,
    ethPrice: 0.084,
    imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop",
    artistId: "68c2e21d-1618-4b16-845a-bf6ee1cc3c80",
    artistName: "Alex Rivers",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    tag: "Surrealism",
    category: "Abstract",
    style: "Surrealism",
    status: "Draft",
    likes: 0,
    views: 4
  },
  {
    id: "chrome-echoes",
    title: "Chrome Echoes",
    description: "Liquid chrome shapes suspended in mid-air reflecting a high contrast studio scene.",
    price: 1200.00,
    ethPrice: 0.44,
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop",
    artistId: "68c2e21d-1618-4b16-845a-bf6ee1cc3c80",
    artistName: "Alex Rivers",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    tag: "3D Art",
    category: "3D Render",
    style: "Retro-Futurism",
    status: "Published",
    likes: 310,
    views: 1840
  },
  {
    id: "liquid-dreams-01",
    title: "Liquid Dreams 01",
    description: "Fluids blending smoothly into a complex pattern.",
    price: 4100.00,
    ethPrice: 1.50,
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
    artistId: "68c2e21d-1618-4b16-845a-bf6ee1cc3c80",
    artistName: "Alex Rivers",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    tag: "Abstract",
    category: "Abstract",
    style: "Organic",
    status: "Published"
  },
  {
    id: "cyber-citadel",
    title: "Cyber Citadel",
    description: "A dark cyberpunk skyline dominated by tall structures.",
    price: 11400.00,
    ethPrice: 4.20,
    imageUrl: "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?q=80&w=800&auto=format&fit=crop",
    artistId: "68c2e21d-1618-4b16-845a-bf6ee1cc3c80",
    artistName: "Alex Rivers",
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    tag: "Futuristic",
    category: "3D Render",
    style: "Cyberpunk",
    status: "Published"
  },
  {
    id: "golden-hour-fractal",
    title: "Golden Hour Fractal",
    description: "Glass structures catching light at golden hour.",
    price: 2320.00,
    ethPrice: 0.85,
    imageUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=800&auto=format&fit=crop",
    artistId: "68c2e21d-1618-4b16-845a-bf6ee1cc3c80",
    artistName: "Alex Rivers",
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    tag: "Generative",
    category: "3D Render",
    style: "Organic",
    status: "Published"
  },
  {
    id: "organic-flow-4",
    title: "Organic Flow #4",
    description: "Clay-like render showing fluid movements.",
    price: 5720.00,
    ethPrice: 2.10,
    imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop",
    artistId: "68c2e21d-1618-4b16-845a-bf6ee1cc3c80",
    artistName: "Alex Rivers",
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    tag: "3D Art",
    category: "3D Render",
    style: "Organic",
    status: "Published"
  },
  {
    id: "neon-pulse",
    title: "Neon Pulse",
    description: "Abstract neon lines waving in complete darkness.",
    price: 2590.00,
    ethPrice: 0.95,
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
    artistId: "68c2e21d-1618-4b16-845a-bf6ee1cc3c80",
    artistName: "Alex Rivers",
    createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
    tag: "Animation",
    category: "3D Render",
    style: "Cyberpunk",
    status: "Published"
  },
  {
    id: "marble-waves",
    title: "Marble Waves",
    description: "Waves of digital marble flowing into a swirling pattern.",
    price: 8180.00,
    ethPrice: 3.00,
    imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop",
    artistId: "68c2e21d-1618-4b16-845a-bf6ee1cc3c80",
    artistName: "Alex Rivers",
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    tag: "Luxury",
    category: "Abstract",
    style: "Organic",
    status: "Published"
  },
  {
    id: "deep-space-one",
    title: "Deep Space One",
    description: "An astronomical digital artwork representing nebulas and distant starclusters.",
    price: 15000.00,
    ethPrice: 5.50,
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    artistId: "68c2e21d-1618-4b16-845a-bf6ee1cc3c80",
    artistName: "Alex Rivers",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    tag: "Sci-Fi",
    category: "Artwork",
    style: "Retro-Futurism",
    status: "Published"
  },
  {
    id: "prism-glow",
    title: "Prism Glow",
    description: "Glass shards diffracting white light into a rainbow glow.",
    price: 3400.00,
    ethPrice: 1.25,
    imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=800&auto=format&fit=crop",
    artistId: "68c2e21d-1618-4b16-845a-bf6ee1cc3c80",
    artistName: "Alex Rivers",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    tag: "Minimalist",
    category: "Abstract",
    style: "Organic",
    status: "Published"
  }
];

/**
 * Detects if code is running on the server (Node.js) vs client (browser).
 */
function isServer(): boolean {
  return typeof window === "undefined";
}

/**
 * Maps a raw API/Prisma artwork record to our rich Artwork interface.
 */
function mapApiArtwork(raw: Record<string, unknown>): Artwork {
  const artist = raw.artist as Record<string, unknown> | undefined;
  const id = raw.id as string;
  const mockMatch = MOCK_ARTWORKS.find(m => m.id === id) || {};

  return {
    ...mockMatch,
    id,
    title: raw.title as string,
    description: raw.description as string,
    price: raw.price as number,
    imageUrl: raw.imageUrl as string,
    artistId: raw.artistId as string,
    artistName: artist?.name as string || "Unknown Artist",
    createdAt: new Date(raw.createdAt as string),
    status: "Published",
  };
}

/**
 * Server-side: queries Prisma directly. Returns empty array on failure.
 */
async function fetchArtworksFromDB(): Promise<Artwork[]> {
  try {
    // Dynamic import to avoid bundling Prisma in client code
    const { prisma } = await import("@/lib/prisma");
    const artworks = await prisma.artwork.findMany({
      include: { artist: true },
      orderBy: { createdAt: "desc" },
    });
    return artworks.map((a: DBArtworkWithArtist) => {
      const mockMatch = MOCK_ARTWORKS.find(m => m.id === a.id) || {};
      return {
        ...mockMatch,
        id: a.id,
        title: a.title,
        description: a.description,
        price: a.price,
        imageUrl: a.imageUrl,
        artistId: a.artistId,
        artistName: a.artist.name,
        createdAt: a.createdAt,
        status: "Published" as const,
      };
    });
  } catch (error) {
    console.warn("[DatabaseService] Prisma query failed, using mock data:", error);
    return [];
  }
}

class DatabaseService {
  /**
   * Fetches artworks — uses Prisma on server, fetch on client.
   * Merges with mock data so the UI always has rich content.
   */
  async getArtworks(): Promise<Artwork[]> {
    let apiArtworks: Artwork[] = [];

    if (isServer()) {
      // Server Component context — use Prisma directly
      apiArtworks = await fetchArtworksFromDB();
    } else {
      // Client Component context — use fetch API
      try {
        const res = await fetch("/api/artworks", { cache: "no-store" });
        if (res.ok) {
          const apiData = await res.json();
          apiArtworks = (apiData as Record<string, unknown>[]).map(mapApiArtwork);
        }
      } catch {
        // API unavailable
      }
    }

    // Merge: API results first, then mock data that doesn't duplicate API IDs
    const apiIds = new Set(apiArtworks.map(a => a.id));
    const uniqueMocks = MOCK_ARTWORKS.filter(m => !apiIds.has(m.id));
    return [...apiArtworks, ...uniqueMocks];
  }

  async getArtworkById(id: string): Promise<Artwork | null> {
    // First check mock data (has rich metadata like ethPrice, tags, etc.)
    const mockArtwork = MOCK_ARTWORKS.find(a => a.id === id);
    if (mockArtwork) return mockArtwork;

    // Try DB/API for user-uploaded artworks
    if (isServer()) {
      const dbArtworks = await fetchArtworksFromDB();
      return dbArtworks.find(a => a.id === id) || null;
    } else {
      try {
        const res = await fetch("/api/artworks", { cache: "no-store" });
        if (res.ok) {
          const apiData = await res.json();
          const found = (apiData as Record<string, unknown>[]).find(
            (a: Record<string, unknown>) => a.id === id
          );
          if (found) return mapApiArtwork(found);
        }
      } catch {
        // API unavailable
      }
    }
    return null;
  }

  async getArtworksByArtist(artistId: string): Promise<Artwork[]> {
    const allArtworks = await this.getArtworks();
    return allArtworks.filter(a => a.artistId === artistId);
  }

  async createArtwork(data: Omit<Artwork, "id" | "createdAt">): Promise<Artwork> {
    try {
      const res = await fetch("/api/artworks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          price: data.price,
          imageUrl: data.imageUrl,
          artistId: data.artistId,
          artistName: data.artistName,
        }),
      });

      if (res.ok) {
        const created = await res.json();
        return {
          ...data,
          id: created.id,
          createdAt: new Date(created.createdAt),
        };
      } else {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Database error (Status ${res.status})`);
      }
    } catch (err: any) {
      console.error("[DatabaseService] createArtwork failed:", err);
      throw err;
    }
  }
}

export const db = new DatabaseService();
