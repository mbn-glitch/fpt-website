# Fiper Pro Traders — public website (fptraders.app)

Marketing website for **Fiper Pro Traders (FPT)** — Part of Fiper Global. Six languages (EN at the root, AR/FR/ES/PT/TR under `/<lang>/…`),
pre-rendered to static HTML at build time and hydrated on the client.

## Identity (binding)

- **fpt-brand v1.2.1** (pinned 2 Nov 2026 — owner decisions of 1 Nov 2026 23:08) — the drop-in package lives in `brand/` (tokens, fonts, logos,
  scripts, skill). Every colour, font, radius and logo on the site comes from it: `src/index.css` imports `brand/tokens.css` and maps the `--fpt-*`
  variables into Tailwind's `@theme`; `public/brand/` holds byte copies of the logo set, the icons, the two CR-05 share images
  (`og-1200x630-ar.png` / `-en.png`) and the complete font files, checked by `scripts/check-logo-assets.mjs` against `public/brand/SHA256SUMS`.
  **CR-11 — the English lockup only:** `fpt-lockup-horizontal-en-white.svg` is the one lockup in every language, Arabic pages included
  (`src/components/brand/Logo.jsx`, `direction: ltr`); the Arabic / bilingual lockups stay archival in `brand/logos` and are not served
  (gates: `check-logo-assets` ARABIC-LOCKUP-SERVED, `verify-identity` ARABIC-LOCKUP-IN-USE).
- **Type:** Latin headlines (h1, section h2) in the package display face **Barlow Condensed** (800 / 700, uppercase, letter-spacing .5 px,
  line-height 1.05 — owner decision 8, `.fpt-display` in `src/index.css`); Arabic headlines stay IBM Plex Sans Arabic (never Barlow). Site ladder:
  label 13 · body 16 · subtitle 18 · h2 30 · h1 40 on phones (≤ 4 sizes + the label above the fold on every screen — UXFW-020). **CR-15 (owner
  decision 42-أ, 4 Nov 2026):** under `lang` fr / es / pt / tr the h1 step is 12 % smaller (`--fpt-display-scale: .88`, classes `.fpt-h1` /
  `.fpt-h1--home` / `.fpt-h1--compact`) so the hero keeps ≤ 2 lines on 390 px. Eyebrows / labels are sentence case with no tracking (RD2 F-035 — CR-02).
- **Red budget (CR-14 — owner decision 41-أ, 4 Nov 2026):** brand red = the logo tile + ONE primary button per viewport; selected / active states are
  the text colour with a neutral frame; no red chip, frame, icon or `accent-color` (gate `scripts/check-red-budget.mjs`; `brand/fpt-website-application-note.md` § 6).
- **Relationship line once (owner decision 38-ب) · WhatsApp as a neutral card (decision 40-أ):** «Part of Fiper Global» appears once per page under
  the header lockup (no English chip in the hero, no footer line); the floating WhatsApp button is gone — `src/components/ui/WhatsAppCard.jsx`
  (Lucide `message-circle`, the official mark small inside the card only) in the contact section and at the end of every help page.
- **Fonts served:** unicode-range pieces cut from the package files by `scripts/build-font-subsets.mjs` (`public/fonts/*.woff2` +
  `public/fonts/SUBSETS.json` with the source sha256; `src/fonts.generated.css`; `npm run fonts` to rebuild; `--check` in `npm run check` verifies the sha256 without any tool, `--check-fresh` re-cuts with pyftsubset) —
  PROPOSED derived performance assets, identity unchanged; no Google Fonts, no external source.
- **fiper-brand v2.3.4** where Fiper appears: the Fiper lockup A (`public/images/third-party/fiper/fiper-lockup-horizontal-colour.svg`, sha256
  `542e2d2a…`), the fixed risk line «الاستثمار ينطوي على مخاطر» / "Investing involves risk" (`src/components/brand/RiskLine.jsx`,
  gate `scripts/check-risk-line.mjs`).
- Third-party marks (cTrader, Fiper, WhatsApp) live under `public/images/third-party/` and are never recoloured.

## Facts come from the platform

