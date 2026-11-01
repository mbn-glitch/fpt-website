# tokens-quick — every `--fpt-*` variable (GENERATED from brand/tokens.json, DTCG 2025.10; do not edit)

FPT Brand Identity System v1.2.1 — child of **fiper-brand v2.0.0**. Layers: `--fpt-p-*` primitives (never used directly in apps) · `--fpt-*` semantic roles (use these) · `--fpt-c-*` component tokens. Status: **APPROVED** (task file / official logo file / LOCKED) · **OBSERVED** (fpt-website commit a88e666, captured 2026-10-29; an observed value is not automatically a rule) · **INHERITED** (read from the parent file by path) · **PROPOSED** (no source; labelled default — decision items 1–6) · **REFERENCE** (parent value kept only for comparison, never emitted) · **DEPRECATED** (never use) · ALIAS. Dark is the only app theme; `--fpt-paper-*` values apply under `.fpt-paper` (documents, e-mail, print).

## Semantic roles
| Variable | Value | Status | Role |
|---|---|---|---|
| `--fpt-ground-bg` | `#0A0A0A` | PROPOSED | App ground. Never #000. |
| `--fpt-ground-coal` | `#141414` | OBSERVED | color.ground.coal |
| `--fpt-ground-panel` | `#141414` | OBSERVED | Card / panel fill (only where a box groups information or bounds an action). |
| `--fpt-ground-elevated` | `#1A1A1A` | OBSERVED | Sheets, toasts, popovers. |
| `--fpt-ground-frame` | `#0A0A0A` | PROPOSED | color.ground.frame |
| `--fpt-ground-chrome` | `rgba(10,10,10,0.85)` | PROPOSED | color.ground.chrome |
| `--fpt-ground-bezel` | `#1A1A1A` | PROPOSED | color.ground.bezel |
| `--fpt-line-ash` | `rgba(255,255,255,0.08)` | OBSERVED | color.line.ash |
| `--fpt-line-strong` | `rgba(255,255,255,0.35)` | PROPOSED | color.line.strong |
| `--fpt-line-input` | `rgba(255,255,255,0.40)` | PROPOSED | color.line.input |
| `--fpt-line-frame` | `rgba(255,255,255,0.12)` | PROPOSED | color.line.frame |
| `--fpt-line-brand` | `rgba(244,40,33,0.25)` | OBSERVED | color.line.brand |
| `--fpt-line-dark-mail` | `#2A2325` | INHERITED | color.line.dark-mail |
| `--fpt-text-primary` | `#FFFFFF` | OBSERVED | color.text.primary |
| `--fpt-text-secondary` | `rgba(255,255,255,0.78)` | OBSERVED | Body on dark (≈ 12.6:1). |
| `--fpt-text-muted` | `rgba(255,255,255,0.55)` | OBSERVED | Muted / meta (≈ 6.2:1). Never darker. |
| `--fpt-text-label` | `rgba(255,255,255,0.55)` | PROPOSED | color.text.label |
| `--fpt-text-on-brand` | `#FFFFFF` | OBSERVED | color.text.on-brand |
| `--fpt-text-icon-on-brand` | `#FFFFFF` | OBSERVED | color.text.icon-on-brand |
| `--fpt-text-on-success` | `#0A0A0A` | PROPOSED | color.text.on-success |
| `--fpt-text-on-danger` | `#0A0A0A` | PROPOSED | color.text.on-danger |
| `--fpt-text-selection` | `#FFFFFF` | OBSERVED | color.text.selection |
| `--fpt-brand-red` | `#F42821` | APPROVED | Three roles only: the logo tile, the one primary action, the active state. Never losses, never decoration, never small labels. |
| `--fpt-brand-red-deep` | `#A30100` | OBSERVED | color.brand.red-deep |
| `--fpt-brand-red-gradient-end` | `#A30100` | OBSERVED | color.brand.red-gradient-end |
| `--fpt-brand-red-wash` | `rgba(244,40,33,0.10)` | OBSERVED | color.brand.red-wash |
| `--fpt-brand-selection-bg` | `rgba(244,40,33,0.30)` | OBSERVED | color.brand.selection-bg |
| `--fpt-brand-logo-gradient` | `linear-gradient(135deg, #F62721 0%, #A30100 100%)` | APPROVED | Logo artwork only; also the primary button fill (the one place the gradient is a UI fill). |
| `--fpt-brand-red-as-text-paper` | `#A30100` | PROPOSED | color.brand.red-as-text-paper |
| `--fpt-action-primary` | `#F42821` | ALIAS | color.action.primary |
| `--fpt-action-primary-end` | `#A30100` | ALIAS | color.action.primary-end |
| `--fpt-action-primary-pressed` | `#A30100` | PROPOSED | color.action.primary-pressed |
| `--fpt-action-focus-ring` | `#FFFFFF` | APPROVED | Keyboard focus ring on every control: the text colour, never brand red. |
| `--fpt-action-disabled-fg` | `rgba(255,255,255,0.38)` | PROPOSED | color.action.disabled-fg |
| `--fpt-action-disabled-bg` | `rgba(255,255,255,0.08)` | PROPOSED | color.action.disabled-bg |
| `--fpt-observed-action-primary-shadow` | `0 4px 20px rgba(244,40,33,0.35)` | OBSERVED (observed-only, not applied) | color.action.primary-shadow |
| `--fpt-observed-action-primary-shadow-hover` | `0 6px 30px rgba(244,40,33,0.5)` | OBSERVED (observed-only, not applied) | color.action.primary-shadow-hover |
| `--fpt-state-success` | `#2AB37A` | PROPOSED | color.state.success |
| `--fpt-state-danger` | `#E8785A` | PROPOSED | color.state.danger |
| `--fpt-state-warning` | `#D9A441` | PROPOSED | color.state.warning |
| `--fpt-state-info` | `#5B9BD5` | PROPOSED | color.state.info |
| `--fpt-state-success-wash` | `rgba(42,179,122,0.12)` | INHERITED | color.state.success-wash |
| `--fpt-state-danger-wash` | `rgba(232,120,90,0.12)` | INHERITED | color.state.danger-wash |
| `--fpt-state-warning-wash` | `rgba(217,164,65,0.12)` | INHERITED | color.state.warning-wash |
| `--fpt-state-info-wash` | `rgba(91,155,213,0.12)` | INHERITED | color.state.info-wash |
| `--fpt-finance-gain` | `#2AB37A` | PROPOSED | Profit / gain: word + ▲ + "+" + colour. |
| `--fpt-finance-loss` | `#E8785A` | PROPOSED | Loss / drawdown consumed: word + ▼ + "−" + colour. NEVER brand red. |
| `--fpt-finance-drawdown` | `#D9A441` | PROPOSED | color.finance.drawdown |
| `--fpt-finance-neutral` | `rgba(255,255,255,0.55)` | ALIAS | color.finance.neutral |
| `--fpt-finance-pending` | `#D9A441` | ALIAS | color.finance.pending |
| `--fpt-finance-target` | `#2AB37A` | PROPOSED | color.finance.target |
| `--fpt-chart-series-1` | `#FFFFFF` | PROPOSED | color.chart.series-1 |
| `--fpt-chart-series-2` | `#F42821` | PROPOSED | color.chart.series-2 |
| `--fpt-chart-series-3` | `rgba(255,255,255,0.55)` | ALIAS | color.chart.series-3 |
| `--fpt-chart-series-4` | `#D9A441` | ALIAS | color.chart.series-4 |
| `--fpt-chart-series-5` | `#5B9BD5` | ALIAS | color.chart.series-5 |
| `--fpt-chart-series-6` | `#2AB37A` | ALIAS | color.chart.series-6 |
| `--fpt-chart-grid` | `rgba(255,255,255,0.07)` | PROPOSED | color.chart.grid |
| `--fpt-chart-axis` | `rgba(255,255,255,0.55)` | ALIAS | color.chart.axis |
| `--fpt-chart-crosshair` | `rgba(255,255,255,0.35)` | ALIAS | color.chart.crosshair |
| `--fpt-chart-dot` | `#F42821` | PROPOSED | color.chart.dot |
| `--fpt-chart-target` | `#2AB37A` | ALIAS | color.chart.target |
| `--fpt-chart-floor` | `#E8785A` | PROPOSED | color.chart.floor |
| `--fpt-chart-band` | `rgba(232,120,90,0.12)` | PROPOSED | color.chart.band |
| `--fpt-chart-benchmark` | `rgba(255,255,255,0.55)` | PROPOSED | color.chart.benchmark |
| `--fpt-chart-candle-up` | `#2AB37A` | ALIAS | color.chart.candle-up |
| `--fpt-chart-candle-down` | `#E8785A` | ALIAS | color.chart.candle-down |
| `--fpt-paper-bg` | `#F7F4F1` | INHERITED | color.paper.bg |
| `--fpt-paper-panel` | `#FFFFFF` | ALIAS | color.paper.panel |
| `--fpt-paper-frame` | `#EFEBE7` | INHERITED | color.paper.frame |
| `--fpt-paper-text` | `#120D0E` | INHERITED | color.paper.text |
| `--fpt-paper-muted` | `#6B635E` | INHERITED | color.paper.muted |
| `--fpt-paper-ash` | `rgba(18,13,14,0.10)` | INHERITED | color.paper.ash |
| `--fpt-paper-line-strong` | `rgba(18,13,14,0.35)` | INHERITED | color.paper.line-strong |
| `--fpt-paper-line-input` | `rgba(18,13,14,0.55)` | INHERITED | color.paper.line-input |
| `--fpt-paper-line-solid` | `#E6E1DC` | INHERITED | color.paper.line-solid |
| `--fpt-paper-line-solid-2` | `#E9E5E1` | INHERITED | color.paper.line-solid-2 |
| `--fpt-paper-red-text` | `#A30100` | ALIAS | color.paper.red-text |
| `--fpt-paper-success` | `#146A45` | INHERITED | color.paper.success |
| `--fpt-paper-danger` | `#A33D24` | INHERITED | color.paper.danger |
| `--fpt-paper-warning` | `#7A520A` | INHERITED | color.paper.warning |
| `--fpt-paper-info` | `#275E94` | INHERITED | color.paper.info |
| `--fpt-paper-chart-grid` | `rgba(18,13,14,0.08)` | INHERITED | color.paper.chart-grid |
| `--fpt-paper-disabled-fg` | `rgba(18,13,14,0.38)` | INHERITED | color.paper.disabled-fg |
| `--fpt-paper-disabled-bg` | `rgba(18,13,14,0.08)` | INHERITED | color.paper.disabled-bg |
| `--fpt-paper-brand-wash` | `rgba(244,40,33,0.07)` | PROPOSED | color.paper.brand-wash |
| `--fpt-font-family-display` | `Barlow Condensed, Inter, IBM Plex Sans Arabic, sans-serif` | PROPOSED | Latin display (headlines, stats). Uppercase, 600/700/800, letter-spacing .5 px. Never for Arabic. |
| `--fpt-font-family-body` | `Inter, IBM Plex Sans Arabic, sans-serif` | OBSERVED | font.family.body |
| `--fpt-font-family-mono` | `IBM Plex Mono, IBM Plex Sans Arabic, monospace` | APPROVED | font.family.mono |
| `--fpt-font-family-arabic` | `IBM Plex Sans Arabic, Inter, sans-serif` | APPROVED | font.family.arabic |
| `--fpt-font-weight-regular` | `400` | INHERITED | font.weight.regular |
| `--fpt-font-weight-medium` | `500` | INHERITED | font.weight.medium |
| `--fpt-font-weight-semibold` | `600` | INHERITED | font.weight.semibold |
| `--fpt-font-weight-bold` | `700` | INHERITED | font.weight.bold |
| `--fpt-font-weight-display` | `800` | INHERITED | font.weight.display |
| `--fpt-font-weight-heading` | `600` | OBSERVED | font.weight.heading |
| `--fpt-font-size-xs` | `0.68rem` | INHERITED | font.size.xs |
| `--fpt-font-size-sm` | `0.75rem` | INHERITED | font.size.sm |
| `--fpt-font-size-md` | `0.85rem` | INHERITED | font.size.md |
| `--fpt-font-size-base` | `0.92rem` | INHERITED | font.size.base |
| `--fpt-font-size-lg` | `0.98rem` | INHERITED | font.size.lg |
| `--fpt-font-size-xl` | `1.3rem` | INHERITED | font.size.xl |
| `--fpt-font-size-2xl` | `1.9rem` | INHERITED | font.size.2xl |
| `--fpt-font-size-3xl` | `2rem` | INHERITED | font.size.3xl |
| `--fpt-font-size-4xl` | `2.9rem` | INHERITED | font.size.4xl |
| `--fpt-font-size-app-caption` | `12px` | INHERITED | font.size.app-caption |
| `--fpt-font-size-app-body` | `16px` | APPROVED | App body text — the one text step of the five-step ladder (CR-06): sentences, lists, chips, tabs, descriptions, dense values. |
| `--fpt-font-size-app-subtitle` | `18px` | APPROVED | App subtitle (18) — the fourth step of the five-step ladder. |
| `--fpt-font-size-app-title` | `22px` | APPROVED | App title (22) — the second-largest step of the five-step ladder. |
| `--fpt-font-size-app-display` | `32px` | APPROVED | App hero / display (32) — the hero amount, the challenge size; the largest step of the five-step ladder. |
| `--fpt-font-size-app-label` | `13px` | APPROVED | App label (13) — icons, badges, metric labels, currency code; never body text. |
| `--fpt-font-size-app-unit-floor` | `16px` | APPROVED | Floor of a numeric unit (.fpt-unit) on app screens: max(16px, 1em). |
| `--fpt-font-size-site-brand` | `15px` | OBSERVED | font.size.site-brand |
| `--fpt-font-size-site-h1-max` | `96px` | OBSERVED | font.size.site-h1-max |
| `--fpt-font-size-site-stat` | `30px` | OBSERVED | font.size.site-stat |
| `--fpt-font-scale-app-ladder` | `13 · 16 · 18 · 22 · 32` | APPROVED | The approved five-step app type ladder (px): label 13 · body 16 · subtitle 18 · title 22 · hero 32. |
| `--fpt-font-scale-app-max-sizes` | `5` | APPROVED | Maximum distinct font sizes per app screen (gate). |
| `--fpt-font-scale-app-body-min` | `16px` | APPROVED | Body-text floor on app screens (gate). |
| `--fpt-font-scale-app-line-height` | `1.5` | APPROVED | App line-height for the ladder (unchanged by CR-06). |
| `--fpt-font-scale-app-label-uses` | `icons · badges · metric labels · currency code — never a sentence` | APPROVED | Where the 13 px label step may appear. |
| `--fpt-font-lineHeight-body` | `1.65` | INHERITED | font.lineHeight.body |
| `--fpt-font-lineHeight-heading` | `0.98` | OBSERVED | font.lineHeight.heading |
| `--fpt-font-lineHeight-arabic-body` | `1.9` | INHERITED | font.lineHeight.arabic-body |
| `--fpt-font-lineHeight-arabic-heading` | `1.3` | INHERITED | font.lineHeight.arabic-heading |
| `--fpt-font-lineHeight-legal` | `1.7` | INHERITED | font.lineHeight.legal |
| `--fpt-font-letterSpacing-heading` | `0.5px` | INHERITED | font.letterSpacing.heading |
| `--fpt-font-letterSpacing-heading-site` | `-0.02em` | OBSERVED | font.letterSpacing.heading-site |
| `--fpt-font-letterSpacing-eyebrow` | `0.06em` | INHERITED | font.letterSpacing.eyebrow |
| `--fpt-font-letterSpacing-arabic` | `0` | APPROVED | font.letterSpacing.arabic |
| `--fpt-observed-font-letterSpacing-site-badge` | `0.2em` | OBSERVED (observed-only, not applied) | font.letterSpacing.site-badge |
| `--fpt-observed-font-letterSpacing-site-popular` | `0.15em` | OBSERVED (observed-only, not applied) | font.letterSpacing.site-popular |
| `--fpt-space-1` | `4px` | INHERITED | space.1 |
| `--fpt-space-2` | `8px` | INHERITED | space.2 |
| `--fpt-space-3` | `12px` | INHERITED | space.3 |
| `--fpt-space-4` | `16px` | INHERITED | space.4 |
| `--fpt-space-5` | `20px` | INHERITED | space.5 |
| `--fpt-space-6` | `24px` | INHERITED | space.6 |
| `--fpt-space-7` | `28px` | INHERITED | space.7 |
| `--fpt-space-8` | `32px` | INHERITED | space.8 |
| `--fpt-space-10` | `40px` | INHERITED | space.10 |
| `--fpt-space-12` | `48px` | INHERITED | space.12 |
| `--fpt-space-16` | `64px` | INHERITED | space.16 |
| `--fpt-space-24` | `96px` | INHERITED | space.24 |
| `--fpt-space-30` | `120px` | INHERITED | space.30 |
| `--fpt-space-card-y` | `26px` | INHERITED | space.card-y |
| `--fpt-space-card-x` | `24px` | INHERITED | space.card-x |
| `--fpt-space-gutter` | `16px` | INHERITED | space.gutter |
| `--fpt-space-section-min` | `64px` | INHERITED | space.section-min |
| `--fpt-space-section-max` | `120px` | INHERITED | space.section-max |
| `--fpt-space-btn-y` | `14px` | OBSERVED | space.btn-y |
| `--fpt-space-btn-x` | `28px` | OBSERVED | space.btn-x |
| `--fpt-space-btn-sm-y` | `12px` | PROPOSED | space.btn-sm-y |
| `--fpt-space-btn-sm-x` | `20px` | OBSERVED | space.btn-sm-x |
| `--fpt-space-btn-lg-x` | `36px` | OBSERVED | space.btn-lg-x |
| `--fpt-space-site-gutter` | `24px` | OBSERVED | space.site-gutter |
| `--fpt-space-phone-gutter` | `20px` | PROPOSED | space.phone-gutter |
| `--fpt-size-wrap-max` | `1280px` | OBSERVED | size.wrap-max |
| `--fpt-size-wrap-pct` | `92%` | INHERITED | size.wrap-pct |
| `--fpt-size-logo-nav-h` | `46px` | OBSERVED | size.logo-nav-h |
| `--fpt-size-logo-footer-h` | `44px` | OBSERVED | size.logo-footer-h |
| `--fpt-size-logo-app-h` | `32px` | PROPOSED | size.logo-app-h |
| `--fpt-size-touch-min` | `44px` | INHERITED | size.touch-min |
| `--fpt-size-icon-sm` | `16px` | INHERITED | size.icon-sm |
| `--fpt-size-icon-md` | `20px` | INHERITED | size.icon-md |
| `--fpt-size-icon-lg` | `24px` | INHERITED | size.icon-lg |
| `--fpt-size-icon-tile` | `40px` | OBSERVED | size.icon-tile |
| `--fpt-size-header-h` | `64px` | PROPOSED | size.header-h |
| `--fpt-size-tabbar-h` | `56px` | INHERITED | size.tabbar-h |
| `--fpt-size-bp-min` | `375px` | APPROVED | size.bp-min |
| `--fpt-size-bp-design` | `390px` | INHERITED | size.bp-design |
| `--fpt-size-bp-sm` | `640px` | INHERITED | size.bp-sm |
| `--fpt-size-bp-md` | `900px` | INHERITED | size.bp-md |
| `--fpt-size-bp-lg` | `1024px` | OBSERVED | size.bp-lg |
| `--fpt-radius-pill` | `999px` | OBSERVED | radius.pill |
| `--fpt-radius-card` | `16px` | APPROVED | radius.card |
| `--fpt-radius-media` | `14px` | INHERITED | radius.media |
| `--fpt-radius-sheet` | `18px` | INHERITED | radius.sheet |
| `--fpt-radius-input` | `12px` | INHERITED | radius.input |
| `--fpt-radius-sm` | `8px` | INHERITED | radius.sm |
| `--fpt-radius-device` | `22px` | INHERITED | radius.device |
| `--fpt-observed-shadow-primary` | `0 4px 20px rgba(244,40,33,0.35)` | OBSERVED (observed-only, not applied) | shadow.primary |
| `--fpt-observed-shadow-primary-hover` | `0 6px 30px rgba(244,40,33,0.5)` | OBSERVED (observed-only, not applied) | shadow.primary-hover |
| `--fpt-shadow-overlay` | `0 22px 70px rgba(0,0,0,0.55)` | INHERITED | shadow.overlay |
| `--fpt-shadow-none` | `none` | INHERITED | shadow.none |
| `--fpt-z-base` | `0` | INHERITED | elevation.base |
| `--fpt-z-raised` | `10` | INHERITED | elevation.raised |
| `--fpt-z-sticky` | `20` | INHERITED | elevation.sticky |
| `--fpt-z-header` | `80` | INHERITED | elevation.header |
| `--fpt-z-scrim` | `90` | INHERITED | elevation.scrim |
| `--fpt-z-sheet` | `100` | INHERITED | elevation.sheet |
| `--fpt-z-toast` | `110` | INHERITED | elevation.toast |
| `--fpt-z-tooltip` | `120` | INHERITED | elevation.tooltip |
| `--fpt-observed-z-site-header` | `50` | OBSERVED (observed-only, not applied) | elevation.site-header |
| `--fpt-motion-duration-press` | `140ms` | INHERITED | motion.duration.press |
| `--fpt-motion-duration-hover` | `200ms` | OBSERVED | motion.duration.hover |
| `--fpt-motion-duration-state` | `300ms` | OBSERVED | motion.duration.state |
| `--fpt-motion-duration-surface` | `350ms` | INHERITED | motion.duration.surface |
| `--fpt-motion-duration-reveal` | `500ms` | OBSERVED | motion.duration.reveal |
| `--fpt-motion-easing-standard` | `0.22, 1, 0.36, 1` | OBSERVED | motion.easing.standard |
| `--fpt-motion-easing-exit` | `0.22, 1, 0.36, 1` | OBSERVED | motion.easing.exit |
| `--fpt-motion-easing-parent-standard` | `0.2, 0.7, 0.2, 1` | INHERITED | motion.easing.parent-standard |
| `--fpt-motion-easing-press` | `ease-out` | INHERITED | motion.easing.press |
| `--fpt-motion-press-scale` | `0.98` | OBSERVED | motion.press-scale |
| `--fpt-observed-motion-hover-scale` | `1.02` | OBSERVED (observed-only, not applied) | motion.hover-scale |
| `--fpt-motion-reveal-offset` | `8px` | OBSERVED | motion.reveal-offset |

