#!/usr/bin/env node
/**
 * Local static host of dist/ that applies the `routes` of vercel.json through scripts/lib/vercel-routes.mjs (redirects, the response headers,
 * the per-language 404 pages with a real 404 status) — what `vite preview` cannot do (it rewrites every path to /index.html).
 *   node scripts/serve-dist.mjs --port 4174      (Ctrl-C to stop; the probes of the round point at http://localhost:4174)
 * WEB-VIS-1 (7 Nov 2026): text responses are brotli / gzip compressed when the client accepts it — Lighthouse on this host then sees the transfer sizes Vercel serves
 * (uncompressed, the 322 KB app chunk and the 71 KB stylesheet inflated the simulated LCP by seconds).
 */
import { createServer } from 'node:http';
import { brotliCompressSync, gzipSync, constants } from 'node:zlib';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { loadRoutes, resolve } from './lib/vercel-routes.mjs';

const a = process.argv.slice(2); const opt = (n, d) => (a.includes(`--${n}`) ? a[a.indexOf(`--${n}`) + 1] : d);
const PORT = Number(opt('port', '4174'));
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DIST = path.join(ROOT, 'dist');
const routes = loadRoutes(path.join(ROOT, 'vercel.json'));
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8', '.pdf': 'application/pdf' };
createServer((req, res) => {
  const u = new URL(req.url, `http://localhost:${PORT}`);
  const r = resolve(routes, DIST, u.pathname, u.search);
  const headers = { ...r.headers };
  if (r.location) { res.writeHead(r.status, { ...headers, Location: r.location }); res.end(); return; }
  if (!r.file) { res.writeHead(r.status, { ...headers, 'content-type': 'text/plain; charset=utf-8' }); res.end(`${r.status}`); return; }
  let body = readFileSync(r.file); const type = TYPES[path.extname(r.file)] || 'application/octet-stream'; const enc = {};
  const ae = req.headers['accept-encoding'] || '';
  if (/^(text\/|application\/(json|javascript|manifest|xml))/.test(type) && body.length > 1024) {
    if (/\bbr\b/.test(ae)) { body = brotliCompressSync(body, { params: { [constants.BROTLI_PARAM_QUALITY]: 6 } }); enc['content-encoding'] = 'br'; }
    else if (/\bgzip\b/.test(ae)) { body = gzipSync(body, { level: 6 }); enc['content-encoding'] = 'gzip'; }
  }
  res.writeHead(r.status, { ...headers, ...enc, vary: 'Accept-Encoding', 'content-type': type, 'content-length': body.length });
  res.end(req.method === 'HEAD' ? undefined : body);
}).listen(PORT, '127.0.0.1', () => console.log(`serve-dist: http://localhost:${PORT} ← ${DIST} (vercel.json routes applied)`));
