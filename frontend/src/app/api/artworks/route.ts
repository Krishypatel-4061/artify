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
    console.warn("Fetch artworks error (likely DB offline):", error);
    return NextResponse.json([]);
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
  } catch (error: any) {
    console.error("Create artwork error:", error);
    const message = error.message || "";
    if (message.includes("40615") || message.includes("firewall") || message.includes("login")) {
      return NextResponse.json({ error: "Azure SQL firewall blocked client IP. Please whitelist this IP on Azure SQL server." }, { status: 500 });
    }
    return NextResponse.json({ error: "Failed to create artwork", details: error.message, stack: error.stack }, { status: 500 });
  }
}
