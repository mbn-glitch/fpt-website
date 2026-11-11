# Fiper Pro Traders — public website (fptraders.app)

Marketing website for **Fiper Pro Traders (FPT)** — Part of Fiper Global. Six languages (EN at the root, AR/FR/ES/PT/TR under `/<lang>/…`),
pre-rendered to static HTML at build time and hydrated on the client.

## Visual standard — WEB-VIS-1 (design office, 7 Nov 2026)
The home page is built on the office's VIS-5 kit (frames `w1` / `w2`, 1440 px, Arabic): hero with the REAL client home screen in a 390×844 phone, three stations
with real product screens, five size cards, the public certificate verification field, six FAQ rows and the four-column foot — `src/web.css` (the kit's `.web`
rules under `.fpt-web`) + `src/components/web/*`. Every figure is read from the platform rulebook at sync time (`npm run sync:rules` → `src/data/platform-rules.json`
with the source sha256 / commit; `--check` in `npm run check`), every screen from the VIS references (`npm run sync:shots` → `public/shots/` + `SHOTS.json`) **in the language of the page** — each screen exists as an Arabic and an English capture (`src/lib/shots.js`; Arabic pages the Arabic one, every other locale the English one).
Proof: `~/Projects/WEB-VIS-1-captures/` (SSIM w1 0.9730 / w2 0.9471 after masking the embedded shots — the w2 gap is the owner's money order, legal block and the
language switcher; see `docs/web-vis-1.md`). The desktop header is 76 px with the kit's five links — a three-column grid from 1280 px (design office WEBL-D08, 11 Nov 2026; below 1280 the phone header with the menu sheet, and the hero is one column — WEBL-D19); the font pieces now keep their hinting and include the 500 weights.

## Identity (binding)

