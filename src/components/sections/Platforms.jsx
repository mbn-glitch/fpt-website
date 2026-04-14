import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Section, { SectionHeader } from '../ui/Section.jsx';

const FEATURES = [
  'Depth of Market',
  'cBots & cAlgo',
  'Level II Pricing',
  'FIX API',
];

export default function Platforms() {
  const { t } = useTranslation();
  return (
    <Section>
      <SectionHeader
        eyebrow="Execute where you're fastest"
        title={t('platforms.title')}
        subtitle={t('platforms.subtitle')}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="mt-16 relative gradient-border rounded-3xl overflow-hidden"
      >
        <div className="relative z-10 grid lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-14 p-8 sm:p-12 lg:p-16 items-center">
          {/* Logo side */}
          <div className="relative">
            <div
              className="rounded-2xl p-10 sm:p-12 flex items-center justify-center"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(244,40,33,0.12), rgba(0,0,0,0) 70%), #0A0A0A',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <img
                src="/logos/cTrader light + safespace.png"
                alt="cTrader"
                className="w-full max-w-[280px] h-auto"
                draggable={false}
              />
            </div>
            <div className="mt-5 text-center text-xs uppercase tracking-[0.22em] text-[#FCA5A5]">
              Available on funded accounts
            </div>
          </div>

          {/* Content side */}
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-tertiary">
              Official trading platform
            </div>
            <h3 className="mt-3 text-3xl sm:text-4xl font-semibold leading-[1.1] tracking-tight">
              cTrader — the trader's terminal.
            </h3>
            <p className="mt-5 text-[15px] sm:text-base text-secondary leading-relaxed max-w-xl">
              Native depth-of-market, algorithmic execution, and
              institutional-grade order routing. Built for traders who want
              precision over familiarity.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {FEATURES.map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-subtle bg-black/40 text-xs font-medium text-secondary"
                >
                  <Check size={12} className="text-[#F42821]" />
                  {f}
                </span>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 pt-8 border-t border-subtle">
              <Metric value="μs" label="Execution latency" />
              <Metric value="Raw" label="Spreads" />
              <Metric value="1:100" label="Leverage" />
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

function Metric({ value, label }) {
  return (
    <div>
      <div dir="ltr" className="text-2xl sm:text-3xl font-semibold font-mono-num gradient-text leading-none">
        {value}
      </div>
      <div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-tertiary">
        {label}
      </div>
    </div>
  );
}
