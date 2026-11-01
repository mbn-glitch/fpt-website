# brand/logos — FPT logo v2 (v1.2.0, 1 Nov 2026; logo v2 since v1.1, 30 Oct 2026 — the logo itself is unchanged)

Approved by Mohammed Alboinin (CEO) on 30 Oct 2026: «اعتمد وحدث هوية اف بي تي بالشعار المحسن (لاشيء آخر من معايير الهوية)». Status of every file and value below: **APPROVED — logo v2 — CEO approval 30 Oct 2026**. Source of truth for every value: `source/spec.json` + `source/README.md` (construction, colours, lockup ratios, small cut, app-icon placements, lettering sources). The 24 vector masters in `svg/` are authoritative and are **never edited, optimised, reformatted, recoloured, retraced or redrawn**; every other file in this folder is a render of them made by `scripts/build-logos.mjs` (deterministic). The v1 JPEGs and their downscales are in `legacy-v1/` — superseded, never use.

Nine refinements over v1 (all approved): vector master · one slant (12.5°) · one cut width · concentric arcs · one baseline · matched ticks · 20 % tile corner in every file + optical placement · a small-size cut for ≤ 32 px · a vector wordmark with white, Arabic and bilingual lockups.

## 1. Masters (`svg/`, 24 files, all lettering outlined — no font needed)

| File | What it is | Ground / surface |
|---|---|---|
| `fpt-tile.svg` | gradient tile (`#F62721 → #A30100`, 135°, 20 % bottom-left corner) + white monogram | the primary logo on any ground (dark, paper, photo) |
| `fpt-tile-flat.svg` | flat `#F42821` tile + white monogram | one-colour print, embroidery, stamping |
| `fpt-tile-ink.svg` | `#120D0E` tile, monogram knocked out (transparent) | one-colour dark print, documents |
| `fpt-tile-white.svg` | white tile, monogram knocked out (transparent) | dark grounds and photographs |
| `fpt-tile-small.svg` | **small cut**: no ticks, cut 1.6u, mark 82 % of the tile | **every rendered size ≤ 32 px only** (favicons, smallest icons); never above 32 px |
| `fpt-mark-gradient.svg` · `-white` · `-ink` · `-red` | the monogram without the tile | watermarks, merchandise; the white one on brand red |
| `fpt-lockup-horizontal-en.svg` · `-white` | tile + "Fiper Pro Traders" (aspect 4.7364) | paper / dark grounds — headers, documents, e-mail |
| `fpt-lockup-horizontal-ar.svg` · `-white` | «فايبر برو تريدرز» + tile on the **right** (aspect 3.9043) | Arabic surfaces |
| `fpt-lockup-bilingual.svg` · `-white` | tile + English line + Arabic line (aspect 3.2272) | signage, documents, events |
| `fpt-lockup-vertical-en.svg` · `-white` | tile above the English name (aspect 1.1154) | square formats, OG, certificates |
| `fpt-lockup-vertical-ar.svg` · `-white` | tile above the Arabic name (aspect 0.9586) | square Arabic formats |
| `fpt-appicon.svg` | full-bleed gradient, mark 74 % | iOS app icon (system mask), store listings, apple-touch-icon |
| `fpt-appicon-round.svg` | full-bleed gradient, mark inside a 0.38 circle | social avatars (circle crop), PWA maskable |
| `fpt-android-adaptive-foreground.svg` + `-background.svg` | 108 dp layers, mark inside the 33 dp safe circle | Android adaptive icon |
| `fpt-construction.svg` | the construction drawing | manual / documentation only — never as a logo |

Ink versions (`fpt-tile-ink`, `fpt-mark-ink`, the non-white lockups) carry the wordmark ink `#120D0E`; the `-white` versions carry `#FFFFFF`. Colour versions are the only approved alternatives to the gradient: flat `#F42821`, ink `#120D0E`, white `#FFFFFF`, and the red mark `#F42821`.

## 2. Which file where

