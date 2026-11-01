# Regulatory text matrix — FPT (v1.0): which block, for which surface, entity and channel

Rule (inherited from the parent, binding): legal texts are used **verbatim from an approved source or not at all**. For FPT **no approved regulatory text exists in any input** — no entity of record, no licence, no risk warning, no jurisdiction disclaimer. Nothing is invented, generalised from the parent or paraphrased. Every surface below is a **REQUIRED DECISION — text from Amir / legal**. Until decided, templates carry the placeholder comment `<!-- REGULATORY BLOCK: REQUIRED DECISION — no approved text exists for FPT; supply from Amir/legal; never invent -->` and show nothing in its place (blank templates carry the brand line only — parent rule).

## 1. Texts observed on FPT surfaces today (read-only inputs; OBSERVED site strings — NOT approved legal texts)

| ID | Where | Text (verbatim) | Entity named | Status |
|---|---|---|---|---|
| F1 | `Footer.jsx` → `footer.copyright` | AR «© 2026 Fiper Pro Traders — شركة تابعة لـ Fiper Global. جميع الحقوق محفوظة.» · EN "© 2026 Fiper Pro Traders — A Fiper Global Company. All rights reserved." (the task file quotes an earlier state: "© 2025 Fiper Pro Traders. All rights reserved.") | "Fiper Pro Traders — A Fiper Global Company" (no legal entity, no registration) | OBSERVED — copyright line only; carried on templates as the observed footer line, marked placeholder |
| F2 | `Footer.jsx` → `footer.riskDisclosure` | AR «ينطوي تداول الحسابات التجريبية على مخاطر جسيمة. الأداء السابق لا يضمن النتائج المستقبلية. جميع الحسابات المقدمة هي حسابات تجريبية بأموال افتراضية.» · EN "Trading simulated accounts involves substantial risk. Past performance is not indicative of future results. All accounts offered are simulated accounts with virtual funds." | — | OBSERVED — a site sentence without a documented legal author; **not** reproduced on new surfaces until approved |
| F3 | `Footer.jsx` lines 7, 64–68 (`LEGAL_URL`) | Terms of Service · Privacy Policy · Cookie Policy · Refund Policy · Risk Disclosure — all five link to `https://fiper.me/legal-documentation` | points to the **parent's** (Fiper Global / fiper.me) legal page, not an FPT document | OBSERVED — entity and applicability to FPT unresolved |
| F4 | `pricing.calculator.disclaimer` | «هذه تقديرات فقط. الأداء السابق لا يضمن النتائج المستقبلية.» / "Estimates only. Past performance does not guarantee future results." | — | OBSERVED caption |
| F5 | `fptCard.note1` / `note2` | «عمليات سحب الأرباح تخضع لإجراءات الموافقة الداخلية وشروط الصرف.» · «توافر البطاقة يعتمد على حالة الحساب والأهلية.» | — | OBSERVED product notes |
| F6 | `index.html` meta, `package.json` | "Prop trading arm of Fiper Global", "A division of Fiper Global", `parentOrganization: Fiper Global (linktr.ee/fiper)` | Fiper Global (no entity) | OBSERVED descriptive copy |
| — | cTrader-credentials e-mail (live, base64 logo) | not in the inputs | unknown | NOT CAPTURED — supply the live template for review |
| — | CRM `crm.fptraders.com` | not in the inputs | unknown | NOT CAPTURED |

Parent blocks R1–R11 (`fiper-brand/brand/regulatory-matrix.md`: Fiper Markets LLC, Fiper Global LLC UAE FZ, Fiper Global MAU LTD, CFD risk warning, jurisdictions, marketing material, legal links) exist **for Fiper Global products**. Whether any of them applies to FPT, and which entity offers FPT's evaluation and funded accounts, is undocumented — they are **not** inherited and must not be pasted onto FPT surfaces by analogy.

## 2. Matrix — surface → entity → channel → status

