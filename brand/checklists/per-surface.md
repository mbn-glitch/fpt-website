# Per-surface checklist — FPT Brand v1.0 (what to check on each surface, with the command or evidence)

Every surface runs the identity gates (`pre-launch.md` 1–38) first; the tables below add what is specific. Pole = composition pole (README § F). "Evidence" = the file a reviewer opens.

## 1. Marketing site (fptraders.com — fpt-website)
| Check | Rule | Command / evidence |
|---|---|---|
| Pole | headline-dominant hero: one Arabic headline, the verbatim badge, one primary CTA; no red stat row, no `gradient-text` | screenshot 390 px AR + EN |
| Navbar | `fpt-lockup-horizontal-en-white.svg` at tile height 46 px (no clip, no typed name) + relationship line 11 px `.06em` label colour; header fill `--fpt-ground-chrome` + blur 14 (not `rgba(0,0,0,.7)`) | inspect `Navbar.jsx` styles |
| Challenge section | five sizes as a ruled list / cards, size mono 28 px, fee second, $50,000 selected (red 1 px border) + «الأكثر شعبية» label; no gold badge, no gradient border | `grep -rn "D4AF37\|gradient-border" src/` → 0 |
| Rules section | rule rows (label + value as `.fpt-unit`), no red icons in tiles, values verbatim | diff against `glossary.md` § 3 |
| Platform section | cTrader official mark + real cTrader media-kit screens inside the bezel; no MT4 / MT5 | `grep -rniE "mt4\|mt5" src/` → 0 |
| Trust bar / stories / Trustpilot | removed or sourced (REQUIRED: evidence) | `grep -rnE "K\+\|M\+\|Trustpilot" src/` reviewed |
| Footer | lockup rule (tile + text on dark), `footer.partOf` verbatim, legal links = REQUIRED DECISION 3 (today → parent page), no emoji | `grep -rn "emoji=" src/` → 0 |
| Fonts | self-hosted `brand/fonts/fonts.css`; no Google Fonts; Arabic → IBM Plex Sans Arabic; numbers → IBM Plex Mono | `node scripts/check-arabic-elements.mjs` → 0 offenders |
| Favicon / OG | `brand/logos/icons/*` + `brand/logos/derived/og-1200x630-ar.png` / `og-1200x630-en.png` wired (CR-05; the old `og-1200x630.png` is superseded) | `curl -I /favicon.ico /favicon-32.png /og-1200x630-ar.png /og-1200x630-en.png` → 200; OLD-OG-IMAGE = 0 |
| Gate | `node brand/scripts/verify-identity.mjs src public` → PASS; `verify-skill-wired` PASS | CI log |

## 2. CRM (crm.fptraders.com) — register, login, account
| Check | Rule | Command / evidence |
|---|---|---|
| Ground / header | dark only; app header 56–64 px with the 32 px tile + name; one primary action per screen | screenshot 390 px |
| Forms | inputs 44 px, 16 px text (CR-06), `--fpt-line-input` border, label above, error sentence under the field (`--fpt-state-danger`), OTP boxes mono LTR | submit empty → first error focused |
| Register CTA | `https://crm.fptraders.com/register` is the primary action; pricing / fee shown as `.fpt-unit` with `USD` | inspect |
| Legal foot | REQUIRED DECISION 4 — placeholder; no invented entity | review the matrix row |
| Not captured | the live CRM is not in the inputs: align the live screens with `mockups/02-challenge-selector` and `03-challenge-dashboard` | — |

## 3. Challenge dashboard (under construction)
| Check | Rule | Command / evidence |
|---|---|---|
| Pole | number-dominant: equity `55,312.50 USD` (`.fpt-figure--hero`, mono 600, text colour) + delta word / sign / colour; one hero figure | `mockups/03-challenge-dashboard/` screenshots |
| Chart | generated from `sample-data.mjs` (`data-chart="sample-fpt-50k-evaluation"`): equity line text colour, target dashed success, daily floor dotted + overall floor dashed loss, band, start-balance benchmark, red current dot; title, period, currency, end value stated | `grep data-chart` |
| Rule rows | target / daily drawdown / overall drawdown / trading days / time limit as ruled rows with progress bars; warning at ≥ 80 % (`--fpt-finance-drawdown` + icon + word), breach = danger + rule named | render 10 / 80 / 100 % states |
| States | in evaluation · passed · not passed (reason) · funded (brand badge) · activation pending (≈ 72 h) · payout pending / processed | each badge = word + icon + colour |
| Data | every figure SAMPLE-chipped until real; zero ≠ missing | review |
| Gate | units unbroken at 320 / 360 / 390 (`check-units`); contrast of every state (`contrast.mjs` PAIRS) | logs |