| Surface | File |
|---|---|
| Dark grounds (apps, site, dark social, video, splash) | `fpt-lockup-horizontal-en-white.svg` / `-ar-white` / `-bilingual-white`, or the gradient `fpt-tile.svg` alone where only the mark fits |
| Paper grounds (documents, e-mail, print, light social) | `fpt-lockup-horizontal-en.svg` / `-ar` / `-bilingual` (ink wordmark), or `fpt-tile.svg` / `fpt-tile-ink.svg` |
| Arabic surfaces | the Arabic lockup (`fpt-lockup-horizontal-ar` / `-vertical-ar`, white versions on dark) — the tile sits on the right, the mark itself is never mirrored |
| Square formats, OG, certificates, square profiles | `fpt-lockup-vertical-en` / `-ar` (white on dark) |
| Signage, documents, events | `fpt-lockup-bilingual` / `-white` |
| Renders ≤ 32 px (favicon 16 / 32, smallest icons) | `fpt-tile-small.svg` only |
| App icons | `fpt-appicon.svg` (iOS, store, apple-touch-icon), `fpt-appicon-round.svg` (avatars, PWA maskable), the two Android adaptive layers |
| One-colour print | `fpt-tile-flat.svg` (red), `fpt-tile-ink.svg` (dark), `fpt-tile-white.svg` (on dark stock) |
| Watermark, merchandise | `fpt-mark-*` |

Sizes in place (unchanged from v1.0): navbar tile 46 px (OBSERVED), footer 44 px (OBSERVED), app header 32 px, A4 document header 8 mm lockup, e-mail header 160 × 56 CSS (`derived/email-header-160-paper@2x.png`, flattened on the paper token — owner decision 1 Nov 2026) or 120 × 42 (`-120-paper@2x`), share image 1200 × 630 (`derived/og-1200x630-ar.png` / `-en.png`, CR-05), video corner 56 px per 1080 px width, splash 120–160 px (PROPOSED sizes).

## 3. Renders (`png/`, transparent PNG, `<master>-<size>.png`)

| Masters | Sizes | Files |
|---|---|---|
| `fpt-tile`, `fpt-tile-flat`, `fpt-tile-ink`, `fpt-tile-white` | 48, 64, 128, 256, 512, 1024, 2048, 4096 px square (`-<size>`) | 32 |
| `fpt-tile-small` | 16, 24, 32 px (`-16` … `-32`) — **the only files at or below 32 px anywhere** | 3 |
| `fpt-mark-gradient`, `-white`, `-ink`, `-red` | widths 128, 256, 512, 1024, 2048, 4096 (`-w<width>`) | 24 |
| the 10 lockups | heights 48, 64, 128, 256, 512, 1024 (`-h<height>`) | 60 |

## 4. Vector exports

| Folder | Files | Note |
|---|---|---|
| `pdf/` | one vector PDF per master (24) | Chromium print of the inline SVG at 1 unit = 1 px; checked: path operators only, no image XObject |
| `eps/` | one vector EPS per master except the two Android layers and the construction drawing (21) | ghostscript `eps2write` from the PDF; vector paths, no raster |

## 5. Icons (`icons/`)

| File | Source | Use |
|---|---|---|
| `favicon.ico` | 16 + 32 from `fpt-tile-small`, 48 from `fpt-tile` | `<link rel="icon" href="/favicon.ico">` |
| `favicon.svg` | byte copy of `fpt-tile-small.svg` | `<link rel="icon" type="image/svg+xml">` (browsers render it small) |
| `favicon-16.png`, `favicon-32.png` | small cut | PNG favicons |
| `favicon-48.png`, `favicon-64.png` | `fpt-tile` | larger favicons / shortcuts |
| `apple-touch-icon-180.png` | `fpt-appicon` (opaque, no alpha) | iOS home screen |
| `ios-appstore-1024.png` | `fpt-appicon` (opaque, no alpha) | App Store listing |
| `pwa-icon-192.png`, `pwa-icon-512.png` | `fpt-appicon` | PWA `any` icons |
| `pwa-maskable-512.png` | `fpt-appicon-round` | PWA `maskable` icon |
| `android-adaptive-foreground-432.png`, `android-adaptive-background-432.png` | the two Android layers (108 dp × 4) | Android adaptive icon |
| `android-play-512.png` | `fpt-appicon` | Google Play listing |
| `avatar-1080.png`, `avatar-400.png` | `fpt-appicon-round` | social avatars (platform circle crop) |
| `site.webmanifest` | — | documented icons example (`any` 192 / 512 + `maskable` 512) |

## 6. Derived compositions (`derived/`, v1.2.0 — owner decisions 1 Nov 2026; every value read from `tokens.json`)

