# FPT Brand Identity System v1.0 — operational rules (child of Fiper Brand v2.0)

Single source of truth: the repo `Fiper-Global/fpt-brand` (this `brand/` folder is the drop-in copy). Version **v1.2.2** · 5 Nov 2026 (texts and rules only — no asset, token or colour changed: CR-13 compact e-mail header withdrawn, CR-14 red budget on the public site, CR-15 Latin display scale + its addendum — the phone cap and the seven shortened headlines; v1.2.1 2 Nov 2026: CR-10 / CR-11 / CR-12; v1.2.0 1 Nov 2026: CR-05 / CR-06 / CR-07, e-mail paper in every mode; CR-01…04 approved 31 Oct 2026; logo v2 unchanged since v1.1.0) · parent pin **fiper-brand v2.0.0** (`tokens.json $extensions.fpt.parent-pin`). FPT = **Fiper Pro Traders**, the prop-trading sub-brand of Fiper Global: one-phase evaluation → funded account, 80/20 profit split (fixed), platform **cTrader only**. This system inherits the parent's composition language, typography, icon system, accessibility rules, formats, anti-AI-tells, token architecture and gates **unchanged**, and overrides only what is FPT-specific (brand red, grounds, logo, product semantics, templates). Every value carries a status (`tokens.json` `$extensions.fpt.status` + `fpt.source`): **APPROVED** — task file, LOCKED value or official logo file · **OBSERVED** — captured from `fpt-website` @ `a88e666` on 2026-10-29 (`src/index.css` md5 `6b112104…`); **an observed value is not automatically a rule** · **INHERITED** — read from the parent file by path · **PROPOSED** — absent from every source, labelled default (decision items 1–6) · **REFERENCE** — parent value kept for comparison only, never used · **DEPRECATED** — never use (Cairo, JetBrains Mono, DIN Next LT Arabic, `#000`, red glow, gold badge, tinted-red eyebrow, `.2em` tracking, glass cards, floating / pulsing elements, `favicon.svg`). Origins: `value-sources.md`; missing assets: `MISSING-ASSETS.md`; words: `glossary.md`; legal scope: `regulatory-matrix.md`; composition: `references/composition-rules.md` (the parent's, verbatim). The printed manual (`FPT-Brand-Manual-v1.2.pdf`) explains; this file is what you apply.

Names: **Fiper Pro Traders** / **FPT**; in Arabic copy the Latin name is kept (`ar.json meta.title`, `footer.copyright`); parent **Fiper Global / فايبر جلوبال**. Relationship line verbatim: **"Part of Fiper Global"** / **«جزء من Fiper Global»** (`footer.partOf`), navbar «جزء من Fiper Global» in the same sentence-case form (CR-02 — the v1.0 uppercase `nav.partOfFiperGlobal` is observed-only, no longer permitted); hero badge verbatim: **"Backed by Fiper Global — established financial infrastructure with proven broker experience"**. Arabic-first, RTL default, mobile-first (390 px design width, **375 px minimum**, ~98 % mobile), Gulf-standard formal register. Apps are dark; documents, e-mails and print sit on the paper ground `#F7F4F1` (`.fpt-paper` — a composition rule, not an app light mode).

## Install (any repo: fpt-website, CRM, e-mail service)

```sh
cp -r brand/ <repo>/brand/                       # tokens, fonts, logos, components, templates, checklists
mkdir -p <repo>/.claude/skills && cp -r brand/skill/fpt-brand <repo>/.claude/skills/   # every Claude Code session applies the identity
```
```html
<link rel="stylesheet" href="/brand/fonts/fonts.css">   <!-- before tokens.css -->
<link rel="stylesheet" href="/brand/tokens.css">        <!-- --fpt-* variables, dark canonical; .fpt-paper for documents -->
<link rel="stylesheet" href="/brand/components/components.css">
<html lang="ar" dir="rtl">                              <!-- Arabic UI switches --fpt-font-ui to IBM Plex Sans Arabic automatically -->
```
Tailwind **4** (fpt-website: `@import "tailwindcss"` + `@theme` in `src/index.css`) — two routes, pick one:
```css
/* route A — map the variables in @theme (keeps the Tailwind 4 setup; tokens.css must be loaded) */
@import "tailwindcss";
@theme {
  --color-bg: var(--fpt-ground-bg); --color-surface: var(--fpt-ground-panel); --color-surface-2: var(--fpt-ground-coal); --color-surface-3: var(--fpt-ground-elevated);
  --color-fg: var(--fpt-text-primary); --color-fg-2: var(--fpt-text-secondary); --color-fg-muted: var(--fpt-text-muted); --color-line: var(--fpt-line-ash);
  --color-primary: var(--fpt-brand-red); --color-primary-end: var(--fpt-brand-red-gradient-end); --color-gain: var(--fpt-finance-gain); --color-loss: var(--fpt-finance-loss); --color-drawdown: var(--fpt-finance-drawdown);
  --font-sans: var(--fpt-font-ui); --font-display: var(--fpt-font-family-display); --font-mono: var(--fpt-font-family-mono);
  --radius-pill: var(--fpt-radius-pill); --radius-card: var(--fpt-radius-card); --ease-standard: var(--fpt-motion-easing-standard);
}
```
```css
/* route B — load the generated preset through Tailwind 4's config bridge */
@import "tailwindcss";
@config "../brand/tailwind.preset.js";
```
Tailwind 3.4: `module.exports = { presets: [require('./brand/tailwind.preset.js')], content: ['./src/**/*.{jsx,tsx,html}'] }` — classes `bg-bg text-fg text-fg-muted bg-surface border-line text-gain text-loss text-drawdown font-mono (numbers/code only) rounded-pill z-header`. Never hard-code a hex in app code: use `var(--fpt-…)` or the preset. Exceptions: e-mail HTML and SVG templates (hex copied from `tokens.json`).

### Tokens pipeline (one source, generated outputs)
`tokens.json` is primary — **DTCG Design Tokens Format Module 2025.10**, layered `primitive` (raw values, `--fpt-p-*`, never used directly) → `semantic` (roles, `--fpt-*`) → `component` (`--fpt-c-*`). Generated from it, never edited by hand: `tokens.css`, `tailwind.preset.js`, `skill/fpt-brand/references/tokens-quick.md`, the token table in `value-sources.md`. Inherited primitives carry `fpt.parent` (the parent path) and are re-checked against the parent file when it is reachable. Tooling: Node **24.21.0**; Tailwind preset usable with 3.4 and 4.x; references are Style Dictionary 4-compatible (`{path.to.token}`); Playwright-core 1.56.1 for the browser checks.