## 4. System e-mails (cTrader credentials, evaluation pass / fail, payout processed)
| Check | Rule | Command / evidence |
|---|---|---|
| Ground / logo | paper `#F7F4F1`, card `#FFFFFF`, official lockup flattened on the paper token as base64 PNG @2x at 160 × 56 CSS (`logos/derived/email-header-160-paper@2x.png`); **paper in every mode** — colour scheme light only, no `prefers-color-scheme` / `[data-ogsc]` rule, no dark tile; the superseded white-box header is refused (`check-emails`, OLD-EMAIL-HEADER) | `dist/checks/email/*-360-{light,dark}.png` (the ground is `#F7F4F1` in both) |
| Composition | one headline that says what happened → one paragraph → facts card (login · server · platform / target reached · end equity / breached rule / payout amount · share · method) → ONE button (link only under it) → relationship line → regulatory placeholder | open each template |
| Numbers | `.fpt-unit` inline styles (mail clients ignore classes); currency code; `−` U+2212 | grep the HTML |
| URLs | zero raw URLs in visible text; `href` only on the button | `python3` raw-URL check in `TEST-MATRIX.md`; verify-identity RAW-URL-IN-MAIL-TEXT = 0 |
| Validity | html-validate (`brand/templates/.htmlvalidate.json`) 0 errors | `node scripts/check-templates.mjs` |
| Clients | Gmail / Outlook / Apple Mail NOT TESTED until evidence (client, version, screenshot) | `templates/email/TEST-MATRIX.md` |
| Legal | REQUIRED DECISION 5 — placeholder; the live credentials mail is not captured: align before sending | matrix row |

## 5. Documents (certificate, payout statement, trader agreement, invoice)
| Check | Rule | Command / evidence |
|---|---|---|
| Ground / logo | paper; stacked or horizontal lockup 8 mm top-start; margins 17 mm (2 × lockup); meta foot (reference · date · «جزء من Fiper Global» · SAMPLE) | `dist/checks/document/*.png` |
| Pole | certificate = headline-dominant («حساب ممول»); statement = number-dominant (trader share); agreement = headline + clause layout; invoice = facts table | review |
| Fonts | brand fonts only inside the PDF | `python3 brand/scripts/check-pdf-fonts.py dist/checks/document/*.pdf` → PASS |
| Units | amounts, dates, references unbroken in the PDF text | `check-units.mjs --ref=… file.pdf` |
| Legal | certificate issuer line, agreement text, invoice tax / entity = REQUIRED DECISIONS 6–8; placeholders only; `refund: Not available` is a product fact | matrix rows |
| Print | office print only; press-ready NOT PROVIDED (CMYK, bleed) | `templates/document/PRINT-SPEC.md` |

## 6. Presentation (PPTX + HTML reference)
| Check | Rule | Command / evidence |
|---|---|---|
| Layouts | cover (dark, tile), section, content (paper), stats (one figure per slide, mono, text colour, gain semantics never red), close (relationship line) | `dist/checks/editables/*.png` (HTML reference) |
| Type | body ≥ 26 px at 1920; Arabic Plex Arabic; numbers mono | inspect |
| Native | PPTX opens with masters / layouts (structure verified by unzip); visual render NOT TESTED (no Office here) | `qa-report.md` |

## 7. Social (1080², 1080×1350, 1080×1920, 1200×630)
| Check | Rule | Command / evidence |
|---|---|---|
| Readability | essential body ≥ 42 px on 1080 (≈ 14 px at 360); headline one line of Arabic; logo 6 % of frame; safe zones per `social-rules.md` | export at 100 % + 360 px wide check |
| Content | one figure (`$50,000`, `80 %`) or one headline per post; product facts verbatim; SAMPLE chip on any non-fact figure; no payout totals, no testimonials | review |
| Logo | tile + name on dark posts; horizontal lockup on paper posts; relationship line | review |
| Legal | caption line = REQUIRED DECISION 9; nothing on the image | matrix row |
| Fonts at export | brand fonts loaded when the SVG is rasterised | export log |

## 8. Video (9:16, 16:9)
| Check | Rule | Command / evidence |
|---|---|---|
| Safe areas | `templates/video/safe-areas.svg`: title-safe 90 %, action-safe 95 %; tile 96 px at the top-start inside the safe area | overlay the SVG on a frame |
| Lower third | `lower-third.svg`: name + title + tile; Plex Arabic / Inter; slides in 300 ms, out 150 ms, easing `.22,1,.36,1` | `templates/video/sample.*` |
| End card | `end-card.html`: tile + name + `fptraders.com` + relationship line; 3 s hold; no legal line until decision 9 | play it |
| Captions | ≥ 48 px on 1080 w, dark scrim `rgba(10,10,10,.72)`, Plex Arabic | review |
| Codec | sample H.264 MP4 (or VP9 WebM); native NLE template NOT PROVIDED | `deliverables-manifest.md` |

## 9. AI-generated visuals (Higgsfield)
| Check | Rule | Command / evidence |
|---|---|---|
| Prompt | environment only (README § M); never the tile, screens, charts, faces, the Fiper Card, the cTrader mark | prompt log |
| Output | ground not pure black; one red accent; no text artefacts; real asset composited afterwards with clear space | review the composite |
