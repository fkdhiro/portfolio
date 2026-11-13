// Generates the responsive portrait files used by src/lib/imageLoader.ts.
// Run after replacing assets/portrait-source.png:  npm run images
import sharp from "sharp";

const SOURCE = "assets/portrait-source.png";
const WIDTHS = [384, 640, 828, 1080];

for (const w of WIDTHS) {
  const info = await sharp(SOURCE).resize(w, w, { fit: "cover" }).webp({ quality: 80, effort: 6 }).toFile(`public/images/portrait-${w}.webp`);
  console.log(`portrait-${w}.webp  ${(info.size / 1024).toFixed(1)} KB`);
}
// Plain fallback (used if a loader is ever bypassed).
await sharp(SOURCE).resize(1080, 1080).webp({ quality: 80, effort: 6 }).toFile("public/images/portrait.webp");
