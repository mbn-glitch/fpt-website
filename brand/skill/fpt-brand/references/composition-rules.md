# Composition rules — the approved Fiper composition language (v2.0 · corrected v2.0.1)

Status: **APPROVED direction** (CEO approval of the v1.2.1 review, 29 Oct 2026) as the basis for every Fiper surface. It approves the visual direction only: decision items 1–5, the regulatory matrix, missing assets and untested items keep their documented state (`MISSING-ASSETS.md`, `regulatory-matrix.md`, `qa-report.md`). Light mode for **apps** is NOT approved — the paper ground below is for documents, mail, learning and presentation surfaces only. Values come from `tokens.json`; the site (fiper.io, captured 2026-10-29) remains the documented **source of values and assets**, not of composition: its page composition, the slash-prefixed eyebrow, decorative numbering and repeated card grids are no longer binding and are not used.

Fixed and binding regardless of composition: official logo files only, approved colours, IBM Plex Sans Arabic for all Arabic, naming (فايبر / Fiper), verbatim regulatory texts, no glow/neon, no monospace outside numbers/code, no artificial Arabic letter-spacing.

## 1. Two grounds, two jobs

| Ground | Token | Used for | Not for |
|---|---|---|---|
| Paper | `#F7F4F1` (`semantic.color.light.bg`), text `#120D0E`, muted `#6B635E`, rule `rgba(18,13,14,.22)` | documents (reports, letters, invoices), system e-mails, educational and corporate social posts, presentations | app screens, trading / portfolio UI (light mode for apps = separate open decision) |
| Charcoal | `--fp-ground-bg #0A0708`, text `--fp-text-primary`, muted `--fp-text-muted`, rule `rgba(237,234,230,.28)` | apps and market screens (portfolio, funds, orders, dashboard), the card advertisement, product/market social posts | printed documents, mail bodies |

The two grounds read as one institution because the core (below) is identical on both.

## 2. The constant core (every surface)

| Element | Rule |
|---|---|
| Lockup | official white lockup (SVG) on charcoal, official dark raster PNG on paper; **top-start**; height sets the margin unit (§ 4) |
| Arabic headline | IBM Plex Sans Arabic 700, line-height 1.15–1.2, letter-spacing 0; one headline per surface |
| English secondary line | Inter 500, muted, 1/3 of the headline size, under or beside the Arabic headline |
| Numeric column | IBM Plex Mono 600, tabular, right-aligned in LTR cells; currency code as a small Inter label beside the amount |
| Rules | one 1 px rule in the text colour at 22–28 % alpha between hierarchy levels; a 2 px rule in full text colour opens a key-figure block |
| Meta foot | Inter / Plex Arabic 11–13 px muted: entity line, reference, date, SAMPLE note — bottom-start, above one rule |
| Icons | Lucide only, for navigation, state and action; never on headings, never in a tile |

## 3. Three poles — never one repeated composition

| Pole | Dominant element | Second | Where it is used (reference) |
|---|---|---|---|
| Image-dominant | the official product artwork at full width (card), no crop | one Arabic headline anchored bottom-start, no number | card advertisement (`review/apps/01-card-ad.html`), product social |
| Headline-dominant | one Arabic headline (or a question) at 1/12–1/16 of the canvas width | a comparison table or meta column; no hero number | report cover (`03a`), educational post (`02`), corporate social, letterhead |
| Number-dominant | one figure in IBM Plex Mono at 1/8–1/10 of the canvas width (slides) or 38–40 px (phone) with its currency label | headline or list second; gain/loss line in finance semantics | portfolio screen (`05`), presentation slide (`04`), report inner page (`03b`), statements, dashboards |

Rule: choose the pole from the content's job, then let the other two elements recede. A surface with two dominant elements is wrong; a surface with none is a template.

## 4. Margins and spacing derived from the lockup (per medium)

| Medium | Lockup height | Margin = 2 × lockup height | Inner gaps |
|---|---|---|---|
| Social 1080 × 1080 / 1350 / 1920 | 36–40 px | 72–84 px | 24–56 px between blocks |
| Presentation 1920 × 1080 | 56 px | 112 px | 48–96 px between columns |
| A4 document (794 × 1123 CSS px / 210 mm) | 32 px (8 mm) | 64 px (17 mm) — cover and inner pages | 34–44 px between sections |
| Phone 360–430 px | 22 px | 20 px gutter (the exception: the lockup is small, the gutter follows the 4-pt scale) | 12–26 px |
| E-mail 600 px | 26 px | 28–40 px | 22–28 px |
| Web ≥ 900 px | 26 px | 44–64 px | per `tokens.json semantic.space` |

Alignment: everything starts on the lockup's start edge (one vertical start line per surface); numbers align on their own right edge in LTR cells.

## 5. Cards and boxes — use-serving, not banned