- **fpt-brand v1.2.2** (`ee94f05`, 5 Nov 2026 — texts and rules only: CR-13 / CR-14 / CR-15 + its addendum; every asset, token and colour is the v1.2.1 byte, pinned 2 Nov 2026 — owner decisions of 1 Nov 2026 23:08) — the drop-in package lives in `brand/` (tokens, fonts, logos,
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
  `.fpt-h1--home` / `.fpt-h1--compact`) so the hero keeps ≤ 2 lines on 390 px. **CR-15 addendum (owner decision 44 = أ, 5 Nov 2026 — package v1.2.2
  application note § 6.3 / § 7):** the hero step under fr / es / pt / tr **and en** is capped on phones with a 28 px floor — `max(28px, min(2.5rem × scale, 7.85vw))`
  = 30.6 px @ 390 · 28.3 @ 360 · 28 @ 320 (Arabic 40 px; no effect ≥ 456 / 510 px) — and the seven borderline headlines of fr / es / pt are the approved texts
  of § 7 (longest line ≤ 22 characters; source gate `scripts/check-headlines.mjs`; runtime gate: the probe's `h1Lines` ≤ 2 on 390 / 360 / 320, blocking).
  **UX-R4 (owner decisions 57 = أ and 64 = أ, 5 Nov 2026):** pt evaluations «Prove seu talento. / Seja financiado.» (18 / 15 — no allowance left in the gate),
  es help «Respuestas. En orden.» (21 — the § 7 alternative); the English home «Trade with Confidence.» stays and its third line on **320 px alone** is accepted
  by decision (probe `H1_DECIDED`, reported, not blocking). **Hero figures (UXFW-064):** on the ladder — 24 px from 360 px, 18 px below (`.fpt-hero-figure`), never
  a vw-derived size; probe `foldOffLadder` blocks any first-screen size off the ladder (12 · 13 · 14 · 16 · 18 · 24 · 30 · 36 · 40 · 48 · 60 · 72 + the ×0.88 steps + the capped h1).
  Eyebrows / labels are sentence case with no tracking (RD2 F-035 — CR-02). **The application note is read from the package copy only** (`brand/fpt-website-application-note.md`
  = the v1.2.2 file; the site keeps no separate wording — §§ 6–7 there are the binding RD2 rules and headline texts).
- **Desktop first screen (owner decision 54 = ب, 5 Nov 2026 — UXFW-061):** the «first screen» is the FULL viewport, so on ≥ 1024 px the hero of the four marketing
  pages (`.fpt-hero`: home, evaluations, about, partners) owns it — `min-height: calc(100vh − 5rem)`, content centred — and the next section's 48 px h2 never
  shares the first screen (≤ 4 sizes + the 13 px label on 1440 × 900; probe `foldSizes` blocking at every width). Contact / help heroes lead straight into
  their content and are unchanged.
- **Red budget (CR-14 — owner decision 41-أ, 4 Nov 2026):** brand red = the logo tile + ONE primary button per viewport; selected / active states are
  the text colour with a neutral frame; no red chip, frame, icon or `accent-color` (gate `scripts/check-red-budget.mjs`; `brand/fpt-website-application-note.md` § 6).
- **Relationship line once (owner decision 38-ب) · in English in every language (owner decision 65, 5 Nov 2026 — proposed package CR-16, `docs/change-requests.md`)
  · WhatsApp as a neutral card (decision 40-أ):** «Part of Fiper Global» appears once per page under the header lockup — the English text with `lang="en"` in the
  six languages (the English-lockup rule), one text line, never a chip, never clipped: on ≤ 320 px it takes its own row across the full header width
  (`.fpt-header-rel`, `src/index.css` — the header is 72 px there, 64 px from 321 px), from 360 px it fits beside the controls (`RELATIONSHIP_LINE` in `src/components/layout/Navbar.jsx`; probe `headerRel`
  blocking; the footer's legal entity line is a different line and unchanged); no English chip in the hero, no footer line; the floating WhatsApp button is gone — `src/components/ui/WhatsAppCard.jsx`
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
  every route × language (90 pages) with the head tags rendered once, `<html lang dir>`, two preloaded font pieces per language, plus the **404 page in
  the six languages** (`dist/404.html` English, `dist/<lang>/404.html` — owner decision 53, 4 Nov 2026: title, `<html lang dir>`, h1, the risk and entity
  lines once, `noindex`). `src/main.jsx` hydrates every pre-rendered page, the 404 pages included.
- Hosting: Vercel static output on the apex **`https://fptraders.app`** (+ `www.` → apex 308, project `fpt-website` / alias `fpt-website-rust.vercel.app`,
  team `fiper-card`; FPT-WEBSITE-DOMAIN, owner decision 33-أ, 4 Nov 2026). `vercel.json` is written as low-level **`routes`** (the form the earlier
  `redirects` / `headers` / `trailingSlash` compiled to — a `status` per route is what makes the per-language 404 possible): trailing slash → 308,
  `/pricing` → `/challenges`, `/en/*` → `/*`, `/favicon.ico` → `/brand/favicon.ico`, the old image paths → `third-party/`, immutable cache for `/assets`,
  `/fonts` and `/brand/fonts`, and the **client-app redirects as a POSITIVE list (owner decision 51, 4 Nov 2026)**: only the known app paths of
  `FPT-DOMAIN-HANDOFF.md` § 2 — `/{ar|en}/(signin|signup|reset|verify|2fa|home|accounts|account|shop|checkout|orders|payouts|certificates|notifications|profile|more|legal|manifest.webmanifest)(/…)?`,
  bare `/signin`, `/signup`, `/c/{code}`, `/mock-gateway/*` — go **308 to `https://app.fptraders.app{path}{query}`** (Vercel forwards the query:
  `/ar/signin?ref=CODE` → `app./ar/signin?ref=CODE`). **Every other unknown or mistyped path stays on the site's 404 page in the language of its prefix**
  (`/ar/anything` → the Arabic page, `/fr/typo` → the French one, `/anything` and `/xx/typo` → English) with a real 404 status — the `{ "handle": "error" }`
  routes map `/<lang>/…` to `/<lang>/404.html`. `/api/*` is never redirected and answers 404: **`/api/webhooks/*` is 404 on the apex on purpose** — the
  payment / KYC providers are registered on `https://app.fptraders.app/api/webhooks/<provider>` (fpt-platform `docs/go-live-keys.md` § 3/4/5; a redirect
  would strip the signed POST — `FPT-DOMAIN-HANDOFF.md` § 3). Offline proof: `scripts/check-routes.mjs` (in `check:dist`) resolves 36 app paths × 2,
  25 unknown paths, the site's pages and aliases through `scripts/lib/vercel-routes.mjs`; live: `node scripts/check-redirects-live.mjs --base <url>`.
- Origins: `src/config/site.js` is the ONE place — `SITE_ORIGIN = https://fptraders.app` (`BASE` of `src/components/SEO.jsx`: canonical, hreflang,
  og:url, og:image; `public/sitemap.xml`, `public/robots.txt`, the JSON-LD in `index.html`), `APP_ORIGIN = https://app.fptraders.app` (sign-up /
  sign-in buttons via `src/hooks/useAppLinks.js` — `/ar/…` on Arabic pages, `/en/…` elsewhere, `?ref=CODE` appended when the visit carried a
  partner code, `src/lib/referral.js`; the four legal documents), `SUPPORT_EMAIL = help@fptraders.app` (owner decision 18 — footer, contact page,
  help centre; the platform setting `support.email`). Gate: `scripts/check-site-origin.mjs`. `fptraders.com` stays on Hostinger (owner).

## Scripts

```bash
npm install
npm run dev        # Vite dev server (client-only rendering)
npm run check      # the static gates: logo assets · risk line · i18n keys · font subsets · entity line · site origin · glossary · money · red budget · headlines · platform rules · product shots · language assets · translation parity · brand verify-identity (runs before every build)
npm run check:lang # after a build: the LANGUAGE SWEEP in a real browser — every route × ar / en × 320 / 360 / 390 / 430 / 1440 px, loaded directly and switched both ways with the site's own control, fr / es / pt / tr at 360 / 390, the header in the six languages at 1024 / 1280 / 1366 / 1440 / 1920, the Turkish hero at 360 / 393 (exit 1 on any finding)
npm run check:dist # after a build: glossary · money (currencyOrder / doubleSpaces = 0) · red budget · routes (decisions 51 / 53) on the 96 pre-rendered pages (runs automatically as postbuild)
npm run serve      # dist/ on http://localhost:4174 with the vercel.json routes applied (redirects, per-language 404 with a 404 status) — the host of the probes
npm run fonts      # re-cut the font pieces from brand/fonts (after a package upgrade)
npm run build      # client build + SSR build + pre-render → dist/
npm run preview    # NOTE: vite preview rewrites every path to /index.html (SPA); use `npm run serve` to test the pre-rendered pages, the redirects and the 404s
```

## Gates (all must PASS before a commit)

| Gate | What it refuses |
|---|---|
| `scripts/check-logo-assets.mjs` | any file under `public/brand` that is not a byte copy of the package (v1.2.1 bytes — unchanged in v1.2.2), the superseded `og-1200x630.png`, any legacy v1 logo name, any Arabic / bilingual lockup served (CR-11) |
| `scripts/check-entity-line.mjs` | an entity line that is not the verbatim `LEGAL.entity.line` of `fpt-platform/config/legal.ts` (platform checkout when present, pinned sha256 always) |
| `scripts/check-site-origin.mjs` | any retired host (`fptraders.com`, `crm.fptraders.com`) in `src/`, the sitemap, robots, the manifest, the worker or `index.html`; a sitemap URL or robots line off `https://fptraders.app`; fewer than 90 sitemap URLs; legal links off `https://app.fptraders.app` |
| `scripts/check-glossary.mjs` (+ `--dist`) | «تحدي / Challenge / Défi / Desafío / Desafio / Zorluk / Meydan okuma» or MT4 / MT5 in any visible text — the six locales, the help content, and (after a build) the text of the 90 pages (RD2 rule 3.5: the product word is «تقييم / Evaluation») |
| `scripts/check-money.mjs` (+ `--dist`) | a currency sign, a «200K» short form, a spelled-out currency or «%80» in the head texts (`meta.*`, `*.metaTitle / metaDescription`) of any locale (WEBL-D10); an amount built by hand, the code before the number, a dollar sign, a double space before a unit; after a build: `currencyOrder` (an Arabic amount outside an LTR isolate) and `doubleSpaces` must be 0 on every page (RD2 rule 3.4: `src/lib/money.jsx` is the ONE format — number · no-break space · code, isolated) |
| `scripts/check-routes.mjs` (after a build) | a `vercel.json` that is not the low-level `routes`; an app path of the handoff that does not 308 to `app.` with its query; an unknown path (`/anything`, `/ar/anything`, `/fr/typo`, `/xx/typo`, `/api/x`) that is not the site's 404 page of its prefix language with a 404 status; a 404 page without its title, `lang/dir`, h1, risk and entity line once, `noindex` (owner decisions 51 / 53) |
| `scripts/check-red-budget.mjs` (+ `--dist`) | brand red on a chip, frame, text or `accent-color`; a coloured cTrader mark; after a build more primary buttons on a page than the documented cap (home 2 · evaluations 2 · partners 2 · about 1 · contact / help 0) or any red frame class in the markup (RD2 CR-4 / package CR-14: red = the tile + ONE primary button per viewport) |
| `scripts/check-headlines.mjs` | a `hero.title*` / `challengePricing.heroTitle*` / `help.title*` line over 22 characters in fr / es / pt, or an `about.title` over 46 characters or without a word break before character 23 (CR-15 addendum, decision 44 = أ; since decision 57 = أ there is no allowance — the pt evaluations line is 18 / 15) |
| `scripts/build-font-subsets.mjs --check` | a served font piece missing, unlisted or differing from its `SUBSETS.json` sha256, a `SUBSETS.json` whose source sha256 differ from `brand/fonts`, a stale `fonts.generated.css` (no external tool; `--check-fresh` re-cuts with pyftsubset on the build server) |
| `scripts/check-risk-line.mjs` | a missing or altered risk line, any other risk wording, any licence wording |
| `scripts/check-lang-assets.mjs` | a product screen (`public/shots`) that does not exist in BOTH asset languages (ar · en), a literal `/shots/…` path outside `src/lib/shots.js`, a one-language picture referenced without a language choice, a served picture the register (`scripts/lib/lang-assets.mjs`) does not know, an SVG with `<text>` |
| `scripts/check-translation-parity.mjs` | a translation (six locale files + the help centre) of an English text ≥ 60 characters that is shorter than 0.75 of it (0.55 for Arabic) or has a different number of sentences — a sentence that fell out of a translation (WEBL-D04 / D14); exceptions are named in `scripts/translation-parity-exceptions.json` |
| `scripts/check-i18n-keys.mjs` | a key used in `src/` that is missing in any of the six locales; key sets that differ between locales |
| `brand/scripts/verify-identity.mjs src public index.html` | non-token colours, deprecated colours, pure black, non-brand fonts, Arabic letter-spacing, red glows, glass cards, float / pulse animations, gradients, emoji, MT4/MT5, the old OG image |

## Language sweep (`npm run check:lang` — FPT-LANG-SWEEP, 11 Nov 2026)

`npm run build && npm run check:lang` serves `dist/` on a free port (from 4610; its own pid, stopped by the script) and walks the 16 screens (+ the open phone menu) in ONE Chromium:
Arabic and English at 320 / 360 / 390 / 430 / 1440 px, each loaded directly AND reached through the site's language control (ar → en, en → ar), plus fr / es / pt / tr at 360 / 390 px.
**Design office guards (LAUNCH-I18N-1, 11 Nov 2026):** the header on the home page in the SIX languages at 1024 / 1280 / 1366 / 1440 / 1920 px — no two controls may intersect (WEBL-D08:
the bar is a three-column grid, the desktop bar starts at 1280 px); the Turkish hero at 360 / 393 px (WEBL-D02); the 404 page switched to English from fr / pt (WEBL-D11).
`node scripts/lang-sweep.mjs --selftest` plants one defect of each kind and fails unless every detector reports it.
It refuses horizontal overflow, clipped text, overlapping text, intersecting header controls, untranslated text (Arabic on a non-Arabic page; Latin words on the Arabic page outside `ALLOW_LATIN`; closed FAQ
answers, `alt` / `aria-label` / `placeholder`, the title and description included), a wrong `<html lang dir>` or text direction, a failed switch, and **a picture of one language
shown in another** (the home-page product screens exist per language — `public/shots/<id>.ar.*` / `<id>.en.*`, Arabic pages the Arabic capture, every other locale the English one: `src/lib/shots.js` + `<Shot id>`; register `scripts/lib/lang-assets.mjs`). Must print `lang-sweep: PASS`
before every commit that touches a page, a locale file or a picture; `--shots <dir> --out <file.json>` keep the screenshots and the findings (JSON + Markdown).
Playwright is not a dependency of the site (`FPT_PLAYWRIGHT`, else the fpt-platform checkout); Chromium is the copy under `~/.cache/pw-cr10`.

## Runtime probe (`scripts/ux-probe.mjs`)

`node scripts/ux-probe.mjs --base http://localhost:4174 --langs ar,en,fr,es,pt,tr --widths 390` walks the 16 screens (15 routes + the 404 page) in Chromium
(the real copy under `~/.cache/pw-cr10`; Playwright and `@axe-core/playwright` from `FPT_PLAYWRIGHT_TOOLS`) and refuses: console errors, a fixed element,
a relationship line ≠ 1, more than one primary button per 390 px viewport, red beyond the primaries, a `mailto:` < 44 px, an Arabic amount painted code-first,
a double space, a glossary hit, **an axe violation of impact serious / critical** (wcag2a / aa / 21aa / best-practice — UXFW-057 `listitem`), **more than
4 text sizes + the 13 px label in the first screen** (CR-06 — UXFW-020 / 058), **Plex Mono on a word** (ID-05 — UXFW-060), text under 12 px, and on the 404
screen a status ≠ 404, a wrong `<html lang>`, a missing title / h1 / risk / entity line. **UX-R3 (5 Nov 2026):** `h1Lines` is counted from the line boxes
of the h1 (with the rendered px and the longest line) and **blocks** when the hero h1 of home / evaluations / about / help exceeds 2 lines on 390 / 360 / 320
under fr / es / pt / tr / en (decision 44 = أ; Arabic reported; **the one decided exception is `H1_DECIDED` = `home/en/320` — owner decision 64 = أ accepts the
third line of the English home headline on 320 px alone, reported, never blocking**); `foldSizes` is counted on the **full viewport** outside the header and blocks at every width,
1440 × 900 included (decision 54 = ب). **UX-R4 (5 Nov 2026):** `headerRel` blocks when the header relationship line is not «Part of Fiper Global» with `lang="en"`,
is not exactly once in the header, wraps, is clipped / truncated (natural width > its box, or an overflow-hidden ancestor) or overlaps the header controls — at every
width (decision 65); `foldOffLadder` blocks a first-screen size off the site ladder (UXFW-064 — the hero figures were 6.5vw = 23.4 px on 360). Viewports: 390 × 844 · 360 × 780 · 320 × 568 · ≥ 431 × 900. Rounds: `--widths 390` (16 × 6), `--widths 1440 --langs ar,en,fr`
(16 × 3), `--widths 390,360,320 --only home,challenges,about,help --langs en,fr,es,pt,tr,ar` (the CR-15 set + the header on 320 / 360 in the six languages + the home figures on 360).

## Structure

```
brand/             fpt-brand v1.2.2 drop-in (read-only; replace whole on upgrade — text files only changed in v1.2.2)
public/
  brand/           byte copies: logos (English lockup only), icons, share images, complete fonts (+ SHA256SUMS)
  fonts/           unicode-range font pieces cut from brand/fonts (+ SUBSETS.json) — what the pages load
  sw.js offline.html   conservative service worker (network first, nothing cached) + the offline fallback page (UXFW-052)
  images/third-party/{ctrader,fiper,whatsapp}
  robots.txt sitemap.xml site.webmanifest
docs/              decisions.md (owner decisions recorded in the repo) · status-56.md (the site's copy of the design office's STATUS-56 rows touched by the rounds)
scripts/           gates + prerender.mjs + check-routes / serve-dist (lib/vercel-routes.mjs) + ux-probe + lang-sweep / check-lang-assets (lib/lang-assets.mjs) + the live checks (smoke-live, check-redirects-live)
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
