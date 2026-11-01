#!/usr/bin/env node
/**
 * Build-time pre-rendering (UX-AUDIT-7 R2 / owner decision 12): every route × the six languages becomes a static HTML file under dist/
 * (dist/<path>/index.html) with the page's head tags rendered once, the <html lang dir> of the page and the complete app markup ready for
 * hydration (src/main.jsx). Font preloads (R3 — the unicode-range pieces of public/fonts/SUBSETS.json): Arabic pages preload the Arabic
 * text face 400 and the headline face 600 (the h1 is the LCP element; the fallback may not exist on the device); every other language preloads
 * the Latin display face Barlow Condensed 800 (the h1) and Inter 400 (the text). 404.html is the English NotFound shell rendered fresh on the client.
 *   npm run build  →  vite build (client) → vite build --ssr src/entry-server.jsx (dist-ssr/) → this script → dist-ssr/ removed.
 * No browser is involved: react-dom/server + react-router StaticRouter; head tags are React 19 hoistables lifted into <head>.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DIST = path.join(ROOT, 'dist');
const SSR = path.join(ROOT, 'dist-ssr');
const template = readFileSync(path.join(DIST, 'index.html'), 'utf8');
const { render } = await import(path.join(SSR, 'entry-server.js'));

const LANGS = ['en', 'ar', 'fr', 'es', 'pt', 'tr'];
const HELP = ['getting-started', 'challenges-rules', 'funded-accounts', 'payouts-fiper-card', 'trading-conditions', 'account-management', 'technical-platform', 'legal-general', 'partner-program'];
const ROUTES = ['/', '/challenges', '/about', '/contact', '/help', '/partners', ...HELP.map((s) => `/help/${s}`)];
const localized = (r, l) => (l === 'en' ? r : r === '/' ? `/${l}` : `/${l}${r}`);


const write = (file, content) => { mkdirSync(path.dirname(file), { recursive: true }); writeFileSync(file, content); };
const SUBSETS = JSON.parse(readFileSync(path.join(ROOT, 'public', 'fonts', 'SUBSETS.json'), 'utf8')).files;
const fontUrl = (file, weight, piece) => { const f = SUBSETS.find((x) => x.file.startsWith(`${file}-${weight}.${piece}.`)); if (!f) throw new Error(`prerender: subset ${file}-${weight}.${piece} missing — run node scripts/build-font-subsets.mjs`); return f.url; };
const PRELOAD = { ar: [fontUrl('IBMPlexSansArabic', 400, 'arabic'), fontUrl('IBMPlexSansArabic', 600, 'arabic')], latin: [fontUrl('BarlowCondensed', 800, 'latin'), fontUrl('Inter', 400, 'latin')] };
const preload = (lang) => (lang === 'ar' ? PRELOAD.ar : PRELOAD.latin).map((u) => `    <link rel="preload" as="font" type="font/woff2" href="${u}" crossorigin data-font-preload="${lang === 'ar' ? 'ar' : 'latin'}" />\n`).join('');
const inject = (tpl, { html, head, lang, dir }, mode) => tpl
  .replace(/<html lang="en" dir="ltr">/, `<html lang="${lang}" dir="${dir}">`)
  .replace('<meta name="author" content="Fiper Pro Traders" />', `<meta name="author" content="Fiper Pro Traders" />\n${preload(lang)}`)
  // the app script hydrates an already-painted page: fetch it at low priority so the stylesheet and the first-scene fonts win the link
  .replace(/<script type="module" crossorigin src=/, '<script type="module" crossorigin fetchpriority="low" src=')
  .replace('</head>', `${head}\n  </head>`)
  .replace('<div id="root"></div>', mode === 'route' ? `<div id="root" data-prerendered="route">${html}</div>` : `<div id="root" data-prerendered="shell"></div>`);

let n = 0;
for (const route of ROUTES) {
  for (const lang of LANGS) {
    const url = localized(route, lang);
    const r = await render(url);
    if (/<template id="B:|<div hidden id="S:|\$RC\(/.test(r.html)) { console.error(`prerender ${url}: deferred Suspense segment in the markup`); process.exit(1); }
    const out = inject(template, r, 'route');
    const file = url === '/' ? path.join(DIST, 'index.html') : path.join(DIST, url.replace(/^\//, ''), 'index.html');
    write(file, out);
    n++;
  }
}
// 404.html — Vercel serves it with a 404 status for any path that is not a static file; the client renders the NotFound page in the path's language.
{
  const r = await render('/404');
  write(path.join(DIST, '404.html'), inject(template, { ...r, html: '', head: '' }, 'shell'));
}
if (existsSync(SSR)) rmSync(SSR, { recursive: true, force: true });
const sample = readFileSync(path.join(DIST, 'ar', 'index.html'), 'utf8');
const count = (re) => (sample.match(re) || []).length;
console.log(`prerender: ${n} pages (${ROUTES.length} routes × ${LANGS.length} languages) + 404.html → dist/`);
console.log(`prerender check (dist/ar/index.html): <title> ×${count(/<title/g)} · canonical ×${count(/rel="canonical"/g)} · og:url ×${count(/property="og:url"/g)} · hreflang ×${count(/hreflang=/gi)} · lang="ar" ${/<html lang="ar" dir="rtl">/.test(sample)} · h1 ${/<h1/.test(sample)}`);
if (count(/<title/g) !== 1 || count(/rel="canonical"/g) !== 1 || count(/property="og:url"/g) !== 1) { console.error('prerender: head tags must appear exactly once'); process.exit(1); }