A box is justified when it **groups related information** or **bounds an action**; it is not the default container.

| Justified | Not justified |
|---|---|
| the facts table of a transactional e-mail (groups the order data apart from prose) | a box around every section of a page |
| the chart frame on a phone screen (one unit: title, period, axis, range control) | equal tiles for unrelated items |
| a bottom sheet / modal (bounds an action) | hairline boxes around headings or labels |
| a fund card in a browsing grid where each card is one selectable item | a box around a single number or a single line of text |

When a box is used: panel fill (`--fp-ground-panel` on charcoal, `#FFFFFF` on paper), 1 px rule-coloured border, 12–16 px radius, no shadow (overlays excepted).

## 6. Red — roles, not a count

| Role | Where | Token |
|---|---|---|
| Brand | the logo tile (always present) | the official artwork |
| Primary action | the one primary button / CTA arrow of the surface | `--fp-brand-red` (+ gradient end) with `--fp-text-on-brand` |
| Active state | the active range marker, the active tab icon + bar, the current-value dot on a chart | `--fp-brand-red` |

Finance semantics are separate and never red: gain = word + ▲ + `+` + `--fp-finance-gain`; loss = word + ▼ + `−` + `--fp-finance-loss`; neutral = word + muted; pending = word + clock + `--fp-finance-pending`. Red as text obeys the large-text exception (≥ 24 px regular / ≥ 18.67 px bold); labels never red.

## 7. Order of importance without shrinking

Dominant element → supporting headline or figure → supporting data → meta. Supporting information keeps a readable size on its real medium: social body ≥ 42 px on a 1080 canvas (≈ 14 px when the post is shown 360 wide — essential text only; marginal meta may be smaller), phone body 14–15 px, phone meta ≥ 11 px, A4 body 14 px / meta 12 px, slides ≥ 26 px at 1920. Shorten or split across slides rather than shrink.

## 8. Charts — generated from one dataset

Every reference chart (report, portfolio, presentation, statements, manual) is produced by `brand/scripts/charts.mjs` from `brand/scripts/sample-data.mjs` (one SAMPLE dataset, arithmetically consistent: holdings + cash = last point = 11,553.65 USD; month gain +303.75 USD = +2.70 %). Positions, axes (nice ticks), x labels, start/end values and the benchmark (S&P 500 Sharia rebased to the portfolio's first point) are computed — never a pre-drawn path relabelled. Charts carry: what they show, the period, the currency, axis labels, the end value; one line in the text colour, the benchmark dashed muted, the single red dot = current value. Marker in HTML: `<!--CHART:{json}-->…<!--/CHART-->` (see `charts.mjs` `injectCharts`).

## 9. Numeric units inside Arabic text

Amount + currency (`1,250.00 USD`), sign + number + percent (`+2.70 %`), and date parts are **unbreakable units**: `<span class="fp-unit">` / `<bdi class="num">` (tokens.css: `white-space: nowrap; direction: ltr; unicode-bidi: isolate; IBM Plex Mono tabular`). Never let `%` or the currency code wrap away from its number; test in HTML, PDF and exports (`qa-report.md` § units).

## 10. Labels, numbering, icons

- No slash label prefix, no decorative numbering, no technical labels. A small label exists only where it names a value (field label, table header, chart period).
- Numbers as structure only when the sequence is real (ordered steps); a comparison is a table with axis and option columns, not a numbered list.
- Icons clarify a function or a state (navigation, actions, pending/settled/failed, Sharia badge). No icon on headings, none in coloured tiles.

## Don't

Ornaments, effects, a new typeface or icon set for the sake of difference; two dominant elements; a box around everything; red to emphasise an ordinary or financial number; shrinking supporting text below the medium's floor; a relabelled chart; a percent sign or currency code separated from its number; light grounds on app screens before the separate decision.

## Historical notes — fiper.io observations (NOT for new use)
Recorded only so the site can be read as a source of values. None of these is an instruction; agents must not reintroduce them on any surface: the mono eyebrow with a double-slash prefix (IBM Plex Mono .68rem, letter-spacing .28em, red — fiper.io line 39), the `.core` chip set in mono .55rem with .2em tracking (line 128), the trust-bar dot with a red glow (line 115), the numbered `.tg .n` section labels (line 188), the hero radial wash (line 75) and `.cardshow` glow, the floating/tilting card (`cardfloat`, lines 162–168), the button glow `0 6px 26px rgba(220,38,38,.35)` (lines 46–49), letter-spaced Latin caps beyond .06em, and the red hero stat numbers (`.stat b`, line 204). Current rules: labels are Inter 600 .06em / IBM Plex Sans Arabic 600 with no prefix; the brand badge is Inter 600 uppercase .06em on a red fill; red has three roles (logo tile, primary action, active state); numbers are never red for emphasis; no glow anywhere.
