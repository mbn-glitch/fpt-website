import {
  Rocket,
  Target,
  TrendingUp,
  CreditCard,
  LineChart,
  Settings,
  Monitor,
  Scale,
} from 'lucide-react';

export const categories = [
  {
    id: 'getting-started',
    slug: 'getting-started',
    icon: Rocket,
    title: 'Getting Started',
    description: 'Everything you need to begin your FPT journey.',
  },
  {
    id: 'challenges-rules',
    slug: 'challenges-rules',
    icon: Target,
    title: 'Challenges & Rules',
    description: 'Clear targets. Defined limits. No surprises.',
  },
  {
    id: 'funded-accounts',
    slug: 'funded-accounts',
    icon: TrendingUp,
    title: 'Funded Accounts',
    description: 'What happens after you pass the evaluation.',
  },
  {
    id: 'payouts-fiper-card',
    slug: 'payouts-fiper-card',
    icon: CreditCard,
    title: 'Payouts & Fiper Card',
    description: 'From screen to spend. How you access your earnings.',
  },
  {
    id: 'trading-conditions',
    slug: 'trading-conditions',
    icon: LineChart,
    title: 'Trading Conditions',
    description: 'The environment you trade in.',
  },
  {
    id: 'account-management',
    slug: 'account-management',
    icon: Settings,
    title: 'Account Management',
    description: 'Managing your accounts, resets, and activity.',
  },
  {
    id: 'technical-platform',
    slug: 'technical-platform',
    icon: Monitor,
    title: 'Technical & Platform',
    description: 'Platforms, logins, and support for technical issues.',
  },
  {
    id: 'legal-general',
    slug: 'legal-general',
    icon: Scale,
    title: 'Legal & General',
    description: 'Regulatory, legal, and structural information.',
  },
];

