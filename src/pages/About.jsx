import { motion } from 'framer-motion';
import {
  Compass,
  ShieldCheck,
  Scale,
  Sparkles,
  TrendingUp,
  CreditCard,
  LayoutDashboard,
  ArrowRight,
} from 'lucide-react';
import SEO from '../components/SEO.jsx';
import Section, { Eyebrow, SectionHeader } from '../components/ui/Section.jsx';
import Button from '../components/ui/Button.jsx';
import WaveBg from '../components/ui/WaveBg.jsx';
import CountUp from '../components/ui/CountUp.jsx';

const PRINCIPLES = [
  {
    icon: Scale,
    title: 'Transparent terms',
    body: 'Every rule, every fee, every payout is published before you pay. No retroactive changes. No hidden clauses.',
  },
  {
    icon: ShieldCheck,
    title: 'Risk before reward',
    body: 'A trader who survives drawdowns compounds. Our rules exist to protect capital — yours and ours — not to trap you.',
  },
  {
    icon: Compass,
    title: 'One path, clearly marked',
    body: 'Evaluation, funded, payout, card. No gimmicks, no parallel product lines engineered to distract.',
  },
  {
    icon: Sparkles,
    title: 'Infrastructure over marketing',
    body: 'We invest in execution, liquidity, and dashboards — not influencer campaigns. The platform speaks for itself.',
  },
];

const STATS = [
  { value: 12, suffix: '+', label: 'Countries served' },
  { value: 80, suffix: '%', label: 'Profit share to trader' },
  { value: 3, suffix: '', label: 'Coordinated products' },
  { value: 24, suffix: '/7', label: 'Support coverage' },
];

const ECOSYSTEM = [
  {
    icon: TrendingUp,
    name: 'FPT',
    tag: 'Prop Trading',
    body: 'The evaluation, the funded account, the discipline.',
  },
  {
    icon: CreditCard,
    name: 'Fiper Card',
    tag: 'Capital Access',
    body: 'Payouts settled to a global spending card — no clearing delays.',
  },
  {
    icon: LayoutDashboard,
    name: 'Fiper CRM',
    tag: 'Command Center',
    body: 'Accounts, metrics, and payouts unified under one identity.',
  },
];

export default function About() {
  return (
    <>
      <SEO
        title="About"
        path="/about"
        description="FPT is the prop-trading arm of Fiper Global. Transparent terms, risk before reward, infrastructure over marketing."
        keywords="about Fiper Pro Traders, Fiper Global, prop firm mission, FPT company"
      />
      {/* Hero */}
      <section className="relative pt-36 sm:pt-44 pb-20 overflow-hidden">
        <WaveBg opacity={0.25} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] radial-red pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 sm:px-8 text-center">
          <Eyebrow dot>Fiper Pro Traders</Eyebrow>
          <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-[0.98] tracking-tight">
            Built for traders who
            <br />
            <span className="gradient-text">outlast the cycle.</span>
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
            FPT is the prop-trading arm of Fiper Global — a financial
            infrastructure company engineering capital, execution, and
            payouts into a single coordinated stack.
          </p>
        </div>
      </section>

      {/* Story */}
      <Section className="!pt-10">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-32">
            <Eyebrow>Our thesis</Eyebrow>
            <h2 className="mt-4 text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-tight">
              Most prop firms sell access.
              <br />
              <span className="text-secondary">We sell continuity.</span>
            </h2>
          </div>
          <div className="space-y-6 text-[17px] leading-relaxed text-secondary">
            <p>
              The prop-trading industry has spent a decade competing on
              fee discounts and flashier dashboards. The result: traders
              who pass challenges, then wait weeks for payouts that never
              quite arrive on the terms they were promised.
            </p>
            <p>
              FPT was built to remove those fractures. Evaluation sits on
              the same identity as your funded account. Your funded
              account sits on the same identity as your Fiper Card. A
              payout is not a bank wire and a hope — it is a balance
              movement inside a stack we operate end-to-end.
            </p>
            <p>
              We do not promise shortcuts. We promise that the path, once
              you start walking it, does not shift under your feet.
            </p>
          </div>
        </div>
      </Section>

      {/* Principles */}
      <Section className="bg-[#0A0A0A]">
        <SectionHeader
          eyebrow="What we hold to"
          title="Four principles. No exceptions."
          center
          className="mx-auto"
        />
        <div className="mt-16 grid sm:grid-cols-2 gap-5">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative bg-card border border-subtle rounded-2xl p-8 hover:border-white/20 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center gradient-red btn-red-glow">
                <p.icon size={22} className="text-white" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">{p.title}</h3>
              <p className="mt-3 text-[15px] text-secondary leading-relaxed">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Stats */}
      <Section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center sm:text-left border-t border-subtle pt-8"
            >
              <div className="text-5xl sm:text-6xl font-semibold gradient-text leading-none">
                <CountUp end={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-4 text-sm uppercase tracking-[0.18em] text-tertiary">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Ecosystem */}
      <Section className="bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] radial-red opacity-30 pointer-events-none" />
        <SectionHeader
          eyebrow="Part of something larger"
          title="Fiper Global, end to end."
          subtitle="FPT is one of three coordinated products operated under Fiper Global. You do not sign up with partners — you stay inside one identity."
          center
          className="mx-auto"
        />
        <div className="mt-16 grid lg:grid-cols-3 gap-5">
          {ECOSYSTEM.map((e, i) => (
            <motion.div
              key={e.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card border border-subtle rounded-2xl p-8 hover:border-white/20 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center gradient-red btn-red-glow">
                <e.icon size={22} className="text-white" />
              </div>
              <div className="mt-6 text-xs uppercase tracking-[0.18em] text-tertiary">
                {e.tag}
              </div>
              <h3 className="mt-2 text-2xl font-semibold">{e.name}</h3>
              <p className="mt-3 text-sm text-secondary leading-relaxed">{e.body}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(163,1,0,0.4) 0%, rgba(0,0,0,0) 60%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <Eyebrow>Start when you're ready</Eyebrow>
          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
            The infrastructure is built.
            <br />
            <span className="gradient-text">The next move is yours.</span>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="https://crm.fptraders.com/register" external size="lg">
              Get Started <ArrowRight size={18} />
            </Button>
            <Button to="/contact" variant="ghost" size="lg">
              Talk to the team
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
