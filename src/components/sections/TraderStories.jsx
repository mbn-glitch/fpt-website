import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Section, { SectionHeader } from '../ui/Section.jsx';

const STORIES = [
  {
    initials: 'AM', name: 'Ahmed M.', country: 'UAE', flag: '🇦🇪',
    profit: 24800, strategy: 'Swing trader on majors',
    quote: "FPT's structure is what separated me from breakeven.",
  },
  {
    initials: 'SK', name: 'Sarah K.', country: 'UK', flag: '🇬🇧',
    profit: 18300, strategy: 'Index futures specialist',
    quote: 'The dashboard is the most honest mirror I\'ve used.',
  },
  {
    initials: 'CR', name: 'Carlos R.', country: 'Brazil', flag: '🇧🇷',
    profit: 31200, strategy: 'Day trader, gold and oil',
    quote: 'Payout hit my Fiper Card the same week. That\'s it.',
  },
  {
    initials: 'YT', name: 'Yuki T.', country: 'Japan', flag: '🇯🇵',
    profit: 15600, strategy: 'Algorithmic on cTrader',
    quote: 'The leverage and the rules align with how I model risk.',
  },
  {
    initials: 'MA', name: 'Mohammed A.', country: 'Saudi Arabia', flag: '🇸🇦',
    profit: 42100, strategy: 'Multi-account swing',
    quote: 'Ten accounts, one philosophy. FPT lets me scale my edge.',
  },
  {
    initials: 'EP', name: 'Elena P.', country: 'Spain', flag: '🇪🇸',
    profit: 9400, strategy: 'News and event trader',
    quote: 'Clean execution during NFP. That\'s what I needed.',
  },
];

export default function TraderStories() {
  const { t } = useTranslation();
  return (
    <Section className="bg-[#0A0A0A]">
      <SectionHeader
        eyebrow="Trader stories"
        title={t('traderStories.title')}
        subtitle={t('traderStories.subtitle')}
      />

      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {STORIES.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="bg-card border border-subtle rounded-2xl p-7 hover:border-white/15 transition-colors flex flex-col"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full gradient-red flex items-center justify-center font-semibold text-white">
                {s.initials}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{s.name}</span>
                  <span className="text-base">{s.flag}</span>
                </div>
                <div className="text-xs text-tertiary">{s.country}</div>
              </div>
            </div>

            <div className="mt-6 pb-6 border-b border-subtle">
              <div className="text-[10px] uppercase tracking-wider text-tertiary">Profit paid out</div>
              <div dir="ltr" className="mt-1 text-3xl font-semibold font-mono-num text-[#D4AF37]">
                ${s.profit.toLocaleString('en-US')}
              </div>
              <div className="mt-2 text-xs text-secondary">{s.strategy}</div>
            </div>

            <blockquote className="mt-6 text-sm italic text-secondary leading-relaxed">
              "{s.quote}"
            </blockquote>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
