import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // Allows verification builds to run beside a live dev server
  // (e.g. NEXT_BUILD_DIR=.next-build npm run build) without
  // clobbering the dev server's .next cache.
  distDir: process.env.NEXT_BUILD_DIR ?? ".next",
};

export default nextConfig;
