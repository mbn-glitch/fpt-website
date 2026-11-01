# Brand review — FPT Brand v1.0 (reviewer checklist; fail = block)

Used by the human reviewer on every FPT surface before release, after the automated gates (`node brand/scripts/verify-identity.mjs …` → PASS, `contrast.mjs` PASS, `check-units`, `check-arabic-elements`, `check-pdf-fonts.py`). A passing blocklist is not proof: answer every question by looking at the rendered surface at its real size (390 px phone, A4 at 100 %, social export at 100 % and at 360 px wide). Reviewer initials + date go in the release note.

## A. Anti-AI-tells (binding — parent list + FPT additions; the number in brackets is the detection)
| # | Tell (never) | Rule | Detect |
|---|---|---|---|
| 1 | Pure `#000` ground, black scrim | `#0A0A0A` ground; `rgba(10,10,10,.85)` header | verify-identity PURE-BLACK = 0 |
| 2 | Monospace outside the hero amount / identifiers / dense tables (labels, headings, table headers, amounts inside sentences, lists or chips) | mono only in `.fpt-figure__value` / `.fpt-num` / `td.fpt-td-num` / `code` / OTP / logins; `.fpt-unit` in running text = text font, tabular (CR-01) | MONO-ON-LABEL = 0; UX gate `monoShare` ≤ 5 % per screen, 0 Arabic letters in mono |
| 3 | Brand red for losses, decoration, small labels, numbers for emphasis, gradient text | red = tile · primary action · active state | render a loss → `#E8785A`; `grep gradient-text` → 0 |
| 4 | ISO timestamps | human date + zone | ISO-TIMESTAMP-IN-DISPLAY = 0 |
| 5 | Purple / neon / multi-colour gradients, gradient borders | one gradient: the primary button `135deg #F42821 → #A30100`; the tile keeps its own | NON-BRAND-GRADIENT = 0; `grep gradient-border` → 0 |
| 6 | Glow, halo, neon, radial red washes, sparkles, pulsing dots | none anywhere (`--fpt-c-button-primary-shadow: none`) | RED-GLOW, FLOAT-ANIMATION = 0; `grep radial-red` → 0 |
| 7 | Hype emoji, Unicode symbols as icons | Lucide only; ✓ / ✕ only as text marks in sentences | EMOJI = 0; UNICODE-SYMBOL-ICON reviewed |
| 8 | Stock "trader at a desk", AI faces, abstract waves, circuit grids, coded fake dashboards as product shots | official cTrader screens, the Fiper Card artwork, the brand ground; every graphic carries information | look at every image |
| 9 | Letter-spaced Arabic; Latin caps beyond `.06em` (`.2em` relationship line, `.15em` badge) | Arabic ls 0; Latin ≤ `.06em` | ARABIC- / LATIN-LETTER-SPACING = 0 |
| 10 | Invented statistics, ratings, testimonials, payout totals (125K+, $150M+, Trustpilot 4.2, six trader quotes) | only task-file facts or SAMPLE-chipped figures; no performance claims | review every literal |
| 11 | Synthetic bold / italic Arabic | real weights, `font-synthesis: none` | inspect |
| 12 | Glossy 3D icons, icon fonts, duotone, red icon tiles | Lucide line icons, `currentColor`, no tiles in apps | review |
| 13 | Walls of centred text, decorative dividers, "✨ Premium" / "🔥" labels | start-aligned, hairline rules, plain labels | review |
| 14 | Floating / tilting cards, parallax, hover-grow buttons | nothing floats; press .98 only | `grep animate-float\|hover:scale` → 0 |
| 15 | Futuristic / decorative / "tech" fonts, DIN Next, Cairo | IBM Plex Sans Arabic · Inter · Barlow Condensed (display, decision 1) · IBM Plex Mono (numbers) | NON-BRAND-FONT = 0 |
| 16 | One template for everything (box around every block, equal tiles, tiny labels) | composition varies by pole; cards only where justified | compare 3+ surfaces side by side |
| 17 | Modified logo (recoloured tile, gradient flattened outside flat / ink / white, ink lockup on dark, retyped "FPT", clipped tile, a `legacy-v1/` JPEG) | logo v2 masters only: white lockups on dark, ink lockups on paper, small cut ≤ 32 px | RETYPED-WORDMARK = 0; LEGACY-LOGO-REFERENCE = 0; `sha256sum -c logos/source/checksums.sha256` |
| 18 | Financial red for emphasis; a gain in red | ▲ word green / ▼ word coral; drawdown warning amber | render a gain |
| 19 | "Tested in Gmail / Outlook", "press-ready", "regulated" claims without evidence | NOT TESTED / NOT PROVIDED / REQUIRED DECISION written plainly | read the claim; demand the evidence path |
| 20 | Calling a surface on-brand because the blocklist passed | this review, by a human, every time | initials + date |
| 21 | Slash label prefix, decorative numbering, technical eyebrows | labels only where they name a value | `grep -rnE "(^\|>)\s*//\s*[^/ ]"` → 0 |
| 22 | Box around everything | a box groups or bounds an action, nothing else | count boxes, name each job |
| 23 | Relabelled chart | generated from `sample-data.mjs` (`data-chart`) | compare labelled values with the dataset |
| 24 | `%` / currency / «من 31» separated from its number in Arabic | `.fpt-unit` | `check-units` PASS |
| 25 | Social body unreadable at phone size | ≥ 42 px on 1080 | open at 360 px wide |
| 26 | Gold "MOST POPULAR" badge, glass cards, hero glow, pulsing eyebrow dot (FPT site treatments) | label text + selected border; panel + 1 px border; nothing pulses | `grep D4AF37\|\.glass\|animate-pulse-dot` → 0 |
| 27 | MT4 / MT5 anywhere | cTrader only | MT5-REFERENCE = 0 |
| 28 | Parent values on an FPT surface (`#DC2626`, `#0A0708`, the Fiper lockup larger than the FPT tile, "by Fiper") | FPT tokens; "Part of Fiper Global" | PARENT-VALUE-ON-FPT-SURFACE = 0 |

