#!/usr/bin/env node
/**
 * Routing gate (owner decisions 51 + 53, 4 Nov 2026 — FPT-WEBSITE-UX-R2), offline on vercel.json + dist/ through scripts/lib/vercel-routes.mjs:
 *   51 — the client-app redirect is a POSITIVE list: the 36 app paths of FPT-DOMAIN-HANDOFF § 2 (scripts/check-redirects-live.mjs APP_PATHS), with and
 *        without a query, answer 308 → https://app.fptraders.app{path}{query}; any unknown or mistyped path stays on the SITE's 404 page in the language of its
 *        prefix (English when the first segment is not a language), with a 404 status; /api/* is 404;
 *   53 — the six pre-rendered 404 pages exist and are complete (title, <html lang dir>, h1, the risk line and the entity line once);
 *   + the site's own routes (90 pages, assets, worker, sitemap) are 200 and the earlier aliases (/pricing, /en/*, /favicon.ico, old image paths, trailing slash) still redirect.
 *   node scripts/check-routes.mjs        (after a build; part of `npm run check:dist`)
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { loadRoutes, resolve } from './lib/vercel-routes.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DIST = path.join(ROOT, 'dist');
const routes = loadRoutes(path.join(ROOT, 'vercel.json'));
const APP = 'https://app.fptraders.app';
const Q = '?ref=TEST&next=%2Far%2Faccounts';
/** The 36 client-app paths of the handoff (identical to scripts/check-redirects-live.mjs). */
export const APP_PATHS = ['/ar/signin', '/en/signin', '/ar/signup', '/en/signup', '/ar/reset', '/en/verify', '/ar/2fa', '/ar/home', '/en/accounts', '/ar/accounts/acc_1', '/en/account', '/ar/shop',
  '/en/shop/eval-50k', '/ar/checkout/ord_1', '/en/checkout/ord_1/return', '/ar/checkout/ord_1/transfer', '/en/orders', '/ar/orders/ord_1/receipt', '/en/payouts', '/ar/payouts/new',
  '/en/payouts/p_1/statement', '/ar/certificates', '/en/verify/ABC123', '/c/ABC123', '/ar/notifications', '/en/profile', '/ar/more', '/en/legal/terms', '/ar/legal/refund',
  '/en/legal/privacy', '/ar/legal/risk', '/en/legal/delete-account', '/ar/manifest.webmanifest', '/mock-gateway/myfatoorah/tok_1', '/signin', '/signup'];
/** Unknown / mistyped paths → the SITE's 404 page of the prefix language (decision 51): [path, language of the served 404 file]. */
export const UNKNOWN_404 = [['/anything', 'en'], ['/this-page-does-not-exist', 'en'], ['/ar/anything', 'ar'], ['/ar/this-page-does-not-exist', 'ar'], ['/fr/typo', 'fr'], ['/es/nope', 'es'], ['/pt/nope', 'pt'], ['/tr/nope', 'tr'],
  ['/xx/typo', 'en'], ['/de/signin', 'en'], ['/fr/signin', 'fr'], ['/help/does-not-exist', 'en'], ['/ar/help/does-not-exist', 'ar'], ['/404', 'en'], ['/ar/404', 'ar'], ['/ar/challenges/extra', 'ar'], ['/challenges/extra', 'en'],
  ['/signinx', 'en'], ['/ar/signinx', 'ar'], ['/ar/legalx', 'ar'], ['/c', 'en'], ['/mock-gatewayx', 'en'], ['/api/x', 'en'], ['/api/webhooks/myfatoorah', 'en'], ['/api/signout', 'en'],
  // never an off-site redirect: a capture that starts with a slash / backslash is not a trailing-slash or /en alias case (the proxy also collapses «//»)
  ['//evil.com/', 'en'], ['/\\evil.com/', 'en'], ['/en//evil.com', 'en'], ['/en/\\evil.com', 'en']];
