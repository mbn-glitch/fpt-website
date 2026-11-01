import { useTranslation } from 'react-i18next';
import Section, { SectionHeader } from '../ui/Section.jsx';

/** The real sequence (.fpt-stepper): choose → pass the one evaluation phase → funded. Numbering is real; no glow tiles, no gradient text. */
export default function HowItWorks() {
  const { t } = useTranslation();

  const STEPS = [
    { num: '1', title: t('howItWorks.step1Title'), body: t('howItWorks.step1Desc') },
    { num: '2', title: t('howItWorks.step2Title'), body: t('howItWorks.step2Desc') },
    { num: '3', title: t('howItWorks.step3Title'), body: t('howItWorks.step3Desc') },
  ];

  return (
    <Section id="how-it-works" aria-labelledby="how-it-works-title">
      <SectionHeader eyebrow={t('howItWorks.eyebrow')} title={<span id="how-it-works-title">{t('howItWorks.title')}</span>} />

      <ol className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {STEPS.map((s) => (
          <li key={s.num} className="relative bg-card border border-subtle rounded-2xl p-7">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/40 text-base font-semibold text-white fpt-unit" aria-hidden="true">{s.num}</span>
            <h3 className="mt-5 text-xl font-semibold leading-[1.3]">{s.title}</h3>
            <p className="mt-3 text-secondary leading-relaxed">{s.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
