import { NextResponse } from "next/server";
import { BlobServiceClient } from "@azure/storage-blob";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME || "artworks";

    if (!connectionString) {
      throw new Error("Azure Storage Connection String is not configured");
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    console.log(`[Azure Storage] Connecting to account: ${blobServiceClient.accountName}`);

    const containerClient = blobServiceClient.getContainerClient(containerName);
    
    // Ensure container exists
    console.log(`[Azure Storage] Ensuring container '${containerName}' exists...`);
    await containerClient.createIfNotExists();
    console.log(`[Azure Storage] Container verified.`);

    // Generate unique blob name
    const blobName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Convert file to array buffer and upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    console.log(`[Azure Storage] Uploading block blob: ${blobName} (${buffer.length} bytes)...`);
    await blockBlobClient.uploadData(buffer, {
      blobHTTPHeaders: { blobContentType: file.type }
    });
    console.log(`[Azure Storage] Upload successful. URL: ${blockBlobClient.url}`);

    return NextResponse.json({ url: blockBlobClient.url }, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
