export const ACCOUNT_SIZES = [10000, 25000, 50000, 100000, 200000];

export const FEES_USD = {
  10000: 90,
  25000: 160,
  50000: 280,
  100000: 540,
  200000: 1070,
};

export const CURRENCIES = {
  USD: { symbol: "$", code: "USD", rate: 1 },
  EUR: { symbol: "€", code: "EUR", rate: 0.92 },
  AED: { symbol: "AED ", code: "AED", rate: 3.67 },
};

export const CHALLENGE_TYPES = [
  {
    id: "2-step",
    label: "FPT Challenge",
    subtitle: "One-phase demo evaluation. Prove your skills.",
    multiplier: 1.0,
  },
  {
    id: "1-step",
    label: "Live Account",
    subtitle: "Real funded account after passing the evaluation.",
    multiplier: 1.0,
  },
];

export const BASE_RULES = {
  profitTarget: "10%",
  maxDailyLoss: "5%",
  maxLoss: "9%",
  minTradingDays: 5,
  profitShare: "80%",
  leverage: "1:100",
  refund: "Not available",
  swapFree: "Yes",
  timeLimit: "31 Days",
  minPayout: "$100",
  maxPayout: "$5,000",
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
  return `${cur.symbol}${rounded.toLocaleString("en-US")}`;
}

export function formatSize(size) {
  if (size >= 1000) return `$${(size / 1000).toFixed(0)}K`;
  return `$${size}`;
}