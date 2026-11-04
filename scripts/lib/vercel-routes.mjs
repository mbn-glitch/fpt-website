/**
 * A small, faithful simulator of the `routes` of vercel.json (the low-level routing of the Build Output API, which the high-level
 * `redirects` / `headers` / `trailingSlash` of earlier rounds compiled to — `vercel build` → .vercel/output/config.json, 4 Nov 2026):
 *   main phase   — every route before a `handle` entry, in order: `src` (a regex on the pathname, anchored by the author) → a redirect
 *                  (`status` 3xx + `headers.Location` with `$1…` substitutions; the proxy forwards the query string), or response headers with
 *                  `continue: true` (collected, matching goes on), or `dest` (a rewrite);
 *   filesystem   — the static output: `<path>` as a file, or `<path>/index.html` (cleanUrls is off: `/ar/404` is NOT `/ar/404.html`);
 *   error phase  — the routes after `{ "handle": "error" }`: `dest` + `status` → the file served with that status (the site's 404 pages).
 * Used by scripts/check-routes.mjs (offline proof of owner decisions 51 / 53 on dist/) and scripts/serve-dist.mjs (the local static host of the probes).
 */
import { readFileSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';

export function loadRoutes(file) {
  const cfg = JSON.parse(readFileSync(file, 'utf8'));
  if (!Array.isArray(cfg.routes)) throw new Error(`${file}: no "routes" — the site uses the low-level routes (decision 51 / 53)`);
  for (const k of ['redirects', 'rewrites', 'headers', 'trailingSlash', 'cleanUrls']) if (k in cfg) throw new Error(`${file}: "${k}" cannot be combined with "routes"`);
  const main = [], error = []; let phase = main;
  for (const r of cfg.routes) {
    if (r.handle) { if (r.handle === 'error') phase = error; else throw new Error(`unsupported handle «${r.handle}»`); continue; }
    phase.push({ ...r, re: new RegExp(r.src) });
  }
  return { main, error };
}

const sub = (tpl, m) => tpl.replace(/\$(\d+)/g, (_, i) => m[+i] ?? '');

/** The static file dist/ would serve for a pathname, or null. */
export function fileFor(dist, pathname) {
  const p = decodeURIComponent(pathname);
  if (p.includes('..')) return null;
  const direct = path.join(dist, p);
  if (existsSync(direct) && statSync(direct).isFile()) return direct;
  const index = path.join(direct, 'index.html');
  if (existsSync(index) && statSync(index).isFile()) return index;
  return null;
}

/**
 * Resolve one request. Returns { status, location?, file?, headers } — `location` carries the query string the way the proxy forwards it
 * (appended when the Location has none).
 */
export function resolve(routes, dist, pathname, search = '') {
  const headers = {};
  let p = pathname;
  for (const r of routes.main) {
    const m = r.re.exec(p); if (!m) continue;
    if (r.continue) { Object.assign(headers, r.headers || {}); continue; }
    if (r.headers?.Location && r.status) { const loc = sub(r.headers.Location, m); return { status: r.status, location: loc.includes('?') || !search ? loc : `${loc}${search}`, headers }; }
    if (r.dest) { p = sub(r.dest, m); if (r.status) return { status: r.status, file: fileFor(dist, p), headers }; break; }
    if (r.status) return { status: r.status, headers };
  }
  const f = fileFor(dist, p);
  if (f) return { status: 200, file: f, headers };
  for (const r of routes.error) {
    const m = r.re.exec(p); if (!m) continue;
    const dest = r.dest ? sub(r.dest, m) : null;
    return { status: r.status ?? 404, file: dest ? fileFor(dist, dest) : null, headers };
  }
  return { status: 404, file: null, headers };
}
