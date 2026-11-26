#!/usr/bin/env node
/**
 * Size-carrying sign-up gate (AMIR-R1 F10, 26 Nov 2026): a size card on the site («Start 10K» … «Start 200K», home `SizesSection`) and the
 * «Get started» action under the size chosen on /challenges open the client app's sign-up WITH that size, in the shape the client reads today:
 *   https://app.fptraders.app/<ar|en>/signup?next=%2F<ar|en>%2Fshop%3Fsize%3D<product code>      (+ `ref=CODE` first when the visit carried one)
 * The client's sign-up page (fpt-platform apps/client (auth)/signup/page.tsx) keeps `?next=` through the e-mail code, the password step and the
 * sign-in link (`safeNext` — a same-origin relative path), and its shop (`(app)/shop/page.tsx`) pre-selects `?size=<code>` when the code is in the
 * catalogue (codes `fpt-10k` … `fpt-200k`, src/data/platform-rules.json). A signed-in visitor goes straight to the shop with the size.
 *   node scripts/check-app-links.mjs          → the URL builder + the call sites in the source
 *   node scripts/check-app-links.mjs --dist   → the pre-rendered pages (home ar / en / fr, /challenges ar / en) after a build
 * PASS / FAIL (exit 1).
 */
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DIST = process.argv.includes('--dist');
const failures = [];
const fail = (m) => failures.push(m);

const platform = JSON.parse(readFileSync(path.join(ROOT, 'src/data/platform-rules.json'), 'utf8'));
const CODES = platform.data.catalog.map((p) => p.code);
if (CODES.length !== 5 || !CODES.every((c) => /^fpt-\d+k$/.test(c))) fail(`platform-rules.json: unexpected catalogue codes ${JSON.stringify(CODES)}`);

const APP = 'https://app.fptraders.app';
const expected = (code, appLang, ref = '') => `${APP}/${appLang}/signup?${ref ? `ref=${ref}&` : ''}next=${encodeURIComponent(`/${appLang}/shop?size=${code}`)}`;

/** The client's open-redirect guard, condensed (apps/client/src/lib/cookies.ts safeNext): one leading slash, no control / space / backslash, same origin. */
const clientAcceptsNext = (next) => {
  if (!next || !next.startsWith('/') || next.startsWith('//') || /[\x00-\x20\x7f\\]/.test(next)) return false;
  const u = new URL(next, 'https://n.invalid');
  return u.origin === 'https://n.invalid' && /^\/(?!\/)/.test(u.pathname + u.search);
};