## B. Composition questions (answer in writing for each surface)
1. Which ground? Dark (site, apps, dashboard, dark social, video) or paper (documents, e-mail, certificates, statements, slides)? An app on paper = fail.
2. Which pole — headline, number or image — and what is the one dominant element? Two dominant elements = fail; none = template.
3. Where is the logo and what is the margin? Tile (dark) / lockup (paper) top-start; margin = 2 × logo height for the medium; one vertical start line.
4. Name every box and its job (facts card, chart frame, challenge card, sheet). A box without a job = fail.
5. Where is red? Tile, the one primary action, the active state — list the three; any fourth red = fail.
6. Where are the finance semantics? Every gain / loss / drawdown / breach / pending state shows word + sign or icon + colour.
7. Is every number a product fact (task file) or SAMPLE-chipped? Is every amount with its currency code and unbreakable?
8. Does the Arabic read as the primary language (Plex Arabic 700 headline, 1.9 body, ls 0, Latin digits, `<bdi>` around FPT / cTrader / USD)? Does the English twin exist?
9. Is the supporting text at the medium's floor (FPT app screens: body 16 px on the five-step ladder 13 · 16 · 18 · 22 · 32, 13 px only on icons / badges / metric labels / the currency code — CR-06; A4 14 px, social ≥ 42 px / 1080, slides ≥ 26 px) rather than shrunk? Is every delete / cancel / reject an outline or text button with an icon, filled only inside its confirmation dialog (CR-07)?
10. Is the regulatory slot a placeholder comment (nothing invented) and is the surface's row in `regulatory-matrix.md` acknowledged?
11. Platform: cTrader only; real cTrader screens; no MT4 / MT5.
12. Does the surface look like FPT at a glance — red tile, near-black ground, white text, one red action — and not like a generic trading template? If you cannot say why it is FPT without the logo, it is a template.

## C. Sign-off
| Surface | Reviewer | Date | Gates (PASS/FAIL) | Open REQUIRED DECISIONS acknowledged | Result |
|---|---|---|---|---|---|
| | | | | | |