## Component tokens
| Variable | Value | Status |
|---|---|---|
| `--fpt-c-button-primary-fill` | `linear-gradient(135deg, #F42821, #A30100)` | OBSERVED |
| `--fpt-c-button-primary-text` | `#FFFFFF` | ALIAS |
| `--fpt-c-button-primary-icon` | `#FFFFFF` | ALIAS |
| `--fpt-c-button-primary-shadow` | `none` | APPROVED |
| `--fpt-c-button-primary-shadow-hover` | `none` | APPROVED |
| `--fpt-c-button-primary-fill-pressed` | `#A30100` | ALIAS |
| `--fpt-c-button-primary-label-ground-reference` | `#CB1511` | PROPOSED |
| `--fpt-c-button-primary-label-min-size-on-flat-red` | `18.67px` | PROPOSED |
| `--fpt-c-button-primary-radius` | `999px` | ALIAS |
| `--fpt-c-button-primary-height` | `48px` | OBSERVED |
| `--fpt-c-button-primary-height-lg` | `56px` | OBSERVED |
| `--fpt-c-button-primary-height-sm` | `44px` | PROPOSED |
| `--fpt-c-button-primary-padding-x` | `28px` | ALIAS |
| `--fpt-c-button-primary-font-size` | `16px` | OBSERVED |
| `--fpt-c-button-primary-font-weight` | `600` | PROPOSED |
| `--fpt-c-button-primary-press-scale` | `0.98` | ALIAS |
| `--fpt-c-button-primary-press-duration` | `140ms` | ALIAS |
| `--fpt-c-button-secondary-fill` | `#141414` | PROPOSED |
| `--fpt-c-button-secondary-border` | `rgba(255,255,255,0.40)` | PROPOSED |
| `--fpt-c-button-secondary-text` | `#FFFFFF` | ALIAS |
| `--fpt-c-button-ghost-fill` | `rgba(255,255,255,0.05)` | OBSERVED |
| `--fpt-c-button-ghost-border` | `rgba(255,255,255,0.08)` | OBSERVED |
| `--fpt-c-button-ghost-border-hover` | `rgba(255,255,255,0.20)` | OBSERVED |
| `--fpt-c-button-ghost-fill-hover` | `rgba(255,255,255,0.10)` | OBSERVED |
| `--fpt-c-button-ghost-text` | `#FFFFFF` | ALIAS |
| `--fpt-c-button-destructive-default-style` | `outline or text — never filled` | APPROVED |
| `--fpt-c-button-destructive-fill-scope` | `final-confirmation-dialog-only` | APPROVED |
| `--fpt-c-button-destructive-hover` | `rgba(232,120,90,0.12)` | APPROVED |
| `--fpt-c-button-destructive-border` | `#E8785A` | ALIAS |
| `--fpt-c-button-destructive-label` | `#E8785A` | ALIAS |
| `--fpt-c-button-destructive-icon` | `required — Lucide circle-x · x · log-out (vendored in icons/lucide) leading the label` | APPROVED |
| `--fpt-c-button-destructive-fill` | `#E8785A` | PROPOSED |
| `--fpt-c-button-destructive-text` | `#0A0A0A` | ALIAS |
| `--fpt-c-button-disabled-fill` | `rgba(255,255,255,0.08)` | ALIAS |
| `--fpt-c-button-disabled-text` | `rgba(255,255,255,0.38)` | ALIAS |
| `--fpt-c-button-focus-ring` | `#FFFFFF` | ALIAS |
| `--fpt-c-button-min-height` | `44px` | ALIAS |
| `--fpt-c-input-fill` | `#141414` | PROPOSED |
| `--fpt-c-input-border` | `rgba(255,255,255,0.40)` | PROPOSED |
| `--fpt-c-input-border-error` | `#E8785A` | ALIAS |
| `--fpt-c-input-text` | `#FFFFFF` | ALIAS |
| `--fpt-c-input-placeholder` | `rgba(255,255,255,0.55)` | ALIAS |
| `--fpt-c-input-radius` | `12px` | ALIAS |
| `--fpt-c-input-font-size` | `16px` | ALIAS |
| `--fpt-c-input-min-height` | `44px` | ALIAS |
| `--fpt-c-input-padding` | `12px 14px` | INHERITED |
| `--fpt-c-input-otp-width` | `44px` | INHERITED |
| `--fpt-c-input-otp-height` | `52px` | INHERITED |
| `--fpt-c-input-otp-font-size` | `22px` | INHERITED |
| `--fpt-c-input-otp-gap` | `8px` | INHERITED |
| `--fpt-c-input-otp-active-border` | `#F42821` | PROPOSED |
| `--fpt-c-card-fill` | `#141414` | OBSERVED |
| `--fpt-c-card-border` | `rgba(255,255,255,0.08)` | OBSERVED |
| `--fpt-c-card-border-hover` | `rgba(255,255,255,0.15)` | OBSERVED |
| `--fpt-c-card-border-selected` | `#F42821` | PROPOSED |
| `--fpt-c-card-radius` | `16px` | ALIAS |
| `--fpt-c-card-padding-y` | `24px` | OBSERVED |
| `--fpt-c-card-padding-x` | `24px` | OBSERVED |
| `--fpt-c-card-padding-compact` | `16px` | INHERITED |
| `--fpt-c-card-title-size` | `1.3rem` | ALIAS |
| `--fpt-c-challenge-size-font` | `32px` | PROPOSED |
| `--fpt-c-challenge-fee-font` | `1.3rem` | PROPOSED |
| `--fpt-c-challenge-popular-marker` | `rgba(255,255,255,0.55)` | PROPOSED |
| `--fpt-c-challenge-rule-row-height` | `48px` | PROPOSED |
| `--fpt-c-table-header-fill` | `#141414` | PROPOSED |
| `--fpt-c-table-header-text` | `rgba(255,255,255,0.55)` | ALIAS |
| `--fpt-c-table-row-line` | `rgba(255,255,255,0.08)` | ALIAS |
| `--fpt-c-table-row-height` | `48px` | INHERITED |
| `--fpt-c-table-row-height-compact` | `40px` | INHERITED |
| `--fpt-c-table-row-selected` | `rgba(244,40,33,0.10)` | ALIAS |
| `--fpt-c-table-number-font` | `IBM Plex Mono,IBM Plex Sans Arabic,monospace` | ALIAS |
| `--fpt-c-badge-height` | `24px` | INHERITED |
| `--fpt-c-badge-radius` | `999px` | ALIAS |
| `--fpt-c-badge-brand-fill` | `#F42821` | PROPOSED |
| `--fpt-c-badge-wash-alpha` | `0.12` | INHERITED |
| `--fpt-c-badge-endorsement-font` | `Inter,IBM Plex Sans Arabic,sans-serif` | APPROVED |
| `--fpt-c-badge-endorsement-letter-spacing` | `0` | APPROVED |
| `--fpt-c-badge-endorsement-color` | `rgba(255,255,255,0.55)` | ALIAS |
| `--fpt-c-toast-fill` | `#1A1A1A` | PROPOSED |
| `--fpt-c-toast-border` | `rgba(255,255,255,0.35)` | ALIAS |
| `--fpt-c-toast-accent-width` | `3px` | INHERITED |
| `--fpt-c-toast-max-width` | `420px` | INHERITED |
| `--fpt-c-toast-duration` | `300ms` | ALIAS |
| `--fpt-c-toast-auto-dismiss` | `5000ms` | INHERITED |
| `--fpt-c-tabbar-height` | `56px` | ALIAS |
| `--fpt-c-tabbar-fill` | `rgba(10,10,10,0.92)` | PROPOSED |
| `--fpt-c-tabbar-blur` | `14px` | INHERITED |
| `--fpt-c-tabbar-active` | `#F42821` | PROPOSED |
| `--fpt-c-tabbar-inactive` | `rgba(255,255,255,0.55)` | ALIAS |
| `--fpt-c-tabbar-label-size` | `11px` | INHERITED |
| `--fpt-c-tabbar-icon-size` | `24px` | ALIAS |
| `--fpt-c-header-height` | `64px` | ALIAS |
| `--fpt-c-header-fill` | `rgba(10,10,10,0.85)` | PROPOSED |
| `--fpt-c-header-blur` | `14px` | PROPOSED |
| `--fpt-c-header-border` | `rgba(255,255,255,0.08)` | OBSERVED |
| `--fpt-c-header-logo-height` | `46px` | ALIAS |
| `--fpt-c-sheet-fill` | `#1A1A1A` | PROPOSED |
| `--fpt-c-sheet-radius` | `18px` | ALIAS |
| `--fpt-c-sheet-scrim` | `rgba(10,10,10,0.72)` | PROPOSED |
| `--fpt-c-sheet-shadow` | `0 22px 70px rgba(0,0,0,0.55)` | ALIAS |
| `--fpt-c-sheet-handle` | `36px 4px` | INHERITED |
| `--fpt-c-sheet-in-duration` | `350ms` | ALIAS |
| `--fpt-c-dialog-destructive-cancel-style` | `secondary-outline-filled` | APPROVED |
| `--fpt-c-dialog-destructive-initial-focus` | `cancel` | APPROVED |
| `--fpt-c-dialog-destructive-order` | `cancel-first-solid-last` | APPROVED |
| `--fpt-c-dialog-destructive-enter-default` | `none` | APPROVED |
| `--fpt-c-dialog-confirm-cancel-style` | `ghost` | APPROVED |
| `--fpt-c-skeleton-fill` | `rgba(255,255,255,0.08)` | ALIAS |
| `--fpt-c-skeleton-pulse-duration` | `1200ms` | INHERITED |
| `--fpt-c-skeleton-pulse-min-opacity` | `0.45` | INHERITED |
| `--fpt-c-skeleton-show-after` | `150ms` | INHERITED |
| `--fpt-c-skeleton-min-visible` | `400ms` | INHERITED |
| `--fpt-c-chart-background` | `#141414` | ALIAS |
| `--fpt-c-chart-grid` | `rgba(255,255,255,0.07)` | ALIAS |
| `--fpt-c-chart-axis-text` | `rgba(255,255,255,0.55)` | ALIAS |
| `--fpt-c-chart-axis-font-size` | `0.68rem` | ALIAS |
| `--fpt-c-chart-line-width` | `2px` | INHERITED |
| `--fpt-c-chart-line` | `#FFFFFF` | ALIAS |
| `--fpt-c-chart-dot` | `#F42821` | ALIAS |
| `--fpt-c-chart-target` | `#2AB37A` | ALIAS |
| `--fpt-c-chart-floor` | `#E8785A` | ALIAS |
| `--fpt-c-chart-band` | `rgba(232,120,90,0.12)` | ALIAS |
| `--fpt-c-chart-benchmark` | `rgba(255,255,255,0.55)` | ALIAS |
| `--fpt-c-chart-benchmark-dash` | `4 4` | INHERITED |
| `--fpt-c-chart-candle-body` | `10px` | INHERITED |
| `--fpt-c-chart-candle-wick` | `1px` | INHERITED |
| `--fpt-c-chart-up` | `#2AB37A` | ALIAS |
| `--fpt-c-chart-down` | `#E8785A` | ALIAS |
| `--fpt-c-eyebrow-font` | `Inter,IBM Plex Sans Arabic,sans-serif` | PROPOSED |
| `--fpt-c-eyebrow-size` | `0.75rem` | ALIAS |
| `--fpt-c-eyebrow-weight` | `600` | ALIAS |
| `--fpt-c-eyebrow-letter-spacing` | `0.06em` | ALIAS |
| `--fpt-c-eyebrow-color` | `rgba(255,255,255,0.55)` | ALIAS |
| `--fpt-c-eyebrow-prefix` | `` | APPROVED |
| `--fpt-c-eyebrow-arabic-font` | `IBM Plex Sans Arabic,Inter,sans-serif` | ALIAS |
| `--fpt-c-eyebrow-arabic-weight` | `600` | APPROVED |
| `--fpt-c-eyebrow-arabic-letter-spacing` | `0` | APPROVED |
| `--fpt-c-email-logo-file` | `logos/derived/email-header-160-card@2x.png` | APPROVED |
| `— (not emitted)` | `withdrawn — use component.email.logo-file (the 160 × 56 card)` | DEPRECATED |
| `--fpt-c-email-header-dark-twin` | `logos/derived/email-header-160-dark@2x.png` | APPROVED |
| `--fpt-c-email-header-card-radius` | `8px` | APPROVED |
| `--fpt-c-email-header-card-padding` | `12px` | APPROVED |
| `--fpt-c-email-header-card-ground` | `#F7F4F1` | APPROVED |
| `--fpt-c-email-logo-width` | `160px` | APPROVED |
| `--fpt-c-email-logo-height` | `56px` | APPROVED |
| `--fpt-c-email-logo-ground` | `#F7F4F1` | APPROVED |
| `--fpt-c-email-scheme` | `paper-only` | APPROVED |
| `--fpt-c-email-dark-rule-scope` | `header-only-data-ogsc` | APPROVED |
| `--fpt-c-email-ground-attribute` | `bgcolor + style` | APPROVED |
| `--fpt-c-email-color-scheme` | `light` | APPROVED |
| `--fpt-c-email-foot-language` | `message-language-only` | APPROVED |
| `--fpt-c-email-min-font-size` | `12px` | APPROVED |
| `--fpt-c-og-file-ar` | `logos/derived/og-1200x630-ar.png` | APPROVED |
| `--fpt-c-og-file-en` | `logos/derived/og-1200x630-en.png` | APPROVED |
| `--fpt-c-og-canvas` | `1200 × 630` | APPROVED |
| `--fpt-c-og-ground` | `#0A0A0A` | APPROVED |
| `--fpt-c-og-lockup` | `logos/svg/fpt-lockup-horizontal-en-white.svg` | APPROVED |
| `--fpt-c-og-lockup-height` | `120px` | APPROVED |
| `--fpt-c-og-margin` | `64px` | APPROVED |
| `--fpt-c-og-risk-line-text-ar` | `الاستثمار ينطوي على مخاطر` | APPROVED |
| `--fpt-c-og-risk-line-text-en` | `Investing involves risk` | APPROVED |
| `--fpt-c-og-risk-line-color` | `rgba(255,255,255,0.55)` | APPROVED |
| `--fpt-c-og-risk-line-size` | `16px` | APPROVED |
| `--fpt-c-og-risk-line-placement` | `bottom-start inside the safe margin` | APPROVED |
| `--fpt-c-og-risk-line-font` | `IBM Plex Sans Arabic,Inter,sans-serif` | ALIAS |
| `--fpt-c-og-risk-line-font-en` | `Inter,IBM Plex Sans Arabic,sans-serif` | ALIAS |
| `--fpt-c-logo-lockup-language` | `en-only` | APPROVED |
| `--fpt-c-logo-nav-height` | `46px` | ALIAS |
| `— (not emitted)` | `22%` | DEPRECATED |
| `--fpt-c-logo-clear-space` | `0.5` | PROPOSED |
| `--fpt-c-logo-min-tile-screen` | `16px` | PROPOSED |
| `--fpt-c-logo-min-tile-print` | `4mm` | PROPOSED |
| `--fpt-c-logo-min-lockup-screen` | `24px` | PROPOSED |
| `--fpt-c-logo-min-lockup-print` | `8mm` | PROPOSED |
| `— (not emitted)` | `20mm` | DEPRECATED |
| `— (not emitted)` | `103mm` | DEPRECATED |
| `--fpt-c-logo-aspect` | `4.7364` | ALIAS |
| `--fpt-c-logo-aspect-ar` | `3.9043` | ALIAS |
| `--fpt-c-logo-aspect-bilingual` | `3.2272` | ALIAS |
| `--fpt-c-logo-stacked-aspect-ar` | `0.9586` | ALIAS |
| `--fpt-c-logo-small-cut-max` | `32px` | ALIAS |
| `--fpt-c-logo-wordmark-ink-dark` | `#FFFFFF` | ALIAS |
| `--fpt-c-logo-stacked-aspect` | `1.1154` | ALIAS |
| `--fpt-c-logo-tile-aspect` | `1` | ALIAS |
| `--fpt-c-logo-tile-corner-ratio` | `0.2` | ALIAS |
| `--fpt-c-logo-gap-to-wordmark` | `0.3333` | ALIAS |
| `--fpt-c-logo-endorsement-name-height` | `0.62` | INHERITED |
| `--fpt-c-logo-endorsement-gap` | `0.4` | INHERITED |
| `--fpt-c-logo-endorsement-fiper-lockup-height` | `0.5` | INHERITED |
| `--fpt-c-logo-endorsement-partner-logo-height` | `1.0` | INHERITED |

