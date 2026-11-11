#!/usr/bin/env node
/**
 * Glossary gate (RD2 rule 3.5 / F-006 — owner 4 Nov 2026; platform decision 6): the product word is «تقييم / Evaluation» in every language —
 * «تحدي / Challenge / Défi / Desafío / Desafio / Zorluk / Meydan okuma» never appear in a visible text, nor MT4 / MT5 (cTrader only).
 * Also: the Arabic loss-limit names (WEBL-D13 — «السحب» is the payout word, refused only in a drawdown context), the robots term «cBots» (office decision ق-103)
 * and «Drawdown» as a rule NAME in fr / es / pt / tr (office decision ق-114 — one name per rule: the platform glossary's «Perte quotidienne max / Perte maximale» …).
 *   node scripts/check-glossary.mjs            → the six locale files + the help content string literals (ids / slugs / routes without spaces are not text)
 *   node scripts/check-glossary.mjs --dist     → + the visible text of every pre-rendered page in dist/ (tags, scripts, styles and attributes stripped)
 * PASS / FAIL (exit 1).
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DIST = process.argv.includes('--dist');
const LATIN = /(?<![\p{L}\p{N}])(challenges?|d[ée]fis?|desaf[ií]os?|zorlu[kğg]\p{L}*|meydan okuma\p{L}*|MT[45])(?![\p{L}\p{N}])/giu;
// the indefinite form «تحدٍّ» (the word with its diacritics) is the same banned word — it slipped past the first pattern until LAUNCH-I18N-1 (help.subtitle, two help answers)
const ARABIC = /(?<![؀-ۿ])(?:ال)?تحد(?:ي(?:ات|ك|اً|ا|ه|ها|نا|كم)?|[\u064B-\u0652]+)(?![؀-ۿ])/g;
/** WEBL-D13 (design office, L10N-2 — re-check R1): the loss limits are «الخسارة اليومية القصوى» (Max Daily Loss) and «الخسارة الإجمالية القصوى» (Max Loss).
 *  «السحب» is the PAYOUT word only («سحب كل 14 يوماً», «الحد الأدنى / الأقصى للسحب», «متى يمكنني طلب أول سحب؟» stay legitimate), so the rule is CONTEXTUAL — the word
 *  is refused only where its neighbours make it a loss limit («drawdown»): a calculation / rule / limit / level word before it, a daily / overall / maximum /
 *  trailing word after it, «يُحسب السحب», or «السحوبات» as something a trader survives. The overall limit is never the bare «الخسارة القصوى», and «التراجع» is not a
 *  rule name either. Matched on the text without diacritics / tatweel («يُحسب» = «يحسب», «حدّ» = «حد»). */
