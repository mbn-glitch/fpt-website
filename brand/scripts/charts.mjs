// FPT reference equity chart generated from data (positions, axes, labels, target line, drawdown floors and band all computed from sample-data.mjs).
// Themes: dark (apps) | paper (documents, e-mail, slides). Returns an SVG string. Colours are the resolved FPT token values (tokens.json) — one source.
import { SAMPLE, startCents, endCents, targetCents, overallFloorCents, dailyFloorCents, fmtCents, fmtBps, profitBps } from './sample-data.mjs';
// resolved token values (kept in sync with brand/tokens.json by verify-identity: every hex below must exist in the token set)
const C = {
  dark:  { line: '#FFFFFF', text: 'rgba(255,255,255,0.55)', grid: 'rgba(255,255,255,0.07)', strong: '#FFFFFF', dot: '#F42821', target: '#2AB37A', floor: '#E8785A', band: 'rgba(232,120,90,0.12)', bench: 'rgba(255,255,255,0.55)', panel: '#141414' },
  paper: { line: '#120D0E', text: '#6B635E', grid: 'rgba(18,13,14,0.08)', strong: '#120D0E', dot: '#F42821', target: '#146A45', floor: '#A33D24', band: 'rgba(163,61,36,0.10)', bench: '#6B635E', panel: '#FFFFFF' }
};
const nice = (min, max, ticks = 4) => { const span = max - min; const raw = span / ticks; const mag = Math.pow(10, Math.floor(Math.log10(raw))); const step = [1, 2, 2.5, 5, 10].map(m => m * mag).find(s => s >= raw); const lo = Math.floor(min / step) * step, hi = Math.ceil(max / step) * step; const t = []; for (let v = lo; v <= hi + 1e-9; v += step) t.push(Math.round(v)); return t; };
export function equityChart({ theme = 'dark', width = 660, height = 220, x: ox = null, y: oy = null, lang = 'ar', fontSize = 11, padL = 58, padR = 14, padT = 16, padB = 26, showTarget = true, showFloors = true, showBand = true, showEnd = true, showStart = true, xEvery = 4, targetLabelAt = 'auto', fontFamily = 'IBM Plex Mono, IBM Plex Sans Arabic, Inter' } = {}) {
  const c = C[theme]; const data = SAMPLE.equityCents; const labels = lang === 'ar' ? SAMPLE.dayLabelsAr : SAMPLE.dayLabelsEn;
  const all = data.concat(showTarget ? [targetCents] : [], showFloors ? [overallFloorCents] : []); const ticks = nice(Math.min(...all) / 100, Math.max(...all) / 100, 4);
  const y0 = ticks[0] * 100, y1 = ticks.at(-1) * 100; const W = width - padL - padR, H = height - padT - padB; const n = data.length;
  const x = i => padL + i * (W / (n - 1)); const y = v => padT + H - (v - y0) / (y1 - y0) * H;
  const path = a => a.map((v, i) => (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1)).join(' ');
  const grid = ticks.map(t => `<line x1="${padL}" y1="${y(t * 100).toFixed(1)}" x2="${width - padR}" y2="${y(t * 100).toFixed(1)}" stroke="${c.grid}"/>`).join('');
  const yl = ticks.map(t => `<text x="${padL - 8}" y="${(y(t * 100) + 4).toFixed(1)}" text-anchor="end" fill="${c.text}">${(t / 1000).toFixed(1)}k</text>`).join('');
  const xl = labels.map((l, i) => (i % xEvery === 0 || i === n - 1) ? `<text x="${x(i).toFixed(1)}" y="${height - 6}" text-anchor="${i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle'}" fill="${c.text}">${l}</text>` : '').join('');
  // drawdown band: between the moving daily floor (5 % under the previous close) and the static overall floor (9 % under the start)
  const band = showBand ? `<path d="${path(dailyFloorCents)} L${x(n - 1).toFixed(1)} ${y(overallFloorCents).toFixed(1)} L${x(0).toFixed(1)} ${y(overallFloorCents).toFixed(1)} Z" fill="${c.band}" stroke="none"/>` : '';
  const floors = showFloors ? `<path d="${path(dailyFloorCents)}" fill="none" stroke="${c.floor}" stroke-width="1" stroke-dasharray="2 3"/><line x1="${padL}" y1="${y(overallFloorCents).toFixed(1)}" x2="${width - padR}" y2="${y(overallFloorCents).toFixed(1)}" stroke="${c.floor}" stroke-width="1.5" stroke-dasharray="4 4"/>` : '';
  // target label: at the start edge when the end value sits within 16 px of the target line (the sample case), else at the end edge
  const tAtStart = targetLabelAt === 'start' || (targetLabelAt === 'auto' && showEnd && Math.abs(y(targetCents) - y(endCents)) < 16);
  const target = showTarget ? `<line x1="${padL}" y1="${y(targetCents).toFixed(1)}" x2="${width - padR}" y2="${y(targetCents).toFixed(1)}" stroke="${c.target}" stroke-width="1.5" stroke-dasharray="4 4"/><text x="${tAtStart ? padL + 4 : width - padR}" y="${(y(targetCents) - 5).toFixed(1)}" text-anchor="${tAtStart ? 'start' : 'end'}" fill="${c.target}" font-weight="600">${fmtCents(targetCents)}</text>` : '';
  const bench = `<line x1="${padL}" y1="${y(startCents).toFixed(1)}" x2="${width - padR}" y2="${y(startCents).toFixed(1)}" stroke="${c.bench}" stroke-width="1" stroke-dasharray="1 3"/>`;
  const endLabel = showEnd ? `<circle cx="${x(n - 1).toFixed(1)}" cy="${y(endCents).toFixed(1)}" r="3.5" fill="${c.dot}"/><text x="${(x(n - 1) - 8).toFixed(1)}" y="${(y(endCents) - 9).toFixed(1)}" text-anchor="end" fill="${c.strong}" font-weight="600">${fmtCents(endCents)}</text>` : '';
  const startLabel = showStart ? `<text x="${(x(0) + 6).toFixed(1)}" y="${(y(startCents) + 14).toFixed(1)}" fill="${c.text}">${fmtCents(startCents)}</text>` : '';
  return `<svg viewBox="0 0 ${width} ${height}" ${ox !== null ? `x="${ox}" y="${oy}" width="${width}" height="${height}"` : 'width="100%"'} font-family="${fontFamily}" font-size="${fontSize}" direction="ltr" role="img" aria-label="sample equity curve, ${SAMPLE.periodLabel.en}, USD, end ${fmtCents(endCents)} (${fmtBps(profitBps)})" data-chart="sample-fpt-50k-evaluation">${band}${grid}${yl}${xl}${bench}${floors}${target}<path d="${path(data)}" fill="none" stroke="${c.line}" stroke-width="2"/>${startLabel}${endLabel}</svg>`;
}
// Replace <!--CHART:{json}--> … <!--/CHART--> markers in a file with a generated chart (idempotent)
export function injectCharts(html) { return html.replace(/<!--CHART:(\{[\s\S]*?\})-->[\s\S]*?<!--\/CHART-->/g, (m, j) => `<!--CHART:${j}-->${equityChart(JSON.parse(j))}<!--/CHART-->`); }
