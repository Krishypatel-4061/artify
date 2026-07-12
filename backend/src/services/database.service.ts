import { prisma } from "@/lib/prisma";

export interface Artwork {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  artistId: string;
  artistName: string; // we will map from relation
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "artist" | "buyer";
  avatarUrl?: string | null;
}

class DatabaseService {
  async getArtworks(): Promise<Artwork[]> {
    const artworks = await prisma.artwork.findMany({
      include: { artist: true },
      orderBy: { createdAt: "desc" }
    });
    return artworks.map(a => ({
      ...a,
      artistName: a.artist.name,
    }));
  }

  async getArtworkById(id: string): Promise<Artwork | null> {
    const artwork = await prisma.artwork.findUnique({
      where: { id },
      include: { artist: true }
    });
    if (!artwork) return null;
    return {
      ...artwork,
      artistName: artwork.artist.name,
    };
  }

  async getArtworksByArtist(artistId: string): Promise<Artwork[]> {
    const artworks = await prisma.artwork.findMany({
      where: { artistId },
      include: { artist: true },
      orderBy: { createdAt: "desc" }
    });
    return artworks.map(a => ({
      ...a,
      artistName: a.artist.name,
    }));
  }

  async createArtwork(data: Omit<Artwork, "id" | "createdAt" | "artistName">): Promise<Artwork> {
    const artwork = await prisma.artwork.create({
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        imageUrl: data.imageUrl,
        artistId: data.artistId,
      },
      include: { artist: true }
    });
    return {
      ...artwork,
      artistName: artwork.artist.name,
    };
  }
}

export const db = new DatabaseService();
