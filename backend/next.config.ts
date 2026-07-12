import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "mock-storage.com",
      },
      {
        protocol: "https",
        hostname: "artifycloud123.blob.core.windows.net",
      },
    ],
  },
};

export default nextConfig;