| File | Composition | Status |
|---|---|---|
| `email-header-160-paper@2x.png` | `fpt-lockup-horizontal-en` 300 px wide centred in 320 × 112, **flattened on the paper token `#F7F4F1`** (`component.email.logo-ground`) — the e-mail header at 160 × 56 CSS (`component.email.logo-file`) | APPROVED (owner, 1 Nov 2026) |
| `email-header-120-paper@2x.png` | the same lockup 225 px wide in 240 × 84 on the paper token — 120 × 42 CSS for compact mails | APPROVED |
| `email-header-160-transparent@2x.png`, `email-header-120-transparent@2x.png` | the same boxes with an alpha channel — for a header on another light ground (a white card); **never for the paper mail** (an inverting client would hide a transparent dark wordmark) | APPROVED |
| `og-1200x630-ar.png` / `og-1200x630-en.png` | CR-05: dark ground `#0A0A0A`, `fpt-lockup-horizontal-en-white` centred at tile height 120 px, the fixed risk line «الاستثمار ينطوي على مخاطر» / "Investing involves risk" bottom-start (margin 64 px) in the label colour at 16 px (= 14.4 px at 1080 wide, ≥ 12); the wording comes from `component.og.risk-line.*` and is asserted verbatim on the rendered DOM | APPROVED wording / ground / colour / size; placement PROPOSED |
| `email-tile-112@2x.png` | `fpt-tile` at 112 px (CSS 56) — no longer used by the reference mails (paper in every mode) | render |

Superseded (`_deprecated/derived/`, never use, refused by `verify-identity` OLD-EMAIL-HEADER / OLD-OG-IMAGE and by `check-emails` by pixel): `email-header-320x112@2x.png` (opaque white box over the paper shell), `og-1200x630.png` (vertical lockup on white, no risk line). `_deprecated/README.md` records why.

Render checks (`dist/logo-checks/`, build repo): small cut at 16 / 24 / 32 px and the master tile at 46 / 180 / 512 px, the horizontal lockup at heights 24 / 32 / 46 / 120 / 242 (white lockup on `#0A0A0A`, ink lockup on white).

## 7. Rules

- **Clear space** = 0.5 × tile height on all sides (unchanged). Nothing enters it: no text, divider or partner mark.
- **Minimum sizes** (unchanged): tile 16 px on screen (small cut) / 4 mm in print; lockup 24 px on screen / 8 mm in print. **No maximum** — the masters are vectors (the v1 print limits of 20 mm / 103 mm no longer exist).
- **Small cut**: `fpt-tile-small.svg` for every rendered size at or below 32 px, never above; the master tile for everything larger.
- **Never mirrored**: the mark stays as drawn in RTL; the Arabic lockup puts the tile on the right of the name. `direction: ltr` on the brand element where the lockup is an image.
- **Never clipped**: the tile carries its own single 20 % bottom-left corner; no CSS `border-radius`, `clip-path` or `object-fit` crop on any logo file (the v1 22 % clip only hid the JPEG's white margin — DEPRECATED).
- **Colour**: the tile gradient `#F62721 → #A30100` (135°, top-left to bottom-right) equals the UI pair `#F42821 → #A30100`; the only other versions are the approved flat / ink / white files. The wordmark is `#120D0E` on paper and `#FFFFFF` on dark.
- **Lettering source**: D-DIN PRO ExtraBold (Latin) and IBM Plex Sans Arabic Bold (Arabic), both OFL — outlined in every file. D-DIN PRO is the logo's lettering source only; it is not a brand typeface, not in `brand/fonts`, not a token.
- **Endorsement row "Part of Fiper Global"** (decision item 4, unchanged): tile at height H → clear 0.5 H → 1 px divider (0.8 H) → gap 0.4 H → the official Fiper raster at 0.5 H (`../assets/fiper-logo-white.OFFICIAL-stacked-720.png` on dark, `fiper-logo-black.OFFICIAL-3000.png` on paper); text form «جزء من Fiper Global» / "Part of Fiper Global" primary on phones. Partner mark (cTrader) from `../assets/third-party/ctrader/` at optical height H after a divider.

## 8. Misuse (never)

1 recolour the tile or wordmark, or flatten the gradient outside the approved flat / ink / white versions · 2 glow, shadow or outline · 3 stretch, condense, rotate · 4 a retyped "FPT" or "Fiper Pro Traders" in any font used as a logo (`favicon.svg` of the site, D-DIN PRO typed live) · 5 mirror in RTL · 6 the gradient tile on brand red (use `fpt-mark-white` / `fpt-tile-white` there) · 7 the tile below 16 px / the lockup below 24 px, or the master tile at ≤ 32 px instead of the small cut · 8 edit, optimise or re-export the masters · 9 the ink lockup on a dark ground (use the `-white` lockups) · 10 the Arabic name typed as text beside the tile where the Arabic lockup should be used · 11 clip, crop or round the tile with CSS or an OS mask (the files are transparent and carry their corner) · 12 pair the tile with a second mark, a challenge badge or the Fiper lockup larger than 0.5 H.
