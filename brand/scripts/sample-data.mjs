// ONE consistent SAMPLE dataset for every FPT reference chart / table / template / mockup (challenge dashboard, certificate, payout statement, e-mails, slide, social, manual).
// Figures are SAMPLE and arithmetically consistent (asserted below). NO performance claim: this is one invented evaluation on a $50,000 challenge, not a result.
// Product facts (sizes, fees, rules) are VERBATIM from the task file and fpt-website a88e666 src/data/pricing.js — never invented.
export const PRODUCT = {
  name: { en: 'Fiper Pro Traders', short: 'FPT', ar: 'Fiper Pro Traders' /* ar.json keeps the Latin name inside Arabic copy (meta.title, footer.copyright); the fiper.io observed transliteration «FPT — فايبر برو تريدرز» is recorded in glossary.md */ },
  relationship: { en: 'Part of Fiper Global', ar: 'جزء من Fiper Global' /* ar.json footer.partOf */, arNav: 'جزء من FIPER GLOBAL' /* ar.json nav.partOfFiperGlobal */, heroBadge: 'Backed by Fiper Global — established financial infrastructure with proven broker experience' },
  model: { en: 'one-phase evaluation → funded account', ar: 'مرحلة تقييم واحدة ← حساب ممول', split: '80/20', splitNote: 'fixed' },
  platform: 'cTrader', platformOnly: true,
  register: 'https://crm.fptraders.com/register', site: 'https://fptraders.com', siteToday: 'https://fpt-website-rust.vercel.app', social: 'https://linktr.ee/fiper',
  sizes: [ { usd: 10000, fee: 90 }, { usd: 25000, fee: 160 }, { usd: 50000, fee: 280, popular: true }, { usd: 100000, fee: 540 }, { usd: 200000, fee: 1070 } ],
  rules: { profitTargetPct: 10, dailyDrawdownPct: 5, overallDrawdownPct: 9, timeLimitDays: 31, minTradingDaysPhase1: 5, minTradingDaysBeforePayout: 10, activationHours: 72, payoutEveryDays: 14, leverage: '1:100', refund: 'Not available', swapFree: 'Yes', minPayoutUsd: 100, maxPayoutUsd: 5000 /* pricing.js BASE_RULES */ },
};
// ── the one SAMPLE evaluation: $50,000 challenge, 22 trading days inside the 31-day window (USD cents as integers)
export const SAMPLE = {
  currency: 'USD', accountUsd: 50000, feeUsd: 280, challengeId: 'FPT-50K-104233', traderName: { ar: 'متداول نموذجي', en: 'Sample Trader' }, email: 'trader@example.com',
  startDate: '2026-09-07', endDate: '2026-10-07', asOf: '2026-10-07', periodLabel: { ar: '7 سبتمبر → 7 أكتوبر 2026', en: '7 Sep → 7 Oct 2026' },
  // equity at the close of each trading day (cents). Day 0 = starting balance.
  tradingDays: ['2026-09-07','2026-09-08','2026-09-09','2026-09-10','2026-09-11','2026-09-14','2026-09-15','2026-09-16','2026-09-17','2026-09-18','2026-09-21','2026-09-22','2026-09-23','2026-09-24','2026-09-25','2026-09-28','2026-09-29','2026-09-30','2026-10-01','2026-10-02','2026-10-05','2026-10-06','2026-10-07'],
  dayLabelsAr: ['7 سبتمبر','8','9','10','11','14','15','16','17','18','21','22','23','24','25','28','29','30','1 أكتوبر','2','5','6','7 أكتوبر'],
  dayLabelsEn: ['7 Sep','8','9','10','11','14','15','16','17','18','21','22','23','24','25','28','29','30','1 Oct','2','5','6','7 Oct'],
  equityCents: [5000000, 5042000, 5018500, 5091200, 5136800, 5104300, 5168900, 5212400, 5177600, 5231900, 5289500, 5264200, 5318700, 5343100, 5302800, 5366400, 5411900, 5389300, 5438600, 5472200, 5451700, 5496300, 5531250],
  tradesClosed: 64, winRateBps: 5781 /* 37 of 64 */, winningTrades: 37, losingTrades: 27,
  // payout (funded account, same SAMPLE trader, later cycle): profit in the 14-day cycle and the 80 % share
  payout: { cycleStart: '2026-10-20', cycleEnd: '2026-11-03', cycleLabel: { ar: '20 أكتوبر → 3 نوفمبر 2026', en: '20 Oct → 3 Nov 2026' }, profitCents: 312450, sharePct: 80, reference: 'PO-2026-11-00417', method: { ar: 'بطاقة Fiper', en: 'Fiper Card' }, processedDate: '2026-11-04' },
  certificate: { issued: '2026-10-09', reference: 'FC-2026-10-00892', fundedAccountUsd: 50000 },
  ctrader: { login: '5018842', server: 'FPT-Live' /* SAMPLE server name */, platform: 'cTrader' },
};
export const startCents = SAMPLE.equityCents[0];
export const endCents = SAMPLE.equityCents.at(-1);
export const profitCents = endCents - startCents;                                   // 531,250 = +10.625 %
export const profitBps = Math.round(profitCents / startCents * 10000);               // 1063 bps (reaches the 10 % target: 1000 bps)
export const targetCents = Math.round(startCents * (1 + PRODUCT.rules.profitTargetPct / 100));          // 5,500,000
export const overallFloorCents = Math.round(startCents * (1 - PRODUCT.rules.overallDrawdownPct / 100)); // 4,550,000 (static from the initial balance)
export const dailyFloorCents = SAMPLE.equityCents.map((_, i) => i === 0 ? Math.round(startCents * (1 - PRODUCT.rules.dailyDrawdownPct / 100)) : Math.round(SAMPLE.equityCents[i - 1] * (1 - PRODUCT.rules.dailyDrawdownPct / 100))); // 5 % below the previous close
export const peakCents = Math.max(...SAMPLE.equityCents);
export const maxDrawdownCents = SAMPLE.equityCents.reduce((m, v, i) => { const peak = Math.max(...SAMPLE.equityCents.slice(0, i + 1)); return Math.max(m, peak - v); }, 0); // worst peak-to-trough
export const maxDrawdownBps = Math.round(maxDrawdownCents / startCents * 10000);
export const worstDayCents = SAMPLE.equityCents.slice(1).reduce((m, v, i) => Math.min(m, v - SAMPLE.equityCents[i]), 0);
export const worstDayBps = Math.round(worstDayCents / startCents * 10000);
export const tradingDaysUsed = SAMPLE.equityCents.length - 1;                        // 22
export const calendarDaysUsed = Math.round((new Date(SAMPLE.endDate) - new Date(SAMPLE.startDate)) / 86400000); // 30 of 31
export const payoutShareCents = Math.round(SAMPLE.payout.profitCents * SAMPLE.payout.sharePct / 100);  // 249,960
export const payoutFirmCents = SAMPLE.payout.profitCents - payoutShareCents;                             // 62,490
export const fmtCents = c => (c < 0 ? '−' : '') + (Math.abs(c) / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const fmtUsd = n => n.toLocaleString('en-US');
export const fmtBps = b => (b > 0 ? '+' : b < 0 ? '−' : '') + (Math.abs(b) / 100).toFixed(2) + ' %';
export const fmtPct = p => p.toFixed(0) + ' %';
// consistency assertions — the dataset refuses to load if a figure does not add up
if (endCents < targetCents) throw new Error('SAMPLE inconsistent: the sample evaluation must reach the profit target');
for (let i = 1; i < SAMPLE.equityCents.length; i++) { if (SAMPLE.equityCents[i] < dailyFloorCents[i]) throw new Error('SAMPLE inconsistent: daily drawdown breached on day ' + i); if (SAMPLE.equityCents[i] < overallFloorCents) throw new Error('SAMPLE inconsistent: overall drawdown breached'); }
if (SAMPLE.winningTrades + SAMPLE.losingTrades !== SAMPLE.tradesClosed) throw new Error('SAMPLE inconsistent: trades');
if (Math.round(SAMPLE.winningTrades / SAMPLE.tradesClosed * 10000) !== SAMPLE.winRateBps) throw new Error('SAMPLE inconsistent: win rate');
if (payoutShareCents + payoutFirmCents !== SAMPLE.payout.profitCents) throw new Error('SAMPLE inconsistent: payout split');
if (tradingDaysUsed < PRODUCT.rules.minTradingDaysPhase1 || calendarDaysUsed > PRODUCT.rules.timeLimitDays) throw new Error('SAMPLE inconsistent: days');
if (SAMPLE.tradingDays.length !== SAMPLE.equityCents.length || SAMPLE.dayLabelsAr.length !== SAMPLE.equityCents.length) throw new Error('SAMPLE inconsistent: labels');
