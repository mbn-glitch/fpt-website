/**
 * Pricing data — derived from the platform catalogue (src/data/rules.js ← fpt-platform CATALOG_V1 / RULES_V1). Nothing here is a site invention.
 * EUR / AED are shown as indicative conversions only (challengePricing.convertedNote); settlement is in USD.
 */
import { CATALOG_V1, RULES_V1, pct } from './rules.js';
import { formatMoney } from '../lib/money.jsx';

export const ACCOUNT_SIZES = CATALOG_V1.map((p) => p.sizeCents / 100);
export const FEES_USD = Object.fromEntries(CATALOG_V1.map((p) => [p.sizeCents / 100, p.priceCents / 100]));

export const CURRENCIES = {
  USD: { code: 'USD', rate: 1 },
  EUR: { code: 'EUR', rate: 0.92 },
  AED: { code: 'AED', rate: 3.67 },
};

export const BASE_RULES = {
  profitTarget: pct(RULES_V1.profitTargetBps),
  maxDailyLoss: pct(RULES_V1.dailyLossBps),
  maxLoss: pct(RULES_V1.maxLossBps),
  minTradingDays: RULES_V1.minTradingDaysEvaluation,
  minTradingDaysFunded: RULES_V1.minTradingDaysFunded,
  profitShare: pct(RULES_V1.payoutShareBps),
  leverageForex: `1:${RULES_V1.leverage.forex}`,
  swapFree: RULES_V1.swapFree,
  timeLimitDays: RULES_V1.evaluationDays,
  maxAccounts: RULES_V1.maxAccountsPerClient,
  payoutMinUsd: RULES_V1.payoutMinCents / 100,
  payoutMaxUsd: RULES_V1.payoutMaxPerTransactionCents / 100,
  payoutCycleDays: RULES_V1.payoutCycleDays,
  commissionPerLotUsd: RULES_V1.commissionPerLotCents.forex / 100,
};

export function calcFee(size, currency) {
  const cur = CURRENCIES[currency] || CURRENCIES.USD;
  return FEES_USD[size] * cur.rate;
}

/** «280 USD» / «258 EUR» — the ONE money format (RD2 rule 3.4): amount, no-break space, code, isolated. */
export function formatCurrency(amount, currencyCode) {
  const cur = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const rounded = amount >= 100 ? Math.round(amount) : Math.round(amount * 100) / 100;
  return formatMoney(rounded, cur.code, Number.isInteger(rounded) ? 0 : 2);
}

/** «50,000 USD» — the account size with its code (GLOSSARY § 6). */
export function formatSize(size) {
  return formatMoney(size, 'USD', 0);
}
