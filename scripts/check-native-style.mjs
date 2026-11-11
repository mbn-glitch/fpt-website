#!/usr/bin/env node
/**
 * Native-style gate (L10N-NATIVE-REVIEW, 12 Nov 2026 — the owner's native-speaker review of fr / es / pt / tr). Three source guards on the four
 * translated Latin-script languages — the locale files and the help centre literals (src/data/helpContent.js, by their language key):
 *   a) TITLE CASE (fr / es / pt — rule G2): English-style capitals are a visible style error — a capital belongs to the first word of a sentence / segment
 *      and to proper names only. A segment starts at the beginning, after «. », «! », «? », «: », a line break, « / », « — », « | », « · » or an opening
 *      quotation mark. Words written entirely in capitals (FPT, USD, KYC, FAQ, P&L, II) are acronyms; the proper names are the ALLOW list below.
 *   b) ENGLISH THOUSANDS COMMA (fr / es / pt / tr — rule G1): a hand-written «200,000» is the English form — fr writes «200 000» (no-break space),
 *      es / pt / tr «200.000». (Amounts built by src/lib/money.jsx are not hand-written and are not this guard's subject.)
 *   c) ONE TERM PER CONCEPT (per language): the refused variants and the single term the review fixed — case-insensitive, reported with the key.
 * English and Arabic are not scanned. The guards prove themselves on their own samples at every run.
 *   node scripts/check-native-style.mjs                                   → PASS / FAIL (exit 1); in `npm run check`
 *   node scripts/check-native-style.mjs --locales <dir> [--help <file>]   → the same guards on another copy of the texts (e.g. a previous release)
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const arg = (name) => { const i = process.argv.indexOf(name); return i > -1 ? process.argv[i + 1] : null; };
const LOCALES_DIR = arg('--locales') ? path.resolve(arg('--locales')) : path.join(ROOT, 'src/i18n/locales');
const HELP_FILE = arg('--help') ? path.resolve(arg('--help')) : path.join(ROOT, 'src/data/helpContent.js');
const LANGS = ['fr', 'es', 'pt', 'tr'];
const TITLE_CASE_LANGS = ['fr', 'es', 'pt'];

// ── a) title case ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
/** What keeps its capital inside a sentence (longest first) — built from what the texts legitimately contain: the brand and product names, the platform's
 *  names, places, the legal entity as the legal documents write it, the defined term «the Company» of the refund policy, and the RULE NAMES where the glossary
 *  entry of the help centre cites them as names (office decision ق-114 — exactly these spellings; «Objectif de Profit» is still refused). */
