# Logo usage — FPT Brand v1.2.0 (logo v2, CEO approval 30 Oct 2026 — unchanged; derived rasters updated 1 Nov 2026)

Official files: the 24 vector masters in `brand/logos/svg/` (never edited; everything else is a render by `scripts/build-logos.mjs`), spec in `brand/logos/source/spec.json`. The tile is a square gradient (`#F62721 → #A30100`, 135° = the UI pair `#F42821 → #A30100`) with one 20 % rounded corner (bottom-left) and the white "FPT" monogram; the wordmark "Fiper Pro Traders" is `#120D0E` on paper and `#FFFFFF` on dark. Full file table and misuse list: `brand/logos/README.md`. Legacy v1 JPEGs: `brand/logos/legacy-v1/` — never use (`verify-identity` → LEGACY-LOGO-REFERENCE).

| Need | File | Status |
|---|---|---|
| Dark grounds (site navbar, app header, footer, dark social, video, splash) | `svg/fpt-lockup-horizontal-en-white.svg` (navbar 46 px tile height, app header 32 px, footer 44 px, video corner 56 px per 1080 w); the gradient `svg/fpt-tile.svg` alone where only the mark fits | APPROVED logo v2; sizes as in v1.0 |
| Paper grounds (documents, e-mail header, light social) | `svg/fpt-lockup-horizontal-en.svg` (A4 header 8 mm); mail: `derived/email-header-160-paper@2x.png` at 160 × 56 CSS (flattened on the paper token; paper in every mode — no dark variant), `-120-paper@2x.png` at 120 × 42; `-transparent@2x` twins only on a white card; never the superseded `email-header-320x112@2x.png` | APPROVED (owner, 1 Nov 2026) |
| Arabic surfaces | `svg/fpt-lockup-horizontal-ar.svg` / `-white` (tile on the right of the name), `fpt-lockup-vertical-ar` for square formats | APPROVED — replaces the name typed as text beside the tile |
| Bilingual signage, documents, events | `svg/fpt-lockup-bilingual.svg` / `-white` | APPROVED |
| Square formats, certificates | `svg/fpt-lockup-vertical-en.svg` / `-white` | APPROVED |
| Share image / OG | `derived/og-1200x630-ar.png` / `og-1200x630-en.png` (CR-05: dark ground, white horizontal lockup, the fixed risk line; never the superseded `og-1200x630.png`) | APPROVED (owner, 1 Nov 2026) |
| Renders ≤ 32 px | `svg/fpt-tile-small.svg` only (`png/fpt-tile-small-16/24/32.png`, `icons/favicon-16/32.png`, `favicon.ico`, `favicon.svg`) — never above 32 px | APPROVED |
| App icons | `icons/apple-touch-icon-180.png`, `ios-appstore-1024.png`, `pwa-icon-192/512.png`, `pwa-maskable-512.png`, `android-adaptive-foreground/background-432.png`, `android-play-512.png`, `avatar-1080/400.png`, `site.webmanifest` | APPROVED renders of `fpt-appicon*.svg` / the Android layers |
| One-colour print, watermark | `svg/fpt-tile-flat.svg` (`#F42821`), `fpt-tile-ink.svg`, `fpt-tile-white.svg`, `fpt-mark-*` | APPROVED |
| Print / vector handoff | `pdf/<master>.pdf`, `eps/<master>.eps` | APPROVED (vector; no size limit) |
| Fiper endorsement | `../assets/fiper-logo-white.OFFICIAL-stacked-720.png` (dark) / `fiper-logo-black.OFFICIAL-3000.png` (paper) at 0.5 × tile height after a divider; text form «جزء من Fiper Global» primary on phones | parent official rasters; geometry PROPOSED (decision item 4, unchanged) |
| Partner mark | `../assets/third-party/ctrader/*.svg` at optical height = tile height, divider, own clear space | official cTrader pack; MT4 / MT5 never |

Sizes: navbar tile **46 px** (OBSERVED), footer 44 px (OBSERVED), app header 32 px, video corner 56 px on 1080 w, splash 120–160 px (PROPOSED); minimum tile 16 px screen (small cut) / 4 mm print; minimum lockup 24 px screen / 8 mm print; **no maximum** (vector). Clear space 0.5 × tile height. Lockup ratios (`tokens.json component.logo`): horizontal EN 4.7364, AR 3.9043, bilingual 3.2272, vertical EN 1.1154, AR 0.9586; gap tile → wordmark 0.3333 × tile; corner 0.20.
RTL: the mark never mirrors; the Arabic lockup puts the tile on the right of the name. `direction: ltr` on the brand element where the lockup is an image. Never clip the tile (no `border-radius`, `clip-path`, `object-fit` crop) — it carries its own corner and is transparent.

Modified versions: **none are allowed** — no recolouring or flattening outside the approved flat / ink / white files, no retracing, outlining, glow or shadow, no editing or re-exporting the masters, whatever the label. A retyped "FPT" or "Fiper Pro Traders" in any font (the site's `favicon.svg`, D-DIN PRO typed live) is not a logo (`verify-identity` → RETYPED-WORDMARK). D-DIN PRO is the lettering source only, not a brand typeface.

Never: recolour · flatten the gradient outside flat / ink / white · glow / shadow / outline · stretch, condense, rotate · the ink lockup on dark (use `-white`) · retype "FPT" or the name as a logo · the Arabic name as text where the Arabic lockup belongs · below minimum size · the master tile at ≤ 32 px (small cut) · mirror · the gradient tile on brand red (white mark there) · CSS clipping · a second mark, a challenge badge, or the Fiper lockup larger than 0.5 H on an FPT surface.
