/**
 * FPT rules and catalogue — READ FROM THE PLATFORM'S SHARED SOURCE (WEB-VIS-1, 7 Nov 2026): src/data/platform-rules.json is written by
 * scripts/sync-platform-rules.mjs from fpt-platform/packages/rulebook/src/rules.ts (RULES_V1 «FPT one-phase evaluation → funded (2026-10)», CATALOG_V1 —
 * the objects `@fpt/rulebook` exports) with the source fingerprint (file sha256, commit); `--check` in `npm run check` refuses drift. Nothing here is typed by hand.
 * The site shows no rule, number or product that is not in that JSON. Values in basis points are rendered as «10 %» etc.
 */
import platform from './platform-rules.json';

/** The fingerprint of the platform source the figures were read from (shown nowhere — for the report and the gate). */
export const PLATFORM_SOURCE = platform.fingerprint;
export const RULES_V1 = platform.data.rules;
/** Catalogue version 1: sizes and one-time fees (USD cents) — CATALOG_V1. */
export const CATALOG_V1 = platform.data.catalog;

/** Affiliate tiers — packages/db/scripts/seed.ts TIERS (commission on monthly sales; owner decision 49, 4 Nov 2026). */
export const AFFILIATE_TIERS = [
  { code: 't1', min: 1, max: 9, bps: 1500 },
  { code: 't2', min: 10, max: 29, bps: 1750 },
  { code: 't3', min: 30, max: null, bps: 2000 },   // the heading is `partners.tier.title` in the six locales (WEBL-D07) — figures from min / max
];

import { formatMoney, formatPercent } from '../lib/money.jsx';

/** «80 %» — one no-break space (RD2 rule 3.4). */
export const pct = formatPercent;
/** «50,000 USD» — the ONE money format (src/lib/money.jsx): number, no-break space, code, isolated (GLOSSARY § 6 / § 11, RD2 F-007). */
export const usd = (cents) => formatMoney(cents / 100, 'USD', 0);
/** «10,000» — an isolated bare figure for a sentence that carries the code once («from 10,000 to 200,000 USD»). */
export const usdFigure = (cents) => formatMoney(cents / 100, 'USD', 0).replace(/\s*USD(?=\u2069$)/, '');
export const sizeLabel = (cents) => `${Math.round(cents / 100 / 1000)}K`;
/** «100 – 10,000 USD» — a money range as ONE isolated unit (the payout window per request): the lower figure is prefixed inside formatMoney's isolate. */
export const usdRange = (fromCents, toCents) => formatMoney(toCents / 100, 'USD', 0).replace('\u2066', `\u2066${Number(fromCents / 100).toLocaleString('en-US')} – `);
