import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingDown, AlertTriangle, Calendar, Clock, Zap, Users, CalendarCheck, ArrowRight, Check, Info, DollarSign, Shield, Gift } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO.jsx';
import Section, { Eyebrow, SectionHeader } from '../components/ui/Section.jsx';
import Button from '../components/ui/Button.jsx';
import WaveBg from '../components/ui/WaveBg.jsx';
import { ACCOUNT_SIZES, CURRENCIES, BASE_RULES, calcFee, formatCurrency, formatSize } from '../data/pricing.js';

export default function ChallengePricing() {
  const { t } = useTranslation();
  const [sizeIdx, setSizeIdx] = useState(2);
  const [currency, setCurrency] = useState('USD');
  const size = ACCOUNT_SIZES[sizeIdx];
  const fee = calcFee(size, currency, '2-step');

  const PHASES = [
    {
      step: '01', color: '#F42821',
      label: t('challengePricing.phase1Label'),
      subtitle: t('challengePricing.phase1Subtitle'),
      rules: [
        { label: t('challengePricing.profitTarget'), value: '10%', highlight: true },
        { label: t('challengePricing.maxDailyLoss'), value: '5%' },
        { label: t('challengePricing.maxLoss'), value: '9%' },
        { label: t('challengePricing.rules.minDaysPhase1'), value: '5' },
        { label: t('challengePricing.timeLimit'), value: '31 Days' },
      ],
    },
    {
      step: '02', color: '#10B981',
      label: t('challengePricing.phase2Label'),
      subtitle: t('challengePricing.phase2Subtitle'),
      rules: [
        { label: t('challengePricing.profitShare'), value: '80%', highlight: true },
        { label: t('challengePricing.maxDailyLoss'), value: '5%' },
        { label: t('challengePricing.maxLoss'), value: '9%' },
        { label: t('challengePricing.rules.minDaysFunded'), value: '10' },
        { label: 'Max Daily Payouts', value: '5x' },
      ],
    },
  ];

  const RULES_GRID = [
    { icon: Target,        key: t('challengePricing.rules.profitTarget'),    value: '10%' },
    { icon: TrendingDown,  key: t('challengePricing.rules.dailyDrawdown'),   value: '5%' },
    { icon: AlertTriangle, key: t('challengePricing.rules.maxDrawdown'),     value: '9%' },
    { icon: Calendar,      key: t('challengePricing.rules.minDaysPhase1'),   value: '5 Days' },
    { icon: CalendarCheck, key: t('challengePricing.rules.minDaysFunded'),   value: '10 Days' },
    { icon: Clock,         key: t('challengePricing.rules.timeLimit'),       value: '31 Days' },
    { icon: Zap,           key: t('challengePricing.rules.leverageForex'),   value: '1:100' },
    { icon: Users,         key: t('challengePricing.rules.maxAccounts'),     value: '10' },
    { icon: Shield,        key: t('challengePricing.rules.swapFree'),        value: 'Yes' },
    { icon: DollarSign,    key: t('challengePricing.rules.minPayout'),       value: '$100' },
    { icon: Gift,          key: t('challengePricing.rules.maxPayout'),       value: '$5,000' },
    { icon: Check,         key: t('challengePricing.rules.profitShare'),     value: '80%' },
  ];

  const LEVERAGE_TABLE = [
    { asset: t('challengePricing.leverage.forex'),       leverage: '1:100' },
    { asset: t('challengePricing.leverage.metals'),      leverage: '1:20' },
    { asset: t('challengePricing.leverage.indices'),     leverage: '1:30' },
    { asset: t('challengePricing.leverage.commodities'), leverage: '1:10' },
    { asset: t('challengePricing.leverage.crypto'),      leverage: '1:2' },
  ];

  return (
    <>
      <SEO title={t('challengePricing.challengeLabel')} path="/pricing"
        description="FPT challenge rules and pricing from $10K to $200K."
        keywords="prop trading challenge, FPT pricing, funded account" />

      <section className="relative pt-36 sm:pt-44 pb-20 overflow-hidden">
        <WaveBg opacity={0.25} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] radial-red pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-6 sm:px-8 text-center">
          <Eyebrow dot>{t('challengePricing.eyebrow')}</Eyebrow>
          <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-[0.98] tracking-tight">
            {t('challengePricing.heroTitle1')}<br />
            <span className="gradient-text">{t('challengePricing.heroTitle2')}</span>
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
            {t('challengePricing.heroSubtitle')}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="https://crm.fptraders.com/register" external size="lg">
              {t('challengePricing.startChallenge')} <ArrowRight size={18} />
            </Button>
            <Button href="https://crm.fptraders.com/login" external variant="ghost" size="lg">
              {t('challengePricing.signIn')}
            </Button>
          </div>
        </div>
      </section>

      <Section className="bg-[#0A0A0A]">
        <SectionHeader eyebrow={t('challengePricing.howItWorksEyebrow')} title={t('challengePricing.howItWorksTitle')} subtitle={t('challengePricing.howItWorksSubtitle')} />
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {PHASES.map((phase, i) => (
            <motion.div key={phase.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative rounded-2xl p-8 ${i === 0 ? 'gradient-border' : 'bg-card border border-subtle'}`}>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-4xl font-bold font-mono-num" style={{ color: phase.color, opacity: 0.4 }}>{phase.step}</span>
                  <div>
                    <h3 className="text-xl font-semibold">{phase.label}</h3>
                    <p className="text-sm text-secondary mt-1">{phase.subtitle}</p>
                  </div>
                </div>
                <div className="space-y-3 pt-5 border-t border-subtle">
                  {phase.rules.map((r) => (
                    <div key={r.label} className="flex items-center justify-between text-sm">
                      <span className="text-secondary">{r.label}</span>
                      <span className={`font-mono-num font-semibold ${r.highlight ? 'text-[#D4AF37]' : 'text-white'}`}>{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow={t('challengePricing.pricingEyebrow')} title={t('challengePricing.pricingTitle')} subtitle={t('challengePricing.pricingSubtitle')} />
        <div className="mt-14 bg-[#0A0A0A] border border-subtle rounded-3xl p-6 sm:p-10">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10">
            <div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-tertiary">{t('challengePricing.accountSize')}</div>
                  <div className="mt-2 text-5xl sm:text-6xl font-semibold font-mono-num gradient-text leading-none">{formatSize(size)}</div>
                </div>
                {sizeIdx === 2 && <span className="text-[10px] font-bold uppercase tracking-[0.15em] bg-[#D4AF37] text-black px-3 py-1.5 rounded-full">{t('challengePricing.mostPopular')}</span>}
              </div>
              <input type="range" min={0} max={ACCOUNT_SIZES.length - 1} step={1} value={sizeIdx}
                onChange={(e) => setSizeIdx(Number(e.target.value))} className="mt-8 w-full" style={{ accentColor: '#F42821' }} />
              <div className="mt-3 flex justify-between text-xs font-mono-num text-tertiary">
                {ACCOUNT_SIZES.map((s, i) => (
                  <button key={s} onClick={() => setSizeIdx(i)} className={`transition-colors hover:text-white ${sizeIdx === i ? 'text-[#F42821] font-semibold' : ''}`}>
                    {formatSize(s)}
                  </button>
                ))}
              </div>
              <div className="mt-10">
                <div className="text-xs uppercase tracking-[0.18em] text-tertiary mb-3">{t('challengePricing.currencyLabel')}</div>
                <div className="inline-flex p-1 rounded-full bg-black/60 border border-subtle">
                  {Object.keys(CURRENCIES).map((c) => (
                    <button key={c} onClick={() => setCurrency(c)} className={`px-5 py-2 rounded-full text-sm font-mono-num transition-all ${currency === c ? 'gradient-red text-white' : 'text-secondary hover:text-white'}`}>{c}</button>
                  ))}
                </div>
                {currency !== 'USD' && <p className="mt-3 text-[11px] text-tertiary flex items-center gap-1.5"><Info size={12} /> {t('challengePricing.convertedNote')}</p>}
              </div>
            </div>
            <div className="relative gradient-border rounded-3xl p-8 sm:p-10">
              <div className="relative z-10">
                <div className="text-xs uppercase tracking-[0.18em] text-[#FCA5A5]">{t('challengePricing.challengeLabel')}</div>
                <h2 className="mt-2 text-3xl font-semibold">{formatSize(size)} {t('challengePricing.accountLabel')}</h2>
                <div className="mt-6 flex items-baseline gap-3">
                  <span className="text-5xl sm:text-6xl font-semibold font-mono-num text-white">{formatCurrency(fee, currency)}</span>
                  <span className="text-secondary text-sm">{currency} · {t('challengePricing.oneTime')}</span>
                </div>
                <div className="mt-8 space-y-3">
                  {[
                    { k: t('challengePricing.accountSizeLabel'), v: `$${size.toLocaleString('en-US')}` },
                    { k: t('challengePricing.profitTarget'), v: BASE_RULES.profitTarget },
                    { k: t('challengePricing.maxDailyLoss'), v: BASE_RULES.maxDailyLoss },
                    { k: t('challengePricing.maxLoss'), v: BASE_RULES.maxLoss },
                    { k: t('challengePricing.timeLimit'), v: BASE_RULES.timeLimit || '31 Days' },
                    { k: t('challengePricing.profitShare'), v: BASE_RULES.profitShare, gold: true },
                    { k: t('challengePricing.swapFree'), v: BASE_RULES.swapFree || 'Yes' },
                  ].map(({ k, v, gold }) => (
                    <div key={k} className="flex items-center justify-between py-2.5 border-b border-subtle last:border-0">
                      <div className="flex items-center gap-3"><Check size={14} className="text-[#F42821]" /><span className="text-sm text-secondary">{k}</span></div>
                      <span className={`text-sm font-mono-num font-medium ${gold ? 'text-[#D4AF37]' : 'text-white'}`}>{v}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Button href="https://crm.fptraders.com/register" external size="lg" className="w-full">
                    {t('challengePricing.getStarted')} — {formatSize(size)} <ArrowRight size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {ACCOUNT_SIZES.map((s, i) => {
            const isPopular = s === 50000;
            const price = calcFee(s, currency, '2-step');
            return (
              <button key={s} onClick={() => setSizeIdx(i)} className={`relative text-start rounded-2xl p-5 transition-all ${sizeIdx === i ? 'gradient-border' : isPopular ? 'bg-card border border-[#D4AF37]/30 hover:-translate-y-0.5' : 'bg-card border border-subtle hover:border-white/15 hover:-translate-y-0.5'}`}>
                {isPopular && <span className="absolute -top-2 right-3 text-[9px] font-bold uppercase tracking-[0.15em] bg-[#D4AF37] text-black px-2 py-0.5 rounded-full">{t('challengePricing.mostPopular')}</span>}
                <div className="relative z-10">
                  <div className="text-xs text-tertiary">{t('challengePricing.accountLabel')}</div>
                  <div className="mt-1 text-2xl font-semibold font-mono-num gradient-text">{formatSize(s)}</div>
                  <div className="mt-3 pt-3 border-t border-subtle">
                    <div className="text-xs text-tertiary">{t('challengePricing.feeLabel')}</div>
                    <div className="mt-0.5 text-base font-semibold font-mono-num">{formatCurrency(price, currency)}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </Section>

      <Section className="bg-[#0A0A0A]">
        <SectionHeader eyebrow={t('challengePricing.rulesEyebrow')} title={t('challengePricing.rulesTitle')} subtitle={t('challengePricing.rulesSubtitle')} />
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RULES_GRID.map((r) => (
            <div key={r.key} className="bg-card border border-subtle rounded-xl p-6 hover:border-white/15 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-subtle flex items-center justify-center"><r.icon size={18} className="text-[#F42821]" /></div>
              <div className="mt-5 text-xs uppercase tracking-wider text-tertiary">{r.key}</div>
              <div className="mt-1 text-base font-semibold font-mono-num text-white" dir="ltr">{r.value}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex items-start gap-4 rounded-xl border border-[#D4AF37]/25 bg-[#D4AF37]/5 p-6 max-w-4xl">
          <AlertTriangle size={20} className="text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-sm text-secondary leading-relaxed">{t('challengePricing.rulesWarning')}</p>
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow={t('challengePricing.leverageEyebrow')} title={t('challengePricing.leverageTitle')} />
        <div className="mt-12 max-w-lg mx-auto rounded-2xl border border-subtle overflow-hidden">
          <div className="grid grid-cols-2 px-6 py-3 bg-black/60 border-b border-subtle text-xs uppercase tracking-wider text-tertiary">
            <span>{t('challengePricing.instrument')}</span>
            <span className="text-right">{t('challengePricing.maxLeverage')}</span>
          </div>
          {LEVERAGE_TABLE.map((row, i) => (
            <div key={row.asset} className={`grid grid-cols-2 px-6 py-4 text-sm border-b border-subtle last:border-0 ${i % 2 === 0 ? 'bg-black/20' : ''}`}>
              <span className="text-secondary">{row.asset}</span>
              <span className="text-right font-mono-num font-semibold text-white">{row.leverage}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute inset-0 radial-red opacity-40 pointer-events-none" />
        <div className="relative text-center max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-semibold leading-tight">{t('challengePricing.ctaTitle')}</h2>
          <p className="mt-6 text-lg text-secondary">{t('challengePricing.ctaSubtitle')}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="https://crm.fptraders.com/register" external size="lg">
              {t('challengePricing.startYourChallenge')} <ArrowRight size={18} />
            </Button>
            <Button href="https://crm.fptraders.com/login" external variant="ghost" size="lg">
              {t('challengePricing.signIn')}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}