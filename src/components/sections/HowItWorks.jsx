import { motion } from 'framer-motion';
import Section, { SectionHeader } from '../ui/Section.jsx';

const STEPS = [
  {
    num: '01',
    title: 'Choose your structure',
    body: 'Select an account size and challenge type that fits your strategy. From $5K to $200K, in 1-step, 2-step, or instant configurations.',
  },
  {
    num: '02',
    title: 'Prove your edge',
    body: 'Hit the profit target while respecting the risk parameters. Trade with conviction — the rules are the same every time.',
  },
  {
    num: '03',
    title: 'Scale with our capital',
    body: 'Get funded, trade real markets with FPT capital, and keep up to 80% of your performance. Withdraw via Fiper Card.',
  },
];

export default function HowItWorks() {
  return (
    <Section id="how-it-works">
      <SectionHeader
        eyebrow="The path to funded"
        title="From evaluation to capital. In three steps."
      />

      <div className="mt-20 grid lg:grid-cols-3 gap-6 relative">
        {/* Connector line */}
        <div className="hidden lg:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-[#F42821]/30 to-transparent" />

        {STEPS.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="relative bg-card border border-subtle rounded-2xl p-8 hover:border-white/15 transition-colors"
          >
            <div className="font-mono-num text-sm gradient-text font-bold tracking-wider">
              STEP {s.num}
            </div>
            <h3 className="mt-5 text-2xl font-semibold leading-tight">{s.title}</h3>
            <p className="mt-4 text-secondary leading-relaxed">{s.body}</p>

            <div className="absolute top-8 right-8 w-10 h-10 rounded-full gradient-red flex items-center justify-center btn-red-glow">
              <span className="font-mono-num text-sm font-bold text-white">{s.num}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