```sh
# (A) INSIDE THE PACKAGE — run from the folder that CONTAINS brand/ (repo root, or the parent of the unzipped package).
node brand/scripts/build-tokens.mjs        # tokens.json → tokens.css + tailwind.preset.js (observed-only site treatments → --fpt-observed-* documentation variables, excluded from the preset; deprecated and parent-reference values never emitted)
node brand/scripts/verify-tokens.mjs       # references resolve, status vocabulary, no raw hex in semantic/component, parent pin, inherited values = parent file (when reachable), CSS vars used exist, no deprecated value in components/templates/mockups
node brand/scripts/contrast.mjs            # WCAG table from tokens.json → ./checks/contrast.json (CONTRAST_OUT=… to override) incl. decision tables 2/3/6; exit 1 if a required pair is below threshold
node brand/scripts/verify-identity.mjs brand        # identity gate on the WHOLE package incl. tokens.css + tailwind.preset.js
node brand/scripts/verify-identity.mjs src public   # consumer gate (below)
node brand/skill/fpt-brand/verify-skill-wired.mjs   # consumer repo only: skill present, CLAUDE.md mandate, tokens.css + fonts.css wired
node brand/scripts/check-units.mjs --ref=page.html page.html file.pdf   # unbreakable numeric units (needs devDependencies playwright-core + pdfjs-dist and a Playwright Chromium)
python3 brand/scripts/check-pdf-fonts.py file.pdf   # fonts actually used inside a PDF = brand fonts only (needs pypdf)
node brand/scripts/verify-unzipped.mjs fpt-brand-v1.0.zip /tmp/clean-dir   # the delivery as the team receives it (needs unzip + playwright-core)
# modules: brand/scripts/charts.mjs (equityChart / injectCharts) + brand/scripts/sample-data.mjs (the ONE SAMPLE dataset: a $50,000 evaluation)
```
```sh
# (B) BUILD REPO ONLY — Fiper-Global/fpt-brand (Playwright Chromium, pypdf, ImageMagick, ffmpeg). NOT shipped in the zip.
node scripts/gen-tokens.mjs                 # regenerates tokens.json from the parent file + FPT observations (needs the parent checkout)
node scripts/build-logos.mjs · render-manual.mjs · check-arabic-elements.mjs · gen-doc-tables.mjs · gen-glossary-strings.mjs · gen-manifest.mjs · check-docs.mjs · check-manifest.mjs · package.mjs · build-preview.mjs
```
Regeneration must reintroduce no banned value: after `build-tokens`, `verify-identity brand` must still PASS and `git diff brand/tokens.css brand/tailwind.preset.js` must be empty against the delivered files. Consumers pin **fpt-brand v1.2.0** — git tag `v1.2.0` — `fpt-brand-v1.2.0.zip` (sha256 in `dist/fpt-brand-v1.2.0.zip.sha256`; upgrade note `dist/consumers/UPGRADE-v1.2.0.md`). One-token flip rule: **colour, radius, motion and z-index** tokens only (edit → `build-tokens` → `verify-tokens` → `contrast`). A **font or display-style change** (decision item 1) is never a one-token change: re-check `components/preview.html`, the eight mockups, every template and the manual before release.

### Dev-tooling wiring (every consumer repo)
1. `cp -r brand/skill/fpt-brand .claude/skills/fpt-brand` and paste `brand/skill/fpt-brand/claude-md-paragraph.md` into the repo's `CLAUDE.md`.
2. `node brand/skill/fpt-brand/verify-skill-wired.mjs` — proves the reference is wired (skill present, CLAUDE.md mandate, tokens.css + fonts.css referenced from an entry file).
3. `node brand/scripts/verify-identity.mjs src public` before every commit (pre-commit hook or CI): fails on non-token hex colours, deprecated values (`#000`, Cairo, JetBrains Mono, DIN Next), parent values on an FPT surface (`#DC2626`, `#0A0708`), red glow shadows (`rgba(244,40,33…)` / `rgba(220,38,38…)` in `box-shadow`), glass blur on cards, float / pulse animations, a retyped "FPT" wordmark or `favicon.svg`, MT4/MT5 references, non-brand font families, Arabic letter-spacing, Latin letter-spacing above `.06em` outside `.fpt-num`/OTP, a monospace family on label/eyebrow/heading/caption/table-header selectors, ISO timestamps in display strings, emoji, non-brand gradients, raw URLs in e-mail text; it reports (without failing) Unicode symbols used as icons.
Result on this package: `qa-report.md`. `verify-skill-wired` is for consumer repos (this repo is the source, not a consumer).

## A · Brand architecture

| Level | Form | Rule |
|---|---|---|
| Parent (master) brand | Fiper Global · فايبر جلوبال — `Fiper-Global/fiper-brand` v2.0.0 | Owns composition, typography, icons, gates. FPT is "out of scope" for the parent's own colours and logo (parent README § A) and inherits everything else from it. |
| FPT (this system) | **Fiper Pro Traders · FPT** — own red `#F42821` (LOCKED), own tile logo, own dark grounds | The only FPT logo is the red tile + "Fiper Pro Traders" wordmark (`logos/`). No sub-logos for challenges, the dashboard or the card. |
| Endorsement (FPT → parent) | **"Part of Fiper Global" · «جزء من Fiper Global»** — text line in SENTENCE CASE, no uppercase, no letter-spacing (CR-02 APPROVED, owner approval 31 Oct 2026 04:29 Dubai) (primary form) or the endorsement row: FPT tile + divider + Fiper lockup at 0.5 × tile height (decision item 4, PROPOSED geometry, no official artwork) | Footer, document foot, e-mail foot, end card. The hero badge text is verbatim and English-only today. |
| Partner mark | cTrader (official pack `assets/third-party/ctrader/`, unmodified) | Platform surfaces only; optical height = tile height, 1 px divider, own clear space. **MT4 / MT5 never appear.** |
| Fiper products referenced by FPT | Fiper Card · بطاقة Fiper (`fptCard.*`, `footer.links.fiperCard`), Fiper CRM, Fiper Global (`ecosystem.*`) | Named as text in FPT copy; their visuals follow the parent system (official card artwork only). |
| Out of scope | Fiper Global's own surfaces, TWO Markets, white-labels | Nothing from this system applies there. |