const AR_L = '\u0621-\u064A\u0671-\u06D3';   // Arabic LETTERS only — «؟ ، ؛» close a word like any punctuation
const ARABIC_RULES = [
  // a calculation / rule / limit word + the payout word: «حسابات السحب», «قواعد السحب», «حدود السحب», «حدّ السحب اليومي», «نسبة السحب» … («حدّ السحب الأدنى» is a payout minimum)
  new RegExp(`(?<![${AR_L}])[وفبلك]?(?:ال)?(?:حسابات|حساب|احتساب|قواعد|قاعدة|حد|حدود|نسبة|نسب|مستوى|مستويات|تعيين|ضبط)\\s+(?:ال)?سحب(?:وبات)?(?![${AR_L}])(?!\\s+الأدنى)`, 'g'),
  // the payout word + a loss-limit qualifier: «السحب اليومي», «السحب الإجمالي», «السحب الأقصى», «سحب يومي», «للسحب الإجمالي» …
  new RegExp(`(?<![${AR_L}])[وفبلك]?(?:ال|لل)?سحب(?:وبات)?\\s+(?:ال)?(?:يومي|يومية|إجمالي|اجمالي|إجمالية|كلي|أقصى|اقصى|قصوى|تراكمي|متحرك|متتبع|عائم)(?![${AR_L}])`, 'g'),
  // «كيف يُحسب السحب؟», «يُحتسب السحب»
  new RegExp(`(?<![${AR_L}])[يت]ح(?:ت)?سب\\s+(?:ال)?سحب(?:وبات)?(?![${AR_L}])`, 'g'),
  // drawdowns as something survived / exceeded: «يتجاوز السحوبات», «ينجو من السحوبات», «يصمد أمام السحوبات»
  new RegExp(`(?<![${AR_L}])(?:[يت]تجاوز|تجاوز|[يت]تخطى|تخطي|[يت]نجو من|[يت]صمد أمام|[يت]تحمل|تحمل)\\s+(?:ال)?سحوبات(?![${AR_L}])`, 'g'),
  // the overall limit without «الإجمالية», and «التراجع» as a rule name
  /الخسارة القصوى|(?:ال)?تراجع (?:ال)?(?:يومي|أقصى|إجمالي)/g,
];
const bare = (s) => s.replace(/[ً-ْٰـ]/g, '');
{ // the rule proves itself on every run: the seven sentences the office listed (LAUNCH-I18N-1 batch 3, production a00735c) + the old overall-limit question must be
  // refused, and the payout sentences of the site must pass — a rule that stops being contextual fails the gate before it scans anything
  const REFUSED = [
    'قد تختلف شروط التداول وحسابات السحب ومستويات الرافعة المالية حسب الأداة وظروف السوق.',          // challengePricing.rulesWarning
    'المتداول الذي يتجاوز السحوبات يتراكم نجاحه.',                                                    // about.principles.p2body
    'قواعد السحب',                                                                                    // help.popular.q3
    'كيف يُحسب السحب؟',                                                                               // how-is-drawdown-calculated
    'هل يُعاد تعيين السحب اليومي كل يوم؟',                                                            // does-daily-drawdown-reset
    'تبقى معاملات المخاطر الأساسية — السحب اليومي والسحب الأقصى والحد الأدنى لأيام التداول.',          // do-funded-accounts-follow-same-rules
    'هذه الاستراتيجيات مسموح بها، لكن يجب أن تحترم حدود السحب الأقصى والخسارة اليومية.',              // is-martingale-or-grid-allowed
    'ما الحد الأقصى للسحب الإجمالي؟',                                                                 // what-is-the-maximum-total-drawdown (the eighth place)
  ];
  const ALLOWED = [
    'متى يمكنني سحب الأرباح؟', 'كيف أسحب أرباحي؟', 'الحد الأدنى للسحب', 'الحد الأقصى للسحب', 'متى يمكنني طلب أول سحب؟',
    'حساب ممول بحصة 80 % وسحب كل 14 يوماً', 'اجتياز التقييم وكل سحب مدفوع بعد تسليم الحساب الممول', 'شهادة سحب مدفوع باسم المتداول',
    'يُصنَّف الحساب على أنه فاشل وتُسحب صلاحية التداول.', 'الخسارة اليومية القصوى', 'الخسارة الإجمالية القصوى',
  ];
  const hit = (t) => ARABIC_RULES.some((re) => { re.lastIndex = 0; return re.test(bare(t)); });
  const broken = [...REFUSED.filter((t) => !hit(t)).map((t) => `not refused: «${t}»`), ...ALLOWED.filter(hit).map((t) => `payout wording refused: «${t}»`)];
  if (broken.length) { console.error('check-glossary: FAIL — the contextual «السحب» rule (WEBL-D13) no longer holds on its own samples'); for (const x of broken) console.error(`  ${x}`); process.exit(1); }
}
/** Office decision ق-103 (11 Nov 2026): the platform is cTrader only, so the general term for trading robots is «cBots» (the local word for robots + «(cBots)» at the
 *  first mention on a page, then «cBots»). The MetaTrader term «Expert Advisors / EAs / المستشارون الخبراء» is refused in every language — except inside a sentence that
 *  says MetaTrader advisors are not supported (the word «MetaTrader» within 160 characters). */