## Primitives (reference only — apps use the semantic layer)
| Token | Value | Status |
|---|---|---|
| `primitive.color.fpt-red-500` | `#F42821` | APPROVED |
| `primitive.color.fpt-red-600` | `#CB1511` | PROPOSED |
| `primitive.color.fpt-red-700` | `#A30100` | OBSERVED |
| `primitive.color.black-950` | `#0A0A0A` | OBSERVED |
| `primitive.color.black-900` | `#141414` | OBSERVED |
| `primitive.color.black-850` | `#1A1A1A` | OBSERVED |
| `primitive.color.white` | `#FFFFFF` | OBSERVED |
| `primitive.color.white-a78` | `rgba(255,255,255,0.78)` | OBSERVED |
| `primitive.color.white-a55` | `rgba(255,255,255,0.55)` | OBSERVED |
| `primitive.color.white-a08` | `rgba(255,255,255,0.08)` | OBSERVED |
| `primitive.color.white-a05` | `rgba(255,255,255,0.05)` | OBSERVED |
| `primitive.color.white-a10` | `rgba(255,255,255,0.10)` | OBSERVED |
| `primitive.color.white-a15` | `rgba(255,255,255,0.15)` | OBSERVED |
| `primitive.color.white-a20` | `rgba(255,255,255,0.20)` | OBSERVED |
| `primitive.color.white-a35` | `rgba(255,255,255,0.35)` | PROPOSED |
| `primitive.color.white-a40` | `rgba(255,255,255,0.40)` | PROPOSED |
| `primitive.color.white-a38` | `rgba(255,255,255,0.38)` | PROPOSED |
| `primitive.color.white-a12` | `rgba(255,255,255,0.12)` | PROPOSED |
| `primitive.color.white-a07` | `rgba(255,255,255,0.07)` | PROPOSED |
| `primitive.color.fpt-red-a10` | `rgba(244,40,33,0.10)` | OBSERVED |
| `primitive.color.fpt-red-a25` | `rgba(244,40,33,0.25)` | OBSERVED |
| `primitive.color.fpt-red-a30` | `rgba(244,40,33,0.30)` | OBSERVED |
| `primitive.color.fpt-red-a35` | `rgba(244,40,33,0.35)` | OBSERVED (observed-only, not applied) |
| `primitive.color.fpt-red-a50` | `rgba(244,40,33,0.50)` | OBSERVED (observed-only, not applied) |
| `primitive.color.fpt-red-a28` | `rgba(244,40,33,0.28)` | OBSERVED (observed-only, not applied) |
| `primitive.color.bg-a85` | `rgba(10,10,10,0.85)` | PROPOSED |
| `primitive.color.bg-a72` | `rgba(10,10,10,0.72)` | PROPOSED |
| `primitive.color.bg-a92` | `rgba(10,10,10,0.92)` | PROPOSED |
| `primitive.color.black-a55` | `rgba(0,0,0,0.55)` | INHERITED |
| `primitive.color.black-a70` | `rgba(0,0,0,0.70)` | OBSERVED (observed-only, not applied) |
| `primitive.color.glass-a60` | `rgba(20,20,20,0.60)` | OBSERVED (observed-only, not applied) |
| `primitive.color.emerald-500` | `#10B981` | OBSERVED (observed-only, not applied) |
| `primitive.color.gold-500` | `#D4AF37` | OBSERVED (observed-only, not applied) |
| `primitive.color.trustpilot-500` | `#00B67A` | OBSERVED (observed-only, not applied) |
| `primitive.color.rose-300` | `#FCA5A5` | OBSERVED (observed-only, not applied) |
| `primitive.color.green-500` | `#2AB37A` | INHERITED |
| `primitive.color.green-700` | `#146A45` | INHERITED |
| `primitive.color.coral-400` | `#E8785A` | INHERITED |
| `primitive.color.coral-700` | `#A33D24` | INHERITED |
| `primitive.color.amber-400` | `#D9A441` | INHERITED |
| `primitive.color.amber-700` | `#7A520A` | INHERITED |
| `primitive.color.blue-400` | `#5B9BD5` | INHERITED |
| `primitive.color.blue-700` | `#275E94` | INHERITED |
| `primitive.color.green-a12` | `rgba(42,179,122,0.12)` | INHERITED |
| `primitive.color.coral-a12` | `rgba(232,120,90,0.12)` | INHERITED |
| `primitive.color.amber-a12` | `rgba(217,164,65,0.12)` | INHERITED |
| `primitive.color.blue-a12` | `rgba(91,155,213,0.12)` | INHERITED |
| `primitive.color.sand-50` | `#F7F4F1` | INHERITED |
| `primitive.color.sand-75` | `#EFEBE7` | INHERITED |
| `primitive.color.sand-150` | `#E9E5E1` | INHERITED |
| `primitive.color.sand-200` | `#E6E1DC` | INHERITED |
| `primitive.color.sand-600` | `#6B635E` | INHERITED |
| `primitive.color.charcoal-875` | `#120D0E` | INHERITED |
| `primitive.color.ink-a08` | `rgba(18,13,14,0.08)` | INHERITED |
| `primitive.color.ink-a10` | `rgba(18,13,14,0.10)` | INHERITED |
| `primitive.color.ink-a18` | `rgba(18,13,14,0.18)` | INHERITED |
| `primitive.color.ink-a35` | `rgba(18,13,14,0.35)` | INHERITED |
| `primitive.color.ink-a38` | `rgba(18,13,14,0.38)` | INHERITED |
| `primitive.color.ink-a55` | `rgba(18,13,14,0.55)` | INHERITED |
| `primitive.color.charcoal-775` | `#2A2325` | INHERITED |
| `primitive.color.parent-ref.red-500` | `#DC2626` | REFERENCE (parent value — never on an FPT surface) |
| `primitive.color.parent-ref.charcoal-950` | `#0A0708` | REFERENCE (parent value — never on an FPT surface) |
| `primitive.color.parent-ref.red-600` | `#A31212` | REFERENCE (parent value — never on an FPT surface) |
| `primitive.logo.tile-gradient-start` | `#F62721` | APPROVED |
| `primitive.logo.tile-gradient-end` | `#A30100` | APPROVED |
| `primitive.logo.wordmark-ink` | `#120D0E` | APPROVED |
| `primitive.logo.wordmark-ink-dark` | `#FFFFFF` | APPROVED |
| `primitive.logo.lockup-aspect` | `4.7364` | APPROVED |
| `primitive.logo.lockup-aspect-ar` | `3.9043` | APPROVED |
| `primitive.logo.lockup-aspect-bilingual` | `3.2272` | APPROVED |
| `primitive.logo.stacked-aspect` | `1.1154` | APPROVED |
| `primitive.logo.stacked-aspect-ar` | `0.9586` | APPROVED |
| `primitive.logo.small-cut-max` | `32px` | APPROVED |
| `primitive.logo.tile-aspect` | `1` | APPROVED |
| `primitive.logo.tile-corner-ratio` | `0.2` | APPROVED |
| `primitive.logo.tile-share-of-lockup-height` | `1` | APPROVED |
| `primitive.logo.wordmark-gap-ratio` | `0.3333` | APPROVED |

