# REQUIRED DECISION — regulatory text for FPT (v1.0)

**No regulatory text exists for FPT. Text must be supplied by Amir/legal before any public-facing use of these templates.**

**لا يوجد نص تنظيمي لـ FPT. يجب أن يُزوَّد النص من أمير/الشؤون القانونية قبل أي استخدام عام لهذه القوالب.**

Rule (inherited from fiper-brand v2.0.0): legal texts are never invented, paraphrased, shortened or borrowed from another entity. The Fiper Global blocks (R1–R7 in the parent's `regulatory-matrix.md` — Fiper Markets LLC, Fiper Global LLC, Fiper Global MAU LTD) belong to Fiper Global products and are **not** assumed to cover FPT (the parent marks FPT as its own identity, out of its regulatory scope). Until decided, every template carries only the placeholder below, which is visibly a placeholder.

## The placeholder (verbatim, in every template)

HTML comment at the footer position:
```html
<!-- REGULATORY BLOCK — REQUIRED DECISION: no regulatory entity, licence or legal text exists for FPT in any source. Text must be supplied by Amir/legal before public use. Do not invent. -->
```
Visible muted line (dashed box, never styled as legal copy): «النص التنظيمي: بانتظار قرار» · "Regulatory text: pending decision".

## Where the placeholder sits

| Template | Position |
|---|---|
| `email/ctrader-credentials.html`, `evaluation-pass.html`, `evaluation-fail.html`, `payout-processed.html` | last element after the copyright lines, under a 1 px rule |
| `document/certificate.html` | above the page foot |
| `document/payout-statement.html` | both pages, above the page foot |
| `document/trader-agreement.html` | both pages; every clause body is an empty slot marked `<!-- LEGAL TEXT: REQUIRED DECISION -->`; parties block = `[REQUIRED DECISION]` |
| `document/invoice.html` | above the page foot; issuing entity and tax line = `REQUIRED DECISION` |
| `presentation/fpt-brand-deck.pptx` / `.html` | no legal text on slides (blank-template rule); the deck caption states SAMPLE only |
| `social/*.svg`, `video/*` | no legal text on the image/frame (parent rule: the regulatory line lives in the caption); captions are REQUIRED DECISION too |

## What the decision must supply

1. **Entity of record** for FPT (name, registration number, jurisdiction, address) — for e-mails, certificates, statements, invoices and the website footer (today: "© 2026 Fiper Pro Traders — A Fiper Global Company. All rights reserved." in `en.json footer.copyright`; the task file quotes an older "© 2025 Fiper Pro Traders. All rights reserved." — neither names an entity).
2. **Licence / registration text**, if any applies to a prop-trading evaluation business, and whether it is the same as a Fiper Global entity's or separate.
3. **Risk warning for simulated (evaluation) and funded accounts.** The only risk-related text found in any FPT source is the site string `footer.riskDisclosure` (OBSERVED at fpt-website a88e666, **not approved**, quoted verbatim, not promoted):
   - EN: "Trading simulated accounts involves substantial risk. Past performance is not indicative of future results. All accounts offered are simulated accounts with virtual funds." *(the en.json value; verify the full string in the repo before use)*
   - AR: «ينطوي تداول الحسابات التجريبية على مخاطر جسيمة. الأداء السابق لا يضمن النتائج المستقبلية. جميع الحسابات المقدمة هي حسابات تجريبية بأموال افتراضية.»
4. **Per message type**: which block (if any) a credentials mail, an evaluation result, a payout notice, a certificate, a statement and an invoice must carry; whether a tax line applies to the challenge fee and which entity invoices it.
5. **Trader agreement**: the full legal text for the six clause headings laid out in `document/trader-agreement.html` (definitions, nature of the evaluation account, evaluation rules, funded account and profit split, payouts, termination) — or a different structure.
6. **Social / video captions**: the minimum risk line per surface, and any jurisdiction exclusions.

Product facts available to legal (verbatim from the task file and `src/data/pricing.js`, not legal text): one-phase evaluation · profit target 10 % · daily drawdown 5 % · overall drawdown 9 % · 31-day limit · 5 minimum trading days in the evaluation · 10 trading days before the first payout · payouts every 14 days · activation ≈ 72 h · 80/20 profit split (fixed) · fees 10,000 → 90 · 25,000 → 160 · 50,000 → 280 · 100,000 → 540 · 200,000 → 1,070 USD, one-time, non-refundable · platform cTrader only · registration crm.fptraders.com/register.
