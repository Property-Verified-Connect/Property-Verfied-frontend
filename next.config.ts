import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // ❌ Warning: This disables ESLint completely during builds
    ignoreDuringBuilds: true,
  },
    typescript: {
    ignoreBuildErrors: true,
  },
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.gstatic.com',
      },
    ],
  },
};

export default nextConfig;
