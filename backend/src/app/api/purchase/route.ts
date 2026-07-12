import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { artworkId, buyerId, amount } = body;

    // Create the purchase record
    const purchase = await prisma.purchase.create({
      data: {
        artworkId,
        buyerId,
        amount,
        status: "pending",
      }
    });

    // Trigger Azure Function for processing
    const functionUrl = process.env.AZURE_FUNCTION_PURCHASE_URL;
    if (functionUrl) {
      console.log(`[Azure Functions] Triggering PurchaseProcessor at ${functionUrl} for purchase: ${purchase.id}`);
      fetch(functionUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ purchaseId: purchase.id, amount })
      })
      .then(res => {
        if (!res.ok) console.warn(`[Azure Functions] Trigger returned non-OK status: ${res.status}`);
        else console.log(`[Azure Functions] Successfully triggered PurchaseProcessor.`);
      })
      .catch(err => console.error("[Azure Functions] Trigger failed:", err));
    } else {
      console.warn("[Azure Functions] AZURE_FUNCTION_PURCHASE_URL is not configured. Skipping trigger.");
    }

    return NextResponse.json(purchase, { status: 201 });
  } catch (error) {
    console.error("Purchase error:", error);
    return NextResponse.json({ error: "Failed to process purchase" }, { status: 500 });
  }
}
