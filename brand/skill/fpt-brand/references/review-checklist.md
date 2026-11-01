# Review checklist pointer — FPT Brand v1.0

Run, in this order, before claiming any FPT surface done:
1. `node brand/scripts/verify-identity.mjs src public` (or the paths you touched) → `→ PASS` — covers colours, deprecated and parent values, fonts, tracking, mono-on-label, red glow, glass, float / pulse, retyped wordmark, MT4 / MT5, ISO, emoji, gradients, raw mail URLs.
2. `brand/checklists/brand-review.md` § A — the 28 tells (binding) — and § B composition questions, answered in writing.
3. `brand/checklists/pre-launch.md` — 52 yes/no items (identity gates 1–38, FPT gates 39–52) with the test for each.
4. `brand/checklists/per-surface.md` — the table for your surface (site, CRM, dashboard, e-mails, documents, presentation, social, video, AI visuals).
5. Contrast for any new colour pair: add it to `PAIRS` in `brand/scripts/contrast.mjs` and run `node brand/scripts/contrast.mjs` → PASS (`./checks/contrast.json`).
6. Arabic fonts actually used: `node scripts/check-arabic-elements.mjs <html>` (build repo) / DevTools Rendered Fonts → IBM Plex Sans Arabic only; PDFs: `python3 brand/scripts/check-pdf-fonts.py file.pdf` → PASS.
7. Units: `node brand/scripts/check-units.mjs --ref=page.html page.html file.pdf` → PASS at 320 / 360 / 390 px.
8. E-mails: html-validate 0 errors, paper in every mode (no dark-scheme rule, colour scheme light only, the paper header `email-header-160-paper@2x.png`), 360 px light + Chromium dark-emulation screenshots both on the paper ground, zero raw URLs in visible text, foot in the message language only ≥ 12 px; real clients written as NOT TESTED (`brand/templates/email/TEST-MATRIX.md`).
9. Regulatory: the surface's row in `brand/regulatory-matrix.md` acknowledged; the placeholder comment present; nothing invented; no "regulated / licensed" wording.
10. Facts: every product figure matches `brand/glossary.md` § 3; every other figure is from `brand/scripts/sample-data.mjs` and SAMPLE-chipped; cTrader only.
11. Values you added that are not in `brand/value-sources.md` → list them as PROPOSED in your report with the reason (and register new AR/EN strings in `sources/strings/*.json` so `glossary.md` § 7 picks them up).
12. Visual review by a human against § A (a blocklist pass is not proof); initials + date in the release note. Report failures plainly; never call a surface ready with an open fail.
