import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, ArrowRight } from 'lucide-react';
import Section, { SectionHeader } from '../ui/Section.jsx';

const QAS = [
  {
    q: 'What does it actually take to get funded with FPT?',
    a: 'Pass the evaluation phase by hitting a 10% profit target while respecting the 5% daily and 9% maximum drawdown limits. Trade a minimum of 5 days. That\'s the threshold.',
  },
  {
    q: 'Are challenge fees refundable?',
    a: 'No. Fees are a one-time cost of entry and are non-refundable. Your return comes from your funded account, not from the fee structure.',
  },
  {
    q: 'How long until I\'m trading FPT capital?',
    a: 'As soon as you pass the evaluation. There is no waiting period between completion and funded account activation.',
  },
  {
    q: 'How do I receive my profit share?',
    a: 'Approved profits move to your Fiper Card on a defined payout schedule. From there, withdraw or spend directly.',
  },
  {
    q: 'What can I trade?',
    a: 'FX majors and minors, indices, commodities, and select crypto pairs on MT4, MT5, or cTrader. Full instrument list inside your dashboard.',
  },
  {
    q: 'Do I need prior funded experience?',
    a: 'No. The evaluation is the qualifier — not your trading résumé. If you can navigate the rules, you can trade our capital.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <Section>
      <SectionHeader
        eyebrow="Before you begin"
        title="Direct answers. Nothing buried."
      />

      <div className="mt-16 max-w-3xl mx-auto">
        <ul className="space-y-3">
          {QAS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li
                key={i}
                className={`bg-card border rounded-2xl overflow-hidden transition-colors ${
                  isOpen ? 'border-[#F42821]/40' : 'border-subtle hover:border-white/15'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-start"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-medium">{item.q}</span>
                  <Plus
                    size={18}
                    className={`shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-45 text-[#F42821]' : 'text-secondary'
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-sm text-secondary leading-relaxed max-w-2xl">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 text-center">
          <a
            href="https://linktr.ee/fiper"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-secondary hover:text-white transition-colors"
          >
            Read the full FAQ <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </Section>
  );
}
