import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { localizedPath } from '../hooks/useLocalizedPath.js';
import SEO from '../components/SEO.jsx';
import Section, { SectionHeader } from '../components/ui/Section.jsx';
import Button from '../components/ui/Button.jsx';
import HelpHero from '../components/help/HelpHero.jsx';
import CategoryCard from '../components/help/CategoryCard.jsx';
import { WhatsAppMark, WHATSAPP_URL, WHATSAPP_PHONE } from '../components/ui/WhatsAppButton.jsx';
import { categories, getArticleCount, getPopularFaqs } from '../data/helpContent.js';
import { REGISTER_URL } from '../data/legal.js';

export default function Help() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.split('-')[0] || 'en';
  const popular = getPopularFaqs();

  return (
    <>
      <SEO title={t('help.eyebrow')} path="/help" description={t('help.metaDescription')} />

      <HelpHero />

      <Section className="!pt-2 !pb-0">
        <WhatsAppBanner />
      </Section>

      <Section className="!pt-12" aria-labelledby="help-browse-title">
        <SectionHeader eyebrow={t('help.browseEyebrow')} title={<span id="help-browse-title">{t('help.browseTitle')}</span>} />
        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((c) => (
            <li key={c.id}><CategoryCard category={c} articleCount={getArticleCount(c.id)} /></li>
          ))}
        </ul>
      </Section>

      <Section className="bg-card border-y border-subtle" aria-labelledby="help-most-asked-title">
        <SectionHeader eyebrow={t('help.mostAskedEyebrow')} title={<span id="help-most-asked-title">{t('help.mostAskedTitle')}</span>} />
        <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popular.map((f) => {
            const cat = categories.find((c) => c.id === f.categoryId);
            const catTitle = (lang !== 'en' && cat.titles?.[lang]) ? cat.titles[lang] : cat.title;
            return (
              <li key={f.id}>
                <Link to={localizedPath(`/help/${cat.slug}#${f.id}`, i18n.language)} className="group block h-full rounded-2xl p-6 bg-bg border border-subtle hover:border-white/20 transition-colors">
                  <div className="text-[13px] text-tertiary">{catTitle}</div>
                  <h3 className="mt-2 text-lg font-semibold leading-[1.4]">{(lang !== 'en' && f.questions?.[lang]) ? f.questions[lang] : f.question}</h3>
                  <p className="mt-2 text-sm text-secondary leading-relaxed line-clamp-2">{(lang !== 'en' && f.answers?.[lang]) ? f.answers[lang] : f.answer}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 min-h-11 text-sm text-secondary group-hover:text-white transition-colors">
                    {t('help.readMore')} <ArrowRight size={14} className="flip-rtl" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <StillNeedHelp />
    </>
  );
}

function WhatsAppBanner() {
  const { t } = useTranslation();
  return (
    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 rounded-2xl border border-subtle bg-card p-4 sm:p-5 hover:border-white/20 transition-colors">
      <div className="flex items-center gap-4 min-w-0">
        <WhatsAppMark size={40} />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white leading-[1.5]">{t('help.whatsappBanner')}</p>
          <p className="text-[13px] text-secondary mt-0.5 fpt-unit">{WHATSAPP_PHONE}</p>
        </div>
      </div>
      <ArrowRight size={16} className="text-secondary group-hover:text-white shrink-0 flip-rtl" aria-hidden="true" />
    </a>
  );
}

export function StillNeedHelp() {
  const { t } = useTranslation();
  return (
    <Section aria-labelledby="still-need-help-title">
      <div className="max-w-3xl mx-auto text-center">
        <h2 id="still-need-help-title" className="text-3xl sm:text-4xl font-semibold leading-[1.2]">{t('help.stillNeedHelp')}</h2>
        <p className="mt-4 text-secondary leading-relaxed">{t('help.stillNeedHelpBody')}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={WHATSAPP_URL} external size="lg"><WhatsAppMark size={24} /> {t('help.contactSupport')}</Button>
          <Button href={REGISTER_URL} external variant="ghost" size="lg">{t('help.startChallenge')}</Button>
        </div>
      </div>
    </Section>
  );
}
