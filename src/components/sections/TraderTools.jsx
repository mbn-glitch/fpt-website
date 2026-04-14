import { Sparkles, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Section, { SectionHeader } from '../ui/Section.jsx';

const LEADERS = [
  { rank: 1, name: 'Ahmed M.', country: '🇦🇪', ret: '+48.2%', sharpe: '2.41' },
  { rank: 2, name: 'Yuki T.', country: '🇯🇵', ret: '+36.8%', sharpe: '2.18' },
  { rank: 3, name: 'Sarah K.', country: '🇬🇧', ret: '+31.4%', sharpe: '2.07' },
  { rank: 4, name: 'Carlos R.', country: '🇧🇷', ret: '+29.1%', sharpe: '1.96' },
];

export default function TraderTools() {
  const { t } = useTranslation();
  return (
    <Section>
      <SectionHeader
        eyebrow="Intelligence layer"
        title={t('traderTools.title')}
        subtitle={t('traderTools.subtitle')}
      />

      <div className="mt-16 grid lg:grid-cols-2 gap-6">
        {/* AI Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-card border border-subtle p-8 lg:p-10 min-h-[460px]"
        >
          <div className="absolute -top-20 -right-20 w-[300px] h-[300px] radial-red opacity-60 pointer-events-none" />

          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl gradient-red flex items-center justify-center btn-red-glow">
              <Sparkles size={20} className="text-white" />
            </div>
            <div className="mt-6 text-xs uppercase tracking-[0.18em] text-[#FCA5A5]">
              AI Performance Analysis
            </div>
            <h3 className="mt-3 text-3xl font-semibold leading-tight">
              {t('traderTools.ai.title')}
            </h3>
            <p className="mt-4 text-secondary leading-relaxed">
              {t('traderTools.ai.desc')}
            </p>

            {/* Mockup */}
            <div className="mt-8 rounded-xl border border-subtle bg-black/40 p-5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="uppercase tracking-wider text-tertiary">30-day behavior</span>
                <span className="text-[#10B981] font-mono-num">Improving</span>
              </div>
              <svg viewBox="0 0 400 80" className="mt-3 w-full h-16">
                <defs>
                  <linearGradient id="ai-chart" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F42821" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#F42821" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,65 C50,55 90,58 140,48 C190,38 230,42 280,28 C320,18 360,22 400,14 L400,80 L0,80 Z"
                  fill="url(#ai-chart)"
                />
                <path
                  d="M0,65 C50,55 90,58 140,48 C190,38 230,42 280,28 C320,18 360,22 400,14"
                  stroke="#F42821"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
              <div className="mt-4 flex items-start gap-3 rounded-lg border border-[#F42821]/20 bg-[#F42821]/5 p-3">
                <Sparkles size={14} className="text-[#FCA5A5] mt-0.5 shrink-0" />
                <p className="text-xs text-secondary leading-relaxed">
                  Your win rate drops 18% on trades held past the London-NY overlap.
                  Consider tightening your exit rules after 16:00 UTC.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Leaderboard Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative overflow-hidden rounded-3xl bg-card border border-subtle p-8 lg:p-10 min-h-[460px]"
        >
          <div className="absolute -top-20 -left-20 w-[300px] h-[300px] rounded-full pointer-events-none"
               style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%)' }}
          />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center">
              <Trophy size={20} className="text-[#D4AF37]" />
            </div>
            <div className="mt-6 text-xs uppercase tracking-[0.18em] text-[#D4AF37]">
              Trader Leaderboard
            </div>
            <h3 className="mt-3 text-3xl font-semibold leading-tight">
              {t('traderTools.leaderboard.title')}
            </h3>
            <p className="mt-4 text-secondary leading-relaxed">
              {t('traderTools.leaderboard.desc')}
            </p>

            {/* Leaderboard mockup */}
            <div className="mt-8 rounded-xl border border-subtle bg-black/40 overflow-hidden">
              <div className="grid grid-cols-[40px_1fr_80px_80px] px-4 py-2.5 text-[10px] uppercase tracking-wider text-tertiary border-b border-subtle">
                <span>#</span><span>Trader</span><span className="text-end">Return</span><span className="text-end">Sharpe</span>
              </div>
              {LEADERS.map((l) => (
                <div
                  key={l.rank}
                  className="grid grid-cols-[40px_1fr_80px_80px] items-center px-4 py-3 text-sm border-b border-subtle last:border-0"
                >
                  <span className={`font-mono-num font-semibold ${l.rank === 1 ? 'text-[#D4AF37]' : 'text-tertiary'}`}>
                    {String(l.rank).padStart(2, '0')}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-base">{l.country}</span>
                    <span className="text-white">{l.name}</span>
                  </span>
                  <span dir="ltr" className="text-end font-mono-num text-[#10B981]">{l.ret}</span>
                  <span dir="ltr" className="text-end font-mono-num text-white">{l.sharpe}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