if (!DIST) {
  const site = await import(path.join(ROOT, 'src/config/site.js'));
  if (typeof site.signupUrlForSize !== 'function') fail('src/config/site.js: no exported signupUrlForSize(code, lang, ref) — the size cards cannot carry the size to the app');
  else {
    for (const code of CODES) {
      for (const [lang, appLang] of [['en', 'en'], ['ar', 'ar'], ['fr', 'en'], ['tr', 'en']]) {
        for (const ref of ['', 'ABCD-12']) {
          const got = site.signupUrlForSize(code, lang, ref);
          const want = expected(code, appLang, ref);
          if (got !== want) { fail(`signupUrlForSize(${code}, ${lang}, ${JSON.stringify(ref)}) = ${got}\n      expected ${want}`); continue; }
          const u = new URL(got);
          const next = u.searchParams.get('next');
          if (!clientAcceptsNext(next)) fail(`${got}: next=${next} would be refused by the client's safeNext`);
          const shop = new URL(next, APP);
          if (shop.pathname !== `/${appLang}/shop` || shop.searchParams.get('size') !== code) fail(`${got}: next does not open /${appLang}/shop?size=${code}`);
          if (ref && u.searchParams.get('ref') !== ref) fail(`${got}: the partner code was lost`);
        }
      }
    }
    // the referral rules of appUrl are unchanged: lower case is upper-cased, an invalid code is dropped, no size → no next
    const lower = site.signupUrlForSize('fpt-50k', 'en', 'abcd');
    if (lower !== expected('fpt-50k', 'en', 'ABCD')) fail(`signupUrlForSize with a lower-case ref = ${lower}`);
    const bad = site.signupUrlForSize('fpt-50k', 'en', 'x');
    if (bad !== expected('fpt-50k', 'en')) fail(`signupUrlForSize with an invalid ref = ${bad}`);
    const unknown = site.signupUrlForSize('nope', 'en', '');
    if (unknown !== `${APP}/en/signup`) fail(`signupUrlForSize with an unknown code = ${unknown} (expected the plain sign-up)`);
  }
  if (site.appUrl('/signup', 'ar', 'abcd') !== `${APP}/ar/signup?ref=ABCD`) fail(`appUrl('/signup', 'ar', 'abcd') = ${site.appUrl('/signup', 'ar', 'abcd')}`);
  if (site.appUrl('/signup', 'en', '') !== `${APP}/en/signup`) fail(`appUrl('/signup', 'en') = ${site.appUrl('/signup', 'en', '')}`);

  const sizes = readFileSync(path.join(ROOT, 'src/components/web/SizesSection.jsx'), 'utf8');
  if (/href=\{app\.signup\}/.test(sizes)) fail('src/components/web/SizesSection.jsx: a size card links to the plain sign-up (href={app.signup}) — the chosen size is lost');
  if (!/href=\{app\.signupForSize\(p\.code\)\}/.test(sizes)) fail('src/components/web/SizesSection.jsx: the size card does not link to app.signupForSize(p.code)');
  const hook = readFileSync(path.join(ROOT, 'src/hooks/useAppLinks.js'), 'utf8');
  if (!/signupForSize:\s*\(code\)\s*=>\s*signupUrlForSize\(code,\s*lang,\s*ref\)/.test(hook)) fail('src/hooks/useAppLinks.js: no signupForSize(code) built with the page language and the referral');
  const pricing = readFileSync(path.join(ROOT, 'src/pages/ChallengePricing.jsx'), 'utf8');
  if (!/href=\{app\.signupForSize\(CATALOG_V1\[sizeIdx\]\.code\)\}/.test(pricing)) fail('src/pages/ChallengePricing.jsx: «Get started» under the chosen size does not carry it (app.signupForSize(CATALOG_V1[sizeIdx].code))');
} else {
  const page = (rel) => {
    const f = path.join(ROOT, 'dist', rel);
    if (!existsSync(f)) { fail(`dist/${rel} missing — build first`); return ''; }
    return readFileSync(f, 'utf8');
  };
  const hrefs = (html) => [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1].replace(/&amp;/g, '&'));
  for (const [rel, appLang] of [['index.html', 'en'], ['ar/index.html', 'ar'], ['fr/index.html', 'en']]) {
    const h = hrefs(page(rel));
    for (const code of CODES) if (!h.includes(expected(code, appLang))) fail(`dist/${rel}: no link ${expected(code, appLang)}`);
  }
  for (const [rel, appLang] of [['challenges/index.html', 'en'], ['ar/challenges/index.html', 'ar']]) {
    const h = hrefs(page(rel));
    // the pre-rendered default is the catalogue's middle size (useState(2)); the link follows the choice after hydration
    if (!h.includes(expected(CODES[2], appLang))) fail(`dist/${rel}: «Get started» under the chosen size is not ${expected(CODES[2], appLang)}`);
  }
}

if (failures.length) {
  console.error(`check-app-links${DIST ? ' --dist' : ''}: FAIL (${failures.length})`);
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}
console.log(`check-app-links${DIST ? ' --dist' : ''}: PASS (${CODES.join(' · ')} → /<ar|en>/signup?next=/<ar|en>/shop?size=<code>${DIST ? ' on home ar / en / fr and /challenges ar / en' : '; ref kept; call sites wired'})`);
