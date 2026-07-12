import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { artworkId, userId, content } = body;

    const comment = await prisma.comment.create({
      data: {
        artworkId,
        userId,
        content,
      }
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error: any) {
    console.error("Comment error:", error);
    const message = error.message || "";
    if (message.includes("40615") || message.includes("firewall") || message.includes("login")) {
      return NextResponse.json({ error: "Azure SQL firewall blocked client IP. Please whitelist this IP on Azure SQL server." }, { status: 500 });
    }
    return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
  }
}
