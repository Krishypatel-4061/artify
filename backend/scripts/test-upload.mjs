// test-upload.mjs
const BASE_URL = 'http://localhost:3000';

async function runUploadTest() {
  console.log("Starting Upload Flow Test...");
  try {
    // 1. Create a dummy image blob (a tiny transparent PNG)
    const tinyPngHex = "89504e470d0a1a0a0000000d494844520000000100000001010300000025db56ca00000003504c5445000000a77a3dda0000000174524e530040e6d8660000000a4944415408d76360000000020001e221bc330000000049454e44ae426082";
    const buffer = Buffer.from(tinyPngHex, 'hex');
    const blob = new Blob([buffer], { type: 'image/png' });
    
    // Polyfill File for Node.js
    const file = new File([blob], "test-artwork.png", { type: "image/png" });

    const formData = new FormData();
    formData.append("file", file);

    console.log("1. Uploading image to Azure Blob Storage via /api/upload...");
    const uploadRes = await fetch(`${BASE_URL}/api/upload`, {
      method: "POST",
      body: formData
    });

    if (!uploadRes.ok) {
      const errorText = await uploadRes.text();
      throw new Error(`Upload failed with status ${uploadRes.status}: ${errorText}`);
    }

    const uploadData = await uploadRes.json();
    console.log("Upload Success! Image URL:", uploadData.url);

    // 2. Create Artwork Record
    console.log("\n2. Creating Artwork Record in Azure SQL Database via /api/artworks...");
    const artworkData = {
      title: "Automated Test Artwork",
      description: "This is a test artwork to verify end-to-end flow.",
      price: 25.50,
      imageUrl: uploadData.url,
      artistId: "artist-test-id-1234"
    };

    const artworkRes = await fetch(`${BASE_URL}/api/artworks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(artworkData)
    });

    if (!artworkRes.ok) {
      const errorText = await artworkRes.text();
      throw new Error(`Artwork creation failed with status ${artworkRes.status}: ${errorText}`);
    }

    const artworkResponseData = await artworkRes.json();
    console.log("Artwork Creation Success! Record:", artworkResponseData);
    
    console.log("\n=== End-to-End Test Completed Successfully! ===");

  } catch (error) {
    console.error("\n[TEST FAILED]", error.message);
  }
}

runUploadTest();
