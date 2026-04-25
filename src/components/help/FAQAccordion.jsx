import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function FAQAccordion({ faqs }) {
  const [open, setOpen] = useState(null);
  const { i18n } = useTranslation();
  const lang = i18n.language?.split('-')[0] || 'en';
  const [prevLang, setPrevLang] = useState(lang);
  if (lang !== prevLang) { setPrevLang(lang); setOpen(null); }

  const getQuestion = (faq) => (lang !== 'en' && faq.questions?.[lang]) ? faq.questions[lang] : faq.question;
  const getAnswer = (faq) => (lang !== 'en' && faq.answers?.[lang]) ? faq.answers[lang] : faq.answer;

  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <div key={`${faq.id}-${lang}`} id={faq.id} className="bg-card border border-subtle rounded-2xl overflow-hidden hover:border-white/15 transition-colors">
          <button onClick={() => setOpen(open === faq.id ? null : faq.id)} className="w-full text-left px-6 py-5 flex items-start justify-between gap-4">
            <span className="text-[15px] font-medium leading-snug">{getQuestion(faq)}</span>
            <ChevronDown size={18} className={`shrink-0 mt-0.5 text-tertiary transition-transform duration-200 ${open === faq.id ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence initial={false}>
            {open === faq.id && (
              <motion.div key="body" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: 'easeInOut' }} className="overflow-hidden">
                <div className="px-6 pb-6 text-sm text-secondary leading-relaxed border-t border-subtle pt-4">{getAnswer(faq)}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}