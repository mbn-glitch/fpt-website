// Single source of truth for account sizes and fees.
// Prices provided by the user; update here when finalized.

export const ACCOUNT_SIZES = [5000, 10000, 25000, 50000, 100000, 200000];

export const FEES_USD = {
  5000: 55,
  10000: 110,
  25000: 275,
  50000: 555,
  100000: 1110,
  200000: 2220,
};

// Currency conversion rates (placeholders — swap with live rates when available).
export const CURRENCIES = {
  USD: { symbol: '$', code: 'USD', rate: 1 },
  EUR: { symbol: '€', code: 'EUR', rate: 0.92 },
  AED: { symbol: 'AED ', code: 'AED', rate: 3.67 },
};

export const CHALLENGE_TYPES = [
  {
    id: '2-step',
    label: '2-Step Challenge',
    subtitle: 'Structured. Two phases. Standard path.',
    multiplier: 1.0,
  },
  {
    id: '1-step',
    label: '1-Step Challenge',
    subtitle: 'Faster. Single evaluation.',
    multiplier: 1.2,
  },
  {
    id: 'instant',
    label: 'Instant Funding',
    subtitle: 'No evaluation. Trade capital immediately.',
    multiplier: 1.8,
  },
];

export const BASE_RULES = {
  profitTarget: '10%',
  maxDailyLoss: '5%',
  maxLoss: '9%',
  minTradingDays: 5,
  profitShare: '80%',
  leverage: '1:100',
  refund: 'Not available',
};

export function calcFee(size, currency, typeId) {
  const usd = FEES_USD[size];
  const type = CHALLENGE_TYPES.find((t) => t.id === typeId) || CHALLENGE_TYPES[0];
  const feeUsd = usd * type.multiplier;
  const cur = CURRENCIES[currency] || CURRENCIES.USD;
  return feeUsd * cur.rate;
}

export function formatCurrency(amount, currencyCode) {
  const cur = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const rounded = amount >= 100 ? Math.round(amount) : Math.round(amount * 100) / 100;
  return `${cur.symbol}${rounded.toLocaleString('en-US')}`;
}

export function formatSize(size) {
  if (size >= 1000) return `$${(size / 1000).toFixed(0)}K`;
  return `$${size}`;
}
