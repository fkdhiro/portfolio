/**
 * next/image loader for the static export (no image server).
 * Local `.webp` images are pre-generated at fixed widths by
 * `npm run images` (scripts/generate-images.mjs); this picks the smallest
 * generated width that covers the requested one.
 */
const WIDTHS = [384, 640, 828, 1080];

import { withBase } from "./basePath";

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (!src.startsWith("/images/") || !src.endsWith(".webp")) return withBase(src);
  const w = WIDTHS.find((candidate) => candidate >= width) ?? WIDTHS[WIDTHS.length - 1];
  return withBase(src.replace(/\.webp$/, `-${w}.webp`));
}
