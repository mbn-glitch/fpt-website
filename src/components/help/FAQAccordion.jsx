import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { renderUnits } from '../../lib/money.jsx';

export default function FAQAccordion({ faqs }) {
  const [open, setOpen] = useState(null);
  const { i18n } = useTranslation();
  const lang = i18n.language?.split('-')[0] || 'en';
  const [prevLang, setPrevLang] = useState(lang);
  if (lang !== prevLang) { setPrevLang(lang); setOpen(null); }

  const getQuestion = (faq) => ((lang !== 'en' && faq.questions?.[lang]) ? faq.questions[lang] : faq.question);
  const getAnswer = (faq) => ((lang !== 'en' && faq.answers?.[lang]) ? faq.answers[lang] : faq.answer);

  return (
    <ul className="divide-y divide-[var(--fpt-line-ash)] border-y border-subtle">
      {faqs.map((faq) => {
        const isOpen = open === faq.id;
        return (
          <li key={`${faq.id}-${lang}`} id={faq.id}>
            <button type="button" onClick={() => setOpen(isOpen ? null : faq.id)} className="w-full text-start min-h-14 py-4 flex items-center justify-between gap-4" aria-expanded={isOpen} aria-controls={`${faq.id}-a`} id={`${faq.id}-q`}>
              <span className="text-base font-semibold leading-[1.4]">{getQuestion(faq)}</span>
              <ChevronDown size={18} aria-hidden="true" className={`shrink-0 text-tertiary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div id={`${faq.id}-a`} role="region" aria-labelledby={`${faq.id}-q`} hidden={!isOpen} className="pb-5 text-base text-secondary leading-relaxed">{renderUnits(getAnswer(faq))}</div>
          </li>
        );
      })}
    </ul>
  );
}
