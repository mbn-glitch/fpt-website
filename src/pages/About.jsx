import { Compass, ShieldCheck, Scale, Sparkles, TrendingUp, CreditCard, LayoutDashboard } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO.jsx';
import Section, { Eyebrow, SectionHeader } from '../components/ui/Section.jsx';
import Button from '../components/ui/Button.jsx';
import { ENTITY_LINE, localeLegal } from '../data/legal.js';
import useAppLinks from '../hooks/useAppLinks.js';

/** About — headline-dominant: h1 (the relationship line is the header's — owner decision 38-ب) + one primary action in the first screen (UXFW-014); principles; the three Fiper products (the Fiper Card row carries the owner's one sentence — decision 6); the entity line. No counters, no «12+ countries» (UXFW-005). */
export default function About() {
  const { t, i18n } = useTranslation();
  const l = localeLegal(i18n.language);
  const app = useAppLinks();

  const PRINCIPLES = [
    { icon: Scale, title: t('about.principles.p1title'), body: t('about.principles.p1body') },
    { icon: ShieldCheck, title: t('about.principles.p2title'), body: t('about.principles.p2body') },
    { icon: Compass, title: t('about.principles.p3title'), body: t('about.principles.p3body') },
    { icon: Sparkles, title: t('about.principles.p4title'), body: t('about.principles.p4body') },
  ];

  const ECOSYSTEM = [
    { icon: TrendingUp, name: 'FPT', tag: t('about.ecosystem.fptTag'), body: t('about.ecosystem.fptBody') },
    { icon: CreditCard, name: t('fptCard.title'), tag: t('about.ecosystem.cardTag'), body: t('about.ecosystem.cardBody') },
    { icon: LayoutDashboard, name: 'Fiper Global', tag: t('about.ecosystem.globalTag'), body: t('about.ecosystem.globalBody') },
  ];

  return (
    <>
      <SEO title={t('about.title')} path="/about" description={t('about.metaDescription')} />

      <section className="pt-12 sm:pt-20 pb-12">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <Eyebrow>{t('about.eyebrow')}</Eyebrow>
          <h1 className="mt-5 fpt-h1 fpt-display">{t('about.title')}</h1>
          <p className="mt-6 text-lg text-secondary max-w-2xl mx-auto leading-relaxed">{t('about.subtitle')}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={app.signup} external size="lg">{t('about.getStarted')}</Button>
            <Button to="/contact" variant="ghost" size="lg">{t('about.talkToTeam')}</Button>
          </div>
        </div>
      </section>

      <Section className="!pt-4" aria-labelledby="about-story-title">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-20 items-start">
          <div>
            <Eyebrow>{t('about.thesis')}</Eyebrow>
            <h2 id="about-story-title" className="mt-4 text-3xl sm:text-4xl fpt-display">{t('about.story.title')}</h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-secondary">
            <p>{t('about.story.content')}</p>
            <p>{t('about.mission.content')}</p>
          </div>
        </div>
      </Section>

      <Section className="bg-card border-y border-subtle" aria-labelledby="about-principles-title">
        <SectionHeader eyebrow={t('about.principlesEyebrow')} title={<span id="about-principles-title">{t('about.principlesTitle')}</span>} center />
        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {PRINCIPLES.map((p) => (
            <li key={p.title} className="bg-bg border border-subtle rounded-2xl p-7">
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-subtle flex items-center justify-center">
                <p.icon size={20} className="text-fg-muted" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-xl font-semibold leading-[1.3]">{p.title}</h3>
              <p className="mt-3 text-base text-secondary leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="about-ecosystem-title">
        <div className="flex justify-center mb-8">
          <img src="/images/third-party/fiper/fiper-lockup-horizontal-colour.svg" alt="Fiper Global" className="h-14 sm:h-16 w-auto" width={260} height={64} draggable={false} loading="lazy" decoding="async" />
        </div>
        <SectionHeader eyebrow={t('about.ecosystemEyebrow')} title={<span id="about-ecosystem-title">{t('about.ecosystemTitle')}</span>} subtitle={t('about.ecosystemSubtitle')} center />
        <ul className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {ECOSYSTEM.map((e) => (
            <li key={e.name} className="bg-card border border-subtle rounded-2xl p-7">
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-subtle flex items-center justify-center">
                <e.icon size={20} className="text-fg-muted" aria-hidden="true" />
              </div>
              <div className="mt-5 text-[13px] text-tertiary">{e.tag}</div>
              <h3 className="mt-1 text-xl font-semibold leading-[1.3]">{e.name}</h3>
              <p className="mt-2 text-base text-secondary leading-relaxed">{e.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-center text-base text-tertiary" lang={l} dir={l === 'ar' ? 'rtl' : 'ltr'}>{ENTITY_LINE[l]}</p>
      </Section>
    </>
  );
}
