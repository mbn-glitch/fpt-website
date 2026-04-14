import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, X, GitCompare, Info } from 'lucide-react';
import SEO from '../components/SEO.jsx';
import Section, { Eyebrow, SectionHeader } from '../components/ui/Section.jsx';
import Button from '../components/ui/Button.jsx';
import WaveBg from '../components/ui/WaveBg.jsx';
import {
  ACCOUNT_SIZES,
  CHALLENGE_TYPES,
  CURRENCIES,
  BASE_RULES,
  calcFee,
  formatCurrency,
  formatSize,
} from '../data/pricing.js';

export default function Pricing() {
  const [typeId, setTypeId] = useState('2-step');
  const [sizeIdx, setSizeIdx] = useState(3); // default $50K
  const [currency, setCurrency] = useState('USD');
  const [compareOpen, setCompareOpen] = useState(false);

  const size = ACCOUNT_SIZES[sizeIdx];
  const fee = calcFee(size, currency, typeId);
  const type = CHALLENGE_TYPES.find((t) => t.id === typeId);

  return (
    <>
      <SEO
        title="Pricing"
        path="/pricing"
        description="FPT evaluation fees from $5K to $200K accounts. Three challenge structures. Transparent one-time pricing in USD, EUR, GBP."
        keywords="prop firm pricing, FPT pricing, funded account cost, challenge fee"
      />
      {/* Hero */}
      <section className="relative pt-36 sm:pt-44 pb-16 overflow-hidden">
        <WaveBg opacity={0.2} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] radial-red opacity-60 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 sm:px-8 text-center">
          <Eyebrow dot>One-time entry. No retry.</Eyebrow>
          <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1] tracking-tight">
            Choose the size.
            <br />
            <span className="gradient-text">Match the conviction.</span>
          </h1>
          <p className="mt-8 text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
            Account sizes from $5K to $200K. Three challenge structures.
            Transparent terms.
          </p>

          {/* Info badges */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {['One-time fee', 'Non-refundable', 'No retry included'].map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-subtle bg-white/5 text-sm text-secondary"
              >
                <Check size={14} className="text-[#10B981]" />
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Configurator */}
      <Section className="!pt-10">
        <div className="bg-[#0A0A0A] border border-subtle rounded-3xl p-6 sm:p-10">
          {/* Tabs */}
          <div className="grid sm:grid-cols-3 gap-2 p-1 rounded-full bg-black/60 border border-subtle">
            {CHALLENGE_TYPES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTypeId(t.id)}
                className={`px-5 py-3 rounded-full text-sm font-medium transition-all ${
                  typeId === t.id
                    ? 'gradient-red text-white btn-red-glow'
                    : 'text-secondary hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm text-secondary text-center italic">{type.subtitle}</p>

          <div className="mt-10 grid lg:grid-cols-[1fr_1fr] gap-10">
            {/* Controls */}
            <div>
              {/* Slider */}
              <div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-tertiary">
                      Account size
                    </div>
                    <div className="mt-2 text-5xl sm:text-6xl font-semibold font-mono-num gradient-text leading-none">
                      {formatSize(size)}
                    </div>
                  </div>
                  {sizeIdx === 3 && (
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] bg-[#D4AF37] text-black px-3 py-1.5 rounded-full">
                      Most Popular
                    </span>
                  )}
                </div>

                <input
                  type="range"
                  min={0}
                  max={ACCOUNT_SIZES.length - 1}
                  step={1}
                  value={sizeIdx}
                  onChange={(e) => setSizeIdx(Number(e.target.value))}
                  className="mt-8 w-full accent-[#F42821]"
                  style={{ accentColor: '#F42821' }}
                />
                <div className="mt-3 flex justify-between text-xs font-mono-num text-tertiary">
                  {ACCOUNT_SIZES.map((s, i) => (
                    <button
                      key={s}
                      onClick={() => setSizeIdx(i)}
                      className={`transition-colors hover:text-white ${
                        sizeIdx === i ? 'text-[#F42821] font-semibold' : ''
                      }`}
                    >
                      {formatSize(s)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Currency switcher */}
              <div className="mt-10">
                <div className="text-xs uppercase tracking-[0.18em] text-tertiary mb-3">
                  Display currency
                </div>
                <div className="inline-flex p-1 rounded-full bg-black/60 border border-subtle">
                  {Object.keys(CURRENCIES).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={`px-5 py-2 rounded-full text-sm font-mono-num transition-all ${
                        currency === c
                          ? 'gradient-red text-white'
                          : 'text-secondary hover:text-white'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                {currency !== 'USD' && (
                  <p className="mt-3 text-[11px] text-tertiary flex items-center gap-1.5">
                    <Info size={12} /> Converted at indicative rates. Settlement in USD.
                  </p>
                )}
              </div>

              {/* Calculator */}
              <ProfitCalculator size={size} currency={currency} />
            </div>

            {/* Featured card */}
            <div className="relative">
              <div className="relative gradient-border rounded-3xl p-8 sm:p-10 h-full">
                <div className="relative z-10">
                  <div className="text-xs uppercase tracking-[0.18em] text-[#FCA5A5]">
                    {type.label}
                  </div>
                  <h2 className="mt-2 text-3xl font-semibold">{formatSize(size)} Challenge</h2>

                  <div className="mt-6 flex items-baseline gap-3">
                    <span className="text-5xl sm:text-6xl font-semibold font-mono-num text-white">
                      {formatCurrency(fee, currency)}
                    </span>
                    <span className="text-secondary text-sm">{currency} · one-time</span>
                  </div>

                  <div className="mt-8 space-y-3">
                    <FeatureRow k="Account Size" v={`$${size.toLocaleString('en-US')}`} />
                    <FeatureRow k="Profit Target" v={BASE_RULES.profitTarget} />
                    <FeatureRow k="Max Daily Loss" v={BASE_RULES.maxDailyLoss} />
                    <FeatureRow k="Max Loss" v={BASE_RULES.maxLoss} />
                    <FeatureRow k="Min Trading Days" v={BASE_RULES.minTradingDays} />
                    <FeatureRow k="Profit Share" v={BASE_RULES.profitShare} highlight />
                  </div>

                  <div className="mt-8 space-y-3">
                    <Button href="https://crm.fptraders.com/register" external size="lg" className="w-full">
                      Get Started — {formatSize(size)} <ArrowRight size={18} />
                    </Button>
                    <button
                      onClick={() => setCompareOpen(true)}
                      className="w-full h-11 inline-flex items-center justify-center gap-2 text-sm text-secondary hover:text-white border border-subtle rounded-full transition-colors"
                    >
                      <GitCompare size={14} /> Compare two plans
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* All sizes grid */}
      <Section>
        <SectionHeader
          eyebrow="Every size, side by side"
          title="The full lineup."
        />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACCOUNT_SIZES.map((s, i) => {
            const isPopular = s === 50000;
            const price = calcFee(s, currency, typeId);
            return (
              <button
                key={s}
                onClick={() => {
                  setSizeIdx(i);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`relative text-start rounded-2xl p-6 transition-all ${
                  isPopular
                    ? 'gradient-border'
                    : 'bg-card border border-subtle hover:border-white/15 hover:-translate-y-0.5'
                }`}
              >
                {isPopular && (
                  <span className="absolute -top-2 right-4 text-[10px] font-bold uppercase tracking-[0.15em] bg-[#D4AF37] text-black px-2.5 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <div className="relative z-10">
                  <div className="text-xs uppercase tracking-wider text-tertiary">Account</div>
                  <div className="mt-1 text-3xl font-semibold font-mono-num gradient-text">
                    {formatSize(s)}
                  </div>
                  <div className="mt-5 pt-5 border-t border-subtle">
                    <div className="text-xs uppercase tracking-wider text-tertiary">One-time</div>
                    <div className="mt-1 text-xl font-semibold font-mono-num">
                      {formatCurrency(price, currency)}
                    </div>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-secondary">
                    Select <ArrowRight size={12} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </Section>

      {/* Compare Modal */}
      <AnimatePresence>
        {compareOpen && (
          <CompareModal
            onClose={() => setCompareOpen(false)}
            currency={currency}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function FeatureRow({ k, v, highlight = false }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-subtle last:border-0">
      <div className="flex items-center gap-3">
        <Check size={14} className="text-[#F42821]" />
        <span className="text-sm text-secondary">{k}</span>
      </div>
      <span className={`text-sm font-mono-num font-medium ${highlight ? 'text-[#D4AF37]' : 'text-white'}`}>
        {v}
      </span>
    </div>
  );
}

function ProfitCalculator({ size, currency }) {
  const [perf, setPerf] = useState(5);

  const monthlyProfit = size * (perf / 100);
  const share = monthlyProfit * 0.8;
  const rate = CURRENCIES[currency]?.rate || 1;
  const shareLocal = share * rate;

  return (
    <div className="mt-10 rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/5 p-6">
      <div className="text-xs uppercase tracking-[0.18em] text-[#D4AF37]">
        Project your earnings
      </div>
      <h3 className="mt-2 text-2xl font-semibold">Your monthly share</h3>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-secondary">Estimated monthly performance</span>
          <span className="font-mono-num text-white">{perf}%</span>
        </div>
        <input
          type="range"
          min={1}
          max={15}
          step={0.5}
          value={perf}
          onChange={(e) => setPerf(Number(e.target.value))}
          className="mt-3 w-full"
          style={{ accentColor: '#D4AF37' }}
        />
        <div className="mt-1 flex justify-between text-[10px] font-mono-num text-tertiary">
          <span>1%</span><span>5%</span><span>10%</span><span>15%</span>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-[#D4AF37]/20">
        <div className="text-xs uppercase tracking-wider text-tertiary">
          Projected monthly share (80%)
        </div>
        <div className="mt-2 text-4xl sm:text-5xl font-semibold font-mono-num text-[#D4AF37]">
          {formatCurrency(shareLocal, currency)}
        </div>
        <p className="mt-3 text-[11px] italic text-tertiary leading-relaxed">
          Projections only. Past performance does not guarantee future results.
        </p>
      </div>
    </div>
  );
}

function CompareModal({ onClose, currency }) {
  const [a, setA] = useState({ type: '2-step', sizeIdx: 2 });
  const [b, setB] = useState({ type: '1-step', sizeIdx: 3 });

  const planA = useMemo(() => buildPlan(a, currency), [a, currency]);
  const planB = useMemo(() => buildPlan(b, currency), [b, currency]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm p-4 sm:p-8 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl mx-auto bg-[#0A0A0A] border border-subtle rounded-3xl p-6 sm:p-10"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <Eyebrow>Plan comparison</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold">Side by side.</h2>

        <div className="mt-10 grid md:grid-cols-2 gap-5">
          <PlanPicker label="Plan A" state={a} setState={setA} plan={planA} currency={currency} />
          <PlanPicker label="Plan B" state={b} setState={setB} plan={planB} currency={currency} />
        </div>

        {/* Comparison table */}
        <div className="mt-10 rounded-2xl border border-subtle overflow-hidden">
          <div className="grid grid-cols-3 px-5 py-3 bg-black/60 border-b border-subtle text-xs uppercase tracking-wider text-tertiary">
            <span>Feature</span>
            <span className="text-center">Plan A</span>
            <span className="text-center">Plan B</span>
          </div>
          {COMPARE_ROWS.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-3 px-5 py-3.5 text-sm border-b border-subtle last:border-0 ${
                i % 2 === 0 ? 'bg-black/20' : ''
              }`}
            >
              <span className="text-secondary">{row.label}</span>
              <span className="text-center font-mono-num text-white">
                {row.get(planA)}
              </span>
              <span className="text-center font-mono-num text-white">
                {row.get(planB)}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function PlanPicker({ label, state, setState, plan, currency }) {
  return (
    <div className="bg-card border border-subtle rounded-2xl p-6">
      <div className="text-xs uppercase tracking-[0.18em] text-[#FCA5A5]">{label}</div>
      <div className="mt-4 grid gap-3">
        <select
          value={state.type}
          onChange={(e) => setState((s) => ({ ...s, type: e.target.value }))}
          className="w-full bg-black/50 border border-subtle rounded-lg px-3 py-2.5 text-sm focus:border-[#F42821] outline-none"
        >
          {CHALLENGE_TYPES.map((t) => (
            <option key={t.id} value={t.id}>{t.label}</option>
          ))}
        </select>

        <div>
          <div className="flex items-center justify-between text-xs text-tertiary">
            <span>Size</span>
            <span className="font-mono-num text-white">{formatSize(ACCOUNT_SIZES[state.sizeIdx])}</span>
          </div>
          <input
            type="range"
            min={0}
            max={ACCOUNT_SIZES.length - 1}
            value={state.sizeIdx}
            onChange={(e) => setState((s) => ({ ...s, sizeIdx: Number(e.target.value) }))}
            className="w-full mt-2"
            style={{ accentColor: '#F42821' }}
          />
        </div>
      </div>

      <div className="mt-5 pt-5 border-t border-subtle">
        <div className="text-xs uppercase tracking-wider text-tertiary">One-time fee</div>
        <div className="mt-1 text-3xl font-semibold font-mono-num gradient-text">
          {formatCurrency(plan.fee, currency)}
        </div>
      </div>
    </div>
  );
}

function buildPlan({ type, sizeIdx }, currency) {
  const size = ACCOUNT_SIZES[sizeIdx];
  const typeObj = CHALLENGE_TYPES.find((t) => t.id === type);
  return {
    size,
    type: typeObj.label,
    fee: calcFee(size, currency, type),
  };
}

const COMPARE_ROWS = [
  { label: 'Challenge Type', get: (p) => p.type },
  { label: 'Account Size', get: (p) => `$${p.size.toLocaleString('en-US')}` },
  { label: 'Profit Target', get: () => '10%' },
  { label: 'Max Daily Loss', get: () => '5%' },
  { label: 'Max Loss', get: () => '9%' },
  { label: 'Min Trading Days', get: () => '5' },
  { label: 'Profit Share', get: () => '80%' },
  { label: 'Leverage', get: () => 'Up to 1:100' },
  { label: 'Refund', get: () => 'Not available' },
];
