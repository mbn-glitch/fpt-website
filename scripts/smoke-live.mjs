#!/usr/bin/env node
/**
 * Live smoke of a deployed build (FPT-WEBSITE-DOMAIN, 4 Nov 2026 — supersedes the R3 bash): the 90 pre-rendered pages answer 200 with one <title>,
 * one canonical on SITE_ORIGIN, the English lockup, the fixed risk line, the VERBATIM entity line, the simulated-accounts sentence, the support
 * mailbox and the app links on app.fptraders.app in the page's app locale; brand assets and font pieces are byte copies (sha256); the worker, the offline
 * page and the sitemap are served; no retired host anywhere in the HTML.
 *   node scripts/smoke-live.mjs --base https://fptraders.app
 */
import { readFileSync } from 'node:fs'; import { createHash } from 'node:crypto'; import path from 'node:path';
const a = process.argv.slice(2); const opt = (n, d) => (a.includes(`--${n}`) ? a[a.indexOf(`--${n}`) + 1] : d);
const BASE = (opt('base', '') || '').replace(/\/$/, ''); if (!BASE) { console.error('usage: --base <url>'); process.exit(2); }
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const cfg = readFileSync(path.join(ROOT, 'src/config/site.js'), 'utf8'); const SITE = cfg.match(/SITE_ORIGIN = '([^']+)'/)[1]; const APP = cfg.match(/APP_ORIGIN = '([^']+)'/)[1]; const MAIL = cfg.match(/SUPPORT_EMAIL = '([^']+)'/)[1];
const legal = readFileSync(path.join(ROOT, 'src/data/legal.js'), 'utf8'); const eb = legal.slice(legal.indexOf('ENTITY_LINE = {')); const ENTITY = { en: eb.match(/^\s*en: '([^']*)'/m)[1], ar: eb.match(/^\s*ar: '([^']*)'/m)[1] };
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
const LANGS = ['en', 'ar', 'fr', 'es', 'pt', 'tr']; const HELP = ['getting-started', 'challenges-rules', 'funded-accounts', 'payouts-fiper-card', 'trading-conditions', 'account-management', 'technical-platform', 'legal-general', 'partner-program'];
const ROUTES = ['/', '/challenges', '/about', '/contact', '/help', '/partners', ...HELP.map((s) => `/help/${s}`)]; const localized = (r, l) => (l === 'en' ? r : r === '/' ? `/${l}` : `/${l}${r}`);
let pass = 0, fail = 0; const out = []; const check = (n, ok, d = '') => { out.push(`${ok ? 'PASS' : 'FAIL'} ${n}${d ? ` — ${d}` : ''}`); ok ? pass++ : fail++; };
const sha = async (u) => createHash('sha256').update(Buffer.from(await (await fetch(u)).arrayBuffer())).digest('hex');
for (const l of LANGS) for (const r of ROUTES) {
  const p = localized(r, l); const res = await fetch(`${BASE}${p}`, { redirect: 'manual' }); const h = await res.text(); const el = l === 'ar' ? 'ar' : 'en'; const name = `${p}`;
  const probs = [];
  if (res.status !== 200) probs.push(`status ${res.status}`);
  if ((h.match(/<title/g) || []).length !== 1) probs.push('title≠1');
  if ((h.match(/rel="canonical"/g) || []).length !== 1 || !h.includes(`rel="canonical" href="${SITE}${p === '/' ? '/' : p}"`)) probs.push('canonical');
  if (!h.includes(`property="og:url" content="${SITE}${p === '/' ? '/' : p}"`)) probs.push('og:url');
  if (!h.includes(`${SITE}/brand/og-1200x630-${el}.png`)) probs.push('og:image');
  if ((h.match(/fpt-lockup-horizontal-en-white\.svg/g) || []).length < 2) probs.push('lockup');
  if (/lockup-horizontal-ar/.test(h)) probs.push('arabic lockup');
  if (!h.includes(l === 'ar' ? 'الاستثمار ينطوي على مخاطر' : 'Investing involves risk')) probs.push('risk line');
  if (!h.includes(esc(ENTITY[el])) && !h.includes(ENTITY[el])) probs.push('entity line verbatim');
  if (!/data-simulated-statement/.test(h)) probs.push('simulated statement');
  if (!h.includes(`mailto:${MAIL}`) || !h.includes(`>${MAIL}<`)) probs.push('support e-mail');
  if (!h.includes(`href="${APP}/${el}/signup"`) || !h.includes(`href="${APP}/${el}/signin"`)) probs.push(`app links /${el}/`);
  if (!h.includes(`href="${APP}/${el}/legal/terms"`)) probs.push('legal link');
  if (/fptraders\.com|crm\.fptraders|fonts\.googleapis|fpt-website[-\w]*\.vercel\.app/.test(h)) probs.push('retired host / external');
  if (!/<h1/.test(h)) probs.push('no h1');
  if (!new RegExp(`<html lang="${l}" dir="${l === 'ar' ? 'rtl' : 'ltr'}">`).test(h)) probs.push('html lang/dir');
  if (/>(common|nav|hero|fptCard|help|about|footer|challengePricing|partners|contact|notFound)\.[a-zA-Z.]+</.test(h)) probs.push('raw key');
  check(name, probs.length === 0, probs.join(', '));
}
// UX-R2 (decision 53): the 404 page of every language — a complete page served with a 404 status for an unknown path under that prefix
for (const l of LANGS) {
  const p = localized('/this-page-does-not-exist', l); const res = await fetch(`${BASE}${p}`, { redirect: 'manual' }); const h = await res.text(); const el = l === 'ar' ? 'ar' : 'en'; const probs = [];
  if (res.status !== 404) probs.push(`status ${res.status}`);
  if ((h.match(/<title/g) || []).length !== 1) probs.push('title≠1');
  if (!new RegExp(`<html lang="${l}" dir="${l === 'ar' ? 'rtl' : 'ltr'}">`).test(h)) probs.push('html lang/dir');
  if ((h.match(/<h1/g) || []).length !== 1) probs.push('h1≠1');
  if ((h.match(/data-risk-line/g) || []).length !== 1 || !h.includes(l === 'ar' ? 'الاستثمار ينطوي على مخاطر' : 'Investing involves risk')) probs.push('risk line≠1');
  if ((h.match(/data-entity-line/g) || []).length !== 1 || !(h.includes(esc(ENTITY[el])) || h.includes(ENTITY[el]))) probs.push('entity line≠1');
  if (!/name="robots" content="noindex"/.test(h)) probs.push('noindex');
  if (/rel="canonical"/.test(h)) probs.push('canonical on a 404');
  check(`${p} (404 page ${l})`, probs.length === 0, probs.join(', '));
}
for (const f of ['fpt-lockup-horizontal-en-white.svg', 'fpt-tile.svg', 'favicon.svg', 'favicon.ico', 'og-1200x630-ar.png', 'og-1200x630-en.png', 'fonts/Inter-400.woff2', 'fonts/IBMPlexSansArabic-400.woff2', 'fonts/BarlowCondensed-800.woff2']) {
  const exp = (readFileSync(path.join(ROOT, 'public/brand/SHA256SUMS'), 'utf8').split('\n').find((x) => x.endsWith(` ${f}`)) || '').split(' ')[0];
  check(`brand/${f} = package bytes`, (await sha(`${BASE}/brand/${f}`)) === exp);
}
for (const f of JSON.parse(readFileSync(path.join(ROOT, 'public/fonts/SUBSETS.json'), 'utf8')).files) check(`${f.url} sha`, (await sha(`${BASE}${f.url}`)) === f.sha256);
check('brand/fpt-lockup-horizontal-ar-white.svg → 404', (await fetch(`${BASE}/brand/fpt-lockup-horizontal-ar-white.svg`, { redirect: 'manual' })).status === 404);
check('sw.js 200 + no-cache', await (async () => { const r = await fetch(`${BASE}/sw.js`); return r.status === 200 && /no-cache/.test(r.headers.get('cache-control') || ''); })());
check('offline.html risk line', (await (await fetch(`${BASE}/offline.html`)).text()).includes('Investing involves risk'));
check('sitemap 90 <loc> on SITE_ORIGIN', ((await (await fetch(`${BASE}/sitemap.xml`)).text()).match(new RegExp(`<loc>${SITE}`, 'g')) || []).length === 90);
check('fonts immutable', /immutable/.test((await fetch(`${BASE}/brand/fonts/Inter-400.woff2`)).headers.get('cache-control') || ''));
check('/fr/nope → the pre-rendered French 404 page (decision 53)', await (async () => { const r = await fetch(`${BASE}/fr/nope`, { redirect: 'manual' }); const h = await r.text(); return r.status === 404 && h.includes('data-prerendered="route"') && h.includes('<html lang="fr" dir="ltr">'); })());
console.log(out.join('\n')); console.log(`TOTAL PASS ${pass} FAIL ${fail} (${BASE})`); process.exit(fail ? 1 : 0);
