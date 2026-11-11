/**
 * The product screens of public/shots/ by PAGE LANGUAGE (FPT-LANG-SWEEP, 11 Nov 2026). A screen capture carries the words of one language, so each shot id
 * exists twice — the Arabic capture for Arabic pages, the English capture for every other locale (the same split as the share image `ogImage` and the app
 * links). This file is the ONE place that builds a /shots/ URL: a literal path anywhere else in src/ is refused by scripts/check-lang-assets.mjs, and a
 * picture of the wrong language on a rendered page by scripts/lang-sweep.mjs.
 */
export const SHOT_IDS = ['home-s1', 'store-s1', 'cert-passed', 'cert-payout'];
/** The asset language of a page language. */
export const shotLang = (lang) => (lang === 'ar' ? 'ar' : 'en');
/** { png, webp, avif } of a shot for the page language: /shots/<id>.<ar|en>.<ext> (design office WEBL-D01). */
export function shotFiles(id, lang) {
  const base = `/shots/${id}.${shotLang(lang)}`;
  return { png: `${base}.png`, webp: `${base}.webp`, avif: `${base}.avif` };
}
