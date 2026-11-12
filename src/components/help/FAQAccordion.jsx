import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { renderUnits } from '../../lib/money.jsx';
import { RISK_LINE } from '../brand/RiskLine.jsx';

export default function FAQAccordion({ faqs }) {
  const [open, setOpen] = useState(null);
  const { i18n } = useTranslation();
  const lang = i18n.language?.split('-')[0] || 'en';
  const [prevLang, setPrevLang] = useState(lang);
  if (lang !== prevLang) { setPrevLang(lang); setOpen(null); }
  // WEBL-D37 (design office, 12 Nov 2026): a link to ONE question («/help/challenges-rules#what-is-the-profit-target») arrives with that
  // question OPEN — it landed folded under the header and the first thing read was the next question. The scroll itself is App's ScrollToTop
  // (the `li[id]` carries the same scroll margin as a section).
  const { hash, key } = useLocation();
  useEffect(() => {
    const id = hash ? decodeURIComponent(hash.slice(1)) : '';
    if (id && faqs.some((f) => f.id === id)) setOpen(id);
  }, [hash, key, faqs]);

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
            <div id={`${faq.id}-a`} role="region" aria-labelledby={`${faq.id}-q`} hidden={!isOpen} className="pb-5 text-base text-secondary leading-relaxed">
              {renderUnits(getAnswer(faq))}
              {/* WEBL-D22: the fixed risk line has an Arabic and an English wording only — on fr / es / pt / tr it is never inside the translated sentence:
                  its own line after the answer, marked lang="en" (the Arabic and English answers carry the line in their own language).
                  Re-check R2 (office decision ق-113): it reads as a secondary NOTE, not as a second untranslated sentence — the label step (13 px), the label
                  colour (text-tertiary), 12 px above a hairline + 12 px under it, and a closing full stop (the wording itself stays RISK_LINE.en). */}
              {faq.fixedRiskLine && lang !== 'en' && lang !== 'ar' && <span lang="en" dir="ltr" className="block mt-3 pt-3 border-t border-subtle text-[13px] text-tertiary leading-[1.5]" data-fixed-line="risk">{RISK_LINE.en}.</span>}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
