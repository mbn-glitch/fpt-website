import { CheckCircle2, Globe2, CreditCard, Layers, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Section, { SectionHeader } from '../ui/Section.jsx';
import Button from '../ui/Button.jsx';

/** Image-dominant: the official Fiper Card artwork (fiper asset, byte copy), one headline, four ruled feature rows, the two notes verbatim as muted meta, one secondary action. No glow, no float, no gold. */
export default function FPTCard() {
  const { t } = useTranslation();

  const FEATURES = [
    { icon: CheckCircle2, title: t('fptCard.features.instant.title'), body: t('fptCard.features.instant.desc') },
    { icon: Globe2, title: t('fptCard.features.global.title'), body: t('fptCard.features.global.desc') },
    { icon: CreditCard, title: t('fptCard.features.virtual.title'), body: t('fptCard.features.virtual.desc') },
    { icon: Layers, title: t('fptCard.features.integrated.title'), body: t('fptCard.features.integrated.desc') },
  ];

  return (
    <Section className="bg-card border-y border-subtle" aria-labelledby="fpt-card-title">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <SectionHeader eyebrow={t('fptCard.eyebrow')} title={<span id="fpt-card-title">{t('fptCard.title')}</span>} subtitle={t('fptCard.subtitle')} />
          <div className="mt-8">
            <Button href="https://fiperhub.com" external size="lg" variant="outline">
              {t('fptCard.cta')}
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <img
            src="/images/third-party/fiper/fiper-physical-card.png"
            alt={t('fptCard.imageAlt')}
            width={920}
            height={580}
            loading="lazy"
            decoding="async"
            className="w-full max-w-[460px] h-auto"
            draggable={false}
          />
        </div>
      </div>

      <ul className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FEATURES.map((f) => (
          <li key={f.title} className="bg-bg border border-subtle rounded-2xl p-6">
            <f.icon size={22} className="text-fg-muted" aria-hidden="true" />
            <h3 className="mt-5 text-base font-semibold leading-[1.4]">{f.title}</h3>
            <p className="mt-2.5 text-sm text-secondary leading-relaxed">{f.body}</p>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-start gap-4 rounded-2xl border border-subtle bg-bg p-5">
        <AlertTriangle size={20} className="text-warning shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-sm text-secondary leading-relaxed">
          {t('fptCard.note1')} {t('fptCard.note2')}
        </p>
      </div>
    </Section>
  );
}