Don't: create a challenge- or tier-specific mark, colour-code account sizes, put the Fiper lockup larger than the FPT tile on an FPT surface, write "FPT by Fiper" (the approved form is "Part of Fiper Global"), transliterate the product name yourself (`glossary.md` § 1 records the two observed forms).

## B · Logo system

Files in `logos/` (`logos/README.md`): **24 vector masters** in `logos/svg/` (logo v2 — APPROVED, CEO 30 Oct 2026: «اعتمد وحدث هوية اف بي تي بالشعار المحسن (لاشيء آخر من معايير الهوية)»), spec in `logos/source/spec.json`; every other logo file is a render of them (`png/` transparent PNG, `pdf/` + `eps/` vector, `icons/`, `derived/`). The masters are never edited, recoloured, cropped or re-exported. The tile gradient `#F62721 → #A30100` (135°) equals the UI pair `#F42821 → #A30100`; the wordmark is `#120D0E` on paper, `#FFFFFF` on dark. The v1 JPEGs are in `logos/legacy-v1/` — never use.

| Placement | File | Size | Status |
|---|---|---|---|
| Navbar / site header (dark) | `logos/svg/fpt-lockup-horizontal-en-white.svg` (tile height = the slot; no clip, no typed name) | tile **46 px** | OBSERVED size (`Logo.jsx size={46}`); file APPROVED (logo v2) |
| App header (dashboard) | `logos/svg/fpt-tile.svg` or the white lockup | 32 px | PROPOSED size |
| Footer | same as navbar | 44 px | OBSERVED (`Footer.jsx size={44}`) |
| Arabic surfaces and every other language (**CR-11 — lockups in English only**, owner 1 Nov 2026) | the **same English lockup** as the surface's ground: `fpt-lockup-horizontal-en-white.svg` on dark / `fpt-lockup-horizontal-en.svg` on paper, `direction: ltr` on the brand element; the Arabic lockups `fpt-lockup-horizontal-ar*` / `-vertical-ar*` and the bilingual `fpt-lockup-bilingual*` are **archival masters — on no surface** (`component.logo.lockup-language` = `en-only`; gate ARABIC-LOCKUP-IN-USE) | as the EN lockup | APPROVED (CR-11) |
| Lockup on white / paper (documents, e-mail header, light social) | `logos/svg/fpt-lockup-horizontal-en.svg`; e-mail `logos/derived/email-header-160-card@2x.png` (**CR-12**: the lockup inside a **paper card** `#F7F4F1` with an 8 px radius and 12 px of paper on every side, corners transparent — 320 × 112 → CSS 160 × 56; merges into the paper mail, reads as a card where a client forces dark) + `email-header-160-dark@2x.png` (white lockup on alpha, shown only under Outlook's `[data-ogsc]`); `email-header-160-transparent@2x.png` (ink on alpha) for a header on a white card only. Superseded (`logos/_deprecated/derived/`, gate OLD-EMAIL-HEADER): the v1.0–v1.1.2 white box `email-header-320x112@2x.png`, the v1.2.0 flattened `email-header-160/120-paper@2x.png` and the compact twin | A4 header 8 mm; e-mail 160 × 56 CSS (APPROVED, owner 1 Nov 2026 23:08; the compact 120 × 42 withdrawn by CR-12); screen ≥ 24 px | APPROVED (owner, 1 Nov 2026 + CR-12) |
| Stacked lockup (certificates, square profiles) | `logos/svg/fpt-lockup-vertical-en.svg` / `-white` (the `-vertical-ar` files are archival — CR-11) | ≥ 96 px high | APPROVED |
| Share image / OG (CR-05) | `logos/derived/og-1200x630-ar.png` («الاستثمار ينطوي على مخاطر») / `og-1200x630-en.png` ("Investing involves risk") — dark ground `#0A0A0A`, the white **English** horizontal lockup centred on both versions (CR-11; tile 120 px), the fixed risk line bottom-start (margin 64 px) in the label colour at 16 px (≥ 12 px at 1080 wide), nothing else; the wording is a token and the gate refuses any other string. The v1.0–v1.1.2 `og-1200x630.png` (vertical lockup on white) is superseded (`logos/_deprecated/derived/`, gate OLD-OG-IMAGE) | 1200 × 630 | APPROVED (owner, 1 Nov 2026); geometry APPROVED (owner, 1 Nov 2026 23:08 — `component.og.lockup-height` 120 px, `margin` 64 px) |
| Signage, documents, events | `logos/svg/fpt-lockup-horizontal-en.svg` / `-white` — the bilingual lockup `fpt-lockup-bilingual*` is **archival** (CR-11), not used | — | APPROVED (CR-11) |
| Favicon / app icons | `logos/icons/` — `favicon.ico`, `favicon.svg` + `favicon-16/32.png` (small cut), `favicon-48/64.png`, `apple-touch-icon-180.png`, `ios-appstore-1024.png`, `pwa-icon-192/512.png`, `pwa-maskable-512.png`, Android adaptive 432 ×2 + `android-play-512.png`, `avatar-1080/400.png`, `site.webmanifest` | 16–1024 | APPROVED renders — replaces the JPEG favicon links and the retyped `favicon.svg` of the site |
| Renders ≤ 32 px | `logos/svg/fpt-tile-small.svg` (small cut) only | 16–32 px | APPROVED |
| Video corner / end card (dark) | `logos/svg/fpt-tile.svg` 56 px per 1080 px width; end card the white lockup | 56 px | PROPOSED |
| Splash | tile centred on `--fpt-ground-bg` or the white vertical lockup, nothing else | 120–160 px | PROPOSED |
| One-colour print / watermark | `fpt-tile-flat.svg` (`#F42821`), `fpt-tile-ink.svg`, `fpt-tile-white.svg`, `fpt-mark-*` | — | APPROVED |

Rules (`tokens.json component.logo`; logo v2 values APPROVED): clear space **0.5 × tile height** on all sides; minimum tile 16 px screen (small cut) / 4 mm print; minimum lockup 24 px screen / 8 mm print; **no maximum** (vector); the mark never mirrors in RTL — the English lockup is used in both directions with `direction: ltr` on the brand element (CR-11); never clip the tile (the 22 % CSS clip is DEPRECATED — the SVG carries its own 20 % corner); lockup aspects EN 4.7364 · AR 3.9043 · bilingual 3.2272 · vertical EN 1.1154 · AR 0.9586; gap tile → wordmark 0.3333 × tile; endorsement row ratios in `MISSING-ASSETS.md` § 3 (unchanged).

Misuse (never): 1 recolour or flatten the gradient outside the approved flat / ink / white versions · 2 glow, shadow or outline · 3 stretch, condense, rotate · 4 the ink lockup on a dark ground (use the `-white` lockups) · 5 a retyped "FPT" or name in any font as a logo (`favicon.svg`) · 6 the Arabic or bilingual lockup on any surface (archival since CR-11), or the name typed as text beside the tile · 7 the tile below 16 px / the lockup below 24 px, or the master tile at ≤ 32 px instead of the small cut · 8 mirror in RTL · 9 the gradient tile on brand red (white mark there) · 10 clip or round the tile with CSS or an OS mask · 11 edit, optimise or re-export the masters · 12 pair with a second mark or a challenge badge.

## C · Colour

Tokens in `tokens.css` (`--fpt-*`); roles below. Dark canonical and the only app theme; paper values under `.fpt-paper` for documents, e-mail and print.

| Role | Token | Dark (status) | Paper `.fpt-paper` |
|---|---|---|---|
| Ground | `--fpt-ground-bg` | `#0A0A0A` (OBSERVED; decision item 6 default — never `#000`) | `#F7F4F1` |
| Raised ground / card / panel | `--fpt-ground-coal`, `--fpt-ground-panel` | `#141414` (OBSERVED) | `#EFEBE7` / `#FFFFFF` |
| Elevated (sheet, toast, popover) | `--fpt-ground-elevated` | `#1A1A1A` (OBSERVED) | `#FFFFFF` |
| Header scrim | `--fpt-ground-chrome` | `rgba(10,10,10,.85)` + blur 14 px (PROPOSED; the site's `rgba(0,0,0,.7)` is deprecated) | — |
| Hairline | `--fpt-line-ash` | `rgba(255,255,255,.08)` (OBSERVED) | `rgba(18,13,14,.10)` |
| Hover / active line (hover only) | `--fpt-line-strong` | `rgba(255,255,255,.35)` PROPOSED (3.14:1) | `rgba(18,13,14,.35)` |
| Field / control boundary (≥ 3:1) | `--fpt-line-input` | `rgba(255,255,255,.40)` PROPOSED (3.77 on bg, 3.83 on panel) | `rgba(18,13,14,.55)` (4.16) |
| Selected card border / hover accent | `--fpt-line-brand` | `rgba(244,40,33,.25)` (OBSERVED, decorative) — the **selected** state uses `--fpt-c-card-border-selected` = brand red 1 px **in the apps**; on the public site the selected / active state is the text colour with the neutral frame `--fpt-line-input` 1 px (**CR-14**, owner 41-أ, 4 Nov 2026) | — |
| Text primary | `--fpt-text-primary` | `#FFFFFF` (19.8:1) | `#120D0E` |
| Text secondary (body) | `--fpt-text-secondary` | `rgba(255,255,255,.78)` (11.97:1) | `#120D0E` |
| Text muted / small labels | `--fpt-text-muted`, `--fpt-text-label` | `rgba(255,255,255,.55)` (6.26:1) — never darker | `#6B635E` (5.37) |
| Brand red = logo tile + the single primary action + active state | `--fpt-brand-red` | **`#F42821`** LOCKED (APPROVED) — 4.88 on bg, 4.54 on panel | same (buttons); as text `--fpt-red-as-text` = `#A30100` (7.48) |
| Gradient end / pressed | `--fpt-brand-red-gradient-end`, `--fpt-brand-red-deep` | `#A30100` (OBSERVED) | same |
| Text / icon on brand red | `--fpt-text-on-brand` | `#FFFFFF` — **4.06:1 on flat `#F42821`** (large text ≥ 18.67 px bold / 24 px or icons only); buttons always use the 135° gradient: label over the midpoint `#CB1511` = 5.75:1, over `#A30100` = 8.20 | same |
| Focus ring | `--fpt-action-focus-ring` | `#FFFFFF` — the text colour, 2 px, offset 2 on every `:focus-visible` (CR-04 APPROVED, owner approval 31 Oct 2026 04:29 Dubai; red keeps its three roles) | `#120D0E` (paper text) |
| Success | `--fpt-state-success` | `#2AB37A` PROPOSED (7.38; the site's `#10B981` 7.80 is observed-only) | `#146A45` |
| Danger (system error) | `--fpt-state-danger` | `#E8785A` PROPOSED (6.85) | `#A33D24` |
| Loss / drawdown consumed (value fact — separate token) | `--fpt-finance-loss` | `#E8785A` PROPOSED (6.85 / 6.37 on panel) — decision item 3 | `#A33D24` |
| Drawdown warning (approaching a limit) / pending | `--fpt-finance-drawdown`, `--fpt-state-warning` | `#D9A441` PROPOSED (8.80) | `#7A520A` |
| Info | `--fpt-state-info` | `#5B9BD5` PROPOSED (6.69) | `#275E94` |
| Target line / gain | `--fpt-finance-target`, `--fpt-finance-gain` | `#2AB37A` PROPOSED | `#146A45` |

Rules: brand red has **three roles** — the logo tile, the one primary action per screen, the active state (selected challenge card border, active tab icon + bar, range marker, current-value dot) — nothing else; **on the public site (CR-14, owner 41-أ, 4 Nov 2026) the active / selected state is rendered in the text colour with a neutral frame, one red primary per viewport and at most two per page, third-party marks mono — `fpt-website-application-note.md` § 6 and the register**: no decorative red, no red losses, no red numbers for emphasis (the site's red hero stats `.stat` and `gradient-text` headline are historical observations), **no red small labels** (labels use `--fpt-text-label`), no red glow, no `.radial-red` wash, no gradient borders. Red as text obeys the large-text exception (≥ 24 CSS px regular or ≥ 18.67 CSS px bold); `#F42821` passes AA body text on `#0A0A0A` (4.88) and `#141414` (4.54) but **white on flat `#F42821` does not** (4.06) — a flat red fill carries only large text or icons; the primary button is always the gradient `135deg #F42821 → #A30100` (OBSERVED `.gradient-red`) with the label centred. Secondary text floor is `rgba(255,255,255,.55)` (lighter raises contrast, darker lowers it). Field boundaries use `--fpt-line-input`; `--fpt-line-strong` is hover-only. **No glow, halo or neon** anywhere: `.btn-red-glow` is recorded in `--fpt-observed-shadow-primary` and **not applied** (`--fpt-c-button-primary-shadow: none`). Charts: equity line in the text colour, target dashed success, drawdown floors dashed loss, band `--fpt-chart-band`, start-balance benchmark dotted muted, red only for the current-value dot; at most one brand-red series on marketing charts. Measured table: `checks/contrast.json` (77 pairs incl. the decision tables).

### Finance semantics for a prop firm (binding — `skill/fpt-brand/references/finance-semantics.md`)

| State | Token | Shown as |
|---|---|---|
| Profit / gain (equity above start, target reached) | `--fpt-finance-gain` | word **ربح / Profit** + `+` + colour; «الهدف محقق / Target reached» = success badge |
| Loss / drawdown consumed (equity below start, daily loss) | `--fpt-finance-loss` (own token; same value as `state.danger` today, never swapped) | word **خسارة / Loss** + `−` (U+2212) + colour; never brand red |
| Drawdown warning (≥ 80 % of a daily or overall limit used) | `--fpt-finance-drawdown` | word **تحذير السحب / Drawdown warning** + `triangle-alert` icon + amber |
| Breach (limit exceeded, evaluation failed) | `--fpt-state-danger` | word **تجاوز الحد / Limit breached** + `circle-x` icon |
| Neutral / unchanged | `--fpt-finance-neutral` | `0.00`, no sign — zero is a value; missing is `—` + «لا بيانات» |
| Pending (payout under review, activation ≈ 72 h) | `--fpt-finance-pending` | word **قيد المعالجة / Pending** + `clock` icon |

Never colour alone. Every amount: `<span class="fpt-unit">55,312.50 USD</span>` (tabular Latin digits, isolated, unbreakable). **CR-01 (APPROVED, owner approval 31 Oct 2026 04:29 Dubai):** IBM Plex Mono is reserved for (a) the hero amount of a screen (`.fpt-figure__value`), (b) identifiers, codes and logins (`.fpt-num`), (c) dense financial tables (`td.fpt-td-num`); every amount, date and percentage inside a sentence, list, chip or summary card is set in the TEXT font (IBM Plex Sans Arabic / Inter) with `font-variant-numeric: tabular-nums` — `.fpt-unit` now carries that text-font mode. Finance semantics (word + sign + colour) are unchanged. Split 80/20 always as «حصة المتداول 80 % · حصة الشركة 20 %»; limits always with their base («5 % من رصيد بداية اليوم», «9 % من الرصيد الابتدائي»).

## D · Typography

| Role | Family (weights) | Status |
|---|---|---|
| Latin display (headlines, stats) | Barlow Condensed 600 / 700 / 800, uppercase, letter-spacing .5 px, line-height 1.05 | PROPOSED — decision item 1 default (match the parent); the site applies it since R3 (h1 800, h2 700). **Site h1 under fr / es / pt / tr: 12 % smaller (`--fpt-display-scale` .88 — CR-15, owner 42-أ)**; addendum (owner 44-أ, 5 Nov 2026): on phones the hero step is `max(28px, min(step × scale, 7.85vw))` under the four languages and English, and the seven borderline fr / es / pt headlines are ≤ 22 characters per line — `fpt-website-application-note.md` § 6.3 / § 7; Arabic never Barlow |
| Latin body / UI | Inter 400–700, line-height 1.65 | OBSERVED (`index.css` lines 13, 22; DIN Next LT Arabic is named first but never loads) |
| Hero amounts, identifiers / codes / logins, dense financial tables **only** (`.fpt-figure__value`, `.fpt-num`, `td.fpt-td-num`, `code`, OTP) | IBM Plex Mono 400 / 600, `font-variant-numeric: tabular-nums lining-nums` — never on labels, headings, captions, table headers, and (CR-01) never on an amount, date or percentage inside a sentence, list, chip or summary card: those use `.fpt-unit` in the text font with tabular digits | APPROVED (CR-01, owner approval 31 Oct 2026 04:29 Dubai; parent standing decision narrowed); JetBrains Mono + `.font-mono-num` on labels DEPRECATED |
| Small labels (field labels, table headers, chart period) | Inter 600, `.75rem`, uppercase, letter-spacing `.06em` max, `--fpt-text-label`; Arabic: IBM Plex Sans Arabic 600, `letter-spacing: 0`, no uppercase; no slash prefix, no pulsing dot. **The relationship line is NOT a small label** (CR-02): sentence case, no uppercase, no tracking, in both languages | APPROVED direction (parent); the site's `.2em` / `#FCA5A5` eyebrow is observed-only |
| Arabic — everything | IBM Plex Sans Arabic 400 / 500 / 600 / 700 (Cairo DEPRECATED) | APPROVED (parent decision 27 Oct 2026; the site already lists it first) |
| Alternative Latin pair (shipped, inactive) | IBM Plex Sans 400–700 | PROPOSED (decision item 1 option C) |

Arabic rules (inherited, binding): `letter-spacing: 0` always; real weights, `font-synthesis: none`; line-height 1.9 body / 1.3 h1; headings IBM Plex Sans Arabic 700; Latin digits everywhere; mixed runs (`FPT`, `cTrader`, `USD`, logins) in `<bdi>` or `.fpt-unit`; Arabic punctuation; never Barlow Condensed for Arabic words; every element that can carry Arabic resolves to IBM Plex Sans Arabic (verify rendered fonts; PDFs with `check-pdf-fonts.py`).

**App type ladder (CR-06 APPROVED, owner decision 1 Nov 2026, proposal A): five steps — label 13 · body 16 · subtitle 18 · title 22 · hero 32** (`--fpt-font-size-app-label / -app-body / -app-subtitle / -app-title / -app-display`; `semantic.font.scale.app-ladder`). The second text step 15 px no longer exists: every sentence, list, chip, tab, description and dense value is **16 px** (line-height 1.5 unchanged); **13 px stays for icons, badges, metric labels and the currency code only — never a sentence**; at most **five distinct sizes per app screen**; the numeric-unit floor is `.fpt-unit { font-size: max(16px, 1em) }` on app screens (paper documents keep their own sizes). Gate thresholds for consumers: body ≥ 16 px, sizes ≤ 5 (the platform's `smallBody` floor rises from 15 to 16 and gains a size-count gate). The inherited rem scale (xs 0.68rem · sm 0.75rem · md 0.85rem · base 0.92rem · lg 0.98rem · xl 1.3rem · 2xl 1.9rem · 3xl 2rem · 4xl 2.9rem, INHERITED) stays for the site and documents; site sizes OBSERVED: h1 up to 96 px (`Hero.jsx`), stats 30 px, brand name 15 px.

Formats: amounts `55,312.50 USD` AR · `USD 55,312.50` or `$55,312.50` EN (code on every listing; USD 2 decimals from integer cents); account sizes `$50,000` / `50,000 USD` (never "50K" outside the site's observed marketing shorthand); percentages `+10.63 %` / `−0.81 %` / limits `5 %`; dates **7 أكتوبر 2026** / **7 Oct 2026**; time **14:05 بتوقيت دبي (GMT+4)** / **14:05 GMT+4**; durations «31 يوماً» / "31 days", «≈ 72 ساعة» / "≈ 72 h"; never ISO in any UI, mail or document.

## E · Layout and spacing

4-pt scale `--fpt-space-1…30` (4 → 120 px). Gutters 24 px on the site (OBSERVED `px-6`), 20 px phone gutter in apps (parent composition rule), content width `min(1280px, 92%)` (OBSERVED `max-w-7xl`). Breakpoints **375 (minimum, APPROVED)** · 390 (design) · 640 · 900 · 1024 (site `lg:`). Rows: comfortable 56 px, compact tables 44 px minimum. Radii: pill 999 · card **16** (APPROVED; the site mixes 12 and 24) · media 14 · sheet 18 · input 12 · sm 8 · logo tile clip 22 % (OBSERVED). Elevation border-first: level 0 ground, 1 hairline, 2 panel + hairline, 3 overlay (`--fpt-shadow-overlay`); no coloured shadow anywhere. z-index: raised 10 · sticky 20 · header 80 · scrim 90 · sheet 100 · toast 110 · tooltip 120 (the site's `z-50` navbar is observed-only). Touch targets ≥ 44 × 44 px (the site's 40 px small button is raised to 44). Safe areas on the tab bar and header. RTL: logical properties only; mirror chevrons, back arrows, progress, stepper, tab order; never mirror the tile, numbers, the chart time axis, codes, logins, the legal block.

## F · Composition (inherited — full rules in `references/composition-rules.md`, verbatim from the parent)

Inherited unchanged: two grounds (paper for documents / e-mail / print, dark for apps and the site), the constant core (tile or lockup top-start, one Arabic headline IBM Plex Sans Arabic 700, English secondary Inter 500 muted, numbers in IBM Plex Mono on their own edge, 1 px rules, meta foot), three poles with one dominant element, margin = 2 × logo height per medium (phone gutter 20 px), cards only to group or bound an action, red roles, readable support (social ≥ 42 px on 1080, phone body 14–15 px, A4 14 px, slides ≥ 26 px), charts from one dataset, unbreakable units, no slash prefix / decorative numbering / icon on headings.

FPT pole per surface (PROPOSED application):

| Surface | Pole | Dominant element | Second |
|---|---|---|---|
| Marketing hero | headline-dominant | one Arabic headline (`hero.title1` + `title2`) | the verbatim Fiper badge + one primary CTA; no stat row in red |
| Challenge selector | number list | the five account sizes as a ruled list / cards, size in mono 28 px, fee second | selected = red 1 px border; "most popular" = label text |
| Challenge dashboard | number-dominant | current equity `55,312.50 USD` + delta word/sign/colour | equity chart (target, floors), rule rows (target / daily / overall / days) |
| Funded certificate (paper) | headline-dominant | «حساب ممول» / "Funded account" headline | holder, size, reference, date; stacked lockup top-start |
| Payout statement (paper) | number-dominant | trader share `2,499.60 USD` | P&L table, split row, method |
| System e-mail (paper) | headline + facts card | one headline that says what happened | facts card (login, server, platform; or target reached / limit breached), one button |
| Social post | figure or headline | one figure (e.g. `$50,000` / `80 %`) or one headline | tile + relationship line; SAMPLE chip on any figure |
| Slide (paper) | number-dominant | one figure per slide | title + one supporting line |

## G · Components

Specs, states and reference CSS: `components/SPEC.md` + `components/components.css` (prefix `.fpt-`) + `components/preview.html` (390 px dark, AR/EN). Covered: buttons (primary gradient / secondary / ghost / **destructive = outline or text with an icon, never filled — the solid danger fill only inside the final confirmation dialog (CR-07 APPROVED, owner 1 Nov 2026; gate DANGER-FILLED-OUTSIDE-DIALOG)**; 44–56 px; no glow, no hover scale), inputs + OTP, cards and the **challenge card** (size, fee, popular label, selected border), rule rows, financial tables, tabs / segmented, badges + chips (brand badge = red fill + white Inter 600 .06em; AR Plex Arabic 600 ls 0), toasts, empty / skeleton / error, header + tab bar, modal / sheet — **the destructive confirmation dialog (CR-10 APPROVED, fiper-brand v2.3.5 § 10 / CEO 1 Nov 2026): the safe way back is a secondary button (never ghost), first in source and at the start side (above on phones), with the initial focus; the solid danger button last and never the Enter default; ghost only in non-destructive confirmations; consumers mark the row `data-fpt-dialog-actions="destructive|confirm"`; gates DESTRUCTIVE-DIALOG-CANCEL / -FOCUS** — progress (drawdown bars in loss / warning), stepper (evaluation → funded → payout), equity chart.

## H · Motion

Three principles (inherited): **respond** (press 140 ms, scale **.98** OBSERVED), **settle** (surfaces move once, 250–350 ms, easing **`cubic-bezier(.22,1,.36,1)`** OBSERVED from the site's Framer Motion ease; the parent standard `(.2,.7,.2,1)` is recorded as `--fpt-motion-easing-parent-standard`), **reveal, don't perform** (first view only, 8 px → 0 over 500 ms OBSERVED; parent 26 px / 800 ms). Hover 200 ms, state 300 ms (OBSERVED). Never moves: the tile, numbers while read, the legal block, tab items, rows on refresh. DEPRECATED (site): `.animate-float`, `.animate-pulse-dot`, hover scale 1.02, glow pulses, spinner theatre, parallax. `prefers-reduced-motion` honoured by `tokens.css`.

## I · Iconography and imagery

Icons: **Lucide v0.468.0** only (`icons/lucide/`, `icons/ICONS.md`; the site already uses `lucide-react` 0.469 — same set): 24 px grid, stroke 1.75 / 2 / 2 at 16 / 20 / 24 px, round caps, `currentColor`, 44 px hit area, directional icons mirror in RTL; icons only for navigation, state and action — never on headings, never in red tiles (the site's 40 px icon tiles with red icons in `KeyRules.jsx` are a marketing treatment, not for apps); no emoji (the footer's 🔥🏦🏧🌐🔘 are deprecated), no Unicode symbols as icons.

Imagery: real product only — **cTrader screens from the official media kit** (`fpt-website/public/images/ctrader/Media`: 8 desktop + 13 mobile PNG, pixel-accurate inside the device bezel `--fpt-ground-bezel`), the official Fiper Card artwork (`assets/fiper-physical-card.OFFICIAL.png`, never recoloured), the cTrader logo from its pack; **no MT4 / MT5 screens or logos**; no stock people, no AI faces, no "tech" backgrounds, no abstract waves (`WaveBg.jsx` is deprecated decoration), no invented dashboards presented as the product (`DashboardPreview.jsx` figures are not sourced — mark SAMPLE or replace with the real dashboard when it exists).

## J · Theme modes

**Dark only** for apps, the site and the CRM (`color-scheme: dark`; no `[data-theme=light]`, no auto-switch). The paper ground `.fpt-paper` (`#F7F4F1`) is a composition ground for documents, e-mails, certificates, statements, invoices, slides and print — never an app theme. Logos switch with the ground: tile + text on dark, lockup on paper.

## K · Templates

Regulatory scope per surface: `regulatory-matrix.md` — **no regulatory text exists for FPT**; every row is a REQUIRED DECISION (text from Amir / legal); templates carry a placeholder comment, never invented text, and the observed footer line only where the site shows it today.

`templates/email/` (cTrader credentials — the header **paper card** `logos/derived/email-header-160-card@2x.png` as base64 at 160 × 56 (CR-12: transparent corners, 8 px radius, 12 px paper around the lockup; the white twin `email-header-160-dark@2x.png` shown only under Outlook's `[data-ogsc]`), login / server / platform facts card, one button; evaluation pass; evaluation fail; payout processed — **paper in every mode** (owner, 1 Nov 2026): colour scheme light only, no `prefers-color-scheme` block, no page-level `[data-ogsc]` rule, no dark tile, the paper ground as `bgcolor` + `style` on body / outer table / cell (CR-12); the foot in the message language only, nothing under 12 px (CR-03); zero raw URLs; previewed at 360 px light + Chromium dark emulation (the ground stays paper); real clients NOT TESTED — `TEST-MATRIX.md`, rows ready to record) · `templates/document/` (certificate, payout statement, trader agreement — layout only, legal text REQUIRED DECISION —, invoice — challenge fee one-time, tax / entity REQUIRED DECISION; A4, `print.css`, `PRINT-SPEC.md`) · `templates/presentation/fpt-brand-deck.pptx` (16:9; cover, section, content, stats, close) · `templates/social/` (1080×1080, 1080×1350, 1080×1920, 1200×630 SVG + PNG exports; `social-rules.md`: body ≥ 42 px, safe zones, AR/EN, SAMPLE only) · `templates/video/` (safe areas 9:16 / 16:9, lower third, end card, 5-second sample; `video-rules.md`) · `templates/legal/REQUIRED-DECISION.md`.

## L · Anti-AI-tells (binding — inherited list + FPT additions)

No `#000` grounds · no monospace outside numbers / code · no slash label prefix or decorative numbering · no relabelled charts · no `%` or currency code separated from its number · brand red never for losses, decoration or small labels · no ISO timestamps · no purple / neon / multi-colour gradients · no glow, halo or neon around buttons / cards · no hype emojis, no Unicode symbols as icons · no stock or "tech" backgrounds, no decorative graphics without information · no letter-spaced Arabic, no Latin caps beyond `.06em` · no futuristic / decorative fonts · no one-template-for-everything · no invented statistics. **FPT additions:** no gold "most popular" badge (`#D4AF37`) · no glass / blurred cards · no `.radial-red` washes or hero glows · no floating / tilting cards · no pulsing dots · no gradient text (`gradient-text`) · no gradient borders · no trust-bar numbers, Trustpilot scores, payout totals or trader stories without a documented source (the site's `125K+ / 43K+ / $150M+ / 140+` and the six trader quotes are invented — never reproduced) · no MT4 / MT5 anywhere · no "regulated" / "licensed" wording until the regulatory decision exists. Passing this list is necessary, not sufficient: every surface is reviewed visually. Detection commands: `checklists/brand-review.md`.

## M · AI generation kit (Higgsfield)

Generated scenes are **environments around real assets**; the asset (the FPT tile, a phone with a real cTrader screen, the Fiper Card artwork) is composited afterwards, never generated. Prompt fragments: `matte near-black ground #0A0A0A, dark studio surfaces, a single vivid red accent #F42821, soft directional key light from the top-left, shallow depth, no neon, no purple, no lens flare, no text, no logos, no people, no screens, no charts, photographic realism, 35 mm, f/2.8` · negative: `text, watermark, logo, UI, numbers, candlesticks, faces, hands holding phones, neon, purple, glitter, sparkles, bokeh balls, glossy 3D icons, trading charts`. Never generate: the tile or any logo, app / cTrader screens, charts or numbers, faces, the Fiper Card, the cTrader mark. Output check: ground not pure black, one red accent, no text artefacts; then composite the real asset at its official aspect with the brand clear space.

## N · Governance

v1.2.2 (5 Nov 2026; v1.2.1 2 Nov 2026; base v1.0.0 29 Oct 2026). Change requests CR-01…CR-15 are recorded in **`identity-change-requests.md`** (the package register: number, title, source, decision and date, status, the release that applied it, what concerns each consumer; CR-08 / CR-09 PROPOSED, not applied; CR-13 recorded with its asset removal deferred; CR-14 / CR-15 applied on the site, the CR-15 addendum pending there) and in `CHANGELOG.md` with the owner's decision and date. Parent pin fiper-brand v2.0.0; a parent release is adopted by re-running `scripts/gen-tokens.mjs` against the new parent file, re-checking inherited values (`verify-tokens`), contrast and every surface, then bumping the pin in `tokens.json`, `CHANGELOG.md`, `SKILL.md`. Labels **APPROVED / OBSERVED / INHERITED / PROPOSED / REFERENCE / DEPRECATED** travel with every value. Change request: open an issue in `Fiper-Global/fpt-brand` with before / after, the source (file + line or URL), the surfaces affected; the lead applies it as one commit that bumps `CHANGELOG.md`; consumers pull the tag. Consumers: fpt-website (fptraders.com), the CRM (crm.fptraders.com), the challenge dashboard, system e-mails (cTrader credentials, evaluation, payout), documents (certificate, statement, agreement, invoice), social (linktr.ee/fiper), video, Higgsfield generation. The parent system governs Fiper Global's own surfaces; this system governs FPT's.

## Decision items (defaults applied, labelled PROPOSED — the team has not confirmed them; flips are one token for colour / radius / motion / z-index only; item 1 changes fonts and requires re-checking components, mockups, templates and the manual)

| # | Item | Observation | Reason | Options | Recommended default (applied) | Flip |
|---|---|---|---|---|---|---|
| 1 | Latin pair | the site is Inter-only (headings Inter 600 `-0.02em`); the parent uses Barlow Condensed + Inter; the Arabic family is IBM Plex Sans Arabic (decided) | one headline voice across Fiper surfaces vs the site's current look | A Inter-only (site) · **B Inter body + Barlow Condensed display (parent)** · C IBM Plex Sans + Plex Mono | **B** | `font.family.display` in `tokens.json` → rebuild → re-check preview, mockups, templates, manual |
| 2 | Brand red | `#F42821` LOCKED on every FPT surface (task file, `index.css` line 5, the tile's own gradient start); parent UI red `#DC2626`; the site adds a glow | one UI red per sub-brand; `#F42821` is more legible than `#DC2626` on the FPT grounds (4.88 / 4.54 vs 4.10 / 3.81); white on flat `#F42821` is 4.06 — buttons use the gradient (midpoint 5.75) | A keep `#F42821` · B migrate to `#DC2626` | **A** — glow DEPRECATED; flat-red fills carry large text / icons only | `primitive.color.fpt-red-500` (LOCKED — a flip needs the owner's decision) |
| 3 | Loss / danger / drawdown | no loss colour exists in FPT; the site colours profit `#10B981`; the parent's `finance.loss` is coral `#E8785A` | losses must read AA and never look like the brand; drawdown needs a warning stage before the breach | A coral loss + amber drawdown (parent) · B amber for both · C brand red (rejected) | **A** — `finance.loss` ≠ `state.danger` (same value, separate tokens); gain = parent `#2AB37A`, site `#10B981` observed-only; coral↔red ΔE 38.6 | `semantic.color.finance.loss` / `finance.drawdown` / `finance.gain` |
| 4 | Endorsement lockup "Part of Fiper Global" | text in both languages exists (`footer.partOf`, `nav.partOfFiperGlobal`); no artwork | the relationship must look the same everywhere | A text line only · **B text primary + a geometric row (tile, divider, Fiper lockup 0.5 H)** | **B** from the parent ratios — MISSING ASSET pending official artwork | `component.logo.endorsement.*` |
| 5 | Regulatory block | none for FPT; the footer shows a copyright line, an unapproved risk sentence and links to the parent's legal page | nothing may be invented | — | **REQUIRED DECISION** — placeholder comment on every template (`regulatory-matrix.md`) | text from Amir / legal → `templates/legal/` |
| 6 | Dark ground | FPT `#0A0A0A` everywhere; parent `#0A0708` (warm) and marks `#0A0A0A` deprecated for Fiper Global | contrast is equal (19.8 vs 20.06; 6.26 vs 6.26); pure-black-adjacent reads cooler than the parent | A keep `#0A0A0A` · B align to `#0A0708` | **A** | `primitive.color.black-950` → `#0A0708` + rebuild + contrast (one token) |

## Historical notes — fpt-website observations (NOT for new use)
Recorded only so the site can be read as a source of values. None of these is an instruction; agents must not reintroduce them on any surface: pure black body ground (`index.css` line 20) and `.glass-nav` black scrim (line 77) · `.btn-red-glow` and its hover (lines 63–68) · `.radial-red` hero washes (line 96) · `.gradient-text` headline and `.gradient-border` card (lines 55–94) · `.glass` blurred cards (line 70) · `.animate-float` / `.animate-pulse-dot` (lines 100–112) · the tinted-red eyebrow `#FCA5A5` with a pulsing red dot and `.2em` tracking (`Section.jsx`) · `.2em` on the navbar relationship line (`Navbar.jsx`) · the gold "MOST POPULAR" badge `#D4AF37` with `.15em` tracking (`PricingPreview.jsx`) · red hero stat figures in JetBrains Mono (`Hero.jsx`) · 40 px icon tiles with red Lucide icons (`KeyRules.jsx`) · footer emoji labels · trust-bar counters and trader stories with unsourced figures · `favicon.svg` retyped wordmark · Google-Fonts Cairo and JetBrains Mono · hover scale 1.02 · `WaveBg.jsx` abstract waves. Current rules: labels are Inter 600 .06em / IBM Plex Sans Arabic 600 with no prefix and no dot; red has three roles; numbers are never red; no glow anywhere; the ground is `#0A0A0A`, never `#000`.
