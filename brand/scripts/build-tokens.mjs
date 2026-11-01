// FPT Brand Identity System v1.0 — tokens.json (DTCG 2025.10, primitive → semantic → component) → brand/tokens.css + brand/tailwind.preset.js
// Run from the folder that contains brand/ (repo root or the unzipped package parent): node brand/scripts/build-tokens.mjs
// Variable names: semantic.<group>.<path> → --fpt-<path without 'color'> ; component.<x> → --fpt-c-<x> ; primitive → --fpt-p-<x>
// Tokens flagged $extensions["fpt.observed-only"] (site glow, .2em tracking, hover scale …) are documentation only:
//   emitted as --fpt-observed-* variables and EXCLUDED from the Tailwind preset. Deprecated tokens and parent reference-only values are never emitted.
// Dark is canonical and the ONLY app theme. semantic.color.paper.* are emitted as --fpt-paper-* (document / e-mail / print ground), not as a theme switch.
import fs from 'node:fs'; import path from 'node:path';
const BRAND = fs.existsSync('brand/tokens.json') ? 'brand' : path.join(path.dirname(new URL(import.meta.url).pathname), '..');
const T = JSON.parse(fs.readFileSync(path.join(BRAND, 'tokens.json'), 'utf8'));
const get = p => p.split('.').reduce((o, k) => o?.[k], T);
const resolveRef = v => typeof v === 'string' ? v.replace(/\{([^}]+)\}/g, (_, p) => { const n = get(p); if (!n || !('$value' in n)) throw new Error('unresolved reference ' + p); return resolveRef(n.$value); }) : v;
const flat = (node, path = [], out = []) => { for (const [k, v] of Object.entries(node)) { if (k.startsWith('$')) continue; if (v && typeof v === 'object' && '$value' in v) out.push({ path: [...path, k], value: v.$value, raw: v }); else if (v && typeof v === 'object') flat(v, [...path, k], out); } return out; };
const all = flat(T);
const status = t => t.raw.$extensions?.['fpt.status'] || 'alias';
const observedOnly = t => !!t.raw.$extensions?.['fpt.observed-only'];
const referenceOnly = t => !!t.raw.$extensions?.['fpt.reference-only'] || t.path.includes('parent-ref');
const css = v => Array.isArray(v) ? (typeof v[0] === 'number' ? `cubic-bezier(${v.join(',')})` : v.map(f => /\s/.test(f) ? `'${f}'` : f).join(', ')) : v;
export const varName = p => { const [layer, ...rest] = p; if (layer === 'primitive') return '--fpt-p-' + rest.slice(1).join('-'); if (layer === 'component') return '--fpt-c-' + rest.join('-'); const r = rest[0] === 'color' ? rest.slice(1) : rest[0] === 'elevation' ? ['z', ...rest.slice(1)] : rest; return '--fpt-' + r.join('-'); };
const nameOf = t => observedOnly(t) ? varName(t.path).replace(/^--fpt-/, '--fpt-observed-') : varName(t.path);
const usable = all.filter(t => status(t) !== 'deprecated' && t.path[1] !== 'deprecated' && !referenceOnly(t));
let out = `/* FPT Brand Identity System v1.0 — tokens.css (GENERATED from brand/tokens.json, DTCG 2025.10; do not edit by hand)\n   Child of fiper-brand v2.0.0 ($extensions.fpt.parent-pin). Layers: --fpt-p-* primitives · --fpt-* semantic roles · --fpt-c-* component tokens ·\n   --fpt-observed-* = fpt-website observations kept for documentation, never to be used (verify-identity whitelists only these lines).\n   Dark is canonical and the only app theme. --fpt-paper-* = the paper ground for documents, e-mail and print (a composition ground, not a theme).\n   Status of every value (approved / observed / inherited / proposed / deprecated): tokens.json $extensions.fpt.status */\n:root{\n`;
const emit = t => `  ${nameOf(t)}: ${css(resolveRef(t.value))};${status(t) === 'proposed' ? ' /* PROPOSED */' : observedOnly(t) ? ' /* OBSERVED ONLY — not applied */' : ''}\n`;
out += '  /* primitives */\n'; for (const t of usable.filter(t => t.path[0] === 'primitive')) out += emit(t);
out += '  /* semantic */\n'; for (const t of usable.filter(t => t.path[0] === 'semantic')) out += emit(t);
out += '  /* component */\n'; for (const t of usable.filter(t => t.path[0] === 'component')) out += emit(t);
out += `  /* short aliases used by components.css */\n  --fpt-bg: var(--fpt-ground-bg); --fpt-surface: var(--fpt-ground-panel); --fpt-surface-2: var(--fpt-ground-coal); --fpt-surface-3: var(--fpt-ground-elevated);\n  --fpt-line: var(--fpt-line-ash); --fpt-fg: var(--fpt-text-primary); --fpt-fg-2: var(--fpt-text-secondary); --fpt-fg-muted: var(--fpt-text-muted);\n  --fpt-primary: var(--fpt-brand-red); --fpt-primary-fg: var(--fpt-text-on-brand);\n  --fpt-red-as-text: var(--fpt-brand-red);\n  --fpt-font-ui: var(--fpt-font-family-body); --fpt-font-heading: var(--fpt-font-family-display);\n  color-scheme: dark;\n}\n`;
out += `:root[dir="rtl"], :root[lang="ar"], [lang="ar"]{ --fpt-font-ui: var(--fpt-font-family-arabic); --fpt-font-heading: var(--fpt-font-family-arabic); }\n`;
out += `/* Paper ground — documents, e-mail, print (composition rule; NOT an app light mode — FPT apps are dark only). Apply .fpt-paper on the document root. */\n.fpt-paper{\n`;
const Pp = T.semantic.color.paper; const map = { bg: 'ground-bg', panel: 'ground-panel', frame: 'ground-frame', text: 'text-primary', muted: 'text-muted', ash: 'line-ash', 'line-strong': 'line-strong', 'line-input': 'line-input', success: 'state-success', danger: 'state-danger', warning: 'state-warning', info: 'state-info', 'chart-grid': 'chart-grid', 'disabled-fg': 'action-disabled-fg', 'disabled-bg': 'action-disabled-bg', 'brand-wash': 'brand-red-wash' };
for (const [k, v] of Object.entries(Pp)) { if (k.startsWith('$')) continue; if (map[k]) out += `  --fpt-${map[k]}: ${resolveRef(v.$value)};\n`; }
out += `  --fpt-ground-coal: ${resolveRef(Pp.frame.$value)}; --fpt-ground-elevated: ${resolveRef(Pp.panel.$value)}; --fpt-text-secondary: ${resolveRef(Pp.text.$value)}; --fpt-text-label: ${resolveRef(Pp.muted.$value)};\n  --fpt-red-as-text: ${resolveRef(Pp['red-text'].$value)};\n  --fpt-finance-gain: ${resolveRef(Pp.success.$value)}; --fpt-finance-loss: ${resolveRef(Pp.danger.$value)}; --fpt-finance-drawdown: ${resolveRef(Pp.warning.$value)}; --fpt-finance-pending: ${resolveRef(Pp.warning.$value)}; --fpt-finance-target: ${resolveRef(Pp.success.$value)}; --fpt-finance-neutral: ${resolveRef(Pp.muted.$value)};\n  --fpt-chart-series-1: ${resolveRef(Pp.text.$value)}; --fpt-chart-axis: ${resolveRef(Pp.muted.$value)}; --fpt-chart-benchmark: ${resolveRef(Pp.muted.$value)}; --fpt-chart-target: ${resolveRef(Pp.success.$value)}; --fpt-chart-floor: ${resolveRef(Pp.danger.$value)}; --fpt-chart-candle-up: ${resolveRef(Pp.success.$value)}; --fpt-chart-candle-down: ${resolveRef(Pp.danger.$value)};\n  --fpt-shadow-overlay: 0 22px 70px rgba(18,13,14,0.18);\n  --fpt-c-input-fill: ${resolveRef(Pp.panel.$value)}; --fpt-c-table-header-fill: ${resolveRef(Pp.frame.$value)}; --fpt-c-toast-fill: ${resolveRef(Pp.panel.$value)}; --fpt-c-sheet-fill: ${resolveRef(Pp.panel.$value)}; --fpt-c-chart-background: ${resolveRef(Pp.panel.$value)}; --fpt-c-card-fill: ${resolveRef(Pp.panel.$value)};\n  --fpt-bg: var(--fpt-ground-bg); --fpt-surface: var(--fpt-ground-panel); --fpt-surface-2: var(--fpt-ground-coal); --fpt-surface-3: var(--fpt-ground-elevated); --fpt-line: var(--fpt-line-ash); --fpt-fg: var(--fpt-text-primary); --fpt-fg-2: var(--fpt-text-secondary); --fpt-fg-muted: var(--fpt-text-muted);\n  color-scheme: light;\n}\n`;
out += `/* base */\nhtml{background:var(--fpt-bg);color:var(--fpt-fg);font-family:var(--fpt-font-ui);line-height:var(--fpt-font-lineHeight-body);-webkit-font-smoothing:antialiased;font-synthesis:none}\n[lang="ar"]{line-height:var(--fpt-font-lineHeight-arabic-body);letter-spacing:0}\n.fpt-num,[data-num]{font-family:var(--fpt-font-family-mono);font-variant-numeric:tabular-nums lining-nums;direction:ltr;unicode-bidi:isolate;white-space:nowrap}\n::selection{background:var(--fpt-brand-selection-bg);color:var(--fpt-text-selection)}\n:focus-visible{outline:2px solid var(--fpt-action-focus-ring);outline-offset:2px}\n@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition-duration:1ms!important}}\n/* unbreakable numeric units inside Arabic text: amount+currency, sign+number+percent, date parts (parent rule) */\n.fpt-unit,.unit{display:inline-block;white-space:nowrap;direction:ltr;unicode-bidi:isolate;font-family:var(--fpt-font-family-mono);font-variant-numeric:tabular-nums}\n`;
fs.writeFileSync(path.join(BRAND, 'tokens.css'), out);
// ── Tailwind preset: every value DERIVED from tokens.json (observed-only, deprecated and reference-only tokens excluded)
const sem = (group) => { const o = {}; for (const t of usable.filter(t => t.path[0] === 'semantic' && t.path.slice(1, group.length + 1).join('.') === group.join('.') && !observedOnly(t))) o[t.path.slice(group.length + 1).join('-')] = css(resolveRef(t.value)); return o; };
const col = {}; for (const t of usable.filter(t => t.path[0] === 'semantic' && t.path[1] === 'color' && !observedOnly(t))) col[t.path.slice(2).join('-')] = `var(${varName(t.path)})`;
Object.assign(col, { bg: 'var(--fpt-bg)', surface: 'var(--fpt-surface)', 'surface-2': 'var(--fpt-surface-2)', 'surface-3': 'var(--fpt-surface-3)', line: 'var(--fpt-line)', fg: 'var(--fpt-fg)', 'fg-2': 'var(--fpt-fg-2)', 'fg-muted': 'var(--fpt-fg-muted)', primary: 'var(--fpt-primary)', 'primary-fg': 'var(--fpt-primary-fg)', gain: 'var(--fpt-finance-gain)', loss: 'var(--fpt-finance-loss)', drawdown: 'var(--fpt-finance-drawdown)', neutral: 'var(--fpt-finance-neutral)', pending: 'var(--fpt-finance-pending)', target: 'var(--fpt-finance-target)' });
const fam = {}; for (const [k, v] of Object.entries(T.semantic.font.family)) { if (k.startsWith('$') || v.$extensions?.['fpt.status'] === 'deprecated') continue; fam[k] = v.$value; } fam.ui = ['var(--fpt-font-ui)'];
const shadow = { primary: resolveRef(T.component.button.primary.shadow.$value), 'primary-hover': resolveRef(T.component.button.primary['shadow-hover'].$value), overlay: 'var(--fpt-shadow-overlay)', none: 'none' };
const sizes = sem(['size']); const screens = {}; for (const [k, v] of Object.entries(sizes)) if (k.startsWith('bp-')) screens[k.slice(3)] = v; const spacing = sem(['space']); for (const [k, v] of Object.entries(sizes)) if (!k.startsWith('bp-')) spacing[k] = v;
const dur = sem(['motion', 'duration']); const ease = {}; for (const [k, v] of Object.entries(T.semantic.motion.easing)) { if (k.startsWith('$')) continue; ease[k] = css(v.$value); }
const z = {}; for (const [k, v] of Object.entries(sem(['elevation']))) if (k !== 'base') z[k] = String(v);
const J = o => JSON.stringify(o, null, 2).replace(/"([a-zA-Z0-9-]+)":/g, "'$1':");
const fill = resolveRef(T.component.button.primary.fill.$value).replace(/#F42821/i, 'var(--fpt-brand-red)').replace(/#A30100/i, 'var(--fpt-brand-red-gradient-end)');
const tw = `// FPT Brand Identity System v1.0 — tailwind.preset.js (GENERATED from brand/tokens.json by brand/scripts/build-tokens.mjs; do not edit)
// Every value below is derived from tokens.json. Observed-only site treatments (button glow, .2em tracking, hover scale, gold badge) are intentionally absent.
// usage (Tailwind 3.4 / 4.x compat): module.exports = { presets: [require('./brand/tailwind.preset.js')], content: [...] } — requires brand/tokens.css loaded.
// Tailwind 4 (fpt-website uses @import "tailwindcss"): @config "./brand/tailwind.preset.js"; or map the --fpt-* variables in an @theme block — see brand/fpt-website-application-note.md.
module.exports = {
  theme: {
    extend: {
      colors: ${J(col)},
      fontFamily: ${J(fam)},
      fontSize: ${J(sem(['font', 'size']))},
      fontWeight: ${J(sem(['font', 'weight']))},
      lineHeight: ${J(Object.fromEntries(Object.entries(sem(['font', 'lineHeight'])).map(([k, v]) => [k, String(v)])))},
      letterSpacing: ${J(sem(['font', 'letterSpacing']))},
      spacing: ${J(spacing)},
      borderRadius: ${J(sem(['radius']))},
      boxShadow: ${J(shadow)},
      zIndex: ${J(z)},
      transitionDuration: ${J(dur)},
      transitionTimingFunction: ${J(ease)},
      screens: ${J(screens)},
      backgroundImage: { 'btn-primary': ${JSON.stringify(fill)} }
    }
  }
};
`;
fs.writeFileSync(path.join(BRAND, 'tailwind.preset.js'), tw);
console.log('tokens.css lines', out.split('\n').length, '| tokens', all.length, '| preset: colours', Object.keys(col).length, '| shadows', JSON.stringify(shadow), '| letterSpacing', JSON.stringify(sem(['font', 'letterSpacing'])));
