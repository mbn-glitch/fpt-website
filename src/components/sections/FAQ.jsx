import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Section, { SectionHeader } from '../ui/Section.jsx';

export default function FAQ() {
  const [open, setOpen] = useState(0);
  const { t } = useTranslation();

  const QAS = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
    { q: t('faq.q6'), a: t('faq.a6') },
  ];

  return (
    <Section>
      <SectionHeader
        eyebrow="Before you begin"
        title={t('faq.title')}
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
            {t('faq.seeAll')} <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </Section>
  );
}
