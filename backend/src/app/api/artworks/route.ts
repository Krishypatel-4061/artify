import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const artworks = await prisma.artwork.findMany({
      include: {
        artist: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(artworks);
  } catch (error) {
    console.error("Fetch artworks error:", error);
    return NextResponse.json({ error: "Failed to fetch artworks" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, price, imageUrl, artistId } = body;

    const artwork = await prisma.artwork.create({
      data: {
        title,
        description,
        price,
        imageUrl,
        artistId,
      }
    });
    return NextResponse.json(artwork, { status: 201 });
  } catch (error) {
    console.error("Create artwork error:", error);
    return NextResponse.json({ error: "Failed to create artwork" }, { status: 500 });
  }
}
