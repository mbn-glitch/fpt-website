/**
 * FPT-LANG-SWEEP (11 Nov 2026) — the register of LANGUAGE-BEARING visual assets: every picture the site serves is either neutral (a mark, an icon — no
 * words of one language) or carries the text of ONE language and may then be shown only on pages of that language. The product screens under
 * public/shots/ are captures of the client app, so each exists once per asset language (`ar` for Arabic pages, `en` for every other locale — the same
 * split as the share image and the app links). Used by scripts/check-lang-assets.mjs (static, in `npm run check`) and scripts/lang-sweep.mjs (runtime).
 */
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

export const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..', '..');
export const SHOTS_DIR = path.join(ROOT, 'public', 'shots');
export const ASSET_LANGS = ['ar', 'en'];
/** The asset language of a page language: Arabic pages show the Arabic capture, every other locale the English one. */
export const assetLang = (pageLang) => (pageLang === 'ar' ? 'ar' : 'en');

export function loadShots() {
  const p = path.join(SHOTS_DIR, 'SHOTS.json');
  return existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')).files : [];
}

/**
 * pathname (as served, e.g. /shots/home-s1-en.webp) → { lang: 'ar' | 'en' | 'neutral' | null, why }.
 * `null` = not in the register: a new picture must be classified here before it ships (the gates refuse it).
 * A SHOTS.json row without a `lang` field is an Arabic capture (the state of the manifest before this round — every reference frame was Arabic).
 */
export function classifyAsset(pathname, shots = loadShots()) {
  const p = decodeURIComponent(String(pathname || '').split('?')[0]);
  if (p.startsWith('/shots/')) {
    const f = p.slice('/shots/'.length);
    const row = shots.find((r) => r.file === f || r.webp === f || r.avif === f);
    return row ? { lang: row.lang || 'ar', why: `SHOTS.json ${row.id || row.file}` } : { lang: null, why: 'not in SHOTS.json' };
  }
  const og = /^\/brand\/og-1200x630-(ar|en)\.png$/.exec(p);
  if (og) return { lang: og[1], why: 'share image by locale (CR-05)' };
  if (/^\/brand\/(fpt-(lockup|tile)[a-z0-9-]*\.svg|favicon[a-z0-9-]*\.(svg|png|ico)|fpt-tile-512\.png|apple-touch-icon-180\.png|pwa-[a-z0-9-]+\.png)$/.test(p)) return { lang: 'neutral', why: 'brand mark — the English lockup in every language (CR-11)' };
  if (/^\/images\/third-party\/ctrader\/Media\//.test(p)) return { lang: 'en', why: 'cTrader product screens (English UI)' };
  if (/^\/images\/third-party\/(ctrader\/(Icon|Logo)|fiper|whatsapp)\//.test(p)) return { lang: 'neutral', why: 'third-party mark' };
  return { lang: null, why: 'unclassified — add it to scripts/lib/lang-assets.mjs' };
}