The site invents no rule, number or legal text. `src/data/rules.js` mirrors `fpt-platform` `RULES_V1` / `CATALOG_V1` / the affiliate tiers (every amount through `src/lib/money.jsx` — «50,000 USD», one no-break space, isolated; the product word is «Evaluation» in the six languages — RD2 rules 3.4 / 3.5);
`src/data/legal.js` carries the entity line (**verbatim `LEGAL.entity.line`** — the same string as the platform footer and the foot of every e-mail,
owner decision 3-ب of 4 Nov 2026; gate `scripts/check-entity-line.mjs` compares it with `../fpt-platform/config/legal.ts` when that checkout is
present and with its pinned sha256 always), the simulated-accounts sentence (Risk Disclosure Statement § 2.1) and the four legal-document
links (`https://app.fptraders.app/<ar|en>/legal/<terms|privacy|risk|refund>`), all copied verbatim from `fpt-platform/config/legal.ts` and
`config/legal-texts/`. Previews carry the chip «بيانات تجريبية · SAMPLE».

## Stack

- React 19 + React Router 6 · Vite 6 · Tailwind CSS 4 · react-i18next · lucide-react
- Pre-rendering: `vite build` (client) → `vite build --ssr src/entry-server.jsx` → `scripts/prerender.mjs` writes `dist/<path>/index.html` for
  every route × language (90 pages) with the head tags rendered once, `<html lang dir>`, two preloaded font pieces per language, plus `dist/404.html`.
  `src/main.jsx` hydrates a pre-rendered page and renders the 404 shell fresh.
- Hosting: Vercel static output on the apex **`https://fptraders.app`** (+ `www.` → apex 308, project `fpt-website` / alias `fpt-website-rust.vercel.app`,
  team `fiper-card`; FPT-WEBSITE-DOMAIN, owner decision 33-أ, 4 Nov 2026). `vercel.json`: `/pricing` → `/challenges`, `/en/*` → `/*`, `/favicon.ico` →
  `/brand/favicon.ico`, the old image paths → `third-party/`, immutable cache for `/assets`, `/fonts` and `/brand/fonts`, and the **client-app
  redirects**: every path that is not one of the site's 15 routes × 6 languages, a site asset or `/api/*` is a client-area path and goes **308 to
  `https://app.fptraders.app{path}{query}`** (`/ar/signin?ref=CODE` → `app./ar/signin?ref=CODE`, `/c/{code}`, `/mock-gateway/*`, bare `/signin` …;
  Vercel forwards the query). `/api/*` is never redirected: **`/api/webhooks/*` answers 404 on the apex on purpose** — the payment / KYC providers
  are registered on `https://app.fptraders.app/api/webhooks/<provider>` (fpt-platform `docs/go-live-keys.md` § 3/4/5; a redirect would strip the
  signed POST — `FPT-DOMAIN-HANDOFF.md` § 3). Site paths that do not exist (`/fr/nope`, `/help/x`) get `404.html` with a real 404 status;
  unknown root paths (`/anything`) follow the simplest rule and bounce to the app. Live check: `node scripts/check-redirects-live.mjs --base <url>`.
- Origins: `src/config/site.js` is the ONE place — `SITE_ORIGIN = https://fptraders.app` (`BASE` of `src/components/SEO.jsx`: canonical, hreflang,
  og:url, og:image; `public/sitemap.xml`, `public/robots.txt`, the JSON-LD in `index.html`), `APP_ORIGIN = https://app.fptraders.app` (sign-up /
  sign-in buttons via `src/hooks/useAppLinks.js` — `/ar/…` on Arabic pages, `/en/…` elsewhere, `?ref=CODE` appended when the visit carried a
  partner code, `src/lib/referral.js`; the four legal documents), `SUPPORT_EMAIL = help@fptraders.app` (owner decision 18 — footer, contact page,
  help centre; the platform setting `support.email`). Gate: `scripts/check-site-origin.mjs`. `fptraders.com` stays on Hostinger (owner).

## Scripts

```bash
npm install
npm run dev        # Vite dev server (client-only rendering)
npm run check      # the ten gates: logo assets · risk line · i18n keys · font subsets · entity line · site origin · glossary · money · red budget · brand verify-identity (runs before every build)
npm run check:dist # after a build: glossary · money (currencyOrder / doubleSpaces = 0) · red budget on the 90 pre-rendered pages (runs automatically as postbuild)
npm run fonts      # re-cut the font pieces from brand/fonts (after a package upgrade)
npm run build      # client build + SSR build + pre-render → dist/
npm run preview    # NOTE: vite preview rewrites every path to /index.html (SPA); use a plain static host to test the pre-rendered pages and 404
```

## Gates (all must PASS before a commit)