const ALLOW = [
  'Investing involves risk', 'Part of Fiper Global', 'Fiper Pro Traders', 'Fiper Global', 'Fiper Card', 'Fiper CRM', 'Fiper',
  'cTrader', 'cBots', 'cAlgo', 'Forex', 'WhatsApp', 'Telegram', 'Android', 'MetaTrader',
  'Dubaï', 'Dubái', 'Dubai', 'Meydan Free Zone', 'Meydan', 'Ariane', 'L.L.C-FZ', 'Émirats', 'Emiratos Árabes Unidos', 'Emirados Árabes Unidos',
  'la Société', 'la Empresa', 'à Empresa',
  'Profit Target', 'Max Daily Loss', 'Max Loss',
  'Objectif de profit', 'Perte quotidienne max', 'Perte maximale', 'Objetivo de beneficio', 'Pérdida diaria máx', 'Pérdida máxima', 'Meta de lucro', 'Perda diária máx', 'Perda máxima',
].sort((a, b) => b.length - a.length);
const ALLOW_RE = new RegExp(`(?<![\\p{L}\\p{N}])(?:${ALLOW.map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})(?![\\p{L}\\p{N}])`, 'gu');
const SEGMENT_END = /(?:[.!?…:]|(?:^|\s)[/—–|·•])$/u;   // «. », «! », «? », «: », « / », « — », « | », « · »
const OPENING = /[«“"‘„]$/u;                             // a quoted name / sentence starts its own segment
/** The capitalised words of `text` that are neither the first word of a segment, nor an acronym, nor an allowed name. */
export function titleCaseHits(text) {
  const s = String(text).replace(/[\u2066-\u2069\u200e\u200f]/g, '').replace(/\{\{[^}]+\}\}/g, (m) => 'x'.repeat(m.length)).replace(ALLOW_RE, (m) => 'x'.repeat(m.length));
  const hits = [];
  for (const m of s.matchAll(/[\p{L}\p{N}][\p{L}\p{N}&]*/gu)) {
    const w = m[0]; const first = [...w][0];
    if (first === first.toLowerCase() || first !== first.toUpperCase()) continue;              // not a capital
    if ([...w].length >= 2 && w === w.toUpperCase()) continue;                                 // an acronym: FPT, USD, II, P&L
    const before = s.slice(0, m.index);
    if (/\n[^\S\n]*$/u.test(before)) continue;                                                  // a line break
    const lead = before.replace(/[\s\u00a0\u202f¿¡([]+$/u, '');
    if (!lead || SEGMENT_END.test(lead) || OPENING.test(lead)) continue;                        // the first word of the text / of a segment
    hits.push(w);
  }
  return hits;
}

// ── b) the English thousands comma ──────────────────────────────────────────────────────────────────────────────────────────────────────────────
// NOT ENFORCED (12 Nov 2026): the owner's money rule is ONE format on the whole site — «200,000 USD» in every language (scripts/check-money.mjs,
// platform decision 14) — and every amount built by src/lib/money.jsx follows it. The review's G1 (fr «200 000», es / pt / tr «200.000») is right for a
// native reader but would leave two formats on one page until the formatter itself becomes locale-aware; that is the owner's rule to change, not this
// gate's. The pattern and its self-check stay so the guard is one word away: THOUSANDS_GUARD = true.
const THOUSANDS_GUARD = false;
const THOUSANDS_COMMA = /(?<![\d.,:])\d{1,3}(?:,\d{3})+(?![\d,]|\.\d{3})/g;
const THOUSANDS_FORM = { fr: '«200 000» (no-break space)', es: '«200.000»', pt: '«200.000»', tr: '«200.000»' };

// ── c) one term per concept ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
const A = '[’\']';   // either apostrophe (the straight one is itself refused in fr / tr, below)
/** [pattern, the single term, why] — case-insensitive. */
const TERMS = {
  fr: [
    [/frais\s+uniques?/giu, 'paiement unique', '«frais» has no singular; one term for the one-time payment'],
    [/un\s+seul\s+frais/giu, 'un paiement unique', '«frais» has no singular'],
    [/partage\s+des\s+bénéfices/giu, 'Partage des profits', 'one name for the profit split'],
    [/obtenez\s+le\s+financement/giu, 'Soyez financé', 'one wording for «Get funded»'],
    [new RegExp(`commence[rz]\\s+(?:l${A}|votre\\s+|une\\s+)évaluation`, 'giu'), 'Démarrer l’évaluation', 'one call-to-action verb'],
    [/\btermes\s+transparents/giu, 'Conditions transparentes', '«termes» is a calque of «terms»'],
    [/déclaration\s+de\s+divulgation/giu, 'Avertissement sur les risques', 'G7 — the double calque of «Risk Disclosure»'],
    [/\bcapitalise\b/giu, 'fait fructifier son capital', 'G5 — the calque of «compounds»'],
    [/recherchables?/giu, 'Faciles à trouver', 'G6 — not a French word in use'],
    [/[\p{L}]'[\p{L}]/gu, '’', 'G3 — the typographic apostrophe'],
  ],
  es: [
    [/objetivos?\s+de\s+ganancias?/giu, 'objetivo de beneficio', 'one name for the profit target'],
    [/reparto\s+de\s+ganancias/giu, 'reparto de beneficios', 'one name for the profit split'],
    [/tasas\s+indicativas/giu, 'tipos de cambio indicativos', '«tasa» is not an exchange rate'],
    [/declaración\s+de\s+divulgación/giu, 'Divulgación de riesgos', 'G7 — the double calque of «Risk Disclosure»'],
    [/\bcapitaliza\b/giu, 'hace crecer su capital', 'G5 — the calque of «compounds»'],
    [/buscables?/giu, 'Fáciles de encontrar', 'G6 — not a Spanish word in use'],
    [/\bdashboards?\b/giu, 'panel / paneles', 'the site says «panel»'],
    [/compañía\s+de\s+fiper/giu, 'empresa de Fiper Global', 'the usual word'],
  ],
  pt: [
    // «FPT é / representa / oferece» without the article — and the masculine article: the name is feminine everywhere else («A FPT», «da FPT», «pela FPT»)
    [/(?<!(?<![\p{L}])(?:a|da|na|pela|à|para a|com a)\s)(?<![\p{L}\p{N}])FPT\s+(?:é|representa|oferece)(?![\p{L}])/giu, 'A FPT é / representa / oferece', 'the article is required'],
    [/(?<![\p{L}])(?:o|no|do|ao|pelo)\s+FPT(?![\p{L}\p{N}-])/giu, 'a / na / da / à / pela FPT', 'FPT is feminine'],
    [/declaração\s+de\s+divulgação/giu, 'Divulgação de riscos', 'G7 — the double calque of «Risk Disclosure»'],
    [/\bcapitaliza\b/giu, 'faz o capital crescer', 'G5 — the calque of «compounds»'],
    [/pesquisáveis|pesquisável/giu, 'Fáceis de encontrar', 'G6 — not in use'],
    [/\bdashboards?\b/giu, 'painel / painéis', 'the site says «painel»'],
    [/impulsionad[ao]\s+pela\s+fiper/giu, 'Com a tecnologia da Fiper Global', 'one wording for «Powered by Fiper Global»'],
    [/limite\s+do\s+dia/giu, 'Limite diário', 'one name for the daily limit'],
  ],
  tr: [
    [/finanse(?:\s+edilmiş)?/giu, 'fonlu', 'one term for the funded account — «fonlu hesap»'],
    [/fonlanmış\s+(?:bir\s+)?hesa/giu, 'fonlu hesap', 'one term for the funded account — «fonlu hesap»'],
    [/finansman\s+al/giu, 'Fonlanın', 'one verb for «Get funded»'],
    [new RegExp(`fiper${A}da`, 'giu'), 'Fiper’de / Fiper’deki', 'vowel harmony (the last vowel is «e»)'],
    [/fiper\s+kart/giu, 'Fiper Card', 'the product name is not translated'],
    [/pazarlarda/giu, 'piyasalarda', '«pazar» is a goods market; finance says «piyasa»'],
    [/swap\s+ücretsiz/giu, 'Swapsız', 'one term for swap-free'],
    [/(?<![\p{L}])trader(?:lar|ın|in|a|ı)\p{L}*/giu, 'trader’lar / trader’ların / trader’lara', 'the apostrophe after the foreign word'],
    [/(?:hesap|değerlendirme)\s+boyut\p{L}*|boyutlar\s+ve\s+ücretler/giu, 'büyüklük', 'one word for the account size — «hesap büyüklüğü»'],
    [/(?:günlük|maks\.?|maksimum|toplam)\s+kayıp|kayıp\s+limit/giu, 'zarar', 'the trading term is «zarar»'],
    [/(?:zarar|günlük|toplam)\s+sınır|sınıra\s+kalan|sınırı\s+aşan/giu, 'limit', 'one word for the loss limit — «limit»'],
    [/dalgalı\s+zarar/giu, 'gerçekleşmemiş zarar', 'floating loss'],
    [/bileşik\s+büyür/giu, 'sermayesini katlayarak büyütür', 'G5 — the calque of «compounds»'],
    [new RegExp(`\\}\\}${A}[\\p{L}]`, 'giu'), 'a wording without a suffix on the value', 'a case suffix follows the pronunciation of the number — it cannot sit on an interpolated value'],
    [/[\p{L}\p{N}]'[\p{L}]/gu, '’', 'G3 — the typographic apostrophe'],
  ],
};

// ── the guards prove themselves ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────
{
  const REFUSED_TITLE = ['Soyez Financé.', 'Preguntas Frecuentes', 'Opere com Confiança.', 'Règles Claires. Transparence Totale.', 'À Propos', 'Passez l’Évaluation', 'Ver Todos los Tamaños de Cuenta', 'Une Société Fiper Global'];
  const ALLOWED_TITLE = ['Soyez financé.', 'Preguntas frecuentes', 'Opere com confiança.', 'Règles claires. Transparence totale.', 'FPT — Fiper Pro Traders | Conçu pour un trading rapide', 'Évaluation : x / Financé : y',
    'un certificat « Évaluation réussie » à votre nom', 'Levier (Forex)', 'La Fiper Card chez Fiper', 'Siège social à Meydan, Dubaï.', 'Prix de niveau II', 'A FPT é a divisão de prop trading da Fiper Global', 'Jours min. (compte financé)'];
  const REFUSED_NUM = ['jusqu’à 200,000 USD', 'de 10,000 USD a 200,000 USD', '1,250 USD'];
  const ALLOWED_NUM = ['jusqu’à 200\u00a0000 USD', 'de 10.000 USD a 200.000 USD', '1:100', '2,5 lots', '80 %'];
  const term = (l, t) => TERMS[l].some(([re]) => { re.lastIndex = 0; return re.test(t); });
  const REFUSED_TERM = [['fr', '(frais unique)'], ['fr', 'Partage des bénéfices'], ['fr', "jusqu'à"], ['es', 'Objetivo de ganancia'], ['es', 'Reparto de ganancias'], ['pt', 'FPT é um dos três produtos'], ['pt', 'navegar no FPT'],
    ['tr', 'finanse edilmiş hesap'], ['tr', 'Fiper’daki hesabınıza'], ['tr', 'Fiper Kartı'], ['tr', 'Hangi pazarlarda işlem yapabilirim?'], ['tr', 'kârın {{share}}’i'], ['tr', 'Maks Günlük Kayıp']];
  const ALLOWED_TERM = [['fr', 'paiement unique'], ['fr', 'Les frais ne sont pas remboursés'], ['es', 'Objetivo de beneficio'], ['pt', 'A FPT é um dos três produtos'], ['pt', 'navegar pela FPT'], ['pt', 'no aplicativo FPT'],
    ['tr', 'fonlu hesap'], ['tr', 'Fiper’deki hesabınıza'], ['tr', 'Fiper Card’ı'], ['tr', 'Fonlandıktan sonra'], ['tr', 'trader’ların'], ['tr', 'Maks. günlük zarar'], ['tr', '{{cap}} üst sınır']];
  const num = (t) => { THOUSANDS_COMMA.lastIndex = 0; return THOUSANDS_COMMA.test(t); };
  const broken = [
    ...REFUSED_TITLE.filter((t) => !titleCaseHits(t).length).map((t) => `title case not refused: «${t}»`), ...ALLOWED_TITLE.filter((t) => titleCaseHits(t).length).map((t) => `title case refused: «${t}» (${titleCaseHits(t).join(', ')})`),
    ...REFUSED_NUM.filter((t) => !num(t)).map((t) => `thousands comma not refused: «${t}»`), ...ALLOWED_NUM.filter(num).map((t) => `number refused: «${t}»`),
    ...REFUSED_TERM.filter(([l, t]) => !term(l, t)).map(([l, t]) => `${l} term not refused: «${t}»`), ...ALLOWED_TERM.filter(([l, t]) => term(l, t)).map(([l, t]) => `${l} term refused: «${t}»`),
  ];
  if (broken.length) { console.error('check-native-style: FAIL — the guards no longer hold on their own samples'); for (const x of broken) console.error(`  ${x}`); process.exit(1); }
}

// ── the texts ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
const texts = [];   // { where, lang, text }
const flat = (o, p = '') => Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' ? flat(v, `${p}${k}.`) : [[`${p}${k}`, v]]));
for (const l of LANGS) for (const [k, v] of flat(JSON.parse(readFileSync(path.join(LOCALES_DIR, `${l}.json`), 'utf8')))) if (typeof v === 'string') texts.push({ where: `${l}.json ${k}`, lang: l, text: v });
{
  // the help centre: every quoted literal behind a language key (`fr: '…'` inside titles / descriptions / questions / answers) — comments blanked, line numbers kept
  const src = readFileSync(HELP_FILE, 'utf8').replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, ' ')).replace(/^\s*\/\/.*$/gm, '');
  for (const m of src.matchAll(/(['"])((?:(?!\1)[^\\]|\\.)*)\1/g)) {
    const lang = (/(?<![\w$])(fr|es|pt|tr)\s*:\s*$/.exec(src.slice(Math.max(0, m.index - 12), m.index)) || [])[1];
    if (lang) texts.push({ where: `helpContent.js:${src.slice(0, m.index).split('\n').length} [${lang}]`, lang, text: m[2].replace(/\\(['"\\])/g, '$1').replace(/\\n/g, '\n') });
  }
}

const failures = { titleCase: [], thousands: [], terms: [] };
const around = (text, i, n) => `…${text.slice(Math.max(0, i - 25), i + n + 25).replace(/\s+/g, ' ')}…`;
for (const { where, lang, text } of texts) {
  if (TITLE_CASE_LANGS.includes(lang)) { const hits = titleCaseHits(text); if (hits.length) failures.titleCase.push(`${where}: capital inside a sentence (${hits.join(', ')}) — «${text.slice(0, 110)}»`); }
  if (THOUSANDS_GUARD) for (const m of text.matchAll(THOUSANDS_COMMA)) failures.thousands.push(`${where}: «${m[0]}» is the English form — ${lang} writes ${THOUSANDS_FORM[lang]} — ${around(text, m.index, m[0].length)}`);
  for (const [re, term, why] of TERMS[lang]) for (const m of text.matchAll(re)) failures.terms.push(`${where}: «${m[0]}» → «${term}» (${why}) — ${around(text, m.index, m[0].length)}`);
}
const total = failures.titleCase.length + failures.thousands.length + failures.terms.length;
if (total) {
  console.error(`check-native-style: FAIL (${total}) — title case ${failures.titleCase.length} · thousands comma ${failures.thousands.length} · one term per concept ${failures.terms.length}`);
  for (const [name, list] of Object.entries(failures)) { if (list.length) console.error(` ${name} (${list.length})`); for (const x of list.slice(0, process.argv.includes('--all') ? Infinity : 60)) console.error(`  ${x}`); }
  process.exit(1);
}
console.log(`check-native-style: PASS (${texts.length} fr / es / pt / tr texts — locale values + help literals: title case 0 in fr / es / pt (${ALLOW.length} allowed names, acronyms free) · English thousands comma ${THOUSANDS_GUARD ? 0 : 'not enforced (one money format, decision 14)'} · one term per concept 0 (${Object.values(TERMS).reduce((n, t) => n + t.length, 0)} refused variants); self-checked on its samples)`);
