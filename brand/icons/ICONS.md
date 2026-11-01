# Icons — FPT Brand v1.0 (inherited: Lucide v0.468.0, ISC)

One set, inherited unchanged from fiper-brand v2.0.0 (decision item 5 of the parent — PROPOSED there, applied here): **Lucide v0.468.0**, vendored as 72 SVG files in `lucide/` with its licence. fpt-website already uses `lucide-react ^0.469.0` (package.json) — the same family; pin the React package to the vendored version when the site migrates.

## Rules (binding)

| Rule | Value |
|---|---|
| Grid / style | 24 px grid, line style only (never filled, duotone, 3D, glossy, icon fonts) |
| Sizes | 16 px `.fpt-icon--sm` (inline in sm buttons, chips, helper lines, badges 13–14 px) · 20 px `.fpt-icon--md` (buttons md, input affix, list rows) · 24 px `.fpt-icon` / `--lg` (tab bar, header actions, empty states at 24 px) |
| Stroke | 1.75 at 16 px · 2 at 20 / 24 px · 2.25 on the active tab-bar icon · 1.5 on the empty-state icon |
| Caps / joins | round |
| Colour | `currentColor` — inherits the text colour. The active tab icon is the one place an icon is brand red (active-state role). State icons take the state colour (success / warning / danger / info). Never red for decoration. |
| Alignment | inline-flex row, `align-items: center`, 8 px gap; space around an icon = half its size; never baseline-aligned |
| Hit area | ≥ 44 × 44 px (the `::after` hit box in `components.css`), ≥ 4 px inside it |
| RTL | directional icons (`chevron-*`, `arrow-*`, `log-out`, `external-link`) carry `.fpt-icon--dir` → `scaleX(-1)` under `[dir="rtl"]`; everything else never mirrors (clock, check, alerts, media, charts) |
| Meaning | an icon exists only to explain a **function** (navigation, action) or a **state** (pending, passed, failed, warning). Never on headings, never to fill space, never as a bullet |
| Tiles | no coloured icon tiles in apps. The site's 40 px `w-10 h-10` tile with a red icon (`KeyRules.jsx`) is a **marketing feature-grid** treatment only (`--fpt-size-icon-tile`); in apps the rule row shows a plain 18 px muted icon or none |
| Unicode / emoji | never a Unicode symbol (■ ▲ ◔ ✓) or an emoji in place of an icon; `▲ ▼ ✓ ✕` only as text marks inside finance sentences. The site footer's emoji link labels (🔥 🏦 🏧 🌐 🔘, `Footer.jsx`) are an observed tell — removed in the migration (`fpt-website-application-note.md`) |
| Accessibility | decorative icons `aria-hidden="true"`; an icon-only control carries `aria-label`; never the only carrier of a state (state = word + sign + colour + icon) |

## FPT icon vocabulary (which icon means what)

| Meaning | Icon | Where |
|---|---|---|
| Home / dashboard | `house` | tab bar |
| Challenge / equity | `chart-line` | tab bar, rule rows |
| Payouts / wallet | `wallet`, `banknote` | tab bar, payout rows |
| Activity / trades | `activity` | tab bar |
| Menu / more | `menu`, `ellipsis` | header, tab bar |
| Profit target reached / passed | `circle-check` (success colour) | rule rows, phase stepper, toasts |
| Drawdown warning | `triangle-alert` (drawdown amber) | rule rows, banners |
| Breach / failed | `circle-x` (loss coral) | evaluation fail, toasts |
| Pending / activation ≈ 72 h / payout cycle | `clock` (pending amber) | states, stepper |
| Funded / verified | `shield-check`, `badge-check` (success) | certificate, funded badge |
| Calendar / days | `calendar` | days row |
| Gain / loss movement | `trending-up` / `trending-down` | figure deltas (with the word and the sign) |
| Credentials / security | `lock`, `eye`, `eye-off`, `copy` | cTrader credentials e-mail / screen |
| Platform (cTrader) | the official cTrader mark (not an icon) | partner row |
| Documents | `file-text`, `download`, `receipt` | statements, certificate |
| Fiper Card payout method | `credit-card` | payout rows |
| Support | `message-circle`, `mail`, `phone` | contact |

## Vendored files (`lucide/`)

activity · arrow-down-right · arrow-left · arrow-right · arrow-up-down · arrow-up-right · badge-check · banknote · bell · briefcase · building-2 · calendar · chart-candlestick · chart-line · chart-pie · check · chevron-down · chevron-left · chevron-right · chevron-up · circle-alert · circle-check · circle-help · circle-x · clock · coins · copy · credit-card · download · ellipsis · external-link · eye-off · eye · file-text · filter · globe · hash · house · info · landmark · languages · layers · loader · lock · log-out · mail · menu · message-circle · minus · moon · percent · phone · plus · qr-code · receipt · refresh-cw · scan-line · search · settings · share-2 · shield-check · square-check · star · sun · trending-down · trending-up · triangle-alert · upload · user · wallet · x — plus `LICENSE` (ISC).

Usage: inline `<svg class="fpt-icon"><use href="#i-name"/></svg>` with a sprite of `<symbol>`s copied from the files (see `components/preview.html` and the mockups), or import the SVG files directly; in React, `lucide-react` with the same names and `strokeWidth` per the table.
