const http = require('http');

// Configuration
const BASE_URL = 'http://localhost:3000'; // Make sure your Next.js app is running on port 3000

async function pingEndpoint(name, path, method = 'GET', body = null) {
    console.log(`\n=============================================`);
    console.log(`Testing: ${name}`);
    console.log(`Endpoint: ${method} ${BASE_URL}${path}`);
    
    try {
        const options = {
            method,
            headers: {}
        };

        if (body) {
            if (body instanceof FormData) {
                options.body = body;
            } else {
                options.headers['Content-Type'] = 'application/json';
                options.body = JSON.stringify(body);
            }
        }

        const response = await fetch(`${BASE_URL}${path}`, options);
        let data;
        try {
            data = await response.json();
        } catch(e) {
            data = await response.text();
        }

        console.log(`Status: ${response.status} ${response.statusText}`);
        console.log(`Response:`, typeof data === 'object' ? JSON.stringify(data, null, 2) : data);
        
        if (!response.ok) {
            console.warn(`[WARNING] The endpoint returned a non-2xx status. If this is a 500 Error regarding Prisma or Azure Storage, verify your .env file has valid Azure connection strings.`);
        }
    } catch (err) {
        console.error(`[ERROR] Failed to reach the Next.js server at ${BASE_URL}. Ensure you have run 'npm run dev'.`);
        console.error(err.message);
    }
}

async function runTests() {
    console.log("Starting API Tests for Artify Cloud Backend Integration...");
    console.log("Make sure your Next.js development server is running (npm run dev)!\n");

    // 1. Artwork Retrieval
    await pingEndpoint("Artwork Retrieval", "/api/artworks", "GET");

    // 2. Artwork Creation
    await pingEndpoint("Artwork Creation", "/api/artworks", "POST", {
        title: "Test Art",
        description: "Testing API",
        price: 99.99,
        imageUrl: "https://example.com/test.png",
        artistId: "artist-test-id"
    });

    // 3. Purchase API
    await pingEndpoint("Purchase Processing", "/api/purchase", "POST", {
        artworkId: "mock-artwork-id",
        buyerId: "mock-buyer-id",
        amount: 99.99
    });

    // 4. Comments API
    await pingEndpoint("Artwork Comment", "/api/comments", "POST", {
        artworkId: "mock-artwork-id",
        userId: "mock-buyer-id",
        content: "This is a test comment from the API test script."
    });

    console.log(`\n=============================================`);
    console.log("Tests completed.");
}

runTests();
