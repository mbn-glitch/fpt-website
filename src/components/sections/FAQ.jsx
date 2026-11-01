import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Section, { SectionHeader } from '../ui/Section.jsx';
import useLocalizedPath from '../../hooks/useLocalizedPath.js';

/** Six list rows (.fpt-listrow, ≥ 56 px, mirrored chevron); answers verbatim from the locale (faq.a5 = cTrader only, ID-16). "See all" is a localized internal link. */
export default function FAQ() {
  const [open, setOpen] = useState(0);
  const { t } = useTranslation();
  const { to } = useLocalizedPath();

  const QAS = [1, 2, 3, 4, 5, 6].map((n) => ({ q: t(`faq.q${n}`), a: t(`faq.a${n}`) }));

  return (
    <Section aria-labelledby="faq-title">
      <SectionHeader eyebrow={t('faq.eyebrow')} title={<span id="faq-title">{t('faq.title')}</span>} />

      <div className="mt-12 max-w-3xl">
        <ul className="divide-y divide-[var(--fpt-line-ash)] border-y border-subtle">
          {QAS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 min-h-14 py-4 text-start"
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                  id={`faq-q-${i}`}
                >
                  <span className="text-base sm:text-lg font-semibold leading-[1.4]">{item.q}</span>
                  <ChevronDown size={18} aria-hidden="true" className={`shrink-0 text-fg-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} hidden={!isOpen} className="pb-5 text-base text-secondary leading-relaxed max-w-2xl">
                  {item.a}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-8">
          <Link to={to('/help')} className="inline-flex items-center gap-2 min-h-11 text-sm text-secondary hover:text-white transition-colors">
            {t('faq.seeAll')} <ArrowRight size={14} className="flip-rtl" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
