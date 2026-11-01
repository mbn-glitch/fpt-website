# MISSING ASSETS — FPT Brand v1.0: what does not exist in any source, what stands in for it, its limits, and who supplies it

Rules (inherited): a missing official asset is recorded here, **never created** and never presented as official. No modified logo under any label (no recolouring, cropping, retracing, flattening, re-centring); the 24 vector masters in `logos/svg/` are used as they are, every other logo file is a render of them. Logo detail: `logos/MISSING-ASSETS.md`. Priority: **P1** blocks a live or launch surface · **P2** blocks a template from being final · **P3** nice to have / owner decision.

## 1. Missing assets

| # | Missing asset | What exists (official) | Interim use and its limits | Who supplies | Priority |
|---|---|---|---|---|---|
| 1 | **FPT logo vector** (SVG / AI / EPS / PDF): tile, horizontal lockup, stacked lockup | **RESOLVED by logo v2 (30 Oct 2026, CEO approval)**: `logos/svg/` (24 masters), `logos/pdf/` (24), `logos/eps/` (21) | vector — no print maximum | — | resolved |
| 2 | **White-wordmark lockup for dark grounds** | **RESOLVED by logo v2 (30 Oct 2026, CEO approval)**: `logos/svg/fpt-lockup-horizontal-en-white.svg`, `-vertical-en-white` (the `-ar-white` / `-bilingual-white` masters exist but are **archival** since CR-11, 1 Nov 2026) | the name is no longer typed as text beside the tile | — | resolved |
| 3 | **Transparent tile** (PNG with alpha) | **RESOLVED by logo v2 (30 Oct 2026, CEO approval)**: every `logos/png/` render is transparent (`fpt-tile-48…4096.png`, `fpt-tile-small-16/24/32.png`) | the 22 % CSS clip is DEPRECATED — never clip the tile | — | resolved |
| 4 | **Endorsement lockup artwork "Part of Fiper Global"** | text in both languages (`footer.partOf`, `nav.partOfFiperGlobal`); the parent's official Fiper rasters (`assets/fiper-logo-white.OFFICIAL-stacked-720.png`, `fiper-logo-black.OFFICIAL-3000.png`) | PROPOSED geometry from the parent product-lockup ratios (`tokens.json component.logo.endorsement`: name 0.62 H, gap 0.4 H, Fiper lockup 0.5 H, divider 1 px) — decision item 4; text form primary on phones | Fiper Global design team | P2 |
| 5 | **Arabic wordmark / Arabic lockup** | **RESOLVED by logo v2 (30 Oct 2026, CEO approval) — then WITHDRAWN from use by CR-11 (owner, 1 Nov 2026: «الشعارات إنجليزي فقط»)**: `logos/svg/fpt-lockup-horizontal-ar.svg` / `-white`, `fpt-lockup-vertical-ar.svg` / `-white`, `fpt-lockup-bilingual.svg` / `-white` stay as archival masters (bytes unchanged) | the English lockup is used on every surface and in every language; gate ARABIC-LOCKUP-IN-USE | — | resolved (archival) |
| 6 | **Mono / single-colour tile** (one-colour print, embossing, watermark) | **RESOLVED by logo v2 (30 Oct 2026, CEO approval)**: `logos/svg/fpt-tile-flat.svg` (`#F42821`), `fpt-tile-ink.svg`, `fpt-tile-white.svg`, `fpt-mark-ink` / `-white` / `-red` | the only approved alternatives to the gradient | — | resolved |
| 7 | **CMYK / Pantone** for `#F42821`, `#A30100`, `#0A0A0A` | none (sRGB only) | office print only; press-ready = REQUIRED DECISION (`templates/document/PRINT-SPEC.md`) | brand owner + printer proof | P2 |
| 8 | **Brand kit documents** `FPT_BRAND_KIT.pdf`, `Fiper_Visual_Identity_Reference.pdf` (named in the task file) | not found anywhere on the server | this system is built from the site, the parent and the task file; if a kit exists its vectors replace #1 and its rules override PROPOSED values | brand owner | P2 |
| 9 | **Favicon / app-icon masters** | **RESOLVED by logo v2 (30 Oct 2026, CEO approval)**: `logos/svg/fpt-tile-small.svg` (≤ 32 px), `fpt-appicon.svg`, `fpt-appicon-round.svg`, the two Android adaptive layers → `logos/icons/` (favicon.ico / .svg / -16…64, apple-touch-icon-180, ios-appstore-1024, pwa 192 / 512 / maskable, Android 432 ×2 + play 512, avatars, `site.webmanifest`) | the site's `favicon.svg` (retyped "FPT") stays banned | — | resolved |
| 10 | **Official OG / share image** | **RESOLVED by logo v2 (30 Oct 2026) and recomposed by CR-05 (owner, 1 Nov 2026)**: `logos/derived/og-1200x630-ar.png` / `og-1200x630-en.png` — dark ground, the white horizontal lockup, the fixed risk line in the label colour (two files by the line's language); the v1.1 `og-1200x630.png` (vertical lockup on white) is superseded in `logos/_deprecated/derived/` | placement geometry (tile 120 px, margin 64 px) PROPOSED; the Arabic lockup on the AR version is an open question (v1.2.0 report) | — | resolved |
| 11 | **Official FPT product screenshots** (challenge dashboard, CRM, certificate, statement) | none — the dashboard, certificate and statement are under construction; `DashboardPreview.jsx` is a coded mock with unsourced figures | the eight mockups in `mockups/` are reference compositions on SAMPLE data, chipped «بيانات تجريبية»; never presented as the product | product team (when built) | P2 |
| 12 | **Real trading-platform screens** | **exist**: the official cTrader media kit in `fpt-website/public/images/ctrader/Media` (8 desktop + 13 mobile PNG) + logo / icon SVG+PNG (`assets/third-party/ctrader/`) — the only real screens available | use pixel-accurate inside the device bezel; never MT4 / MT5 screens or logos | — (present) | — |
| 13 | **Fiper Card artwork** | **exists**: `assets/fiper-physical-card.OFFICIAL.png` (1500 × 951, the parent's official file) | never recoloured or regenerated | — (present) | — |
| 14 | **Regulatory texts** (entity of record, risk statement, legal documents, e-mail / document foot) | none for FPT; the site's `footer.riskDisclosure` is an unapproved sentence and its legal links point to the parent's page | placeholder comment on every template; `regulatory-matrix.md` decisions 1–11 | Amir / legal | **P1** (blocks any public-facing final template) |
| 15 | **Trader agreement text** (AR + EN) | none | `templates/document/trader-agreement.html` is layout only | legal | **P1** for the agreement surface |
| 16 | **Invoice entity, tax / VAT treatment, registration number** | none | invoice template carries the verbatim fee and a placeholder tax row | finance / legal | P2 |
| 17 | **Trustpilot rating source** (`hero.trustpilot` «4.2 · ممتاز») | no profile URL or evidence in the inputs | removed from templates / mockups; the site keeps it until decided (application note) | marketing | P2 |
| 18 | **Trust-bar statistics and trader stories** (125K+ funded accounts, 43K+ rewarded traders, $150M+ rewarded, 140+ countries; six named quotes with profit figures) | no source — coded literals in `TrustBar.jsx`, `TraderStories.jsx` | **a defect, not an asset**: never reproduced; remove or replace with sourced figures (anti-AI-tell: invented statistics) | marketing with evidence | **P1** (public claim) |
| 19 | **Arabic hero badge** («Backed by Fiper Global …» exists in English only) | the English sentence is approved verbatim | shown in English on every locale (as the site does); an Arabic version must be supplied / approved, not translated here | Fiper Global marketing | P3 |
| 20 | **Official Arabic product transliteration** | two observed forms (`glossary.md` § 1): Latin kept (FPT site) vs «فايبر برو تريدرز» (fiper.io) | the FPT site's form (Latin inside Arabic) is applied | brand owner (one form for both sites) | P3 |
| 21 | **Native NLE video template** (AE / Premiere / DaVinci) | none | SVG lower third + safe areas, HTML end card, 5-second rendered sample (`templates/video/`) | video team | P3 |
| 22 | **Live cTrader-credentials e-mail and CRM screens** (named as live surfaces) | not in the inputs | the credentials template is built from the task-file facts (login / server / platform) on SAMPLE values | ops (export the live template for alignment) | P2 |

## 2. Not missing — present official files (for the record)
`logos/svg/*.svg` (24 vector masters, logo v2) + their renders in `logos/png/`, `logos/pdf/`, `logos/eps/`, `logos/icons/`, `logos/derived/`, `assets/fiper-logo-white.OFFICIAL-stacked-720.png`, `assets/fiper-logo-black.OFFICIAL-3000.png`, `assets/fiper-physical-card.OFFICIAL.png`, `assets/third-party/ctrader/*.svg` (10), `fonts/*.woff2` (17, OFL), `icons/lucide/*.svg` (72, ISC), `src/i18n/locales/ar.json` + `en.json` strings (verbatim source of every label), `src/data/pricing.js` (fees and rules), the task-file facts.

## 3. PROPOSED lockup rules (text beside the tile; ratios from `tokens.json component.logo.endorsement` — decision item 4)

Reference unit: **H** = tile height. The tile is square (aspect 1.000, one rounded corner r = 0.20 H bottom-left); the horizontal lockup is 4.7364 : 1 with the wordmark starting 0.3333 H after the tile (logo v2).

### A. Name beside the tile on dark grounds (navbar, app header, video, dark social) — superseded by the official white lockups of logo v2 (`logos/svg/fpt-lockup-horizontal-en-white.svg` / `-ar-white`); kept only for the relationship line
```
[ fpt-lockup-horizontal-en-white.svg, tile height H (the vector wordmark replaces the typed name) ]  +  optional second line «جزء من Fiper Global» (Inter/Plex Arabic 600, label colour, .06em max)
```
- Navbar today: tile 46 px + name 15 px + relationship line 9 px (OBSERVED, `Navbar.jsx`) — the 9 px line is below the 11 px floor and tracked `.2em`: PROPOSED 11 px, `.06em`, label colour.
- The tile never mirrors; in RTL it stays at the inline-start (right), the text to its left.

### B. "Part of Fiper Global" endorsement row (document foot, e-mail foot, end card, certificate)
```
[ FPT tile, height H ]  clear 0.5 H  |  1 px --fpt-line-ash divider (0.8 H)  |  gap 0.4 H  [ Fiper lockup (official raster: white stacked on dark, dark raster on paper), optical height 0.5 H ]
```
- Text form «جزء من Fiper Global» / "Part of Fiper Global" is the primary form on phones (< 640 px) and wherever 0.5 H would put the Fiper lockup below 20 px.
- Never: the Fiper lockup larger than the FPT tile on an FPT surface; both marks on brand red; a stacked arrangement without the divider; "by Fiper" wording (the approved form is "Part of Fiper Global").

### C. Partner mark (cTrader) beside the tile
```
[ FPT tile, height H ]  clear 0.5 H  |  1 px divider (H)  |  clear 0.5 H  [ cTrader logo from the official pack, optical height = H ]
```
- Official pack only (`assets/third-party/ctrader/`), unmodified, its own clear space; dark variant on dark, light variant on paper; MT4 / MT5 never.

Status of A–C: PROPOSED (no official artwork exists). Changing a ratio = edit `tokens.json component.logo.endorsement.*` and re-check `components/preview.html`, the mockups and the templates (layout re-check rule — not a one-token flip).
