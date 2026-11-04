#!/usr/bin/env node
/**
 * Live redirect check (FPT-WEBSITE-DOMAIN § 4, 4 Nov 2026): on a deployed host, every client-app path of FPT-DOMAIN-HANDOFF § 2 must answer
 * 308 → https://app.fptraders.app{path}{query} with the query preserved (?ref= is the partner referral, ?next= the sign-in return path);
 * the site's own routes answer 200; /api/webhooks/* answers 404 on purpose (providers are registered on app. — handoff § 3); with --apex also
 * www → apex 308 and the sitemap / robots / OG images on the apex.
 * UX-R2 (owner decisions 51 / 53, 4 Nov 2026): the app redirect is a POSITIVE list — every unknown or mistyped path (`/anything`, `/ar/anything`, `/fr/typo`,
 * `/xx/typo`, `/api/x`) answers 404 with the SITE's pre-rendered 404 page of the prefix language (<html lang>, <title>, h1, risk + entity line once).
 *   node scripts/check-redirects-live.mjs --base https://fpt-website-rust.vercel.app
 *   node scripts/check-redirects-live.mjs --base https://fptraders.app --apex
 */
const a = process.argv.slice(2); const opt = (n, d) => (a.includes(`--${n}`) ? a[a.indexOf(`--${n}`) + 1] : d);
const BASE = (opt('base', '') || '').replace(/\/$/, ''); const APEX = a.includes('--apex'); const APP = 'https://app.fptraders.app';
if (!BASE) { console.error('usage: --base <url> [--apex]'); process.exit(2); }
const Q = '?ref=TEST&next=%2Far%2Faccounts';
const APP_PATHS = ['/ar/signin', '/en/signin', '/ar/signup', '/en/signup', '/ar/reset', '/en/verify', '/ar/2fa', '/ar/home', '/en/accounts', '/ar/accounts/acc_1', '/en/account', '/ar/shop',
  '/en/shop/eval-50k', '/ar/checkout/ord_1', '/en/checkout/ord_1/return', '/ar/checkout/ord_1/transfer', '/en/orders', '/ar/orders/ord_1/receipt', '/en/payouts', '/ar/payouts/new',
  '/en/payouts/p_1/statement', '/ar/certificates', '/en/verify/ABC123', '/c/ABC123', '/ar/notifications', '/en/profile', '/ar/more', '/en/legal/terms', '/ar/legal/refund',
  '/en/legal/privacy', '/ar/legal/risk', '/en/legal/delete-account', '/ar/manifest.webmanifest', '/mock-gateway/myfatoorah/tok_1', '/signin', '/signup'];