export const faqs = [
  // Getting Started
  {
    id: 'what-is-fpt',
    categoryId: 'getting-started',
    question: 'What is FPT?',
    answer:
      'FPT (Fiper Pro Traders) is a proprietary trading program that provides traders with access to funded accounts through a structured evaluation process. It is the prop trading division of Fiper Global.',
  },
  {
    id: 'how-do-i-start',
    categoryId: 'getting-started',
    question: 'How do I start?',
    answer:
      'Select your preferred account size, purchase a challenge, and begin trading immediately. Login credentials are delivered to your email within minutes of payment.',
    popular: true,
  },
  {
    id: 'do-i-need-prior-experience',
    categoryId: 'getting-started',
    question: 'Do I need prior experience?',
    answer:
      'Yes. FPT is built for traders who already understand core market concepts, order execution, and risk management. It is not a beginner training program.',
  },
  {
    id: 'how-do-i-receive-my-account',
    categoryId: 'getting-started',
    question: 'How do I receive my account?',
    answer:
      'Login credentials are sent to your registered email instantly after your challenge purchase is completed. Check your inbox — and spam folder — if it does not appear within 5 minutes.',
  },
  {
    id: 'how-much-does-a-challenge-cost',
    categoryId: 'getting-started',
    question: 'How much does a challenge cost?',
    answer:
      'Challenge fees start at $55 for a $5K account and scale with account size, up to $2,220 for a $200K account. The $50K challenge at $555 is our most chosen tier. Full pricing is available on the Pricing page.',
    popular: true,
  },
  {
    id: 'what-trading-styles-work-best',
    categoryId: 'getting-started',
    question: 'What trading styles work best with FPT?',
    answer:
      'FPT accommodates scalping, day trading, swing trading, and algorithmic execution via EAs. High-frequency trading and arbitrage strategies are not permitted.',
  },
  {
    id: 'can-i-test-a-demo-account',
    categoryId: 'getting-started',
    question: 'Can I test a demo account before purchasing?',
    answer:
      'FPT does not offer a free demo of the funded program. However, all challenge accounts operate in a simulated environment — purchasing a challenge is the equivalent of starting a monitored demo with the opportunity to earn.',
  },

  // Challenges & Rules
  {
    id: 'what-is-the-profit-target',
    categoryId: 'challenges-rules',
    question: 'What is the profit target?',
    answer: '10% of the starting account balance during the evaluation phase.',
    popular: true,
  },
  {
    id: 'what-is-the-maximum-daily-loss',
    categoryId: 'challenges-rules',
    question: 'What is the maximum daily loss?',
    answer:
      '5% of the account balance. This is measured from the previous day\u2019s closing equity.',
  },
  {
    id: 'what-is-the-maximum-total-drawdown',
    categoryId: 'challenges-rules',
    question: 'What is the maximum total drawdown?',
    answer:
      '9% of the initial account balance, measured from the starting equity.',
  },
  {
    id: 'how-is-drawdown-calculated',
    categoryId: 'challenges-rules',
    question: 'How is drawdown calculated — based on equity or balance?',
    answer:
      'The daily drawdown is measured against the previous day\u2019s closing equity. The maximum drawdown is calculated from the initial account balance. Both include unrealized P&L from open positions.',
  },
  {
    id: 'does-daily-drawdown-reset',
    categoryId: 'challenges-rules',
    question: 'Does the daily drawdown reset each day?',
    answer:
      'Yes. The 5% daily drawdown limit resets at the end of each trading day (server time). Your new threshold is based on the higher of either your starting balance or the prior day\u2019s closing equity.',
  },
  {
    id: 'what-counts-as-a-trading-day',
    categoryId: 'challenges-rules',
    question: 'What counts as a trading day?',
    answer:
      'A trading day is any 24-hour period in which you open at least one position. Weekend days and days with no trade activity do not count toward your minimum trading day requirement.',
  },
  {
    id: 'what-are-the-minimum-trading-days',
    categoryId: 'challenges-rules',
    question: 'What are the minimum trading days?',
    answer:
      'Phase 1 evaluation requires a minimum of 5 trading days. Funded accounts require a minimum of 10 trading days before a payout request is eligible.',
  },
  {
    id: 'is-there-a-time-limit',
    categoryId: 'challenges-rules',
    question: 'Is there a time limit?',
    answer:
      'Yes. A defined trading period applies to the evaluation phase. The exact duration is specified in your challenge dashboard at purchase.',
  },
  {
    id: 'what-happens-if-i-break-a-rule',
    categoryId: 'challenges-rules',
    question: 'What happens if I break a rule?',
    answer:
      'The account is marked as failed and trading access is revoked. The challenge fee is non-refundable.',
    popular: true,
  },
  {
    id: 'can-i-try-again-if-i-fail',
    categoryId: 'challenges-rules',
    question: 'Can I try again if I fail?',
    answer:
      'Yes. You can purchase a new challenge at any time. There is no waiting period between attempts.',
  },
  {
    id: 'is-there-a-refund',
    categoryId: 'challenges-rules',
    question: 'Is there a refund?',
    answer:
      'No. All challenge fees are one-time and non-refundable. Your return is earned through your funded account performance, not from the fee structure.',
  },

  // Funded Accounts
  {
    id: 'what-happens-after-i-pass',
    categoryId: 'funded-accounts',
    question: 'What happens after I pass?',
    answer:
      'Your account enters a verification and review process. Once cleared, you gain access to a funded account under FPT capital.',
  },
  {
    id: 'how-long-does-activation-take',
    categoryId: 'funded-accounts',
    question: 'How long does activation take?',
    answer:
      'Up to 2 business days for review, plus 1 business day for activation. Most traders are live within 72 hours of passing the evaluation.',
    popular: true,
  },
  {
    id: 'how-much-profit-can-i-keep',
    categoryId: 'funded-accounts',
    question: 'How much profit can I keep?',
    answer:
      'You receive up to 80% of the net profit generated on your funded account. FPT retains the remaining 20%.',
    popular: true,
  },
  {
    id: 'can-i-have-multiple-funded-accounts',
    categoryId: 'funded-accounts',
    question: 'Can I have multiple funded accounts?',
    answer:
      'Yes. Each trader can operate up to 10 active funded accounts simultaneously.',
  },
  {
    id: 'do-funded-accounts-follow-same-rules',
    categoryId: 'funded-accounts',
    question: 'Do funded accounts follow the same rules as the evaluation?',
    answer:
      'The core risk parameters remain — daily drawdown, maximum drawdown, and minimum trading days. The profit target no longer applies, as you are now operating under funded conditions.',
  },
  {
    id: 'is-there-a-scaling-plan',
    categoryId: 'funded-accounts',
    question: 'Is there a scaling plan as I grow?',
    answer:
      'Scaling opportunities are available for consistent performers. Specific criteria and account size expansions are communicated directly through your FPT dashboard.',
  },

  // Payouts & Fiper Card
  {
    id: 'when-can-i-withdraw-profits',
    categoryId: 'payouts-fiper-card',
    question: 'When can I withdraw profits?',
    answer:
      'Payouts can be requested every 14 days, starting from your first qualifying trade on the funded account.',
    popular: true,
  },
  {
    id: 'what-payout-methods-are-available',
    categoryId: 'payouts-fiper-card',
    question: 'What payout methods are available?',
    answer:
      'Profits can be disbursed via cryptocurrency, bank transfer, card, or internal transfer to a Fiper account.',
  },
  {
    id: 'can-i-access-my-funds-faster',
    categoryId: 'payouts-fiper-card',
    question: 'Can I access my funds faster?',
    answer:
      'Yes. An internal transfer to your Fiper account is the fastest route — funds are typically available in the same session. From there, you can spend directly using the Fiper Card.',
  },
  {
    id: 'what-is-the-fiper-card',
    categoryId: 'payouts-fiper-card',
    question: 'What is the Fiper Card?',
    answer:
      'The Fiper Card is a payment solution from the Fiper Global ecosystem. It allows you to spend your profits in real life — online or in-store — through a virtual or physical card.',
  },
  {
    id: 'how-do-i-get-the-fiper-card',
    categoryId: 'payouts-fiper-card',
    question: 'How do I get the Fiper Card?',
    answer:
      'Create a Fiper account through the Fiper Global platform, then issue your card directly from the dashboard. Virtual cards activate in minutes; physical cards are shipped to eligible regions.',
  },
  {
    id: 'can-i-use-my-fpt-profits-with-the-card',
    categoryId: 'payouts-fiper-card',
    question: 'Can I use my FPT profits with the card?',
    answer:
      'Yes. Transfer your FPT balance to your linked Fiper account, then access the funds instantly via your Fiper Card.',
  },
  {
    id: 'is-the-card-available-worldwide',
    categoryId: 'payouts-fiper-card',
    question: 'Is the card available worldwide?',
    answer:
      'The Fiper Card supports global usage anywhere VISA is accepted. Physical card shipping is available in select markets.',
  },

  // Trading Conditions
  {
    id: 'what-leverage-do-you-offer',
    categoryId: 'trading-conditions',
    question: 'What leverage do you offer?',
    answer:
      'Up to 1:100, depending on the instrument. Leverage varies by asset class and current market conditions.',
  },
  {
    id: 'what-instruments-can-i-trade',
    categoryId: 'trading-conditions',
    question: 'What instruments can I trade?',
    answer:
      'FX majors and minors, indices, commodities (metals and energies), and select cryptocurrency pairs. The full instrument list is available inside your trading dashboard.',
  },
  {
    id: 'what-are-the-spreads-and-commissions',
    categoryId: 'trading-conditions',
    question: 'What are the spreads and commissions?',
    answer:
      'FPT provides raw institutional spreads sourced from liquidity providers, with a standard commission per lot. Exact values vary by instrument and are displayed in real time on your platform.',
  },
  {
    id: 'can-i-use-expert-advisors',
    categoryId: 'trading-conditions',
    question: 'Can I use Expert Advisors (EAs)?',
    answer:
      'Yes. Automated trading via EAs is permitted under standard trading conditions.',
  },
  {
    id: 'is-high-frequency-trading-allowed',
    categoryId: 'trading-conditions',
    question: 'Is high-frequency trading allowed?',
    answer:
      'No. HFT strategies, arbitrage, tick scalping, and latency-based strategies are not permitted.',
  },
  {
    id: 'is-hedging-allowed',
    categoryId: 'trading-conditions',
    question: 'Is hedging allowed?',
    answer:
      'Yes. Hedging within a single account is permitted. Hedging across multiple FPT accounts is not allowed.',
  },
  {
    id: 'is-martingale-or-grid-allowed',
    categoryId: 'trading-conditions',
    question: 'Is martingale or grid trading allowed?',
    answer:
      'These strategies are permitted, but they must respect the maximum drawdown and daily loss limits. Excessive risk concentration may trigger a manual review.',
  },
  {
    id: 'can-i-trade-during-news',
    categoryId: 'trading-conditions',
    question: 'Can I trade during news?',
    answer:
      'Yes, with one limitation: trades opened or closed within 5 minutes before or after a high-impact news release are capped at 1% profit of the account balance.',
  },
  {
    id: 'what-happens-if-i-exceed-news-limit',
    categoryId: 'trading-conditions',
    question: 'What happens if I exceed this news trading limit?',
    answer:
      'The excess profit is removed from your account without any additional penalty. Your account status remains unchanged.',
  },
  {
    id: 'can-i-hold-trades-overnight',
    categoryId: 'trading-conditions',
    question: 'Can I hold trades overnight or over the weekend?',
    answer:
      'Yes. Overnight and weekend positions are permitted across all account types.',
  },

  // Account Management
  {
    id: 'how-many-accounts-can-i-have',
    categoryId: 'account-management',
    question: 'How many accounts can I have?',
    answer: 'Up to 10 active accounts per verified trader.',
  },
  {
    id: 'what-happens-if-i-dont-trade',
    categoryId: 'account-management',
    question: 'What happens if I don\u2019t trade?',
    answer:
      'Accounts inactive for 30 consecutive days may be terminated. Re-activation is at FPT\u2019s discretion.',
  },
  {
    id: 'can-i-reset-my-account',
    categoryId: 'account-management',
    question: 'Can I reset my account?',
    answer:
      'No reset option is included with any challenge. If your account fails, you must purchase a new challenge to continue.',
  },
  {
    id: 'can-i-transfer-my-account',
    categoryId: 'account-management',
    question: 'Can I transfer my account to another person?',
    answer:
      'No. Accounts are bound to the verified identity of the registered trader and are non-transferable.',
  },

  // Technical & Platform
  {
    id: 'which-platform-do-you-use',
    categoryId: 'technical-platform',
    question: 'Which platform do you use?',
    answer:
      'FPT operates on cTrader — chosen for its institutional-grade execution, native depth-of-market, and advanced algorithmic capabilities.',
  },
  {
    id: 'what-if-i-dont-receive-my-login',
    categoryId: 'technical-platform',
    question: 'What if I don\u2019t receive my login details?',
    answer:
      'Check both your inbox and spam folder. If credentials are not received within 30 minutes of purchase, contact FPT support via live chat or email.',
  },
  {
    id: 'what-if-i-face-technical-issues',
    categoryId: 'technical-platform',
    question: 'What if I face technical issues during trading?',
    answer:
      'Reach out to support immediately through live chat or email. Document the issue with a screenshot and timestamp to expedite resolution.',
  },
  {
    id: 'do-you-support-mobile-trading',
    categoryId: 'technical-platform',
    question: 'Do you support mobile trading?',
    answer:
      'Yes. cTrader is available on iOS, Android, and web. All FPT account features are accessible from any device.',
  },

  // Legal & General
  {
    id: 'is-fpt-a-broker',
    categoryId: 'legal-general',
    question: 'Is FPT a broker?',
    answer:
      'No. FPT is a proprietary trading evaluation program, not a regulated broker. We do not hold client funds or execute retail brokerage services.',
  },
  {
    id: 'is-trading-real-or-simulated',
    categoryId: 'legal-general',
    question: 'Is trading real or simulated?',
    answer:
      'FPT provides a structured trading environment designed for evaluation and performance measurement. All accounts operate with simulated capital in live market conditions.',
  },
  {
    id: 'do-you-provide-investment-advice',
    categoryId: 'legal-general',
    question: 'Do you provide investment advice?',
    answer:
      'No. FPT does not provide investment advice, trading signals, or portfolio management. All trading decisions are the sole responsibility of the trader.',
  },
  {
    id: 'can-you-guarantee-profits',
    categoryId: 'legal-general',
    question: 'Can you guarantee profits?',
    answer:
      'No. Trading involves substantial risk, and no outcome is guaranteed. Past performance is not indicative of future results.',
  },
  {
    id: 'in-which-jurisdiction-is-fpt-registered',
    categoryId: 'legal-general',
    question: 'In which jurisdiction is FPT registered?',
    answer:
      'FPT operates under the Fiper Global corporate structure. Full entity details and registration information are available in the Legal Documentation portal.',
  },
  {
    id: 'how-is-my-personal-data-protected',
    categoryId: 'legal-general',
    question: 'How is my personal data protected?',
    answer:
      'FPT follows industry-standard data protection practices including encryption at rest and in transit. Full details are outlined in the Privacy Policy available at fiper.me/legal-documentation.',
  },
];

// Helpers
export const getCategoryBySlug = (slug) =>
  categories.find((c) => c.slug === slug);

export const getFaqsByCategory = (categoryId) =>
  faqs.filter((f) => f.categoryId === categoryId);

export const getPopularFaqs = () => faqs.filter((f) => f.popular);

export const getArticleCount = (categoryId) =>
  faqs.filter((f) => f.categoryId === categoryId).length;

// Lightweight search — returns scored top results
export function searchFaqs(query, limit = 8) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);

  const scored = faqs.map((f) => {
    const question = f.question.toLowerCase();
    const answer = f.answer.toLowerCase();
    let score = 0;
    let allInQuestion = true;
    for (const t of tokens) {
      if (question.includes(t)) score += 3;
      else allInQuestion = false;
      if (answer.includes(t)) score += 1;
    }
    if (allInQuestion && tokens.length > 1) score += 2;
    if (question.startsWith(q)) score += 2;
    return { faq: f, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.faq);
}