const SITE_200 = ['/', '/ar', '/fr', '/es', '/pt', '/tr', '/challenges', '/ar/challenges', '/about', '/ar/help/challenges-rules', '/partners', '/tr/contact', '/sitemap.xml', '/robots.txt', '/sw.js', '/offline.html', '/site.webmanifest', '/brand/og-1200x630-ar.png', '/fonts/SUBSETS.json', '/404.html', '/ar/404.html'];
const SITE_REDIRECTS = [['/pricing', '/challenges'], ['/ar/pricing', '/ar/challenges'], ['/en', '/'], ['/en/about', '/about'], ['/en/typo', '/typo'], ['/favicon.ico', '/brand/favicon.ico'], ['/images/fiper/x.svg', '/images/third-party/fiper/x.svg'], ['/ar/challenges/', '/ar/challenges'], ['/ar/signin/', '/ar/signin'], ['/en/signin', `${APP}/en/signin`]];
const LANGS = ['en', 'ar', 'fr', 'es', 'pt', 'tr'];
let pass = 0, fail = 0; const rows = [];
const check = (name, ok, detail = '') => { rows.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? `  — ${detail}` : ''}`); ok ? pass++ : fail++; };
const file404 = (lang) => path.join(DIST, lang === 'en' ? '404.html' : `${lang}/404.html`);
for (const p of APP_PATHS) for (const q of ['', Q]) { const r = resolve(routes, DIST, p, q); check(`${p}${q} → 308 ${APP}${p}${q}`, r.status === 308 && r.location === `${APP}${p}${q}`, `${r.status} ${r.location ?? r.file ?? ''}`); }
for (const [p, lang] of UNKNOWN_404) { const r = resolve(routes, DIST, p); check(`${p} → 404 (${lang} page)`, r.status === 404 && r.file === file404(lang), `${r.status} ${r.location ?? (r.file ? path.relative(DIST, r.file) : 'no file')}`); }
for (const p of SITE_200) { const r = resolve(routes, DIST, p); check(`${p} → 200`, r.status === 200 && Boolean(r.file), `${r.status} ${r.location ?? ''}`); }
for (const [p, want] of SITE_REDIRECTS) { const r = resolve(routes, DIST, p); check(`${p} → 308 ${want}`, r.status === 308 && r.location === want, `${r.status} ${r.location ?? ''}`); }
{ const r = resolve(routes, DIST, '/assets/x.js'); check('/assets/* carries the immutable cache header', /immutable/.test(r.headers['Cache-Control'] || ''), JSON.stringify(r.headers)); }
// decision 53 — the six 404 pages are complete
const legal = readFileSync(path.join(ROOT, 'src/data/legal.js'), 'utf8'); const eb = legal.slice(legal.indexOf('ENTITY_LINE = {')); const ENTITY = { en: eb.match(/^\s*en: '([^']*)'/m)[1], ar: eb.match(/^\s*ar: '([^']*)'/m)[1] };
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
for (const lang of LANGS) {
  const html = readFileSync(file404(lang), 'utf8'); const el = lang === 'ar' ? 'ar' : 'en'; const probs = [];
  if ((html.match(/<title>/g) || []).length !== 1) probs.push('title≠1');
  if (!new RegExp(`<html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">`).test(html)) probs.push('html lang/dir');
  if ((html.match(/<h1/g) || []).length !== 1) probs.push('h1≠1');
  if ((html.match(/data-risk-line/g) || []).length !== 1 || !html.includes(el === 'ar' ? 'الاستثمار ينطوي على مخاطر' : 'Investing involves risk')) probs.push('risk line≠1');
  if ((html.match(/data-entity-line/g) || []).length !== 1 || !(html.includes(esc(ENTITY[el])) || html.includes(ENTITY[el]))) probs.push('entity line≠1');
  if (!/name="robots" content="noindex"/.test(html)) probs.push('noindex');
  if (/data-prerendered="route"/.test(html) === false) probs.push('not pre-rendered');
  check(`404 page ${lang}: title · lang/dir · h1 · risk · entity once · noindex`, probs.length === 0, probs.join(', '));
}
console.log(rows.filter((r) => r.startsWith('FAIL')).join('\n'));
console.log(`check-routes: ${fail ? 'FAIL' : 'PASS'} — ${pass} pass / ${fail} fail (${APP_PATHS.length} app paths × 2 → 308 app. · ${UNKNOWN_404.length} unknown paths → the site's 404 of the prefix language · six 404 pages complete)`);
process.exit(fail ? 1 : 0);
