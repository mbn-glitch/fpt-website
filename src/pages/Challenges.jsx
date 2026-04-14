import { motion } from 'framer-motion';
import {
  Target, TrendingDown, AlertTriangle, Calendar, Clock, Zap, Users, CalendarCheck, ArrowRight,
} from 'lucide-react';
import SEO from '../components/SEO.jsx';
import Section, { Eyebrow, SectionHeader } from '../components/ui/Section.jsx';
import Button from '../components/ui/Button.jsx';
import WaveBg from '../components/ui/WaveBg.jsx';
import { CHALLENGE_TYPES } from '../data/pricing.js';

const RULES = [
  { icon: Target, label: 'Profit Target', value: '10%' },
  { icon: TrendingDown, label: 'Daily Drawdown', value: '5%' },
  { icon: AlertTriangle, label: 'Max Drawdown', value: '9%' },
  { icon: Calendar, label: 'Minimum Trading Days', value: '5 (Phase 1)' },
  { icon: CalendarCheck, label: 'Funded Minimum Days', value: '10' },
  { icon: Clock, label: 'Time Limit', value: 'Yes (during evaluation)' },
  { icon: Zap, label: 'Leverage', value: 'Up to 1:100' },
  { icon: Users, label: 'Max Accounts per Trader', value: '10' },
];

export default function Challenges() {
  return (
    <>
      <SEO
        title="Challenges"
        path="/challenges"
        description="Three structured evaluation paths to a funded FPT account. Clear rules, transparent drawdowns, cTrader execution, up to 1:100 leverage."
        keywords="prop trading challenge, 1-step challenge, 2-step evaluation, funded trader evaluation, FPT challenges"
      />
      {/* Hero */}
      <section className="relative pt-36 sm:pt-44 pb-20 overflow-hidden">
        <WaveBg opacity={0.25} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] radial-red pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 sm:px-8 text-center">
          <Eyebrow dot>The Evaluation</Eyebrow>
          <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-[0.98] tracking-tight">
            Prove the edge.
            <br />
            <span className="gradient-text">Earn the capital.</span>
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
            Three structured paths. One outcome — a funded account backed
            by Fiper Global infrastructure.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="https://crm.fptraders.com/register" external size="lg">
              Get Started <ArrowRight size={18} />
            </Button>
            <Button to="/pricing" variant="ghost" size="lg">
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      {/* Challenge Types */}
      <Section className="bg-[#0A0A0A]">
        <SectionHeader
          eyebrow="Structures"
          title="Three paths. Pick the one that fits."
        />

        <div className="mt-16 grid lg:grid-cols-3 gap-5">
          {CHALLENGE_TYPES.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 transition-all ${
                i === 0
                  ? 'gradient-border'
                  : 'bg-card border border-subtle hover:border-white/15 hover:-translate-y-1'
              }`}
            >
              <div className="relative z-10">
                {i === 0 && (
                  <span className="absolute -top-2 right-0 text-[10px] font-bold uppercase tracking-[0.15em] bg-[#D4AF37] text-black px-2.5 py-1 rounded-full">
                    Default
                  </span>
                )}
                <h3 className="text-2xl font-semibold">{t.label}</h3>
                <p className="mt-3 text-sm text-secondary leading-relaxed">{t.subtitle}</p>
                <div className="mt-6 pt-6 border-t border-subtle space-y-2.5 text-sm">
                  <Row k="Profit Target" v="10%" />
                  <Row k="Max Daily Loss" v="5%" />
                  <Row k="Max Loss" v="9%" />
                  <Row k="Profit Share" v="80%" />
                </div>
                <div className="mt-8">
                  <Button to="/pricing" variant={i === 0 ? 'primary' : 'ghost'} className="w-full">
                    Configure {t.label}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Rules Grid */}
      <Section>
        <SectionHeader
          eyebrow="Rules of the game"
          title="Clear targets. Defined limits. No surprises."
          subtitle="The full ruleset that governs every FPT evaluation and funded account."
        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RULES.map((r) => (
            <div
              key={r.label}
              className="bg-card border border-subtle rounded-xl p-6 hover:border-white/15 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-subtle flex items-center justify-center">
                <r.icon size={18} className="text-[#F42821]" />
              </div>
              <div className="mt-5 text-xs uppercase tracking-wider text-tertiary">{r.label}</div>
              <div className="mt-1 text-base font-semibold font-mono-num text-white">{r.value}</div>
            </div>
          ))}
        </div>

        {/* Callout */}
        <div className="mt-10 flex items-start gap-4 rounded-xl border border-[#D4AF37]/25 bg-[#D4AF37]/5 p-6 max-w-4xl">
          <AlertTriangle size={20} className="text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-sm text-secondary leading-relaxed">
            Trading conditions vary by instrument and live market context.
            The rules above govern the evaluation; the dashboard reflects the live state.
          </p>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute inset-0 radial-red opacity-40 pointer-events-none" />
        <div className="relative text-center max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-semibold leading-tight">
            The rules are the same every time.
          </h2>
          <p className="mt-6 text-lg text-secondary">
            Trade with conviction. The evaluation rewards discipline.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="https://crm.fptraders.com/register" external size="lg">
              Get Started
            </Button>
            <Button href="https://crm.fptraders.com/login" external variant="ghost" size="lg">
              Sign In
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

function Row({ k, v }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-secondary">{k}</span>
      <span className="font-mono-num text-white">{v}</span>
    </div>
  );
}
