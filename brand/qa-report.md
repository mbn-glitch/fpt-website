# QA report — FPT Brand Identity System v1.2.2 (5 Nov 2026 — texts and rules only: CR-13 compact e-mail header withdrawn · CR-14 red budget on the public site · CR-15 Latin display scale + addendum; v1.2.1 2 Nov 2026 — CR-10 destructive dialog · CR-11 lockups in English only · CR-12 e-mail header card; v1.2.0 1 Nov 2026 — CR-05 / CR-06 / CR-07 + e-mail paper in every mode; v1.1.2 CR-01…04 31 Oct 2026; v1.1 logo v2 30 Oct 2026; v1.0 base 29 Oct 2026)

Evidence-based acceptance. Every row is PASS, FAIL, PARTIAL, NOT TESTED or NOT PROVIDED with its evidence path (repo-relative; `dist/`, `checks/` and `manual/` live in the GitHub repo and on the preview host, not in the zip). Gates are run from the **unzipped copy in a clean folder outside the repo** (`node brand/scripts/verify-unzipped.mjs dist/fpt-brand-v1.0.zip <clean-dir>` → `dist/unzipped-verification.md`) and repeated in the build repo where a build-repo tool is needed (Playwright, pypdf, ImageMagick).

## 0. v1.2.2 — owner decisions 4–5 Nov 2026 (CR-13 · CR-14 · CR-15 + addendum 44-أ): texts and rules only — the light gates re-run once

