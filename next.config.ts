import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // ❌ Warning: This disables ESLint completely during builds
    ignoreDuringBuilds: true,
  },  images: {
    domains: ["images.unsplash.com"],
  },
    typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
