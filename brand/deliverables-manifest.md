# Deliverables manifest — FPT Brand Identity System v1.0 (29 Oct 2026)

Maps every task-file requirement (manual sections A–N, deliverables 1–3, package contents, decision items, gates) to its output file(s). Columns: file · format · editing tool · status · acceptance; a rendered preview never counts as the deliverable. Status: **DONE** · **PARTIAL** (with what is missing) · **NOT PROVIDED** (with reason) · **NOT TESTED** (with reason) · **PENDING — lead** (produced after this file was drafted; evidence in `qa-report.md`). Paths are relative to the package root (`brand/`) unless they start with `dist/`, `checks/`, `manual/`, `scripts/` or `sources/` (build repo). Gates: `node scripts/check-manifest.mjs` (every path named here exists) and `node scripts/gen-manifest.mjs` (the generated table at the end lists every file with its byte size).

## Manual sections A–N (the manual + the operational files)
| Req. | Output file(s) | Format | Lang | Editing tool | Status | Acceptance criterion |
|---|---|---|---|---|---|---|
| A Brand architecture | `README.md` § A, `glossary.md` § 1, `MISSING-ASSETS.md` § 3 (endorsement geometry), manual A pages | md / HTML→PDF | AR+EN | text editor | DONE | FPT as a child brand; "Part of Fiper Global" rule; names AR/EN with sources; out of scope stated. |
| B Logo system | `logos/svg/*.svg` (24 vector masters, logo v2), `logos/png/` (119), `logos/pdf/` (24), `logos/eps/` (21), `logos/icons/`, `logos/derived/` (7: paper e-mail headers 160 / 120 + transparent twins, og-1200x630-ar / -en, tile), `logos/_deprecated/derived/` (2 superseded rasters), `logos/source/` (spec, checksums, generator), `logos/legacy-v1/` (superseded), `logos/README.md`, `logos/MISSING-ASSETS.md`, `skill/fpt-brand/references/logo-usage.md`, `dist/logo-checks/` | SVG / PNG / PDF / EPS + md | — | none (approved masters); `scripts/build-logos.mjs` for every render | DONE (logo v2, CEO approval 30 Oct 2026) / PARTIAL (endorsement artwork = MISSING ASSET #4) | every file carries a status; renders checked at 16 / 24 / 32 (small cut) and 46 / 180 / 512 px, lockups 24–242 px, on dark and white. |
| C Colour | `tokens.json` (primitive / semantic), `tokens.css`, `checks/contrast.json`, `README.md` § C, manual C pages | DTCG JSON / CSS / JSON | — | `tokens.json` → `node brand/scripts/build-tokens.mjs` | DONE | `verify-tokens` PASS; 77 measured pairs incl. decision tables 2 / 3 / 6; white-on-flat-red restriction documented. |
| D Typography | `fonts/*.woff2` (17), `fonts/fonts.css`, `fonts/licenses/*`, `skill/fpt-brand/references/arabic-typography.md`, `README.md` § D, `dist/checks/fonts/arabic-elements.md` | woff2 / CSS / md | AR+EN | — | DONE | Arabic + Latin digits + currency render from the Plex Arabic file; `font-synthesis: none`; Cairo / JetBrains / DIN Next deprecated. |
| E Layout & spacing | `tokens.json` semantic.space / size / radius / elevation, `README.md` § E | JSON / md | — | text editor | DONE | 375 px minimum, 44 px targets, z scale, radii, RTL rule present. |
| F Composition | `references/composition-rules.md` (parent, verbatim), `README.md` § F (poles per FPT surface), manual F pages | md | AR+EN | text editor | DONE | each FPT surface has a named pole and dominant element. |
| G Components | `components/components.css`, `components/SPEC.md`, `components/preview.html`, `dist/checks/components/` | CSS / md / HTML | AR+EN | code editor | PENDING — components build (evidence `qa-report.md`) | preview renders every state at 390 px dark in AR and EN; no hex literal in the CSS; challenge card + rule rows present. |
| H Motion | `tokens.json` semantic.motion, `README.md` § H | JSON / md | — | text editor | DONE | easing `[0.22,1,0.36,1]`, press .98, durations 140 / 200 / 300 / 350 / 500 are the only values; float / pulse deprecated. |
| I Iconography & imagery | `icons/lucide/*.svg` (72), `icons/ICONS.md`, `assets/third-party/ctrader/*.svg`, `assets/fiper-physical-card.OFFICIAL.png`, `README.md` § I | SVG / PNG / md | — | — | DONE (Lucide vendored; `ICONS.md` by the components build) | one icon set; real cTrader screens and the official card only; no MT5. |
| J Theme modes | `tokens.css` (dark canonical; `.fpt-paper`), `README.md` § J | CSS / md | — | build | DONE | dark only for apps; paper ground for documents — not a light mode. |
| K1 System e-mail | `templates/email/ctrader-credentials.html`, `evaluation-pass.html`, `evaluation-fail.html`, `payout-processed.html`, `templates/email/TEST-MATRIX.md`, `templates/.htmlvalidate.json`, `logos/derived/email-header-160-paper@2x.png`, `dist/checks/email/` | HTML (table, inline CSS) | AR (+ EN body block) | code editor / ESP template editor | DONE (v1.2.0: paper in every mode, paper header, CR-03) · Gmail / Outlook / Apple Mail NOT TESTED (rows ready) · legal scope = REQUIRED DECISION | html-validate 0 errors; 0 raw URLs in visible text; no dark rule; header byte-identical + paper corners; 360 px light + dark-emulation screenshots both on paper. |
| K2 Documents | `templates/document/certificate.html`, `payout-statement.html`, `trader-agreement.html` (layout only), `invoice.html`, `templates/document/print.css`, `templates/document/PRINT-SPEC.md`, `dist/checks/document/` | HTML / CSS + md | AR+EN | code editor | PENDING — templates build · press-ready NOT PROVIDED (CMYK, bleed = REQUIRED DECISION) · legal text REQUIRED DECISION | A4, paper ground, brand fonts only in the PDF (`check-pdf-fonts.py`), units unbroken, SAMPLE chips. |
| K3 Presentation | `templates/presentation/fpt-brand-deck.pptx` (cover, section, content, stats, close), `dist/checks/editables/` | PPTX | AR+EN | PowerPoint / Keynote / Google Slides | PENDING — templates build · visual render NOT TESTED (no Office here) | structure verified by unzip (masters, layouts, slides); stat figures in text colour with gain semantics. |
| K4 Social | `templates/social/post-1080x1080.svg`, `post-1080x1350.svg`, `post-1080x1920.svg`, `og-1200x630.svg`, `templates/social/exports/*.png`, `templates/social/social-rules.md` | SVG + PNG + md | AR+EN | Illustrator / Inkscape / Figma | PENDING — templates build | body ≥ 42 px on 1080; safe zones; SAMPLE only; exports inspected at 100 %. |
| K4 Video | `templates/video/safe-areas.svg`, `lower-third.svg`, `end-card.html`, `templates/video/sample.mp4` (or `.webm`), `templates/video/video-rules.md` | SVG / HTML / MP4 + md | AR+EN | code editor; any NLE rebuilds from the sources | PENDING — templates build · native NLE template NOT PROVIDED | 5-second playable lower-third demo; safe areas 9:16 and 16:9. |
| K5 Legal | `templates/legal/REQUIRED-DECISION.md`, `regulatory-matrix.md` | md | AR+EN | — | DONE (matrix) · every surface REQUIRED DECISION | no regulatory text invented; placeholder comment on every template. |
| L Anti-AI-tells | `checklists/brand-review.md` § A, `README.md` § L | md | AR+EN | — | DONE | 28 tells with detection; FPT additions (gold badge, glass, washes, float, pulse, statistics, no MT5). |
| M AI generation kit | `README.md` § M, `skill/fpt-brand/SKILL.md` | md | EN prompts | — | DONE | never-generate list + compositing workflow. |
| N Governance | `README.md` § N, `CHANGELOG.md`, `value-sources.md` | md | — | — | DONE | version, parent pin, status vocabulary, change path, consumers. |

## Deliverables 1–3
| Req. | Output | Format | Editing tool | Status | Acceptance criterion |
|---|---|---|---|---|---|
| 1 Manual PDF ≤ 38 pages (36 + up to 2 logo pages since v1.1; v1.2.0: 37), AR + EN, brand fonts embedded, every page rendered and inspected | `dist/FPT-Brand-Manual-v1.2.pdf` (also in the zip root) from `manual/index.src.html` via `scripts/render-manual.mjs`; pages `dist/pages/page-NN.png` | PDF (A4, RGB) | HTML source → re-render | PENDING — lead (evidence `qa-report.md`) | ≤ 36 pages; layout gate OVERFLOW none / INTERSECT none; `check-pdf-fonts.py` PASS; no placeholder text; every value in `value-sources.md`. |
| 2 Zip drop-in `brand/` | `dist/fpt-brand-v1.2.0.zip` + `dist/fpt-brand-v1.2.0.zip.sha256` (+ `dist/consumers/UPGRADE-v1.2.0.md`) | zip | `scripts/package.mjs` | PENDING — lead | unzips to `brand/` with every file in this manifest; `verify-unzipped` ALL PASS from a clean folder. |
| 3 Phone preview | `dist/preview/index.html` (gallery of the 8 mockups at 390 px, links to `manual.pdf` and the zip), `dist/preview/mockups/*.png` | HTML / PNG | `scripts/build-preview.mjs` | PENDING — lead (URL in `FPT-BRAND-V1-REPORT.md`) | deployed with `vercel deploy dist/preview --name fpt-brand --scope fiper-card`. |

## Package contents (`brand/`)
| Item | Output | Format | Editing tool | Status | Acceptance criterion |
|---|---|---|---|---|---|
| README | `README.md` | md | text | DONE | install, pipeline, wiring, sections A–N, decision items, historical notes. |
| tokens.json / tokens.css / tailwind.preset.js | `tokens.json`, `tokens.css`, `tailwind.preset.js` | DTCG 2025.10 / CSS / JS | `tokens.json` only (generated files never edited; `tokens.json` itself is generated in the build repo by `scripts/gen-tokens.mjs` from the parent file + FPT observations) | DONE | `build-tokens` → `verify-tokens` PASS; parent pin; 126 inherited values equal the parent file. |
| fonts/ | `fonts/*.woff2` (17) + `fonts/fonts.css` + `fonts/README.md` + `fonts/licenses/` (4 OFL + README) | woff2 | — | DONE | complete official files; OFL recorded. |
| logos/ | `logos/svg/`, `logos/png/`, `logos/pdf/`, `logos/eps/`, `logos/icons/`, `logos/derived/`, `logos/_deprecated/`, `logos/source/`, `logos/legacy-v1/`, `logos/README.md`, `logos/MISSING-ASSETS.md` | SVG / PNG / PDF / EPS / md | — | DONE | see B. |
| components/ | `components/SPEC.md`, `components/components.css`, `components/preview.html` | md / CSS / HTML | code editor | PENDING — components build | see G. |
| templates/ | `templates/email/`, `templates/document/`, `templates/presentation/`, `templates/social/`, `templates/video/`, `templates/legal/` | see K | see K | PENDING — templates build | see K. |
| mockups/ | `mockups/01-marketing-hero/`, `02-challenge-selector/`, `03-challenge-dashboard/`, `04-funded-certificate/`, `05-payout-statement/`, `06-evaluation-email/`, `07-social-post/`, `08-slide/` (each AR + EN), `dist/checks/mockups/` (320 / 360 / 390 px) | HTML / PNG | code editor | PENDING — mockups build | eight mockups AR + EN, screenshots at 320 / 360 / 390, SAMPLE chips, official assets only. |
| checklists/ | `checklists/pre-launch.md`, `checklists/per-surface.md`, `checklists/brand-review.md` | md | — | DONE | 52 pre-launch items; per-surface tables; 28 tells + composition questions. |
| references/ | `references/composition-rules.md` | md | — | DONE | byte-identical to the parent file. |
| glossary / regulatory / missing assets | `glossary.md`, `regulatory-matrix.md`, `MISSING-ASSETS.md` | md | — | DONE (glossary § 7 generated from `sources/strings/*.json` by `scripts/gen-glossary-strings.mjs`) | every term with key + status; every surface a REQUIRED DECISION row; 22 missing items with priority. |
| manifest / qa / value-sources / changelog | `deliverables-manifest.md`, `qa-report.md`, `value-sources.md`, `CHANGELOG.md` | md | — | DONE (qa-report results and the sha256 filled by the lead) | token table generated; every output accounted for. |
| scripts/ | `scripts/build-tokens.mjs`, `verify-tokens.mjs`, `contrast.mjs`, `verify-identity.mjs`, `check-units.mjs`, `charts.mjs`, `sample-data.mjs`, `check-pdf-fonts.py`, `verify-unzipped.mjs` | mjs / py | node / python3 | DONE | run from the folder containing `brand/`; documented in README (A). |
| skill/fpt-brand/ | `skill/fpt-brand/SKILL.md`, `skill/fpt-brand/claude-md-paragraph.md`, `skill/fpt-brand/verify-skill-wired.mjs`, `skill/fpt-brand/references/tokens-quick.md` (generated), `composition-rules.md` (copy), `value-sources.md` (copy), `finance-semantics.md`, `arabic-typography.md`, `logo-usage.md`, `review-checklist.md` | md / mjs | — | DONE | drops into `.claude/skills/` unchanged; `verify-skill-wired` PASS in a wired consumer. |
| application note | `fpt-website-application-note.md` | md | — | DONE | every page / section / component mapped; 20 migration steps with gates; CRM surfaces PROPOSED; no code change to fpt-website. |
| icons/ | `icons/lucide/*.svg` (72) + `icons/lucide/LICENSE`, `icons/ICONS.md` | SVG / md | — | DONE (SVG) / PENDING (`ICONS.md` by the components build) | Lucide v0.468.0 only. |
| assets/ | `assets/fiper-logo-white.OFFICIAL-stacked-720.png`, `assets/fiper-logo-black.OFFICIAL-3000.png`, `assets/fiper-physical-card.OFFICIAL.png`, `assets/third-party/ctrader/` | PNG / SVG | — | DONE | official files only; md5 in `value-sources.md`. |

## Decision items 1–6 and gates
| Item | Output | Status |
|---|---|---|
| Decision items 1–6 | `README.md` § Decision items, `value-sources.md` § 7, `checks/contrast.json` (decision rows), manual decision page | DONE — defaults applied as PROPOSED, nothing decided silently |
| Gates (contrast · logo · fonts · email · manual · check-units · verify-identity · charts · deliverables-manifest · pptx/docx · verify-unzipped) | `qa-report.md` (results), `dist/unzipped-verification.md`, `dist/checks/` | PENDING — lead (gate pass from the unzipped copy in a clean folder) |

## Fonts required to edit the native files
PowerPoint / Keynote / Google Slides render the PPTX with the named families only if they are installed: install `fonts/*.woff2` (convert to TTF/OTF for desktop, or download the same OFL families from Google Fonts). Without them the apps substitute fonts; the layout remains editable.

## Generated file table — every file with format, tool, status and byte size (`node scripts/gen-manifest.mjs`)
<!--MANIFEST_TABLE-->
| Path | Format | Editing tool | Status | Bytes |
|---|---|---|---|---|
| `brand/assets/fiper-logo-black.OFFICIAL-3000.png` | PNG | none (official asset) | present | 261,437 |
| `brand/assets/fiper-logo-white.OFFICIAL-stacked-720.png` | PNG | none (official asset) | present | 74,474 |
| `brand/assets/fiper-physical-card.OFFICIAL.png` | PNG | none (official asset) | present | 283,401 |
| `brand/assets/third-party/ctrader/ctrader-icon-black.svg` | SVG | none (official asset) | present | 754 |
| `brand/assets/third-party/ctrader/ctrader-icon-red.svg` | SVG | none (official asset) | present | 754 |
| `brand/assets/third-party/ctrader/ctrader-icon-white.svg` | SVG | none (official asset) | present | 754 |
| `brand/assets/third-party/ctrader/ctrader-logo-dark.svg` | SVG | none (official asset) | present | 3,772 |
| `brand/assets/third-party/ctrader/ctrader-logo-light.svg` | SVG | none (official asset) | present | 3,772 |
| `brand/assets/third-party/ctrader/ctrader-logo-mono-dark.svg` | SVG | none (official asset) | present | 3,772 |
| `brand/assets/third-party/ctrader/ctrader-logo-mono-light.svg` | SVG | none (official asset) | present | 3,772 |
| `brand/assets/third-party/ctrader/ctrader-logo-mono-red.svg` | SVG | none (official asset) | present | 3,772 |
| `brand/CHANGELOG.md` | Markdown | text editor | present | 22,055 |
| `brand/checklists/brand-review.md` | Markdown | text editor | present | 7,420 |
| `brand/checklists/per-surface.md` | Markdown | text editor | present | 9,145 |
| `brand/checklists/pre-launch.md` | Markdown | text editor | present | 13,331 |
| `brand/components/components.css` | CSS | code editor | present | 62,020 |
| `brand/components/preview.html` | HTML | code editor (reference only) | present | 51,866 |
| `brand/components/SPEC.md` | Markdown | text editor | present | 19,453 |
| `brand/deliverables-manifest.md` | Markdown | text editor | present | 54,005 |
| `brand/fonts/BarlowCondensed-600.woff2` | WOFF2 | none (official font file, OFL) | present | 32,968 |
| `brand/fonts/BarlowCondensed-700.woff2` | WOFF2 | none (official font file, OFL) | present | 33,056 |
| `brand/fonts/BarlowCondensed-800.woff2` | WOFF2 | none (official font file, OFL) | present | 33,132 |
| `brand/fonts/fonts.css` | CSS | code editor | present | 2,811 |
| `brand/fonts/IBMPlexMono-400.woff2` | WOFF2 | none (official font file, OFL) | present | 37,220 |
| `brand/fonts/IBMPlexMono-600.woff2` | WOFF2 | none (official font file, OFL) | present | 39,104 |
| `brand/fonts/IBMPlexSans-400.woff2` | WOFF2 | none (official font file, OFL) | present | 70,060 |
| `brand/fonts/IBMPlexSans-500.woff2` | WOFF2 | none (official font file, OFL) | present | 76,288 |
| `brand/fonts/IBMPlexSans-600.woff2` | WOFF2 | none (official font file, OFL) | present | 76,476 |
| `brand/fonts/IBMPlexSans-700.woff2` | WOFF2 | none (official font file, OFL) | present | 69,424 |
| `brand/fonts/IBMPlexSansArabic-400.woff2` | WOFF2 | none (official font file, OFL) | present | 67,680 |
| `brand/fonts/IBMPlexSansArabic-500.woff2` | WOFF2 | none (official font file, OFL) | present | 71,756 |
| `brand/fonts/IBMPlexSansArabic-600.woff2` | WOFF2 | none (official font file, OFL) | present | 72,308 |
| `brand/fonts/IBMPlexSansArabic-700.woff2` | WOFF2 | none (official font file, OFL) | present | 69,376 |
| `brand/fonts/Inter-400.woff2` | WOFF2 | none (official font file, OFL) | present | 108,576 |
| `brand/fonts/Inter-500.woff2` | WOFF2 | none (official font file, OFL) | present | 111,820 |
| `brand/fonts/Inter-600.woff2` | WOFF2 | none (official font file, OFL) | present | 111,976 |
| `brand/fonts/Inter-700.woff2` | WOFF2 | none (official font file, OFL) | present | 112,036 |
| `brand/fonts/licenses/OFL-Barlow.txt` | text | — | present | 4,377 |
| `brand/fonts/licenses/OFL-IBM-Plex-Sans-Arabic.txt` | text | — | present | 4,456 |
| `brand/fonts/licenses/OFL-IBM-Plex.txt` | text | — | present | 4,456 |
| `brand/fonts/licenses/OFL-Inter.txt` | text | — | present | 4,380 |
| `brand/fonts/licenses/README.md` | Markdown | text editor | present | 2,519 |
| `brand/fonts/README.md` | Markdown | text editor | present | 755 |
| `brand/fpt-website-application-note.md` | Markdown | text editor | present | 21,528 |
| `brand/glossary.md` | Markdown | text editor | present | 36,179 |
| `brand/icons/ICONS.md` | Markdown | text editor | present | 5,039 |
| `brand/icons/lucide/activity.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 426 |
| `brand/icons/lucide/arrow-down-right.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 348 |
| `brand/icons/lucide/arrow-left.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 344 |
| `brand/icons/lucide/arrow-right.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 344 |
| `brand/icons/lucide/arrow-up-down.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 398 |
| `brand/icons/lucide/arrow-up-right.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 346 |
| `brand/icons/lucide/badge-check.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 495 |
| `brand/icons/lucide/banknote.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 411 |
| `brand/icons/lucide/bell.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 469 |
| `brand/icons/lucide/briefcase.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 400 |
| `brand/icons/lucide/building-2.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 553 |
| `brand/icons/lucide/calendar.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 410 |
| `brand/icons/lucide/chart-candlestick.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 532 |
| `brand/icons/lucide/chart-line.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 363 |
| `brand/icons/lucide/chart-pie.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 452 |
| `brand/icons/lucide/check.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 316 |
| `brand/icons/lucide/chevron-down.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 320 |
| `brand/icons/lucide/chevron-left.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 322 |
| `brand/icons/lucide/chevron-right.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 322 |
| `brand/icons/lucide/chevron-up.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 320 |
| `brand/icons/lucide/circle-alert.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 416 |
| `brand/icons/lucide/circle-check.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 357 |
| `brand/icons/lucide/circle-help.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 405 |
| `brand/icons/lucide/circle-x.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 373 |
| `brand/icons/lucide/clock.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 362 |
| `brand/icons/lucide/coins.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 432 |
| `brand/icons/lucide/copy.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 415 |
| `brand/icons/lucide/credit-card.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 386 |
| `brand/icons/lucide/download.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 428 |
| `brand/icons/lucide/ellipsis.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 392 |
| `brand/icons/lucide/external-link.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 417 |
| `brand/icons/lucide/eye-off.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 583 |
| `brand/icons/lucide/eye.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 435 |
| `brand/icons/lucide/file-text.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 473 |
| `brand/icons/lucide/filter.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 353 |
| `brand/icons/lucide/globe.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 408 |
| `brand/icons/lucide/hash.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 449 |
| `brand/icons/lucide/house.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 468 |
| `brand/icons/lucide/info.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 370 |
| `brand/icons/lucide/landmark.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 537 |
| `brand/icons/lucide/languages.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 443 |
| `brand/icons/lucide/layers.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 588 |
| `brand/icons/lucide/LICENSE` |  | none (Lucide v0.468.0, ISC) | present | 880 |
| `brand/icons/lucide/loader.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 512 |
| `brand/icons/lucide/lock.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 385 |
| `brand/icons/lucide/log-out.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 425 |
| `brand/icons/lucide/mail.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 394 |
| `brand/icons/lucide/menu.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 408 |
| `brand/icons/lucide/message-circle.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 340 |
| `brand/icons/lucide/minus.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 309 |
| `brand/icons/lucide/moon.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 334 |
| `brand/icons/lucide/percent.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 408 |
| `brand/icons/lucide/phone.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 586 |
| `brand/icons/lucide/plus.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 332 |
| `brand/icons/lucide/qr-code.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 699 |
| `brand/icons/lucide/receipt.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 458 |
| `brand/icons/lucide/refresh-cw.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 474 |
| `brand/icons/lucide/scan-line.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 471 |
| `brand/icons/lucide/search.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 351 |
| `brand/icons/lucide/settings.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 904 |
| `brand/icons/lucide/share-2.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 497 |
| `brand/icons/lucide/shield-check.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 499 |
| `brand/icons/lucide/square-check.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 374 |
| `brand/icons/lucide/star.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 664 |
| `brand/icons/lucide/sun.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 560 |
| `brand/icons/lucide/trending-down.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 387 |
| `brand/icons/lucide/trending-up.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 384 |
| `brand/icons/lucide/triangle-alert.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 431 |
| `brand/icons/lucide/upload.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 423 |
| `brand/icons/lucide/user.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 375 |
| `brand/icons/lucide/wallet.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 465 |
| `brand/icons/lucide/x.svg` | SVG | none (Lucide v0.468.0, ISC) | present | 333 |
| `brand/logos/_deprecated/derived/email-header-320x112@2x.png` | PNG | superseded (v1.2.0, 1 Nov 2026) — never use; kept for the record | present | 7,205 |
| `brand/logos/_deprecated/derived/og-1200x630.png` | PNG | superseded (v1.2.0, 1 Nov 2026) — never use; kept for the record | present | 40,499 |
| `brand/logos/_deprecated/README.md` | Markdown | superseded (v1.2.0, 1 Nov 2026) — never use; kept for the record | present | 1,035 |
| `brand/logos/derived/email-header-120-paper@2x.png` | PNG | generated — scripts/build-logos.mjs (render of the vector masters; values from tokens.json) | present | 5,136 |
| `brand/logos/derived/email-header-120-transparent@2x.png` | PNG | generated — scripts/build-logos.mjs (render of the vector masters; values from tokens.json) | present | 5,584 |
| `brand/logos/derived/email-header-160-paper@2x.png` | PNG | generated — scripts/build-logos.mjs (render of the vector masters; values from tokens.json) | present | 7,321 |
| `brand/logos/derived/email-header-160-transparent@2x.png` | PNG | generated — scripts/build-logos.mjs (render of the vector masters; values from tokens.json) | present | 7,903 |
| `brand/logos/derived/email-tile-112@2x.png` | PNG | generated — scripts/build-logos.mjs (render of the vector masters; values from tokens.json) | present | 6,712 |
| `brand/logos/derived/og-1200x630-ar.png` | PNG | generated — scripts/build-logos.mjs (render of the vector masters; values from tokens.json) | present | 20,766 |
| `brand/logos/derived/og-1200x630-en.png` | PNG | generated — scripts/build-logos.mjs (render of the vector masters; values from tokens.json) | present | 20,543 |
| `brand/logos/eps/fpt-appicon-round.eps` | EPS | — | present | 2,340 |
| `brand/logos/eps/fpt-appicon.eps` | EPS | — | present | 2,328 |
| `brand/logos/eps/fpt-lockup-bilingual-white.eps` | EPS | — | present | 29,098 |
| `brand/logos/eps/fpt-lockup-bilingual.eps` | EPS | — | present | 29,098 |
| `brand/logos/eps/fpt-lockup-horizontal-ar-white.eps` | EPS | — | present | 18,334 |
| `brand/logos/eps/fpt-lockup-horizontal-ar.eps` | EPS | — | present | 18,334 |
| `brand/logos/eps/fpt-lockup-horizontal-en-white.eps` | EPS | — | present | 13,813 |
| `brand/logos/eps/fpt-lockup-horizontal-en.eps` | EPS | — | present | 13,813 |
| `brand/logos/eps/fpt-lockup-vertical-ar-white.eps` | EPS | — | present | 17,255 |
| `brand/logos/eps/fpt-lockup-vertical-ar.eps` | EPS | — | present | 17,255 |
| `brand/logos/eps/fpt-lockup-vertical-en-white.eps` | EPS | — | present | 12,895 |
| `brand/logos/eps/fpt-lockup-vertical-en.eps` | EPS | — | present | 12,895 |
| `brand/logos/eps/fpt-mark-gradient.eps` | EPS | — | present | 2,148 |
| `brand/logos/eps/fpt-mark-ink.eps` | EPS | — | present | 1,952 |
| `brand/logos/eps/fpt-mark-red.eps` | EPS | — | present | 1,952 |
| `brand/logos/eps/fpt-mark-white.eps` | EPS | — | present | 1,952 |
| `brand/logos/eps/fpt-tile-flat.eps` | EPS | — | present | 2,175 |
| `brand/logos/eps/fpt-tile-ink.eps` | EPS | — | present | 2,083 |
| `brand/logos/eps/fpt-tile-small.eps` | EPS | — | present | 2,217 |
| `brand/logos/eps/fpt-tile-white.eps` | EPS | — | present | 2,083 |
| `brand/logos/eps/fpt-tile.eps` | EPS | — | present | 2,371 |
| `brand/logos/icons/android-adaptive-background-432.png` | PNG | — | present | 51,000 |
| `brand/logos/icons/android-adaptive-foreground-432.png` | PNG | — | present | 5,958 |
| `brand/logos/icons/android-play-512.png` | PNG | — | present | 93,860 |
| `brand/logos/icons/apple-touch-icon-180.png` | PNG | — | present | 8,947 |
| `brand/logos/icons/avatar-1080.png` | PNG | — | present | 454,212 |
| `brand/logos/icons/avatar-400.png` | PNG | — | present | 50,257 |
| `brand/logos/icons/favicon-16.png` | PNG | — | present | 656 |
| `brand/logos/icons/favicon-32.png` | PNG | — | present | 1,408 |
| `brand/logos/icons/favicon-48.png` | PNG | — | present | 2,162 |
| `brand/logos/icons/favicon-64.png` | PNG | — | present | 3,087 |
| `brand/logos/icons/favicon.ico` | ICO | — | present | 15,086 |
| `brand/logos/icons/favicon.svg` | SVG | — | present | 1,440 |
| `brand/logos/icons/ios-appstore-1024.png` | PNG | — | present | 293,462 |
| `brand/logos/icons/pwa-icon-192.png` | PNG | — | present | 11,383 |
| `brand/logos/icons/pwa-icon-512.png` | PNG | — | present | 93,860 |
| `brand/logos/icons/pwa-maskable-512.png` | PNG | — | present | 96,590 |
| `brand/logos/icons/site.webmanifest` | WEBMANIFEST | — | present | 669 |
| `brand/logos/legacy-v1/derived/app-icon-192.png` | PNG | — | present | 17,701 |
| `brand/logos/legacy-v1/derived/app-icon-512.png` | PNG | — | present | 59,489 |
| `brand/logos/legacy-v1/derived/apple-touch-icon-180.png` | PNG | — | present | 16,277 |
| `brand/logos/legacy-v1/derived/email-header-320x112@2x.png` | PNG | — | present | 10,388 |
| `brand/logos/legacy-v1/derived/email-tile-112@2x.png` | PNG | — | present | 9,024 |
| `brand/logos/legacy-v1/derived/favicon-16.png` | PNG | — | present | 620 |
| `brand/logos/legacy-v1/derived/favicon-32.png` | PNG | — | present | 1,592 |
| `brand/logos/legacy-v1/derived/favicon-48.png` | PNG | — | present | 2,701 |
| `brand/logos/legacy-v1/derived/favicon-64.png` | PNG | — | present | 4,170 |
| `brand/logos/legacy-v1/derived/og-1200x630.png` | PNG | — | present | 48,051 |
| `brand/logos/legacy-v1/raster/fpt-logo-horizontal-corner.jpeg` | JPEG | — | present | 8,422 |
| `brand/logos/legacy-v1/raster/fpt-logo-horizontal.jpeg` | JPEG | — | present | 20,942 |
| `brand/logos/legacy-v1/raster/fpt-logo-icon-rounded.jpeg` | JPEG | — | present | 45,636 |
| `brand/logos/legacy-v1/raster/fpt-logo-icon-shield.jpeg` | JPEG | — | present | 32,117 |
| `brand/logos/legacy-v1/raster/fpt-logo-vertical.jpeg` | JPEG | — | present | 44,527 |
| `brand/logos/legacy-v1/README.md` | Markdown | text editor | present | 831 |
| `brand/logos/MISSING-ASSETS.md` | Markdown | text editor | present | 3,991 |
| `brand/logos/pdf/fpt-android-adaptive-background.pdf` | PDF | HTML source → scripts/render-manual.mjs | present | 1,395 |
| `brand/logos/pdf/fpt-android-adaptive-foreground.pdf` | PDF | HTML source → scripts/render-manual.mjs | present | 1,611 |
| `brand/logos/pdf/fpt-appicon-round.pdf` | PDF | HTML source → scripts/render-manual.mjs | present | 2,028 |
| `brand/logos/pdf/fpt-appicon.pdf` | PDF | HTML source → scripts/render-manual.mjs | present | 2,011 |
| `brand/logos/pdf/fpt-construction.pdf` | PDF | HTML source → scripts/render-manual.mjs | present | 65,280 |
| `brand/logos/pdf/fpt-lockup-bilingual-white.pdf` | PDF | HTML source → scripts/render-manual.mjs | present | 11,547 |
| `brand/logos/pdf/fpt-lockup-bilingual.pdf` | PDF | HTML source → scripts/render-manual.mjs | present | 11,566 |
| `brand/logos/pdf/fpt-lockup-horizontal-ar-white.pdf` | PDF | HTML source → scripts/render-manual.mjs | present | 7,975 |
| `brand/logos/pdf/fpt-lockup-horizontal-ar.pdf` | PDF | HTML source → scripts/render-manual.mjs | present | 7,993 |
| `brand/logos/pdf/fpt-lockup-horizontal-en-white.pdf` | PDF | HTML source → scripts/render-manual.mjs | present | 4,708 |
| `brand/logos/pdf/fpt-lockup-horizontal-en.pdf` | PDF | HTML source → scripts/render-manual.mjs | present | 4,724 |
| `brand/logos/pdf/fpt-lockup-vertical-ar-white.pdf` | PDF | HTML source → scripts/render-manual.mjs | present | 7,724 |
| `brand/logos/pdf/fpt-lockup-vertical-ar.pdf` | PDF | HTML source → scripts/render-manual.mjs | present | 7,742 |
| `brand/logos/pdf/fpt-lockup-vertical-en-white.pdf` | PDF | HTML source → scripts/render-manual.mjs | present | 5,587 |
| `brand/logos/pdf/fpt-lockup-vertical-en.pdf` | PDF | HTML source → scripts/render-manual.mjs | present | 5,601 |
| `brand/logos/pdf/fpt-mark-gradient.pdf` | PDF | HTML source → scripts/render-manual.mjs | present | 2,002 |
| `brand/logos/pdf/fpt-mark-ink.pdf` | PDF | HTML source → scripts/render-manual.mjs | present | 1,643 |
| `brand/logos/pdf/fpt-mark-red.pdf` | PDF | HTML source → scripts/render-manual.mjs | present | 1,643 |
| `brand/logos/pdf/fpt-mark-white.pdf` | PDF | HTML source → scripts/render-manual.mjs | present | 1,637 |
| `brand/logos/pdf/fpt-tile-flat.pdf` | PDF | HTML source → scripts/render-manual.mjs | present | 1,663 |
| `brand/logos/pdf/fpt-tile-ink.pdf` | PDF | HTML source → scripts/render-manual.mjs | present | 1,656 |
| `brand/logos/pdf/fpt-tile-small.pdf` | PDF | HTML source → scripts/render-manual.mjs | present | 1,995 |
| `brand/logos/pdf/fpt-tile-white.pdf` | PDF | HTML source → scripts/render-manual.mjs | present | 1,649 |
| `brand/logos/pdf/fpt-tile.pdf` | PDF | HTML source → scripts/render-manual.mjs | present | 1,989 |
| `brand/logos/png/fpt-lockup-bilingual-h1024.png` | PNG | — | present | 586,955 |
| `brand/logos/png/fpt-lockup-bilingual-h128.png` | PNG | — | present | 19,279 |
| `brand/logos/png/fpt-lockup-bilingual-h256.png` | PNG | — | present | 52,798 |
| `brand/logos/png/fpt-lockup-bilingual-h48.png` | PNG | — | present | 6,094 |
| `brand/logos/png/fpt-lockup-bilingual-h512.png` | PNG | — | present | 181,784 |
| `brand/logos/png/fpt-lockup-bilingual-h64.png` | PNG | — | present | 8,397 |
| `brand/logos/png/fpt-lockup-bilingual-white-h1024.png` | PNG | — | present | 563,404 |
| `brand/logos/png/fpt-lockup-bilingual-white-h128.png` | PNG | — | present | 16,623 |
| `brand/logos/png/fpt-lockup-bilingual-white-h256.png` | PNG | — | present | 47,602 |
| `brand/logos/png/fpt-lockup-bilingual-white-h48.png` | PNG | — | present | 5,084 |
| `brand/logos/png/fpt-lockup-bilingual-white-h512.png` | PNG | — | present | 170,579 |
| `brand/logos/png/fpt-lockup-bilingual-white-h64.png` | PNG | — | present | 6,966 |
| `brand/logos/png/fpt-lockup-horizontal-ar-h1024.png` | PNG | — | present | 561,355 |
| `brand/logos/png/fpt-lockup-horizontal-ar-h128.png` | PNG | — | present | 17,075 |
| `brand/logos/png/fpt-lockup-horizontal-ar-h256.png` | PNG | — | present | 49,847 |
| `brand/logos/png/fpt-lockup-horizontal-ar-h48.png` | PNG | — | present | 5,241 |
| `brand/logos/png/fpt-lockup-horizontal-ar-h512.png` | PNG | — | present | 168,772 |
| `brand/logos/png/fpt-lockup-horizontal-ar-h64.png` | PNG | — | present | 7,339 |
| `brand/logos/png/fpt-lockup-horizontal-ar-white-h1024.png` | PNG | — | present | 541,604 |
| `brand/logos/png/fpt-lockup-horizontal-ar-white-h128.png` | PNG | — | present | 15,043 |
| `brand/logos/png/fpt-lockup-horizontal-ar-white-h256.png` | PNG | — | present | 45,540 |
| `brand/logos/png/fpt-lockup-horizontal-ar-white-h48.png` | PNG | — | present | 4,419 |
| `brand/logos/png/fpt-lockup-horizontal-ar-white-h512.png` | PNG | — | present | 159,238 |
| `brand/logos/png/fpt-lockup-horizontal-ar-white-h64.png` | PNG | — | present | 6,223 |
| `brand/logos/png/fpt-lockup-horizontal-en-h1024.png` | PNG | — | present | 571,749 |
| `brand/logos/png/fpt-lockup-horizontal-en-h128.png` | PNG | — | present | 17,023 |
| `brand/logos/png/fpt-lockup-horizontal-en-h256.png` | PNG | — | present | 55,907 |
| `brand/logos/png/fpt-lockup-horizontal-en-h48.png` | PNG | — | present | 5,484 |
| `brand/logos/png/fpt-lockup-horizontal-en-h512.png` | PNG | — | present | 181,771 |
| `brand/logos/png/fpt-lockup-horizontal-en-h64.png` | PNG | — | present | 7,352 |
| `brand/logos/png/fpt-lockup-horizontal-en-white-h1024.png` | PNG | — | present | 557,184 |
| `brand/logos/png/fpt-lockup-horizontal-en-white-h128.png` | PNG | — | present | 14,999 |
| `brand/logos/png/fpt-lockup-horizontal-en-white-h256.png` | PNG | — | present | 52,026 |
| `brand/logos/png/fpt-lockup-horizontal-en-white-h48.png` | PNG | — | present | 4,646 |
| `brand/logos/png/fpt-lockup-horizontal-en-white-h512.png` | PNG | — | present | 173,918 |
| `brand/logos/png/fpt-lockup-horizontal-en-white-h64.png` | PNG | — | present | 6,299 |
| `brand/logos/png/fpt-lockup-vertical-ar-h1024.png` | PNG | — | present | 315,714 |
| `brand/logos/png/fpt-lockup-vertical-ar-h128.png` | PNG | — | present | 8,075 |
| `brand/logos/png/fpt-lockup-vertical-ar-h256.png` | PNG | — | present | 23,261 |
| `brand/logos/png/fpt-lockup-vertical-ar-h48.png` | PNG | — | present | 2,436 |
| `brand/logos/png/fpt-lockup-vertical-ar-h512.png` | PNG | — | present | 85,488 |
| `brand/logos/png/fpt-lockup-vertical-ar-h64.png` | PNG | — | present | 3,459 |
| `brand/logos/png/fpt-lockup-vertical-ar-white-h1024.png` | PNG | — | present | 309,250 |
| `brand/logos/png/fpt-lockup-vertical-ar-white-h128.png` | PNG | — | present | 7,266 |
| `brand/logos/png/fpt-lockup-vertical-ar-white-h256.png` | PNG | — | present | 21,792 |
| `brand/logos/png/fpt-lockup-vertical-ar-white-h48.png` | PNG | — | present | 2,194 |
| `brand/logos/png/fpt-lockup-vertical-ar-white-h512.png` | PNG | — | present | 82,203 |
| `brand/logos/png/fpt-lockup-vertical-ar-white-h64.png` | PNG | — | present | 3,116 |
| `brand/logos/png/fpt-lockup-vertical-en-h1024.png` | PNG | — | present | 311,665 |
| `brand/logos/png/fpt-lockup-vertical-en-h128.png` | PNG | — | present | 8,354 |
| `brand/logos/png/fpt-lockup-vertical-en-h256.png` | PNG | — | present | 22,915 |
| `brand/logos/png/fpt-lockup-vertical-en-h48.png` | PNG | — | present | 2,536 |
| `brand/logos/png/fpt-lockup-vertical-en-h512.png` | PNG | — | present | 90,485 |
| `brand/logos/png/fpt-lockup-vertical-en-h64.png` | PNG | — | present | 3,848 |
| `brand/logos/png/fpt-lockup-vertical-en-white-h1024.png` | PNG | — | present | 306,457 |
| `brand/logos/png/fpt-lockup-vertical-en-white-h128.png` | PNG | — | present | 7,604 |
| `brand/logos/png/fpt-lockup-vertical-en-white-h256.png` | PNG | — | present | 21,602 |
| `brand/logos/png/fpt-lockup-vertical-en-white-h48.png` | PNG | — | present | 2,296 |
| `brand/logos/png/fpt-lockup-vertical-en-white-h512.png` | PNG | — | present | 87,795 |
| `brand/logos/png/fpt-lockup-vertical-en-white-h64.png` | PNG | — | present | 3,448 |
| `brand/logos/png/fpt-mark-gradient-w1024.png` | PNG | — | present | 206,898 |
| `brand/logos/png/fpt-mark-gradient-w128.png` | PNG | — | present | 6,964 |
| `brand/logos/png/fpt-mark-gradient-w2048.png` | PNG | — | present | 623,412 |
| `brand/logos/png/fpt-mark-gradient-w256.png` | PNG | — | present | 19,610 |
| `brand/logos/png/fpt-mark-gradient-w4096.png` | PNG | — | present | 1,669,691 |
| `brand/logos/png/fpt-mark-gradient-w512.png` | PNG | — | present | 63,126 |
| `brand/logos/png/fpt-mark-ink-w1024.png` | PNG | — | present | 34,460 |
| `brand/logos/png/fpt-mark-ink-w128.png` | PNG | — | present | 3,832 |
| `brand/logos/png/fpt-mark-ink-w2048.png` | PNG | — | present | 77,130 |
| `brand/logos/png/fpt-mark-ink-w256.png` | PNG | — | present | 7,554 |
| `brand/logos/png/fpt-mark-ink-w4096.png` | PNG | — | present | 179,489 |
| `brand/logos/png/fpt-mark-ink-w512.png` | PNG | — | present | 15,212 |
| `brand/logos/png/fpt-mark-red-w1024.png` | PNG | — | present | 35,983 |
| `brand/logos/png/fpt-mark-red-w128.png` | PNG | — | present | 3,973 |
| `brand/logos/png/fpt-mark-red-w2048.png` | PNG | — | present | 80,448 |
| `brand/logos/png/fpt-mark-red-w256.png` | PNG | — | present | 7,893 |
| `brand/logos/png/fpt-mark-red-w4096.png` | PNG | — | present | 186,917 |
| `brand/logos/png/fpt-mark-red-w512.png` | PNG | — | present | 16,002 |
| `brand/logos/png/fpt-mark-white-w1024.png` | PNG | — | present | 27,143 |
| `brand/logos/png/fpt-mark-white-w128.png` | PNG | — | present | 2,918 |
| `brand/logos/png/fpt-mark-white-w2048.png` | PNG | — | present | 62,476 |
| `brand/logos/png/fpt-mark-white-w256.png` | PNG | — | present | 5,840 |
| `brand/logos/png/fpt-mark-white-w4096.png` | PNG | — | present | 150,990 |
| `brand/logos/png/fpt-mark-white-w512.png` | PNG | — | present | 11,872 |
| `brand/logos/png/fpt-tile-1024.png` | PNG | — | present | 434,891 |
| `brand/logos/png/fpt-tile-128.png` | PNG | — | present | 7,836 |
| `brand/logos/png/fpt-tile-2048.png` | PNG | — | present | 1,323,623 |
| `brand/logos/png/fpt-tile-256.png` | PNG | — | present | 25,903 |
| `brand/logos/png/fpt-tile-4096.png` | PNG | — | present | 3,658,795 |
| `brand/logos/png/fpt-tile-48.png` | PNG | — | present | 2,162 |
| `brand/logos/png/fpt-tile-512.png` | PNG | — | present | 121,248 |
| `brand/logos/png/fpt-tile-64.png` | PNG | — | present | 3,087 |
| `brand/logos/png/fpt-tile-flat-1024.png` | PNG | — | present | 29,937 |
| `brand/logos/png/fpt-tile-flat-128.png` | PNG | — | present | 3,203 |
| `brand/logos/png/fpt-tile-flat-2048.png` | PNG | — | present | 68,938 |
| `brand/logos/png/fpt-tile-flat-256.png` | PNG | — | present | 6,407 |
| `brand/logos/png/fpt-tile-flat-4096.png` | PNG | — | present | 171,005 |
| `brand/logos/png/fpt-tile-flat-48.png` | PNG | — | present | 1,327 |
| `brand/logos/png/fpt-tile-flat-512.png` | PNG | — | present | 13,325 |
| `brand/logos/png/fpt-tile-flat-64.png` | PNG | — | present | 1,683 |
| `brand/logos/png/fpt-tile-ink-1024.png` | PNG | — | present | 31,768 |
| `brand/logos/png/fpt-tile-ink-128.png` | PNG | — | present | 3,399 |
| `brand/logos/png/fpt-tile-ink-2048.png` | PNG | — | present | 71,291 |
| `brand/logos/png/fpt-tile-ink-256.png` | PNG | — | present | 6,787 |
| `brand/logos/png/fpt-tile-ink-4096.png` | PNG | — | present | 173,300 |
| `brand/logos/png/fpt-tile-ink-48.png` | PNG | — | present | 1,355 |
| `brand/logos/png/fpt-tile-ink-512.png` | PNG | — | present | 14,202 |
| `brand/logos/png/fpt-tile-ink-64.png` | PNG | — | present | 1,716 |
| `brand/logos/png/fpt-tile-small-16.png` | PNG | — | present | 656 |
| `brand/logos/png/fpt-tile-small-24.png` | PNG | — | present | 975 |
| `brand/logos/png/fpt-tile-small-32.png` | PNG | — | present | 1,408 |
| `brand/logos/png/fpt-tile-white-1024.png` | PNG | — | present | 25,310 |
| `brand/logos/png/fpt-tile-white-128.png` | PNG | — | present | 2,653 |
| `brand/logos/png/fpt-tile-white-2048.png` | PNG | — | present | 58,618 |
| `brand/logos/png/fpt-tile-white-256.png` | PNG | — | present | 5,341 |
| `brand/logos/png/fpt-tile-white-4096.png` | PNG | — | present | 148,132 |
| `brand/logos/png/fpt-tile-white-48.png` | PNG | — | present | 1,026 |
| `brand/logos/png/fpt-tile-white-512.png` | PNG | — | present | 11,119 |
| `brand/logos/png/fpt-tile-white-64.png` | PNG | — | present | 1,341 |
| `brand/logos/README.md` | Markdown | text editor | present | 12,026 |
| `brand/logos/source/checksums.sha256` | text | — | present | 3,097 |
| `brand/logos/source/README.md` | Markdown | text editor | present | 2,938 |
| `brand/logos/source/source/brand.py` | Python | node / python3 | present | 3,206 |
| `brand/logos/source/source/fptmark.py` | Python | node / python3 | present | 8,840 |
| `brand/logos/source/source/gen_assets.py` | Python | node / python3 | present | 6,451 |
| `brand/logos/source/source/gen_placements.py` | Python | node / python3 | present | 3,296 |
| `brand/logos/source/source/lockups.py` | Python | node / python3 | present | 4,077 |
| `brand/logos/source/source/requirements.txt` | text | — | present | 114 |
| `brand/logos/source/source/wordmark.py` | Python | node / python3 | present | 2,347 |
| `brand/logos/source/spec.json` | JSON (DTCG) | — | present | 5,508 |
| `brand/logos/svg/fpt-android-adaptive-background.svg` | SVG | — | present | 414 |
| `brand/logos/svg/fpt-android-adaptive-foreground.svg` | SVG | — | present | 1,164 |
| `brand/logos/svg/fpt-appicon-round.svg` | SVG | — | present | 1,526 |
| `brand/logos/svg/fpt-appicon.svg` | SVG | — | present | 1,510 |
| `brand/logos/svg/fpt-construction.svg` | SVG | — | present | 9,853 |
| `brand/logos/svg/fpt-lockup-bilingual-white.svg` | SVG | — | present | 18,098 |
| `brand/logos/svg/fpt-lockup-bilingual.svg` | SVG | — | present | 18,086 |
| `brand/logos/svg/fpt-lockup-horizontal-ar-white.svg` | SVG | — | present | 10,294 |
| `brand/logos/svg/fpt-lockup-horizontal-ar.svg` | SVG | — | present | 10,282 |
| `brand/logos/svg/fpt-lockup-horizontal-en-white.svg` | SVG | — | present | 8,576 |
| `brand/logos/svg/fpt-lockup-horizontal-en.svg` | SVG | — | present | 8,564 |
| `brand/logos/svg/fpt-lockup-vertical-ar-white.svg` | SVG | — | present | 10,213 |
| `brand/logos/svg/fpt-lockup-vertical-ar.svg` | SVG | — | present | 10,201 |
| `brand/logos/svg/fpt-lockup-vertical-en-white.svg` | SVG | — | present | 9,224 |
| `brand/logos/svg/fpt-lockup-vertical-en.svg` | SVG | — | present | 9,212 |
| `brand/logos/svg/fpt-mark-gradient.svg` | SVG | — | present | 1,396 |
| `brand/logos/svg/fpt-mark-ink.svg` | SVG | — | present | 1,193 |
| `brand/logos/svg/fpt-mark-red.svg` | SVG | — | present | 1,193 |
| `brand/logos/svg/fpt-mark-white.svg` | SVG | — | present | 1,193 |
| `brand/logos/svg/fpt-tile-flat.svg` | SVG | — | present | 1,251 |
| `brand/logos/svg/fpt-tile-ink.svg` | SVG | — | present | 1,213 |
| `brand/logos/svg/fpt-tile-small.svg` | SVG | — | present | 1,440 |
| `brand/logos/svg/fpt-tile-white.svg` | SVG | — | present | 1,213 |
| `brand/logos/svg/fpt-tile.svg` | SVG | — | present | 1,450 |
| `brand/MISSING-ASSETS.md` | Markdown | text editor | present | 10,501 |
| `brand/mockups/01-marketing-hero/en.html` | HTML | code editor (reference only) | present | 8,126 |
| `brand/mockups/01-marketing-hero/index.html` | HTML | code editor (reference only) | present | 8,406 |
| `brand/mockups/02-challenge-selector/en.html` | HTML | code editor (reference only) | present | 9,630 |
| `brand/mockups/02-challenge-selector/index.html` | HTML | code editor (reference only) | present | 10,072 |
| `brand/mockups/03-challenge-dashboard/en.html` | HTML | code editor (reference only) | present | 13,997 |
| `brand/mockups/03-challenge-dashboard/index.html` | HTML | code editor (reference only) | present | 14,534 |
| `brand/mockups/04-funded-certificate/en.html` | HTML | code editor (reference only) | present | 7,088 |
| `brand/mockups/04-funded-certificate/index.html` | HTML | code editor (reference only) | present | 7,492 |
| `brand/mockups/05-payout-statement/en.html` | HTML | code editor (reference only) | present | 10,751 |
| `brand/mockups/05-payout-statement/index.html` | HTML | code editor (reference only) | present | 11,182 |
| `brand/mockups/06-evaluation-email/en.html` | HTML | code editor (reference only) | present | 6,708 |
| `brand/mockups/06-evaluation-email/index.html` | HTML | code editor (reference only) | present | 6,961 |
| `brand/mockups/07-social-post/en.html` | HTML | code editor (reference only) | present | 6,225 |
| `brand/mockups/07-social-post/index.html` | HTML | code editor (reference only) | present | 6,343 |
| `brand/mockups/08-slide/en.html` | HTML | code editor (reference only) | present | 10,403 |
| `brand/mockups/08-slide/index.html` | HTML | code editor (reference only) | present | 10,685 |
| `brand/mockups/mockups.css` | CSS | code editor | present | 11,160 |
| `brand/qa-report.md` | Markdown | text editor | present | 23,100 |
| `brand/README.md` | Markdown | text editor | present | 43,174 |
| `brand/references/composition-rules.md` | Markdown | text editor | present | 12,545 |
| `brand/regulatory-matrix.md` | Markdown | text editor | present | 9,355 |
| `brand/scripts/build-tokens.mjs` | Node ESM | node / python3 | present | 12,243 |
| `brand/scripts/charts.mjs` | Node ESM | node / python3 | present | 5,815 |
| `brand/scripts/check-pdf-fonts.py` | Python | node / python3 | present | 1,055 |
| `brand/scripts/check-units.mjs` | Node ESM | node / python3 | present | 3,912 |
| `brand/scripts/contrast.mjs` | Node ESM | node / python3 | present | 10,633 |
| `brand/scripts/sample-data.mjs` | Node ESM | node / python3 | present | 7,430 |
| `brand/scripts/verify-identity.mjs` | Node ESM | node / python3 | present | 19,212 |
| `brand/scripts/verify-tokens.mjs` | Node ESM | node / python3 | present | 6,649 |
| `brand/scripts/verify-unzipped.mjs` | Node ESM | node / python3 | present | 12,798 |
| `brand/skill/fpt-brand/claude-md-paragraph.md` | Markdown | text editor | present | 3,382 |
| `brand/skill/fpt-brand/references/arabic-typography.md` | Markdown | text editor | present | 4,436 |
| `brand/skill/fpt-brand/references/composition-rules.md` | Markdown | text editor | present | 9,808 |
| `brand/skill/fpt-brand/references/finance-semantics.md` | Markdown | text editor | present | 7,109 |
| `brand/skill/fpt-brand/references/logo-usage.md` | Markdown | text editor | present | 4,951 |
| `brand/skill/fpt-brand/references/review-checklist.md` | Markdown | text editor | present | 2,392 |
| `brand/skill/fpt-brand/references/tokens-quick.md` | Markdown | generated — scripts/gen-doc-tables.mjs | present | 35,740 |
| `brand/skill/fpt-brand/references/value-sources.md` | Markdown | text editor | present | 108,400 |
| `brand/skill/fpt-brand/SKILL.md` | Markdown | text editor | present | 20,190 |
| `brand/skill/fpt-brand/verify-skill-wired.mjs` | Node ESM | node / python3 | present | 2,242 |
| `brand/tailwind.preset.js` | JS (Tailwind preset) | generated — brand/scripts/build-tokens.mjs (never edit) | present | 8,335 |
| `brand/templates/.htmlvalidate.json` | JSON (DTCG) | — | present | 555 |
| `brand/templates/document/certificate.html` | HTML | — | present | 4,036 |
| `brand/templates/document/invoice.html` | HTML | — | present | 4,582 |
| `brand/templates/document/payout-statement.html` | HTML | — | present | 10,393 |
| `brand/templates/document/PRINT-SPEC.md` | Markdown | text editor | present | 2,811 |
| `brand/templates/document/print.css` | CSS | code editor | present | 8,341 |
| `brand/templates/document/trader-agreement.html` | HTML | — | present | 6,789 |
| `brand/templates/email/ctrader-credentials.html` | HTML | code editor / ESP template editor | present | 20,952 |
| `brand/templates/email/evaluation-fail.html` | HTML | code editor / ESP template editor | present | 21,396 |
| `brand/templates/email/evaluation-pass.html` | HTML | code editor / ESP template editor | present | 20,965 |
| `brand/templates/email/payout-processed.html` | HTML | code editor / ESP template editor | present | 22,961 |
| `brand/templates/email/TEST-MATRIX.md` | Markdown | text editor | present | 7,048 |
| `brand/templates/legal/REQUIRED-DECISION.md` | Markdown | text editor | present | 4,786 |
| `brand/templates/presentation/fpt-brand-deck.html` | HTML | — | present | 11,090 |
| `brand/templates/presentation/fpt-brand-deck.pptx` | PPTX | PowerPoint / Keynote / Google Slides (generated by scripts/build-deck.mjs) | present | 863,073 |
| `brand/templates/social/exports/og-1200x630.png` | PNG | generated export (ready to post) | present | 44,795 |
| `brand/templates/social/exports/post-1080x1080.png` | PNG | generated export (ready to post) | present | 73,073 |
| `brand/templates/social/exports/post-1080x1350.png` | PNG | generated export (ready to post) | present | 104,265 |
| `brand/templates/social/exports/post-1080x1920.png` | PNG | generated export (ready to post) | present | 69,811 |
| `brand/templates/social/og-1200x630.svg` | SVG | Illustrator / Inkscape / Figma (SVG) | present | 1,991 |
| `brand/templates/social/post-1080x1080.svg` | SVG | Illustrator / Inkscape / Figma (SVG) | present | 3,476 |
| `brand/templates/social/post-1080x1350.svg` | SVG | Illustrator / Inkscape / Figma (SVG) | present | 5,516 |
| `brand/templates/social/post-1080x1920.svg` | SVG | Illustrator / Inkscape / Figma (SVG) | present | 3,037 |
| `brand/templates/social/social-rules.md` | Markdown | text editor | present | 3,212 |
| `brand/templates/video/end-card.html` | HTML | — | present | 4,490 |
| `brand/templates/video/lower-third.svg` | SVG | — | present | 1,780 |
| `brand/templates/video/safe-areas.svg` | SVG | — | present | 3,805 |
| `brand/templates/video/sample.mp4` | MP4 (H.264) | generated sample (scripts/build-video.mjs); any NLE rebuilds from the SVG/HTML sources | present | 96,683 |
| `brand/templates/video/sample.webm` | WebM (VP9) | generated sample (scripts/build-video.mjs); any NLE rebuilds from the SVG/HTML sources | present | 99,034 |
| `brand/templates/video/video-rules.md` | Markdown | text editor | present | 2,777 |
| `brand/tokens.css` | CSS | generated — brand/scripts/build-tokens.mjs (never edit) | present | 24,215 |
| `brand/tokens.json` | JSON (DTCG) | scripts/gen-tokens.mjs (build) · text editor (consumer: edit, then build-tokens) | present | 120,419 |
| `brand/value-sources.md` | Markdown | text editor | present | 108,400 |
| `dist/FPT-Brand-Manual-v1.2.pdf` | PDF | HTML source → scripts/render-manual.mjs | present | 4,483,036 |
| `dist/fpt-brand-v1.2.0.zip` | ZIP | scripts/package.mjs | present | 23,313,612 |
| `dist/fpt-brand-v1.2.0.zip.sha256` | text | — | present | 87 |
| `dist/consumers/UPGRADE-v1.2.0.md` | Markdown | text editor | present | 9,827 |
| `dist/preview/index.html` | HTML | — | present | 7,240 |
| `dist/unzipped-verification.md` | Markdown | text editor | present | 2,541 |
| `checks/contrast.json` | JSON (DTCG) | — | present | 23,309 |

_436 files under `brand/` (23,272,772 bytes) + 7 dist deliverables (all present). Generated 2026-11-01 by `scripts/gen-manifest.mjs`._
<!--/MANIFEST_TABLE-->