const EA_TERM = /(?<![\p{L}\p{N}])(?:Expert Advisors?|EAs?)(?![\p{L}\p{N}])|(?:ال)?مستشار(?:ون|ين|ي)? (?:ال)?خبرا?ء|(?:ال)?مستشار (?:ال)?خبير/gu;
/** Office decision ق-114 (re-check R2, WEBL-D13): in fr / es / pt / tr each loss limit has ONE name, the platform glossary's — «Perte quotidienne max / Perte maximale»,
 *  «Pérdida diaria máx / Pérdida máxima», «Perda diária máx / Perda máxima», «Maks Günlük Kayıp / Maksimum Kayıp» (the values of `challengePricing.maxDailyLoss|maxLoss`,
 *  as en / ar already do) — so «Drawdown» is refused as a rule NAME: the word with a daily / maximum / total qualifier on either side («Drawdown quotidien»,
 *  «Drawdown máximo», «drawdown total maximum», «Günlük Drawdown», «Maksimum Drawdown»). Like the Arabic rule it is CONTEXTUAL: the bare common noun stays
 *  («Règles de drawdown», «limites de drawdown», «survit aux drawdowns» — the wording of those sentences is the native reviewer's item) and the glossary entry
 *  `what-do-the-rule-names-mean` keeps its sentence «… ce que les autres réponses appellent « drawdown »». English is not scanned (its keys already read
 *  «Max Daily Loss / Max Loss»). */
