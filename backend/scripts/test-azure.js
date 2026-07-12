const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config();

async function testAzure() {
  try {
    const connStr = process.env.AZURE_STORAGE_CONNECTION_STRING;
    console.log("Connection string:", connStr.substring(0, 50) + "...");
    const client = BlobServiceClient.fromConnectionString(connStr);
    const container = client.getContainerClient("artworks");
    await container.createIfNotExists({ access: "blob" });
    console.log("Container check passed!");
  } catch (err) {
    console.error("Azure error:", err);
  }
}
testAzure();
