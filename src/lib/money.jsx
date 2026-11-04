/**
 * The ONE money format of the site (RD2 rule 3.4 / F-007 / F-069 — owner 4 Nov 2026, platform decision 14): Latin digits, thousands separator,
 * ONE no-break space, then the currency code — «50,000 USD» in every language — never the code before the number, never a double space.
 * Two forms:
 *   formatMoney(amount, code)   → a STRING for interpolation into sentences and translations; wrapped in Unicode isolates (U+2066 … U+2069)
 *                                 so an Arabic sentence never flips it to «USD 50,000» (the same device as the platform's plain text).
 *   <Money amount code />        → the standalone figure: <bdi class="fpt-unit"> (tabular digits, LTR, isolated, unbreakable).
 *   renderUnits(text)           → wraps every «1,250 USD» / «80 %» run of a prose string (help answers) in <bdi class="fpt-unit-text">.
 * Percentages: formatPercent(bps) → «80 %» with the same no-break space.
 */
const NBSP = ' ';
const LRI = '⁦';
const PDI = '⁩';
const num = (n, fraction) => Number(n).toLocaleString('en-US', { minimumFractionDigits: fraction ?? 0, maximumFractionDigits: fraction ?? 0 });

/** «280 USD» as text (isolated); `fraction` = decimals (default: 0 for integers, 2 otherwise). */
export function formatMoney(amount, code = 'USD', fraction) {
  const f = fraction ?? (Number.isInteger(Number(amount)) ? 0 : 2);
  return `${LRI}${num(amount, f)}${NBSP}${code}${PDI}`;
}
/** The signed form for deltas: «+3,077 USD» / «−486.00 USD» (U+2212 minus). */
export function formatSignedMoney(amount, code = 'USD', fraction = 2) {
  const sign = amount < 0 ? '−' : '+';
  return `${LRI}${sign}${num(Math.abs(amount), fraction)}${NBSP}${code}${PDI}`;
}
/** «80 %» from basis points. */
export const formatPercent = (bps) => `${(bps / 100).toLocaleString('en-US', { maximumFractionDigits: 2 })}${NBSP}%`;

const SPLIT_RE = /^([+\u2212−-]?[\d,]*(?:\.\d+)?)[ \u00a0](USD|EUR|AED|%)$/;
/** A standalone figure («50,000 USD», «80 %», «1:100», «10»): digits in the mono unit, the code / % in the TEXT font at .72em after ONE no-break space —
 *  the platform's `Money` shape (design-system § Money, F4B CR-01), so the mono space never reads as a double space (RD2 F-069). Accepts the
 *  strings of formatMoney / formatPercent / usd / pct (isolates stripped) or any other unit text. */
export function Unit({ children, className = '', as: Tag = 'bdi' }) {
  const raw = String(children ?? '').replace(/[\u2066\u2069]/g, '');
  const m = SPLIT_RE.exec(raw);
  return (
    <Tag className={`fpt-unit ${className}`}>
      {m ? <>{m[1]}<span className="fpt-unit__code">{NBSP}{m[2]}</span></> : raw}
    </Tag>
  );
}
/** The standalone money figure. */
export function Money({ amount, code = 'USD', fraction, className = '' }) {
  return <Unit className={className}>{formatMoney(amount, code, fraction)}</Unit>;
}

const UNIT_RE = /([+−−-]?\d[\d,]*(?:\.\d+)?[  ]?(?:USD|EUR|AED|%))/g;
/** Prose with amounts / percentages → React nodes with each unit isolated (text font, tabular digits). */
export function renderUnits(text) {
  if (typeof text !== 'string' || !UNIT_RE.test(text)) return text;
  UNIT_RE.lastIndex = 0;
  const parts = text.split(UNIT_RE);
  return parts.map((p, i) => (i % 2 === 1 ? <bdi key={i} className="fpt-unit-text">{p.replace(/[ ]+(USD|EUR|AED|%)$/, `${NBSP}$1`)}</bdi> : p));
}
