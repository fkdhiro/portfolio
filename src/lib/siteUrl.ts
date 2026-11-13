/**
 * Public base URL of the site, resolved at build time (static export).
 * NEXT_PUBLIC_SITE_URL wins (fixed domain); Netlify's URL is the fallback;
 * localhost only for local builds.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.URL ??
  "http://localhost:3000"
).replace(/\/+$/, "");