Scope: the task file FPT-BRAND-1-2-2-20261105-001047.md — register rows CR-13 / CR-14 / CR-15 (+ the addendum's evidence table), the application note §§ 3–4 corrected and §§ 6–7 added (the RD2 rules in package wording; the approved headline texts in six languages), README § C / § D / § N, composition addenda G / H, SKILL / claude-md paragraph, checklists 59 / 60 + per-surface rows, glossary § 5 pointer, value-sources rows, logos READMEs (CR-13), CHANGELOG, manifest, package. **No SVG, font, colour, token or raster changed** (`tokens.json` stays 1.2.1 — the three rule tokens are named in the register for the next token release); the manual PDF is not re-rendered (no manual page changes; footer stays v1.2.1); the heavy render gates (check-units, check-mockups, check-emails, build-logos) were not re-run — their inputs are byte-identical to v1.2.1.

<!--V122_GATES-->

## 0a. v1.2.1 — owner decisions 1 Nov 2026 23:08 Qatar (CR-10 · CR-11 · CR-12 · the seven answers): gates re-run once

Scope: the five items of the task file § 0 + the owner's CR-12 addition; logo v2 masters (24 = checksums), colours, fonts, CR-01…07, the relationship line, the foot, the parent pin unchanged; CR-08 / CR-09 not applied (PROPOSED in `identity-change-requests.md`).

| Gate | Result | Evidence |
|---|---|---|
| Tokens: `gen-tokens` (parent file at tag v2.0.1 via `FIPER_PARENT`) → `build-tokens` → `verify-tokens` (482 leaves; approved 62 → 77, deprecated 13 → 14; new assertions: the five `component.dialog.*` tokens, `component.logo.lockup-language` = `en-only`, CR-12 e-mail tokens, APPROVED status of OG geometry / e-mail header size / app-title / app-display) | PASS | run log; `git diff v1.2.0 -- brand/tokens.css` |
| `verify-identity.mjs brand` with the three new gates DESTRUCTIVE-DIALOG-CANCEL / DESTRUCTIVE-DIALOG-FOCUS / ARABIC-LOCKUP-IN-USE (+ OLD-EMAIL-HEADER widened to the v1.2.0 paper headers) | PASS — `summary: {} → PASS` | run log; planted cases `checks/gates/` (build repo) via `scripts/check-gates.mjs`: positive HTML + TSX + preview.html = 0 findings; negative HTML = CANCEL 3 · FOCUS 2 · ARABIC 2; negative TSX = CANCEL 1 · FOCUS 1 · ARABIC 1 (exactly as planted) |
| `check-components.mjs` (`.fpt-dialog__actions`, preview § 10 two examples) | PASS | run log |
| `check-mockups.mjs` — the English lockup on the Arabic mockups 01 / 03 / 07 (CR-11) | ALL PASS (50/50) | `dist/checks/mockups/` |
| `build-logos.mjs --derived-only` — `email-header-160-card@2x.png` (card 320 × 112, radius 16, padding 24 device px, lockup 272 × 57) + `email-header-160-dark@2x.png`; OG rasters byte-identical to v1.2.0 | PASS (deterministic) | `brand/logos/derived/`, sha256 in `dist/consumers/UPGRADE-v1.2.1.md` |
| `check-emails.mjs` (rebuilt for CR-12) — html-validate 0 ×4; card header byte-identical with transparent corners and paper edge / padding; hidden twin byte-identical, `[data-ogsc]` header-scoped only (2 rules), excluded from Outlook Windows; `bgcolor` + `style` ×3; CR-03; light + dark emulation on paper 8/8; **forced-dark simulation** (Outlook partial → twin 15.4:1 · Gmail full → card 17.6:1, no hard-edged box) 8/8 | PASS | `dist/checks/email/*-360-{light,dark,sim-outlook-partial,sim-gmail-full}.png`; candidates ×3 modes in the session captures `FPT-BRAND-V1-2-1-captures/cr12/` |
| Real mail clients (the owner's Outlook iOS / Apple Mail iOS / second inbox observation) | NOT TESTED here — rows in `templates/email/TEST-MATRIX.md`; re-test requested with platform template 6 | — |

## 0b. v1.2.0 — owner decisions 1 Nov 2026 (CR-05 share image · CR-06 ladder · CR-07 destructive · e-mail paper in every mode · paper header): gates re-run once

Scope: the five decisions of the task file § 0; logo v2, colours, grounds, finance, spacing, radii, motion, CR-01…04 unchanged; parent pin unchanged.

| Gate | Result | Evidence |
|---|---|---|
| Tokens: `gen-tokens` (parent file at tag v2.0.1 via `FIPER_PARENT`) → `build-tokens` → `verify-tokens` (470 leaves; approved 30 → 62; inherited 142 re-checked against the parent file: all equal; new assertions OG-RISK-LINE-WORDING, TYPE-LADDER, rule tokens) | PASS | run log; `git diff v1.1.2 -- brand/tokens.css` (app-body 16, app-label 13, app-subtitle 18, app-title 22, app-display 32, unit floor 16, destructive / email / og tokens) |
| `contrast.mjs` — re-run on the unchanged colour set | PASS | `checks/contrast.json` |
| `verify-identity.mjs brand` → `summary: {} → PASS` incl. the new rules DANGER-FILLED-OUTSIDE-DIALOG / OLD-EMAIL-HEADER / OLD-OG-IMAGE; negative test (solid button outside a dialog, `:hover` fill, old header / OG names) → 5 findings as expected | PASS | run log |
| `check-components.mjs` (components.css: destructive outline / text / solid; `.fpt-unit` floor; preview.html § 1 + § 10 dialog) | PASS | run log |
| Assets: `build-logos.mjs` — 119 PNG · 24 PDF · 21 EPS · 17 icons · **7 derived** (`email-header-160/120-paper@2x` + transparent twins, `og-1200x630-ar/-en`, `email-tile-112@2x`) · 22 checks; vector check PASS; paper headers: four corners `#F7F4F1` opaque (transparent twins α0); OG: risk line asserted verbatim on the DOM, 16 px = 14.4 px at 1080 w, fonts IBM Plex Sans Arabic / Inter loaded | PASS | `brand/logos/derived/`, `dist/logo-checks/`; superseded files in `brand/logos/_deprecated/derived/` |
| `check-emails.mjs` (rebuilt) — html-validate 0 ×4; raw URLs 0; placeholder 4/4; cTrader only; **no dark rule + light-only declaration 4/4**; header byte-identical to `email-header-160-paper@2x.png`, 320 × 112, corners = paper, shown 160 × 56, old file absent 4/4; CR-03 smallest visible font 12 px, no English twin line 4/4; 360 px light + dark emulation 8/8 with the ground `#F7F4F1` in both | PASS | `dist/checks/email/*-360-{light,dark}.png` |
| Mockups rebuilt (CR-02 sentence case in the 01 header; body 16 / hero 32): `check-mockups` 50/50 renders, Arabic nodes 322 / 0, units 0 broken, identity PASS; `check-a11y` PASS | PASS | `dist/checks/mockups/`, `dist/checks/a11y/results.md` |
| Manual re-rendered as `FPT-Brand-Manual-v1.2.pdf` (cover, TOC footer, B3, B4, D2, F2, G1, G3, K1, K4, app-note page; `manual.css` destructive button outline): **37 pages**, OVERFLOW none, INTERSECT none, broken images none, placeholder words 0, LAYOUT GATE PASS, PDF FONTS PASS (brand fonts only, 12 faces) | PASS | `dist/FPT-Brand-Manual-v1.2.pdf`, `dist/pages/page-07/14/19/25.png` viewed |
| `check-templates.mjs` 13/13 (e-mails, documents + PDF fonts ×4, deck, social, html-validate, units, Arabic elements, identity) · `check-docs.mjs` PASS (tables, paths, vocabulary, pin) · `check-logical.mjs` PASS · `gen-manifest` 436 package files / `check-manifest` 548 present · 0 missing · `verify-identity --legacy-only brand scripts manual` PASS (superseded names in docs = report-only mentions) | PASS | run logs |
| Package `dist/fpt-brand-v1.2.0.zip` — sha256 in the sidecar `dist/fpt-brand-v1.2.0.zip.sha256` and in `FPT-BRAND-V1-2-REPORT.md` (a file inside the zip cannot carry its own hash); `verify-unzipped` from `/home/builder/fpt-brand-unzip-check`: ALL PASS (required files incl. the new derived rasters and `_deprecated/`, 24 masters = checksums, 18 pages open, build-tokens byte-identical, verify-tokens / contrast / verify-identity / sample data from the copy) | PASS | `dist/unzipped-verification.md` |
| Preview rebuilt (gallery v1.2.0, `_deprecated/` and `legacy-v1/` never deployed) and deployed with the existing login (URL in `dist/preview-url.txt` and the v1.2.0 report) — `/`, `/manual.pdf`, `/fpt-brand-v1.2.0.zip`, `/manual/`, live mockups, the new derived rasters → 200; `/brand/logos/_deprecated/…` → 404 | PASS | `dist/preview-url.txt` |
| Real mail clients (Gmail / Outlook / Apple Mail — rows ready in `TEST-MATRIX.md`), Office rendering, commercial print, screen readers | NOT TESTED (unchanged) | — |

## 0a. v1.1.2 — CR-01…04 approved by the owner (31 Oct 2026 04:29 Dubai): gates re-run once

Scope: the four identity change requests of fpt-platform `docs/identity-change-requests.md` (mono narrowed to hero amounts / identifiers / dense tables; relationship line in sentence case without tracking; e-mail foot in the message language only, nothing under 12 px; focus ring = the text colour). No logo asset, colour, ground, finance, spacing, radius, motion or template-layout value changed; parent pin unchanged.

| Gate | Result | Evidence |
|---|---|---|
| Tokens: `gen-tokens` → `build-tokens` → `verify-tokens` (433 leaves; approved 27 → 30, proposed 77 → 74; inherited 126 re-checked against the parent file: all equal); only `action.focus-ring` (#F42821 → #FFFFFF), `button.focus-ring` (alias), `badge.endorsement.font` (status) and `badge.endorsement.letter-spacing` (0.06em → 0) changed in `tokens.css` | PASS | `git diff v1.1.1 -- brand/tokens.css` |
| `contrast.mjs` — 77 pairs incl. the focus-ring pairs (white on bg / panel) | PASS | `checks/contrast.json` |
| `verify-identity.mjs brand` → `summary: {} → PASS` (CR-01 `.fpt-unit` text font, CR-02 no uppercase / tracking on the endorsement, CR-03 mails) | PASS | run log |
| `check-components.mjs` (components.css + preview.html) | PASS | run log |
| `check-emails.mjs` — html-validate 0 errors ×4, raw URLs 0, regulatory placeholder present, 360 px light + dark 8/8, button on the first screen; the foot is the message language only at 12 px | PASS | `dist/checks/email/` |
| Manual re-rendered (cover, A1, A2, D2, G1; footer «v1.1.2 · 31 OCT 2026»): 37 pages, OVERFLOW none, INTERSECT none, LAYOUT GATE PASS, PDF FONTS PASS (brand fonts only) | PASS | `dist/FPT-Brand-Manual-v1.1.pdf`, `dist/pages/` |
| `check-docs.mjs` (tables, paths, pin, vocabulary) | PASS | run log |
| Package `dist/fpt-brand-v1.1.2.zip` + sha256 sidecar + manifest (`gen-manifest` / `check-manifest`) + `verify-unzipped` from a clean folder | PASS — 474 entries; the sha256 lives in the sidecar `dist/fpt-brand-v1.1.2.zip.sha256` and in the F4B report (a file inside the zip cannot carry its own hash); `check-manifest` 540 present · 0 missing | `dist/fpt-brand-v1.1.2.zip.sha256`, `dist/unzipped-verification.md` |
| Real mail clients, Office rendering, commercial print, screen readers | NOT TESTED (unchanged) | — |

## 0. v1.1 — logo v2 update (30 Oct 2026): gates re-run once

Scope: the logo only (CEO approval 30 Oct 2026). Nothing outside the logo list changed (colours, typography, spacing, components style, template design, copy, decision items, regulatory text, endorsement, CMYK).

| Gate | Result | Evidence |
|---|---|---|
| Payload: 10 chunks sha256 prefixes = expected; archive sha256 `368d12a8…`; `checksums.sha256` OK | PASS | Step 0 log |
| Masters placed byte for byte (24 svg = approved checksums); v1 JPEGs + derived moved to `logos/legacy-v1/` unchanged | PASS | `brand/logos/source/checksums.sha256`, `git log --follow` |
| `scripts/build-logos.mjs` — 119 PNG (tiles 48–4096, small cut 16/24/32 only ≤ 32 px, marks w128–w4096, 10 lockups h48–h1024), 24 PDF, 21 EPS, 17 icons, 3 derived, 22 render checks; vector check (path operators, no image XObject) on every PDF and EPS | PASS | `brand/logos/{png,pdf,eps,icons,derived}`, `dist/logo-checks/` |
| EPS exactness: ghostscript eps2write rasterised the gradient → EPS written directly from the masters (`scripts/svg2eps.mjs`, Level-3 axial shading); re-interpreted through gs → pdfjs: 0 images | PASS | `brand/logos/eps/` |
| Tokens (logo leaves only): wordmark-ink `#030303→#120D0E`, corner `0.19→0.20`, lockup aspect `5.273→4.7364`, stacked `1.135→1.1154`, gap `0.38→0.3333`; deprecated `radius.logo-tile`/`c.logo.tile-radius` (22 %), `max-lockup-print`, `max-tile-print`, `tile-share-of-canvas-*`; added `small-cut-max` 32px, `lockup-aspect-ar` 3.9043, `lockup-aspect-bilingual` 3.2272, `stacked-aspect-ar` 0.9586, `wordmark-ink-dark` #FFFFFF — `verify-tokens` PASS (433 tokens), `contrast` 77 pairs PASS (unchanged) | PASS | `brand/tokens.json`, `checks/contrast.json` |
| Logo usage: 0 references to legacy-v1 / v1 file names outside legacy-v1, CHANGELOG, reports (`verify-identity` LEGACY-LOGO-REFERENCE + LOGO-MASTER-MODIFIED added); no CSS clip of the tile anywhere (`22%` gone from templates, components, mockups) | PASS | `node brand/scripts/verify-identity.mjs brand → summary: {} → PASS` |
| Rebuilt outputs: mockups 50/50 renders PASS, a11y 17/17, Arabic nodes 317/0; templates `check-templates` 13/13 PASS (`check-emails` 8/8, documents A4 overflow none, PDF fonts brand-only ×4, PPTX structural PASS · visual NOT TESTED, social 4/4 exports, video mp4 + webm); components preview PASS | PASS | `dist/_gates-t.md`, `dist/checks/**` |
| Manual v1.1: logo pages B1–B4 rebuilt (+1 page → 37 ≤ 38), other pages unchanged apart from swapped logo images; LAYOUT GATE PASS, PDF FONTS PASS, units 589/0 HTML · 130/0 PDF | PASS | `dist/FPT-Brand-Manual-v1.1.pdf`, `dist/pages/` |
| Docs: `logos/README.md` rewritten; MISSING-ASSETS items 1/2/3/5/6/8/9 RESOLVED (4/7/10 unchanged); README § B, value-sources § logos, SKILL, logo-usage, checklists, application note, SPEC, manifest, CHANGELOG v1.1.0 — `check-docs` PASS | PASS | `dist/_progress-d.md` |
| Package `dist/fpt-brand-v1.1.1.zip` + verify-unzipped from a clean folder (24 masters = checksums, pages open, regeneration byte-identical) | PASS | `dist/unzipped-verification.md`, `dist/fpt-brand-v1.1.1.zip.sha256` |
| Preview rebuilt + deployed (plain preview, same scope) | PASS | `dist/preview-url.txt` |

## 1. Task-file gates (PASS / FAIL / NOT TESTED) — v1.0 base, re-checked where the logo update touches them

| Gate | Result | Evidence / note |
|---|---|---|
| contrast — every token pair from `tokens.json`; exit 1 below threshold | PASS — 77 pairs, 0 required pairs below threshold (restricted / forbidden / rejected / reference rows documented) | `node brand/scripts/contrast.mjs` → `checks/contrast.json` (77 pairs incl. decision tables 2 / 3 / 6; documented restricted pair: white on flat `#F42821` 4.06) |
| logo — files validated, rendered at 16 / 24 / 32 / 180 / 512 px; JPEG limits stated | PASS (v1.1) — 24 vector masters = approved checksums; renders 119 PNG / 24 PDF / 21 EPS / 17 icons / 3 derived; 22 render checks (small cut 16/24/32, master 46/180/512, lockup h24–242 on both grounds) viewed; no JPEG limits any more (`brand/logos/README.md`) | `scripts/build-logos.mjs` → `dist/logo-checks/` (22 renders), `brand/logos/README.md` limits, `sources/logo-measurements.json` |
| fonts — licensed, Arabic shaping + Latin digits + currency symbols tested; no synthetic bold | PASS — 17 OFL woff2 + 4 licences; Arabic nodes → IBM Plex Sans Arabic: manual 1579 / 0, mockups + preview 317 / 0, templates 242 / 0; digits + currency inside Arabic units proven contiguous in PDF text (122 reference units); `font-synthesis: none`; 12 real faces loaded at render | `brand/fonts/licenses/`, `dist/checks/fonts/arabic-elements.md` (`scripts/check-arabic-elements.mjs`), `font-synthesis: none` in `tokens.css` |
| email — HTML valid; 360 px light / dark screenshots; zero raw URLs in rendered text; real clients NOT TESTED | PASS (browser) — html-validate 0 errors ×4, raw URLs 0, 360 px light + dark emulation 8/8, button on the first screen; real clients NOT TESTED | `scripts/check-templates.mjs`, `dist/checks/email/*-360-{light,dark}.png`, `brand/templates/email/TEST-MATRIX.md` |
| manual — brand fonts only inside the PDF (pypdf); no overflow or intersection; no placeholder text; every value in value-sources | PASS (v1.1) — 37 pages (≤ 38), `PDF FONTS PASS` (IBM Plex Sans Arabic / Inter / IBM Plex Mono / Barlow Condensed only), `OVERFLOW: none · INTERSECT: none · LAYOUT GATE: PASS`, placeholder words 0, every page rendered to `dist/pages/` and viewed; values carry status tags traced to `brand/value-sources.md` | `python3 brand/scripts/check-pdf-fonts.py dist/FPT-Brand-Manual-v1.0.pdf`; `scripts/render-manual.mjs` layout gate; `dist/pages/page-NN.png` |
| check-units — HTML + PDF + exports: logical props; rem not px for type; units unbroken | PASS — manual HTML 586 units / 0 broken, PDF 122 / 0 missing; templates 9 pages + statement PDF 26 / 0; mockups + preview 0 broken; `scripts/check-logical.mjs` PASS (logical properties; 3 by-design LTR exceptions documented inline; semantic font sizes in rem) | `node brand/scripts/check-units.mjs --ref=… manual/index.html dist/FPT-Brand-Manual-v1.0.pdf` + templates + mockups |
| verify-identity — `brand/` incl. tokens.css and preset; no glow; no mono labels; no Arabic letter-spacing; no unapproved hex | PASS — `summary: {} → PASS` on the whole package incl. tokens.css + tailwind.preset.js (report-only Unicode marks inside finance/CTA spans) | `node brand/scripts/verify-identity.mjs brand` → `summary: {} → PASS` |
| charts — all from one sample dataset; arithmetically consistent; data marked SAMPLE; no performance claims | PASS — one dataset (`sample-data.mjs`, assertions hold: end 55,312.50 ≥ target 55,000.00, no floor breached, payout 2,499.60 + 624.90 = 3,124.50); every chart `data-chart="sample-fpt-50k-evaluation"` with target / floors / band computed; SAMPLE chips; no performance claim | `brand/scripts/sample-data.mjs` assertions; `data-chart="sample-fpt-50k-evaluation"` on every rendered chart |
| deliverables-manifest — every output file accounted for with format / tool / status / size | PASS — 210 package files + dist deliverables listed with format / tool / status / bytes; `check-manifest` 309 present · 0 missing | `node scripts/gen-manifest.mjs` + `node scripts/check-manifest.mjs` |
| pptx/docx — structural check; visual rendering NOT TESTED if no Office | PASS structural (PPTX: 1 master, 6 layouts, 5 slides, 8 media, rtl + lang ar) · visual NOT TESTED (no Office) · DOCX: NOT PROVIDED (not in the required package tree; documents ship as HTML + print.css) | `dist/checks/editables/` (unzip listing of masters / layouts / slides); no Office on the build server → visual NOT TESTED |
| verify-unzipped — regenerate from the unzipped copy → byte-identical outputs | PASS — ALL PASS from `/home/builder/fpt-brand-unzip-check` (68 required files, 18 pages open from the copy, build-tokens / verify-tokens / contrast / verify-identity / sample-data run from the copy; tokens.css + tailwind.preset.js byte-identical) | `dist/unzipped-verification.md` |

## 2. Sources and tokens
| Check | Result | Evidence |
|---|---|---|
| fpt-website captured read-only (commit, date, md5 of every source file) | PASS | `sources/SOURCES.md`, `brand/value-sources.md` § 1 |
| Parent pin fiper-brand v2.0.0; 126 inherited values equal the parent file | PASS — 126 inherited tokens equal | `node brand/scripts/verify-tokens.mjs` |
| tokens.json references, statuses, no raw hex outside primitives, no reference-only value used | PASS — VERIFY PASS (423 tokens: approved 15 · observed 98 · inherited 145 · proposed 76 · reference 3 · deprecated 7 · alias 79) | `verify-tokens` → VERIFY PASS (423 tokens) |
| Generated tokens.css / tailwind preset clean (no glow, no `.2em`, no deprecated / parent value) | PASS | `node brand/scripts/verify-identity.mjs brand` |

## 3. Colour and contrast
| Check | Result | Evidence |
|---|---|---|
| WCAG ratio for every text / ground pair (dark + paper) | PASS | `checks/contrast.json` |
| Decision item 2 rows (`#F42821` vs `#DC2626` on `#0A0A0A` / `#141414`; white on flat red / midpoint / `#A30100`) | PASS (documented: #F42821 4.88 / 4.54 vs #DC2626 4.10 / 3.81; white on flat #F42821 4.06 = large / icons only; on #CB1511 5.75; on #A30100 8.20) | `checks/contrast.json` theme `decision-2` |
| Decision item 3 rows (coral / amber on both grounds; red rejected for loss; ΔE coral↔red) | PASS (coral 6.85 / 6.37 / 6.02; amber 8.80 / 8.19; ΔE coral↔red 38.8; brand red rejected for loss) | theme `decision-3` |
| Decision item 6 rows (`#0A0A0A` vs `#0A0708`) | PASS (19.80 vs 20.06 · 6.26 vs 6.26 · 4.88 vs 4.94 · 6.85 vs 6.94) | theme `decision-6` |

## 4. Logo · 5. Fonts · 6. Components, mockups, accessibility · 7. Templates and editables · 8. Manual and preview · 9. Docs and wiring
Full gate tables of the parallel builds: `dist/_gates-a.md` (components + mockups), `dist/_gates-b.md` (templates); `dist/unzipped-verification.md` (package).

### 4. Logo
| Check | Result | Evidence |
|---|---|---|
| Official JPEGs byte-identical to fpt-website (md5); no modified logo referenced anywhere | PASS | `brand/value-sources.md` § 4; verify-identity RETYPED-WORDMARK = 0 |
| Derived rasters are downscales / placements only; renders viewed at 16–512 px | PASS | `dist/logo-checks/`, `brand/logos/README.md` |
| Missing variants recorded, none invented | PASS | `brand/logos/MISSING-ASSETS.md`, `brand/MISSING-ASSETS.md` |

### 5. Fonts
| Check | Result | Evidence |
|---|---|---|
| Complete official OFL files, licences inside the package | PASS | `brand/fonts/licenses/README.md` |
| Arabic elements resolve to IBM Plex Sans Arabic (components, mockups, templates, manual) | PASS (0 offenders on every surface) | `dist/checks/fonts/arabic-elements.md` |
| Fonts actually used inside every PDF (manual + documents) | PASS (manual + 4 document PDFs) | `check-pdf-fonts.py` logs |
| Safari / iOS, Windows DirectWrite, print raster | NOT TESTED | — |

### 6. Components, mockups, accessibility
| Check | Result | Evidence |
|---|---|---|
| components.css 0 hex literals; every var defined; preview 390 px dark AR / EN | PASS (146 vars defined; 0 hex; preview-390-ar/en viewed) | `dist/checks/components/` |
| 8 mockups AR + EN at 320 / 360 / 390 px, no horizontal overflow, no broken images, SAMPLE chips | PASS 50/50 renders | `dist/checks/mockups/` |
| Touch targets ≥ 44 px, focus visible, reduced motion, 320 px reflow | PASS 17/17 (`scripts/check-a11y.mjs`) | mockups build gate table |
| Real screen readers / devices | NOT TESTED | — |

### 7. Templates and editables
| Check | Result | Evidence |
|---|---|---|
| E-mails: html-validate 0 errors; raw URLs 0; 360 px light + dark emulation | PASS | `dist/checks/email/` |
| Gmail / Outlook / Apple Mail | NOT TESTED | `brand/templates/email/TEST-MATRIX.md` |
| Documents rendered (A4), brand fonts only, units unbroken; regulatory slot = placeholder | PASS (certificate 1 p, statement 2 pp, agreement 2 pp layout-only, invoice 1 p) | `dist/checks/document/` |
| PPTX structure (masters / layouts / 5 slides) | PASS structural · visual NOT TESTED | `dist/checks/editables/` |
| Social: 4 masters + exports; essential body ≥ 42 px; viewed at 100 % and 360 wide | PASS (1350 body 44 px → 14.67 px at 360) | `brand/templates/social/exports/`, `dist/checks/social/` |
| Video: safe areas, lower third, end card, 5-second sample | PASS (sample.mp4 H.264 1080×1920 30 fps 5 s + webm) · NLE native template / audio NOT PROVIDED | `brand/templates/video/` |
| Press-ready print | NOT PROVIDED — office print only; CMYK / bleed = REQUIRED DECISION | `brand/templates/document/PRINT-SPEC.md` |

### 8. Manual and preview
| Check | Result | Evidence |
|---|---|---|
| ≤ 36 A4 pages, AR primary + EN, rule / value / example / don't per page | PASS (36 pages) | `dist/FPT-Brand-Manual-v1.0.pdf` |
| Layout gate (overflow / intersections); every page rendered to PNG and viewed | PASS (all 36 pages viewed) | `dist/pages/` |
| Phone preview: gallery of 8 mockups at 390 px + PDF + zip, deployed | PASS — v1.2.0 URL in `dist/preview-url.txt` (v1.0: https://fpt-brand-dlu729nwt-fiper-card.vercel.app; Vercel Authentication disabled on the project so the phone can open it) | `dist/preview-url.txt`, `FPT-BRAND-V1-2-REPORT.md` |

### 9. Docs and wiring
| Check | Result | Evidence |
|---|---|---|
| Markdown tables, referenced paths, vocabulary, parent pin, no MT5, no فيبر | PASS (`check-docs` 32 docs) | `node scripts/check-docs.mjs` |
| Manifest paths present | PASS 309 / 0 | `node scripts/check-manifest.mjs` |
| verify-skill-wired on a consumer repo | NOT TESTED (no consumer repo modified by design) | `brand/skill/fpt-brand/verify-skill-wired.mjs` |

## 10. Package identity

`dist/fpt-brand-v1.2.0.zip` — sha256 in `dist/fpt-brand-v1.2.0.zip.sha256` (outside the zip) and in the delivery report `FPT-BRAND-V1-2-REPORT.md`. Manual `dist/FPT-Brand-Manual-v1.2.pdf`. Preview: `dist/preview-url.txt`. v1.1.x artefacts are superseded; tags `v1.1.0` … `v1.1.2` remain in git history. v1.0 artefacts (zip sha256 `bc62b88b…`, 36-page manual) are superseded; tag `v1.0.0` remains in git history.

## 11. Remaining gaps / blockers
1. Decision items 1–6 are PROPOSED defaults (not confirmed by the team); item 1 requires a full re-check when flipped.
2. Regulatory: no text exists for FPT — entity of record, risk statement, legal documents, e-mail / document foot, agreement text, invoice tax / entity (`brand/regulatory-matrix.md` decisions 1–11).
3. MISSING ASSETS (after logo v2): endorsement artwork with Fiper, CMYK / Pantone, the two brand-kit PDFs, product screenshots, live credentials e-mail / CRM screens (`brand/MISSING-ASSETS.md`); logo vector, white lockups, transparent tile, Arabic lockup, mono versions, icon masters and OG are RESOLVED.
4. NOT TESTED: real mail clients, Office rendering, Safari / Windows fonts, screen readers / devices. NOT PROVIDED: press-ready print, native NLE template.
5. Site defects recorded for the developer's round (`brand/fpt-website-application-note.md`): invented statistics / testimonials / Trustpilot, the MT4 / MT5 mention in `faq.a5` (must become cTrader only), glow / glass / float treatments, Cairo / JetBrains Mono, gold badge, pure-black ground, retyped favicon.

Not final: usable for limited work with the limits above; not declared rollout-ready while items 2–3 remain open.