const SITE_200 = ['/', '/ar', '/fr', '/es', '/pt', '/tr', '/challenges', '/ar/challenges', '/about', '/ar/help/challenges-rules', '/partners', '/tr/contact', '/sitemap.xml', '/robots.txt', '/sw.js', '/offline.html', '/site.webmanifest', '/brand/og-1200x630-ar.png', '/brand/og-1200x630-en.png', '/fonts/SUBSETS.json'];
const SITE_404 = ['/api/webhooks/myfatoorah', '/api/webhooks/coinsbuy', '/api/webhooks/shuftipro', '/api/signout', '/api/x', '/fr/signin', '/help/does-not-exist', '/ar/help/does-not-exist', '/signinx', '/ar/legalx', '/c', '/404', '/ar/404'];
/** Decision 51 / 53 — unknown paths → the site's 404 page in the language of the prefix: [path, lang of the served page]. */
const UNKNOWN_404 = [['/anything', 'en'], ['/this-page-does-not-exist', 'en'], ['/ar/anything', 'ar'], ['/ar/this-page-does-not-exist', 'ar'], ['/fr/typo', 'fr'], ['/es/nope', 'es'], ['/pt/nope', 'pt'], ['/tr/nope', 'tr'], ['/xx/typo', 'en'], ['/de/signin', 'en'], ['/api/x', 'en']];
const TITLE_404 = { en: 'This page does not exist.', ar: 'هذه الصفحة غير موجودة.', fr: 'Cette page n’existe pas.', es: 'Esta página no existe.', pt: 'Esta página não existe.', tr: 'Bu sayfa mevcut değil.' };
const SITE_REDIRECTS = [['/pricing', `${BASE}/challenges`], ['/ar/pricing', `${BASE}/ar/challenges`], ['/en/about', `${BASE}/about`], ['/en', `${BASE}/`], ['/favicon.ico', `${BASE}/brand/favicon.ico`]];
let pass = 0, fail = 0; const rows = [];
const head = async (url, method = 'GET') => { const r = await fetch(url, { method, redirect: 'manual' }); return { status: r.status, location: r.headers.get('location') || '', type: r.headers.get('content-type') || '' }; };
const check = (name, ok, detail) => { rows.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? `  — ${detail}` : ''}`); ok ? pass++ : fail++; };
for (const p of APP_PATHS) {
  for (const q of ['', Q]) {
    const r = await head(`${BASE}${p}${q}`); const want = `${APP}${p}${q}`;
    check(`${p}${q} → 308 ${want}`, r.status === 308 && r.location === want, `${r.status} ${r.location}`);
  }
}
// a POST to a webhook path must not be redirected (it is 404 on this host) and a POST to a client path redirects like a GET
{ const r = await head(`${BASE}/api/webhooks/myfatoorah`, 'POST'); check('POST /api/webhooks/myfatoorah → 404 (no redirect)', r.status === 404, String(r.status)); }
for (const p of SITE_200) { const r = await head(`${BASE}${p}`); check(`${p} → 200`, r.status === 200, `${r.status} ${r.type.split(';')[0]}`); }
for (const p of SITE_404) { const r = await head(`${BASE}${p}`); check(`${p} → 404`, r.status === 404, `${r.status} ${r.location}`); }
for (const [p, lang] of UNKNOWN_404) {
  const res = await fetch(`${BASE}${p}`, { redirect: 'manual' }); const h = await res.text();
  const ok = res.status === 404 && new RegExp(`<html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">`).test(h) && h.includes(`<title>${TITLE_404[lang]}`) && /<h1/.test(h) && (h.match(/data-risk-line/g) || []).length === 1 && (h.match(/data-entity-line/g) || []).length === 1;
  check(`${p} → 404 with the ${lang} 404 page (lang/dir · title · h1 · risk + entity once)`, ok, `${res.status} ${(h.match(/<html lang="[^"]*"/) || [''])[0]} ${(h.match(/<title>[^<]*/) || ['no title'])[0]}`);
}
{ const r = await head(`${BASE}/en/typo`); check('/en/typo → 308 /typo (then the English 404)', [301, 308].includes(r.status) && new URL(r.location, BASE).pathname === '/typo', `${r.status} ${r.location}`); }
// Vercel answers its own (same-host) redirects with a RELATIVE Location — resolve it against BASE before comparing
for (const [p, want] of SITE_REDIRECTS) { const r = await head(`${BASE}${p}`); const got = r.location ? new URL(r.location, BASE).href : ''; check(`${p} → 308 ${want}`, [301, 308].includes(r.status) && got.replace(/\/$/, '') === want.replace(/\/$/, ''), `${r.status} ${r.location}`); }
{ const r = await head(`${BASE}/ar/signin?ref=TEST`); check('?ref= preserved on /ar/signin', r.location === `${APP}/ar/signin?ref=TEST`, r.location); }
if (APEX) {
  const host = new URL(BASE).host;
  for (const p of ['/', '/ar/challenges?ref=TEST']) { const r = await head(`https://www.${host}${p}`); check(`www${p} → 308 ${BASE}${p}`, r.status === 308 && r.location === `${BASE}${p}`, `${r.status} ${r.location}`); }
  const sm = await (await fetch(`${BASE}/sitemap.xml`)).text(); const n = (sm.match(new RegExp(`<loc>${BASE}/`, 'g')) || []).length + (sm.match(new RegExp(`<loc>${BASE}</loc>`, 'g')) || []).length;
  check(`sitemap.xml: 90 <loc> on ${BASE}`, n === 90, String(n));
  const rb = await (await fetch(`${BASE}/robots.txt`)).text(); check(`robots.txt: Sitemap ${BASE}/sitemap.xml`, rb.includes(`Sitemap: ${BASE}/sitemap.xml`), rb.trim().split('\n').pop());
  for (const l of ['', '/ar', '/fr', '/es', '/pt', '/tr']) { const h = await (await fetch(`${BASE}${l || '/'}`)).text(); check(`${l || '/'}: canonical on ${BASE}`, h.includes(`rel="canonical" href="${BASE}${l}`), ''); }
  for (const img of ['/brand/og-1200x630-ar.png', '/brand/og-1200x630-en.png']) { const r = await fetch(`${BASE}${img}`); const b = await r.arrayBuffer(); check(`${img} served (${b.byteLength} B png)`, r.status === 200 && (r.headers.get('content-type') || '').includes('image/png') && b.byteLength > 10000, ''); }
}
console.log(rows.join('\n')); console.log(`TOTAL PASS ${pass} FAIL ${fail} (${BASE}${APEX ? ', apex checks on' : ''})`);
process.exit(fail ? 1 : 0);
