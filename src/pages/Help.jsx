import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { localizedPath } from '../hooks/useLocalizedPath.js';
import SEO from '../components/SEO.jsx';
import Section, { SectionHeader } from '../components/ui/Section.jsx';
import Button from '../components/ui/Button.jsx';
import WaveBg from '../components/ui/WaveBg.jsx';
import HelpHero from '../components/help/HelpHero.jsx';
import CategoryCard from '../components/help/CategoryCard.jsx';
import { WhatsAppIcon, WHATSAPP_URL, WHATSAPP_PHONE } from '../components/ui/WhatsAppButton.jsx';
import { categories, getArticleCount, getPopularFaqs } from '../data/helpContent.js';

const REGISTER = 'https://crm.fptraders.com/register';

export default function Help() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.split('-')[0] || 'en';
  const popular = getPopularFaqs();

  return (
    <>
      <SEO title={t('help.eyebrow')} path="/help"
        description="FPT Help Center — searchable answers on challenges, funded accounts, payouts, the Fiper Card, trading rules and platform support."
        keywords="FPT help, Fiper Pro Traders support, prop firm FAQ, funded account help" />

      <HelpHero />

      <Section className="!pt-6 !pb-0">
        <WhatsAppBanner />
      </Section>

      <Section className="!pt-14">
        <SectionHeader eyebrow={t('help.browseEyebrow')} title={t('help.browseTitle')} />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((c, i) => (
            <CategoryCard key={c.id} category={c} articleCount={getArticleCount(c.id)} index={i} />
          ))}
        </div>
      </Section>

      <Section className="bg-[#0A0A0A]">
        <SectionHeader eyebrow={t('help.mostAskedEyebrow')} title={t('help.mostAskedTitle')} />
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {popular.map((f) => {
            const cat = categories.find((c) => c.id === f.categoryId);
            return (
              <Link key={f.id} to={localizedPath(`/help/${cat.slug}#${f.id}`, i18n.language)}
                className="group relative block rounded-2xl p-7 bg-[#141414] border border-subtle hover:border-[#F42821]/40 transition-all hover:-translate-y-0.5">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FCA5A5]">{cat.title}</div>
                <h3 className="mt-3 text-lg font-semibold leading-snug">{(lang !== 'en' && f.questions?.[lang]) ? f.questions[lang] : f.question}</h3>
                <p className="mt-3 text-sm text-secondary leading-relaxed line-clamp-2">{(lang !== 'en' && f.answers?.[lang]) ? f.answers[lang] : f.answer}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm text-secondary group-hover:text-white transition-colors">
                  Read more <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      <StillNeedHelp registerUrl={REGISTER} />
    </>
  );
}

function WhatsAppBanner() {
  const { t } = useTranslation();
  return (
    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
      className="group flex items-center justify-between gap-6 rounded-2xl border border-[#25D366]/20 bg-[#25D366]/5 p-5 sm:p-6 hover:border-[#25D366]/40 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#25D366' }}>
          <WhatsAppIcon size={22} />
        </div>
        <div>
          <p className="text-sm font-medium text-white">{t('help.whatsappBanner')}</p>
          <p className="text-xs text-secondary mt-0.5 font-mono-num">{WHATSAPP_PHONE}</p>
        </div>
      </div>
      <ArrowRight size={16} className="text-secondary group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
    </a>
  );
}

export function StillNeedHelp({ registerUrl = REGISTER }) {
  const { t } = useTranslation();
  return (
    <Section className="bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute inset-0 radial-red opacity-30 pointer-events-none" />
      <div className="relative max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold">{t('help.stillNeedHelp')}</h2>
        <p className="mt-4 text-secondary">{t('help.stillNeedHelpBody')}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button to="/contact" size="lg">{t('help.contactSupport')}</Button>
          <Button href={registerUrl} external variant="ghost" size="lg">{t('help.startChallenge')}</Button>
        </div>
      </div>
    </Section>
  );
}
