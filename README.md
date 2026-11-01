# Fiper Pro Traders — public website (fptraders.com)

Marketing website for **Fiper Pro Traders (FPT)** — Part of Fiper Global. Six languages (EN at the root, AR/FR/ES/PT/TR under `/<lang>/…`),
pre-rendered to static HTML at build time and hydrated on the client.

## Identity (binding)

- **fpt-brand v1.2.0** (pinned 1 Nov 2026) — the drop-in package lives in `brand/` (tokens, fonts, logos, scripts, skill). Every colour, font, radius
  and logo on the site comes from it: `src/index.css` imports `brand/tokens.css` and maps the `--fpt-*` variables into Tailwind's `@theme`;
  the fonts are self-hosted byte copies under `public/brand/fonts` (no Google Fonts); `public/brand/` holds byte copies of the logo set, the
  icons and the two CR-05 share images (`og-1200x630-ar.png` / `-en.png`), checked by `scripts/check-logo-assets.mjs` against
  `public/brand/SHA256SUMS`.
- **fiper-brand v2.3.4** where Fiper appears: the Fiper lockup A (`public/images/third-party/fiper/fiper-lockup-horizontal-colour.svg`, sha256
  `542e2d2a…`), the fixed risk line «الاستثمار ينطوي على مخاطر» / "Investing involves risk" (`src/components/brand/RiskLine.jsx`,
  gate `scripts/check-risk-line.mjs`).
- Third-party marks (cTrader, Fiper, WhatsApp) live under `public/images/third-party/` and are never recoloured.

## Facts come from the platform

The site invents no rule, number or legal text. `src/data/rules.js` mirrors `fpt-platform` `RULES_V1` / `CATALOG_V1` / the affiliate tiers;
`src/data/legal.js` carries the entity line, the simulated-accounts sentence (Risk Disclosure Statement § 2.1) and the four legal-document
links (`https://fptraders.app/<ar|en>/legal/<terms|privacy|risk|refund>`), all copied verbatim from `fpt-platform/config/legal.ts` and
`config/legal-texts/`. Previews carry the chip «بيانات تجريبية · SAMPLE».

## Stack

- React 19 + React Router 6 · Vite 6 · Tailwind CSS 4 · react-i18next · lucide-react
- Pre-rendering: `vite build` (client) → `vite build --ssr src/entry-server.jsx` → `scripts/prerender.mjs` writes `dist/<path>/index.html` for
  every route × language (90 pages) with the head tags rendered once, `<html lang dir>`, two preloaded font files, plus `dist/404.html`.
  `src/main.jsx` hydrates a pre-rendered page and renders the 404 shell fresh.
- Hosting: Vercel static output (`vercel.json`: `/pricing` → `/challenges`, `/en/*` → `/*`, the old image paths → `third-party/`,
  immutable cache for `/assets` and `/brand/fonts`). Unknown paths get `404.html` with a real 404 status. The legal host in every absolute URL is
  `https://fptraders.com` (`BASE` in `src/components/SEO.jsx`, `public/sitemap.xml`, `public/robots.txt`); the domain itself is not wired here.

## Scripts

```bash
npm install
npm run dev        # Vite dev server (client-only rendering)
npm run check      # the four gates: logo assets · risk line · i18n keys · brand verify-identity (runs before every build)
npm run build      # client build + SSR build + pre-render → dist/
npm run preview    # NOTE: vite preview rewrites every path to /index.html (SPA); use a plain static host to test the pre-rendered pages and 404
```

## Gates (all must PASS before a commit)

| Gate | What it refuses |
|---|---|
| `scripts/check-logo-assets.mjs` | any file under `public/brand` that is not a byte copy of the v1.2.0 package, the superseded `og-1200x630.png`, any legacy v1 logo name |
| `scripts/check-risk-line.mjs` | a missing or altered risk line, any other risk wording, any licence wording |
| `scripts/check-i18n-keys.mjs` | a key used in `src/` that is missing in any of the six locales; key sets that differ between locales |
| `brand/scripts/verify-identity.mjs src public index.html` | non-token colours, deprecated colours, pure black, non-brand fonts, Arabic letter-spacing, red glows, glass cards, float / pulse animations, gradients, emoji, MT4/MT5, the old OG image |

## Structure

```
brand/             fpt-brand v1.2.0 drop-in (read-only; replace whole on upgrade)
public/
  brand/           byte copies: logos, icons, share images, fonts (+ SHA256SUMS)
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

- Client area / registration: `https://crm.fptraders.com` (register, login) · platform: `https://fptraders.app`
- Legal documents: `https://fptraders.app/<ar|en>/legal/{terms,privacy,risk,refund}`
- Fiper Card: `https://fiperhub.com` · Fiper Global: `https://linktr.ee/fiper` · WhatsApp: `https://wa.me/971561111855`
