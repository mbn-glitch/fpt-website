/**
 * The ONE place for the public origins of the FPT surfaces (FPT-WEBSITE-DOMAIN — owner decisions 18 / 3-ب / 33-أ, 4 Nov 2026).
 *   SITE_ORIGIN  — this public site on the apex: every absolute URL of the site (canonical, hreflang, og:url, og:image, sitemap, robots, JSON-LD).
 *   APP_ORIGIN   — the client application (fpt-platform `apps/client`, FPT_CLIENT_ORIGIN): sign-up, sign-in, the four legal documents.
 *   SUPPORT_EMAIL — the owner's support mailbox (platform setting `support.email`, decision 18): footer, contact page, help centre.
 * `public/sitemap.xml` and `public/robots.txt` are static files that carry SITE_ORIGIN by hand — `scripts/check-site-origin.mjs` refuses any other host there.
 */
export const SITE_ORIGIN = 'https://fptraders.app';
export const APP_ORIGIN = 'https://app.fptraders.app';
export const SUPPORT_EMAIL = 'help@fptraders.app';
export const SUPPORT_MAILTO = `mailto:${SUPPORT_EMAIL}`;

/** The client app speaks Arabic and English only: Arabic pages of the site send to /ar/…, every other language to /en/…. */
export const appLocale = (lang) => (lang === 'ar' ? 'ar' : 'en');

/** The partner referral code the site may carry (`?ref=CODE` on any site URL — the app's middleware turns it into the 90-day `fpt_ref` cookie,
 *  and the cookie is host-only, so the ONLY way a referral survives the hop to `app.` is the query — FPT-DOMAIN-HANDOFF § 5). Same shape as the app's check. */
export const REF_RE = /^[A-Za-z0-9-]{4,32}$/;

export const SIGNUP_PATH = '/signup';
export const SIGNIN_PATH = '/signin';
export const SHOP_PATH = '/shop';

/** A catalogue product code as the platform writes it (`fpt-10k` … `fpt-200k` — src/data/platform-rules.json, `CATALOG_V1[].code`). */
export const PRODUCT_CODE_RE = /^fpt-\d+k$/;

/** An absolute URL into the client app: `appUrl('/signup', 'ar')` → https://app.fptraders.app/ar/signup, with `?ref=CODE` when a valid code is given
 *  and any further `params` after it (`{ next: '/ar/shop?size=fpt-50k' }` → `&next=%2Far%2Fshop%3Fsize%3Dfpt-50k`; empty values are left out). */
export function appUrl(path = '/', lang = 'en', ref = '', params = {}) {
  const p = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  const url = `${APP_ORIGIN}/${appLocale(lang)}${p}`;
  const query = [];
  if (ref && REF_RE.test(ref)) query.push(`ref=${encodeURIComponent(ref.toUpperCase())}`);
  for (const [k, v] of Object.entries(params)) if (v) query.push(`${k}=${encodeURIComponent(v)}`);
  return query.length ? `${url}?${query.join('&')}` : url;
}

/** AMIR-R1 F10 — sign-up for a CHOSEN size: the client's sign-up keeps `?next=` (a same-origin path, its `safeNext`) through the e-mail code, the
 *  password step and the sign-in link, and its shop pre-selects `?size=<product code>` — so a size card opens
 *  https://app.fptraders.app/<ar|en>/signup?next=%2F<ar|en>%2Fshop%3Fsize%3Dfpt-50k (`ref=CODE` first when the visit carried one; a signed-in
 *  visitor is sent straight on to the shop). An unknown code gives the plain sign-up. Gate: scripts/check-app-links.mjs. */
export function signupUrlForSize(code, lang = 'en', ref = '') {
  const next = PRODUCT_CODE_RE.test(code || '') ? `/${appLocale(lang)}${SHOP_PATH}?size=${code}` : '';
  return appUrl(SIGNUP_PATH, lang, ref, { next });
}
