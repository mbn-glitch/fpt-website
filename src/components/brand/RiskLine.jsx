/**
 * The fixed risk line (fiper-brand v2.3.4 — pinned 1 Nov 2026, no visual change; wording unchanged since v2.3.0, CEO 30 Oct 2026 — the ONE wording on every visual output; gate: scripts/check-risk-line.mjs):
 * «الاستثمار ينطوي على مخاطر» / "Investing involves risk". Arabic surfaces carry the Arabic line, every other locale the English one
 * (no other language version exists — PROPOSED, FPT-BRAND-ALIGN question 2). Quiet bottom placement, muted label colour, 12 px minimum,
 * never red, never hidden.
 */
export const RISK_LINE = { ar: 'الاستثمار ينطوي على مخاطر', en: 'Investing involves risk' };

export default function RiskLine({ lang = 'en', className = '' }) {
  const l = lang === 'ar' ? 'ar' : 'en';
  return (
    <p lang={l} dir={l === 'ar' ? 'rtl' : 'ltr'} data-risk-line="true" className={`m-0 text-xs text-tertiary leading-relaxed ${className}`}>
      {RISK_LINE[l]}
    </p>
  );
}
