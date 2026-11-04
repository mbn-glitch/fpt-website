import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { localizedPath } from '../hooks/useLocalizedPath.js';
import SEO from '../components/SEO.jsx';
import Section, { SectionHeader } from '../components/ui/Section.jsx';
import Button from '../components/ui/Button.jsx';
import HelpHero from '../components/help/HelpHero.jsx';
import CategoryCard from '../components/help/CategoryCard.jsx';
import WhatsAppCard from '../components/ui/WhatsAppCard.jsx';
import { renderUnits } from '../lib/money.jsx';
import { categories, getArticleCount, getPopularFaqs } from '../data/helpContent.js';
import useAppLinks from '../hooks/useAppLinks.js';
import { SUPPORT_EMAIL, SUPPORT_MAILTO } from '../config/site.js';

export default function Help() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.split('-')[0] || 'en';
  const popular = getPopularFaqs();

  return (
    <>
      <SEO title={t('help.eyebrow')} path="/help" description={t('help.metaDescription')} />

      <HelpHero />

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
                  <p className="mt-2 text-base text-secondary leading-relaxed line-clamp-2">{renderUnits((lang !== 'en' && f.answers?.[lang]) ? f.answers[lang] : f.answer)}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 min-h-11 text-base text-secondary group-hover:text-white transition-colors">
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

/** The contact block at the END of every help page (RD2 F-068): the mailbox as text, WhatsApp as a neutral card (owner decision 40-أ), the sign-up as a ghost action — no red button here (CR-4). */
export function StillNeedHelp() {
  const { t } = useTranslation();
  const app = useAppLinks();
  return (
    <Section aria-labelledby="still-need-help-title">
      <div className="max-w-3xl mx-auto text-center">
        <h2 id="still-need-help-title" className="text-3xl sm:text-4xl fpt-display">{t('help.stillNeedHelp')}</h2>
        <p className="mt-4 text-secondary leading-relaxed">{t('help.stillNeedHelpBody')}</p>
        {/* Owner decision 18 (4 Nov 2026): the support mailbox, as text (a mailto link ≥ 44 px — RD2 F-072) */}
        <p className="mt-2 text-secondary leading-relaxed">{t('help.orEmail')} <a href={SUPPORT_MAILTO} className="inline-flex items-center min-h-11 text-white hover:underline fpt-num-text" data-support-email="true">{SUPPORT_EMAIL}</a></p>
        <div className="mt-8 text-start max-w-md mx-auto"><WhatsAppCard /></div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href={app.signup} external variant="ghost" size="lg">{t('help.startChallenge')}</Button>
        </div>
      </div>
    </Section>
  );
}
