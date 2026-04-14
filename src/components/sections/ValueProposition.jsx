import { Shield, Building2, LineChart, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import Section, { SectionHeader } from '../ui/Section.jsx';

const FEATURES = [
  {
    icon: Shield,
    title: 'Disciplined evaluation',
    body: 'A transparent path from challenge to funded account, governed by clear risk rules.',
  },
  {
    icon: Building2,
    title: 'Institutional environment',
    body: 'Raw spreads, deep liquidity, and execution built for serious volume.',
  },
  {
    icon: LineChart,
    title: 'Performance intelligence',
    body: 'A trader dashboard engineered for clarity — every metric, every position, in one place.',
  },
  {
    icon: CreditCard,
    title: 'Capital that moves with you',
    body: 'Withdraw via the Fiper Card. Spend globally. No clearing delays.',
  },
];

export default function ValueProposition() {
  return (
    <Section>
      <SectionHeader
        eyebrow="The FPT advantage"
        title={
          <>
            Most prop firms hand you an account.
            <br />
            <span className="text-secondary">We hand you an ecosystem.</span>
          </>
        }
        subtitle="FPT is built on the Fiper Global financial infrastructure — a coordinated stack of trading, capital, and payout tools that no standalone prop firm can match."
      />

      <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group relative bg-card border border-subtle rounded-2xl p-7 hover:border-white/20 transition-colors"
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center gradient-red btn-red-glow">
              <f.icon size={20} className="text-white" />
            </div>
            <h3 className="mt-6 text-lg font-semibold leading-snug">{f.title}</h3>
            <p className="mt-3 text-sm text-secondary leading-relaxed">{f.body}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