| Gate | What it refuses |
|---|---|
| `scripts/check-logo-assets.mjs` | any file under `public/brand` that is not a byte copy of the v1.2.1 package, the superseded `og-1200x630.png`, any legacy v1 logo name, any Arabic / bilingual lockup served (CR-11) |
| `scripts/check-entity-line.mjs` | an entity line that is not the verbatim `LEGAL.entity.line` of `fpt-platform/config/legal.ts` (platform checkout when present, pinned sha256 always) |
| `scripts/check-site-origin.mjs` | any retired host (`fptraders.com`, `crm.fptraders.com`) in `src/`, the sitemap, robots, the manifest, the worker or `index.html`; a sitemap URL or robots line off `https://fptraders.app`; fewer than 90 sitemap URLs; legal links off `https://app.fptraders.app` |
| `scripts/check-glossary.mjs` (+ `--dist`) | «تحدي / Challenge / Défi / Desafío / Desafio / Zorluk / Meydan okuma» or MT4 / MT5 in any visible text — the six locales, the help content, and (after a build) the text of the 90 pages (RD2 rule 3.5: the product word is «تقييم / Evaluation») |
| `scripts/check-money.mjs` (+ `--dist`) | an amount built by hand, the code before the number, a dollar sign, a double space before a unit; after a build: `currencyOrder` (an Arabic amount outside an LTR isolate) and `doubleSpaces` must be 0 on every page (RD2 rule 3.4: `src/lib/money.jsx` is the ONE format — number · no-break space · code, isolated) |
| `scripts/check-red-budget.mjs` (+ `--dist`) | brand red on a chip, frame, text or `accent-color`; a coloured cTrader mark; after a build more primary buttons on a page than the documented cap (home 2 · evaluations 3 · partners 2 · about 1 · contact / help 0) or any red frame class in the markup (RD2 CR-4 / package CR-14: red = the tile + ONE primary button per viewport) |
| `scripts/build-font-subsets.mjs --check` | a served font piece missing, unlisted or differing from its `SUBSETS.json` sha256, a `SUBSETS.json` whose source sha256 differ from `brand/fonts`, a stale `fonts.generated.css` (no external tool; `--check-fresh` re-cuts with pyftsubset on the build server) |
| `scripts/check-risk-line.mjs` | a missing or altered risk line, any other risk wording, any licence wording |
| `scripts/check-i18n-keys.mjs` | a key used in `src/` that is missing in any of the six locales; key sets that differ between locales |
| `brand/scripts/verify-identity.mjs src public index.html` | non-token colours, deprecated colours, pure black, non-brand fonts, Arabic letter-spacing, red glows, glass cards, float / pulse animations, gradients, emoji, MT4/MT5, the old OG image |

## Structure

```
brand/             fpt-brand v1.2.1 drop-in (read-only; replace whole on upgrade)
public/
  brand/           byte copies: logos (English lockup only), icons, share images, complete fonts (+ SHA256SUMS)
  fonts/           unicode-range font pieces cut from brand/fonts (+ SUBSETS.json) — what the pages load
  sw.js offline.html   conservative service worker (network first, nothing cached) + the offline fallback page (UXFW-052)
  images/third-party/{ctrader,fiper,whatsapp}
  robots.txt sitemap.xml site.webmanifest
scripts/           gates + prerender.mjs
src/
  components/      brand/ (Logo, RiskLine) · layout/ (Navbar, Footer) · sections/ (home) · help/ · ui/ · SEO.jsx
  data/            rules.js (platform mirror) · pricing.js · legal.js · helpContent.js
  i18n/            config.js + locales/{en,ar,fr,es,pt,tr}.json (identical key sets)
  pages/           Home · ChallengePricing · About · Contact · Help · HelpCategory · Partners · NotFound
  App.jsx          router (root = EN, /<lang>/… = the others, /pricing alias, /en alias, * = NotFound)
  entry-server.jsx build-time render (prerender only)
  main.jsx         hydrateRoot / createRoot
handover/          package for the external developer of fptraders.com (HANDOVER.md, dist zip + sha256)
```

## External links

- Client area: `https://app.fptraders.app/<ar|en>/signup` (register) · `/signin` (login) — `src/hooks/useAppLinks.js`; admin `https://admin.fptraders.app`
- Legal documents: `https://app.fptraders.app/<ar|en>/legal/{terms,privacy,risk,refund}`
- Support mailbox: `help@fptraders.app` (text / `mailto:` — footer, contact page, help centre)
- Fiper Card: `https://fiperhub.com` (the site carries ONE wording about the card — the owner's sentence, decision 6 of 1 Nov 2026) · Fiper Global: `https://linktr.ee/fiper` · WhatsApp: `https://wa.me/971561111855`