| Surface | Channel | Entity of record | What is shown today | Interim (shipped) | Status |
|---|---|---|---|---|---|
| Marketing site (fptraders.com / fpt-website-rust.vercel.app) | web | **unknown** | F1 + F2 + F3 (links to the parent's legal page) | unchanged (no code change this session); application note flags F2/F3 | REQUIRED DECISION 1, 2, 3 |
| CRM (crm.fptraders.com): register, login, dashboard | web app | unknown | not captured | placeholder comment in the dashboard mockup foot; F1 only | REQUIRED DECISION 1, 4 |
| cTrader-credentials e-mail | e-mail | unknown | not captured (live template with base64 logo) | `templates/email/ctrader-credentials.html`: F1 line + placeholder comment; no risk text | REQUIRED DECISION 5 |
| Evaluation pass / fail e-mails | e-mail | unknown | — (under construction) | `templates/email/evaluation-pass.html`, `evaluation-fail.html`: F1 + placeholder | REQUIRED DECISION 5 |
| Payout-processed e-mail + payout statement (PDF) | e-mail · document | unknown | — | `templates/email/payout-processed.html`, `templates/document/payout-statement.html`: F1 + placeholder; «بيانات تجريبية» on figures | REQUIRED DECISION 5, 6 |
| Funded-account certificate (PDF) | document | unknown (issuer line needed) | — | `templates/document/certificate.html`: issuer line = placeholder comment; F1 | REQUIRED DECISION 6 |
| Trader agreement (PDF) | document | unknown | — | `templates/document/trader-agreement.html`: **layout only**, every clause slot = placeholder; no legal text invented | REQUIRED DECISION 7 |
| Invoice / fee receipt (PDF) | document | unknown (tax status, registration number) | — | `templates/document/invoice.html`: fee line verbatim ($280 one-time), tax row = placeholder («REQUIRED DECISION — tax / VAT treatment») | REQUIRED DECISION 8 |
| Social captions (linktr.ee/fiper, posts) | social | unknown | none | brand line only; no risk line until approved (F2 is not approved) | REQUIRED DECISION 9 |
| Video end card | video | unknown | none | tile + name + URL; no legal line | REQUIRED DECISION 9 |
| App dashboard (challenge dashboard, under construction) | web app | unknown | none | «بيانات تجريبية» chip on sample figures; no legal foot | REQUIRED DECISION 4 |
| Presentation deck | presentation | unknown | none | close slide: relationship line only | REQUIRED DECISION 9 |

## 3. Required decisions (legal / compliance owner — Amir)
1. **Entity of record for FPT** (the company that offers the evaluation and the funded account): full legal name, registration number, jurisdiction, address — the line every document and e-mail must carry.
2. **Risk statement for simulated / evaluation accounts** — whether F2 (observed site sentence) is the approved wording, and in which languages (the Arabic string must be supplied or approved, not translated by this system).
3. **Legal documents**: terms, privacy, cookies, refund, risk disclosure — FPT-specific documents and URLs, or an explicit statement that the parent's `fiper.me/legal-documentation` governs FPT (today the links point there without that statement).
4. **CRM and dashboard foot**: which line (entity, risk, © ) appears inside the authenticated app, if any.
5. **System e-mails**: which block (if any) each message type carries — credentials, evaluation pass / fail, payout, marketing; whether a risk line belongs on a security / credentials mail at all.
6. **Documents**: issuer line on certificates and statements; whether a certificate is a "statement of account status" (wording), what a payout statement must disclose.
7. **Trader agreement text** — the full contractual text in AR and EN (none exists in the inputs); the template is layout only.
8. **Invoice**: tax / VAT treatment of the one-time fee, invoicing entity, registration / tax number, refund wording (`refund: Not available` is a product fact, not a legal text).
9. **Social, video, presentation**: the minimum line per channel (proposal: none on the image, the approved risk line in the caption once it exists).
10. **"Regulated" / "licensed" / "secure" claims**: the site today says "trade in a structured environment" and "established financial infrastructure with proven broker experience" (approved badge text); any licence or regulation claim must come from decision 1.
11. **Trustpilot** (`hero.trustpilot` «Trustpilot 4.2 · ممتاز», `--color-trustpilot`): whether the rating is real and may be shown; if not, remove (it is also a statistic without source — anti-AI-tell).

## 4. Interim rendering rule (until decided)
- Templates and mockups show **only** the observed copyright line F1 (where the site shows it today) and the relationship line «جزء من Fiper Global» / "Part of Fiper Global"; the slot for the regulatory block is the HTML comment above — **nothing visible stands in for the missing text**, no lorem, no parent block, no translated F2.
- Every rendered template states in `deliverables-manifest.md` / `qa-report.md` that the regulatory block is "placeholder — pending decision".
- When texts arrive: they go verbatim into `templates/legal/` (one file per block, AR and EN as supplied), the matrix rows are updated to the block IDs, and the e-mail / document templates reference them as a visually secondary footnote after a 1 px divider in `--fpt-text-muted` at 11 px (parent rendering rule) — never above the button, never shortened.
