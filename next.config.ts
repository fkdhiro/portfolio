import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  // Fully static site → plain HTML/CSS/JS in `out/` (Netlify, any static host).
  output: "export",
  // /en/ → en/index.html (GitHub Pages serve /en/ só como pasta).
  trailingSlash: true,
  images: {
    // No image server in a static export: pre-generated widths (npm run images).
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
    deviceSizes: [640, 828, 1080],
    imageSizes: [384],
  },
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
