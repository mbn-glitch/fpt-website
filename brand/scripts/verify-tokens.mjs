// verify-tokens.mjs — FPT Brand v1.0 (v1.2.0: CR-05 risk-line wording, CR-06 ladder, CR-07 / e-mail / OG rule tokens). Run from the folder that contains brand/.
// Checks: references resolve · status vocabulary · no raw hex in semantic/component layers · every var(--fpt-*) used by components.css / templates exists ·
// no deprecated value in components/templates/mockups · parent pin present · inherited primitives still equal the parent file when it is reachable (FIPER_PARENT).
import fs from 'node:fs'; import path from 'node:path';
const BRAND = fs.existsSync('brand/tokens.json') ? 'brand' : path.join(path.dirname(new URL(import.meta.url).pathname), '..');
const T = JSON.parse(fs.readFileSync(path.join(BRAND, 'tokens.json'), 'utf8'));
const get = p => p.split('.').reduce((o, k) => o?.[k], T);
const flat = (n, p = [], o = []) => { for (const [k, v] of Object.entries(n)) { if (k.startsWith('$')) continue; if (v && typeof v === 'object' && '$value' in v) o.push({ p: [...p, k], v: v.$value, e: v.$extensions || {} }); else if (v && typeof v === 'object') flat(v, [...p, k], o); } return o; };
const all = flat(T); const VOC = ['approved', 'observed', 'inherited', 'proposed', 'reference', 'deprecated', 'alias']; let fail = 0;
if (T.$extensions?.['fpt.parent-pin'] !== 'fiper-brand v2.0.0') { console.log('PARENT PIN missing or wrong:', T.$extensions?.['fpt.parent-pin']); fail++; } else console.log('parent pin', T.$extensions['fpt.parent-pin']);
for (const t of all) {
  const refs = [...String(t.v).matchAll(/\{([^}]+)\}/g)].map(m => m[1]); for (const r of refs) { if (!get(r) || !('$value' in get(r))) { console.log('UNRESOLVED', t.p.join('.'), '→', r); fail++; } }
  const s = t.e['fpt.status'] || (refs.length ? 'alias' : null); if (!s || !VOC.includes(s)) { console.log('NO STATUS', t.p.join('.')); fail++; }
  if (!t.e['fpt.source'] && s !== 'alias') { console.log('NO SOURCE', t.p.join('.')); fail++; }
  if (t.p[0] !== 'primitive' && t.p[1] === 'color' && typeof t.v === 'string' && /#[0-9a-f]{3,6}/i.test(t.v) && !/gradient/.test(t.v) && !t.e['fpt.observed-only']) { console.log('RAW HEX in', t.p.join('.'), t.v); fail++; }
  // reference-only parent values must never be referenced by a semantic/component token
  for (const r of refs) if (/parent-ref/.test(r)) { console.log('REFERENCE-ONLY VALUE USED', t.p.join('.'), '→', r); fail++; }
}
// inherited values equal the parent file (when reachable)
const PARENT = process.env.FIPER_PARENT || '/home/builder/Projects/fiper-brand/brand/tokens.json';
if (fs.existsSync(PARENT)) { const P = JSON.parse(fs.readFileSync(PARENT, 'utf8')); const pget = p => p.split('.').reduce((o, k) => o?.[k], P); let n = 0, bad = 0; for (const t of all) { const pp = t.e['fpt.parent']; if (!pp) continue; n++; const pv = pget(pp)?.$value; if (JSON.stringify(pv) !== JSON.stringify(t.v)) { console.log('PARENT MISMATCH', t.p.join('.'), JSON.stringify(t.v), '≠', JSON.stringify(pv), '(' + pp + ')'); bad++; fail++; } } console.log('inherited from parent:', n, 'tokens checked against', PARENT, bad ? bad + ' mismatches' : 'all equal'); } else console.log('parent file not reachable — inherited values not re-checked (fine inside a consumer repo)');
const cssVars = new Set([...fs.readFileSync(path.join(BRAND, 'tokens.css'), 'utf8').matchAll(/(--fpt-[a-zA-Z0-9-]+):/g)].map(m => m[1]));
const scan = []; const list = d => { if (!fs.existsSync(d)) return; for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) list(p); else if (/\.(css|html|svg)$/.test(e.name)) scan.push(p); } };
list(path.join(BRAND, 'components')); list(path.join(BRAND, 'templates')); list(path.join(BRAND, 'mockups')); // the manual names deprecated values as documentation and is gated by render-manual + verify-identity on its CSS instead
for (const f of scan) { const used = new Set([...fs.readFileSync(f, 'utf8').matchAll(/var\((--fpt-[a-zA-Z0-9-]+)/g)].map(m => m[1])); const missing = [...used].filter(v => !cssVars.has(v)); if (missing.length) { console.log('MISSING VARS in', f, missing.join(' ')); fail++; } }
console.log('files scanned for var(--fpt-*)', scan.length);
const dep = all.filter(t => t.e['fpt.status'] === 'deprecated').map(t => String(t.v).toUpperCase()).filter(v => v.length >= 3 && !/^FLOAT|^PULSE|^RGBA\(0,0,0,0\.7\)$/.test(v));
for (const file of scan) { const s = fs.readFileSync(file, 'utf8').toUpperCase(); for (const d of dep) { if (s.includes(d)) { console.log('DEPRECATED VALUE', d, 'in', file); fail++; } } }
// v1.2.0 (CR-05, owner 1 Nov 2026): the risk line on the share image is FIXED wording — any other string fails
{ const RL = { 'component.og.risk-line.text-ar': 'الاستثمار ينطوي على مخاطر', 'component.og.risk-line.text-en': 'Investing involves risk' }; for (const [p, want] of Object.entries(RL)) { const got = get(p)?.$value; if (got !== want) { console.log('OG-RISK-LINE-WORDING', p, JSON.stringify(got), '≠', JSON.stringify(want)); fail++; } } console.log('OG risk line wording verbatim (CR-05):', fail ? 'checked' : 'PASS'); }
// v1.2.0 (CR-06): the app body step is 16 px and the ladder has five steps
{ const body = get('semantic.font.size.app-body')?.$value, ladder = get('semantic.font.scale.app-ladder')?.$value, mx = get('semantic.font.scale.app-max-sizes')?.$value; if (body !== '16px' || ladder !== '13 · 16 · 18 · 22 · 32' || mx !== 5) { console.log('TYPE-LADDER (CR-06) mismatch:', body, ladder, mx); fail++; } else console.log('type ladder (CR-06): app-body 16px · 13 · 16 · 18 · 22 · 32 · ≤ 5 sizes PASS'); }
// v1.2.0 (CR-07 / e-mail / OG): the usage-rule tokens hold their approved values
{ const want = { 'component.button.destructive.default-style': 'outline or text — never filled', 'component.button.destructive.fill-scope': 'final-confirmation-dialog-only', 'component.email.scheme': 'paper-only', 'component.email.logo-file': 'logos/derived/email-header-160-paper@2x.png', 'component.og.file-ar': 'logos/derived/og-1200x630-ar.png', 'component.og.file-en': 'logos/derived/og-1200x630-en.png' }; let bad = 0; for (const [p, v] of Object.entries(want)) if (get(p)?.$value !== v) { console.log('RULE TOKEN', p, JSON.stringify(get(p)?.$value), '≠', JSON.stringify(v)); bad++; } fail += bad; console.log('rule tokens (CR-07, e-mail paper-only, OG files):', bad ? 'FAIL' : 'PASS'); }
const counts = {}; for (const t of all) { const s = t.e['fpt.status'] || 'alias'; counts[s] = (counts[s] || 0) + 1; }
console.log('status counts', JSON.stringify(counts)); console.log(fail ? `VERIFY FAIL (${fail})` : 'VERIFY PASS'); process.exit(fail ? 1 : 0);
