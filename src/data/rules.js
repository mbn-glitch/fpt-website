/**
 * FPT rules and catalogue — a read-only mirror of the platform's source of truth (fpt-platform/packages/rulebook/src/rules.ts
 * RULES_V1 «FPT one-phase evaluation → funded (2026-10)», CATALOG_V1; product names from packages/db/scripts/seed.ts PRODUCT_NAMES).
 * The site shows no rule, number or product that is not here. Values in basis points are rendered as «10 %» etc.
 */
export const RULES_V1 = {
  id: 'fpt-rules-v1',
  profitTargetBps: 1000,
  dailyLossBps: 500,
  maxLossBps: 900,
  minTradingDaysEvaluation: 5,
  minTradingDaysFunded: 10,
  evaluationDays: 31,
  maxAccountsPerClient: 10,
  inactivityDays: 30,
  inactivityWarningDay: 23,
  payoutShareBps: 8000,
  payoutCycleDays: 14,
  payoutMinCents: 100_00,
  payoutMaxPerTransactionCents: 10_000_00,
  payoutReviewBusinessDays: 2,
  payoutExecutionDays: 1,
  commissionPerLotCents: { forex: 500, metals: 500 },
  leverage: { forex: 100, metals: 20, indices: 30, energy: 10, crypto: 2 },
  newsWindowMinutes: 5,
  newsProfitCapBps: 100,
  swapFree: true,
  scalingEnabled: false,
};

/** Catalogue version 1: sizes and one-time fees (USD cents) — CATALOG_V1. */
export const CATALOG_V1 = [
  { code: 'fpt-10k', sizeCents: 10_000_00, priceCents: 90_00 },
  { code: 'fpt-25k', sizeCents: 25_000_00, priceCents: 160_00 },
  { code: 'fpt-50k', sizeCents: 50_000_00, priceCents: 280_00 },
  { code: 'fpt-100k', sizeCents: 100_000_00, priceCents: 540_00 },
  { code: 'fpt-200k', sizeCents: 200_000_00, priceCents: 1_070_00 },
];

/** Affiliate tiers — packages/db/scripts/seed.ts TIERS (commission on monthly sales). */
export const AFFILIATE_TIERS = [
  { code: 't1', min: 1, max: 9, bps: 1500, name: { ar: 'المستوى الأول (1–9 مبيعات)', en: 'Tier 1 (1–9 sales)' } },
  { code: 't2', min: 10, max: 29, bps: 1750, name: { ar: 'المستوى الثاني (10–29 مبيعات)', en: 'Tier 2 (10–29 sales)' } },
  { code: 't3', min: 30, max: null, bps: 2000, name: { ar: 'المستوى الثالث (30+ مبيعات)', en: 'Tier 3 (30+ sales)' } },
];

import { formatMoney, formatPercent } from '../lib/money.jsx';

/** «80 %» — one no-break space (RD2 rule 3.4). */
export const pct = formatPercent;
/** «50,000 USD» — the ONE money format (src/lib/money.jsx): number, no-break space, code, isolated (GLOSSARY § 6 / § 11, RD2 F-007). */
export const usd = (cents) => formatMoney(cents / 100, 'USD', 0);
export const sizeLabel = (cents) => `${Math.round(cents / 100 / 1000)}K`;
