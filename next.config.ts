import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site → plain HTML/CSS/JS in `out/` (Netlify, any static host).
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
