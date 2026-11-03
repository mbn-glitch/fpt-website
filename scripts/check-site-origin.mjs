#!/usr/bin/env node
/**
 * Origin gate (FPT-WEBSITE-DOMAIN, 4 Nov 2026): the site's absolute URLs carry ONE host — SITE_ORIGIN of src/config/site.js (`https://fptraders.app`) —
 * and links into the client app carry APP_ORIGIN (`https://app.fptraders.app`). Refuses: the retired hosts (`fptraders.com`, `crm.fptraders.com`)
 * anywhere in src/, public/sitemap.xml, public/robots.txt, public/site.webmanifest, public/sw.js, public/offline.html or index.html; a sitemap
 * <loc> / hreflang or a robots Sitemap line on any other host; a sitemap that does not list 90 URLs; a legal-document link not on APP_ORIGIN.
 *   node scripts/check-site-origin.mjs → PASS / FAIL (exit 1)
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const cfg = readFileSync(path.join(ROOT, 'src/config/site.js'), 'utf8');
const SITE = cfg.match(/SITE_ORIGIN = '([^']+)'/)[1];
const APP = cfg.match(/APP_ORIGIN = '([^']+)'/)[1];
const RETIRED = /(^|[^\w.-])(crm\.fptraders\.com|www\.fptraders\.com|fptraders\.com)(?![\w-])/;
const failures = [];
const walk = (d, out = []) => { for (const e of readdirSync(d)) { const p = path.join(d, e); if (statSync(p).isDirectory()) walk(p, out); else if (/\.(jsx?|mjs|json|css)$/.test(e)) out.push(p); } return out; };
const files = [...walk(path.join(ROOT, 'src')), ...['public/sitemap.xml', 'public/robots.txt', 'public/site.webmanifest', 'public/sw.js', 'public/offline.html', 'index.html'].map((f) => path.join(ROOT, f))];
for (const f of files) {
  const rel = path.relative(ROOT, f);
  readFileSync(f, 'utf8').split('\n').forEach((ln, i) => {
    if (RETIRED.test(ln) && !/^\s*(\/\/|\*|<!--)/.test(ln)) failures.push(`${rel}:${i + 1}: retired host — ${ln.trim().slice(0, 90)}`);
  });
}
const sitemap = readFileSync(path.join(ROOT, 'public/sitemap.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (locs.length !== 90) failures.push(`public/sitemap.xml: ${locs.length} <loc> entries (expected 90 = 15 routes × 6 languages)`);
for (const u of [...locs, ...[...sitemap.matchAll(/href="([^"]+)"/g)].map((m) => m[1])]) if (!u.startsWith(`${SITE}/`) && u !== SITE) failures.push(`public/sitemap.xml: URL off SITE_ORIGIN — ${u}`);
const robots = readFileSync(path.join(ROOT, 'public/robots.txt'), 'utf8');
if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) failures.push(`public/robots.txt: Sitemap line is not ${SITE}/sitemap.xml`);
const legal = readFileSync(path.join(ROOT, 'src/data/legal.js'), 'utf8');
if (!/const LEGAL_BASE = APP_ORIGIN;/.test(legal)) failures.push('src/data/legal.js: the legal documents must be linked on APP_ORIGIN (LEGAL_BASE = APP_ORIGIN)');
const seo = readFileSync(path.join(ROOT, 'src/components/SEO.jsx'), 'utf8');
if (!/export const BASE = SITE_ORIGIN;/.test(seo)) failures.push('src/components/SEO.jsx: BASE must be SITE_ORIGIN');
if (failures.length) { console.error(`check-site-origin: FAIL (${failures.length})`); for (const f of failures.slice(0, 60)) console.error(`  ${f}`); process.exit(1); }
console.log(`check-site-origin: PASS (SITE_ORIGIN ${SITE} on sitemap ×${locs.length} / robots / head; APP_ORIGIN ${APP} for the app links; no retired host in ${files.length} files)`);