const DRAWDOWN_LANGS = ['fr', 'es', 'pt', 'tr'];
const DD_Q = '(?:quotidien(?:ne)?s?|journali[eè]re?s?|maxim(?:um|al|ale|aux|o|a|os|as)|máxim[oa]s?|max\\.?|maks\\.?|maksimum|azami|total(?:e|es)?|toplam|diari[oa]s?|diári[oa]s?|günlük)';
const DRAWDOWN_RULE = new RegExp(`(?<![\\p{L}\\p{N}])(?:drawdowns?(?:\\s+${DD_Q}){1,2}|(?:${DD_Q}\\s+){1,2}drawdowns?)(?![\\p{L}\\p{N}])`, 'giu');
{ // the rule proves itself on every run: the names the office measured on /challenges (7cbaa47) and in the help questions are refused, the glossary names and the bare noun pass
  const REFUSED = [
    'Drawdown quotidien', 'Drawdown Maximum', 'Drawdown diario', 'Drawdown Máximo', 'Drawdown diário', 'Drawdown máximo', 'Günlük Drawdown', 'Maksimum Drawdown',
    'Quel est le drawdown total maximum ?', '¿Se reinicia el drawdown diario?', 'drawdown quotidien, drawdown maximal et nombre minimal de jours de trading', 'Maksimum toplam drawdown nedir?',
  ];
  const ALLOWED = [
    'Perte quotidienne max', 'Perte maximale', 'Pérdida diaria máx', 'Pérdida máxima', 'Perda diária máx', 'Perda máxima', 'Maks Günlük Kayıp', 'Maksimum Kayıp',
    'ces deux limites de perte sont ce que les autres réponses appellent « drawdown ».', 'diğer yanıtlarda “drawdown” denen şey bu iki kayıp limitidir.',
    'Règles de drawdown', 'Ces stratégies sont autorisées mais doivent respecter les limites de drawdown.', 'Un trader que sobrevive a los drawdowns capitaliza.', 'Drawdown nasıl hesaplanır?',
  ];
  const hit = (t) => { DRAWDOWN_RULE.lastIndex = 0; return DRAWDOWN_RULE.test(t); };
  const broken = [...REFUSED.filter((t) => !hit(t)).map((t) => `not refused: «${t}»`), ...ALLOWED.filter(hit).map((t) => `glossary / common wording refused: «${t}»`)];
  if (broken.length) { console.error('check-glossary: FAIL — the «Drawdown» rule-name rule (ق-114) no longer holds on its own samples'); for (const x of broken) console.error(`  ${x}`); process.exit(1); }
}
const failures = [];
const report = (where, text, m) => failures.push(`${where}: «${m[0]}» — …${text.slice(Math.max(0, m.index - 30), m.index + m[0].length + 30).replace(/\s+/g, ' ')}…`);
const scan = (where, text, lang) => {
  for (const re of [LATIN, ARABIC]) { re.lastIndex = 0; let m; while ((m = re.exec(text))) report(where, text, m); }
  const plain = bare(text);
  for (const re of ARABIC_RULES) { re.lastIndex = 0; let m; while ((m = re.exec(plain))) report(where, plain, m); }
  EA_TERM.lastIndex = 0; let m;
  while ((m = EA_TERM.exec(text))) if (!/MetaTrader/i.test(text.slice(Math.max(0, m.index - 160), m.index + m[0].length + 160))) report(where, text, m);
  if (DRAWDOWN_LANGS.includes(lang)) { DRAWDOWN_RULE.lastIndex = 0; while ((m = DRAWDOWN_RULE.exec(text))) report(`${where} [${lang}: «Drawdown» is not a rule name — ق-114]`, text, m); }
};
// 1. locale values
for (const l of ['en', 'ar', 'fr', 'es', 'pt', 'tr']) {
  const flat = (o, p = '') => Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' ? flat(v, `${p}${k}.`) : [[`${p}${k}`, v]]));
  for (const [k, v] of flat(JSON.parse(readFileSync(path.join(ROOT, 'src/i18n/locales', `${l}.json`), 'utf8')))) if (typeof v === 'string') scan(`${l}.json ${k}`, v, l);
}
// 2. help content: every quoted literal that contains whitespace (a sentence), not ids / slugs / anchors
{
  const src = readFileSync(path.join(ROOT, 'src/data/helpContent.js'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
  // the language of a literal is the object key in front of it (`fr: '…'` inside questions / answers / names) — the English literals carry none
  for (const m of src.matchAll(/(['"])((?:(?!\1)[^\\]|\\.)*)\1/g)) if (/\s/.test(m[2])) scan(`helpContent.js:${src.slice(0, m.index).split('\n').length}`, m[2], (/(?<![\w$])(ar|fr|es|pt|tr)\s*:\s*$/.exec(src.slice(Math.max(0, m.index - 12), m.index)) || [])[1]);
}
// 3. the rendered pages
if (DIST) {
  const dist = path.join(ROOT, 'dist');
  if (!existsSync(dist)) { console.error('check-glossary: dist/ missing — run the build first'); process.exit(1); }
  const walk = (d, out = []) => { for (const e of readdirSync(d)) { const p = path.join(d, e); if (statSync(p).isDirectory()) walk(p, out); else if (e.endsWith('.html')) out.push(p); } return out; };
  const decode = (s) => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n));
  let pages = 0;
  for (const f of walk(dist)) {
    const html = readFileSync(f, 'utf8');
    const text = decode(html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<title>[\s\S]*?<\/title>/i, (m) => m).replace(/<[^>]+>/g, ' '));
    scan(path.relative(ROOT, f), text, (/<html[^>]*\slang="([a-z]{2})/i.exec(html) || [])[1]); pages++;
  }
  if (!failures.length) console.log(`check-glossary: ${pages} rendered pages scanned`);
}
if (failures.length) { console.error(`check-glossary: FAIL (${failures.length})`); for (const x of failures.slice(0, 80)) console.error(`  ${x}`); process.exit(1); }
console.log(`check-glossary: PASS (six locales + help content${DIST ? ' + dist/ text' : ''}: no challenge / défi / desafío / desafio / zorluk / meydan okuma / تحدي / MT4 / MT5; Arabic rule names per WEBL-D13 — «السحب» refused in a loss-limit context only (8 refused + 11 payout samples self-checked), no bare «الخسارة القصوى»; ق-103 — «cBots», no «Expert Advisors / EAs» outside a MetaTrader sentence; ق-114 — fr / es / pt / tr: «Drawdown» refused as a rule name (12 refused + 14 allowed samples self-checked))`);