## Deprecated (never use)
| Token | Value | Why |
|---|---|---|
| `primitive.color.deprecated.pure-black` | `#000000` | fpt-website a88e666 src/index.css md5 6b112104… line 20 body background-color:#000 — pure black ground (parent rule: never #000) |
| `primitive.color.deprecated.glass-nav-black` | `rgba(0,0,0,0.7)` | fpt-website a88e666 src/index.css md5 6b112104… line 77 .glass-nav — pure-black scrim; header uses bg-a85 |
| `primitive.logo.tile-share-of-canvas-icon-shield` | `0.509` | described the v1 JPEG canvas (icon-shield.jpeg); logo v2 is vector — no canvas share exists (30 Oct 2026) |
| `primitive.logo.tile-share-of-canvas-icon-rounded` | `0.955` | described the v1 JPEG canvas (icon-rounded.jpeg); logo v2 is vector — no canvas share exists (30 Oct 2026) |
| `semantic.font.family.deprecated-arabic` | `Cairo` | fpt-website a88e666 src/index.css md5 6b112104… line 26 + index.html Google Fonts link — never use |
| `semantic.font.family.deprecated-mono` | `JetBrains Mono` | fpt-website a88e666 src/index.css md5 6b112104… lines 14, 29, 45 — replaced by IBM Plex Mono |
| `semantic.font.family.deprecated-sans` | `DIN Next LT Arabic` | fpt-website a88e666 src/index.css md5 6b112104… lines 13, 22, 26 — commercial font, not licensed, not loaded; never ship |
| `semantic.radius.logo-tile` | `22%` | the 22 % CSS clip only hid the v1 JPEG white margin; the v2 tile carries its own 20 % bottom-left corner — never clip the tile (logo v2, 30 Oct 2026) |
| `semantic.motion.float` | `floatY 4s/6s ease-in-out infinite` | fpt-website a88e666 src/index.css md5 6b112104… lines 100–106 .animate-float — floating elements DEPRECATED (parent: no floating cards) |
| `semantic.motion.pulse-dot` | `pulseDot 2s infinite` | fpt-website a88e666 src/index.css md5 6b112104… lines 108–112 .animate-pulse-dot — glow pulses DEPRECATED |
| `component.email.logo-file-120` | `withdrawn — use component.email.logo-file (the 160 × 56 card)` | CR-12 — e-mail header in clients that force dark mode (owner observation 1 Nov 2026: the paper mail turned dark in Outlook iOS / Apple Mail iOS / a second inbox app while the flattened paper header stayed a light box; «قم بما تراه مناسباً»): the header becomes an intentional rounded PAPER CARD (radius 8 CSS px, padding 12 CSS px, the paper token, transparent corners) around the unchanged EN lockup — it merges into the paper ground in light and reads as a tidy card on a forced-dark ground; plus a header-scoped [data-ogsc] rule swapping to the white lockup twin where Outlook exposes it. Measured in three simulated client modes (FPT-BRAND-V1-2-1-captures/cr12): candidate a (transparent ink) 1.0–1.25:1 unreadable on dark; candidate c (brand-red band) readable but the gradient tile on brand red is logo misuse and a fourth red role — rejected; the owner decision 1 Nov 2026 23:08 Qatar (task file FPT-BRAND-V1-2-1-20261101-231232.md § 0) item 4 + addition — the compact 120 × 42 CSS header is withdrawn: a 12 CSS px card padding cannot keep the lockup at the 24 px minimum inside 42 px; compact mails use the 160 × 56 card header (proxy decision, question in the v1.2.1 report) |
| `component.logo.tile-radius` | `22%` | the 22 % CSS clip only hid the v1 JPEG white margin; the v2 tile carries its own 20 % corner — never clip (logo v2, 30 Oct 2026) |
| `component.logo.max-lockup-print` | `20mm` | v1 JPEG limit (native 242 px); logo v2 is vector — no maximum (30 Oct 2026) |
| `component.logo.max-tile-print` | `103mm` | v1 JPEG limit (1223 px tile); logo v2 is vector — no maximum (30 Oct 2026) |
