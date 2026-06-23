import type { NextConfig } from "next";
import path from "node:path";

const config: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
  // Pin workspace root to this folder so Next stops complaining about parent lockfiles.
  outputFileTracingRoot: path.resolve("."),
  experimental: {
    optimizePackageImports: ["@headlessui/react", "framer-motion"],
  },
};

export default config;
