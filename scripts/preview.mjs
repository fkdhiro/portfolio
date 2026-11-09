// Local preview of the static export (`out/`), close to Netlify: gzip, long cache
// for hashed assets, 404.html. Usage: npm run build && npm start  →  http://localhost:4000
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
const root = path.resolve(process.argv[2] || "out");
const port = +process.argv[3] || 4000;
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2", ".webp": "image/webp", ".ico": "image/x-icon", ".txt": "text/plain", ".svg": "image/svg+xml" };
http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (p.endsWith("/")) p += "index.html";
  let file = path.join(root, p);
  if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
  if (!fs.existsSync(file) && fs.existsSync(file + ".html")) file += ".html";
  let status = 200;
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { file = path.join(root, "404.html"); status = 404; }
  const ext = path.extname(file);
  const headers = { "Content-Type": types[ext] || "application/octet-stream" };
  if (p.startsWith("/_next/static/")) headers["Cache-Control"] = "public, max-age=31536000, immutable";
  let body = fs.readFileSync(file);
  if (/gzip/.test(req.headers["accept-encoding"] || "") && /\.(html|js|css|txt|svg)$/.test(ext)) { body = zlib.gzipSync(body); headers["Content-Encoding"] = "gzip"; }
  res.writeHead(status, headers); res.end(body);
}).listen(port, () => console.log("static on", port));
