import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Eyebrow } from '../ui/Section.jsx';
import HelpSearch from './HelpSearch.jsx';
import useLocalizedPath from '../../hooks/useLocalizedPath.js';
import Button from '../ui/Button.jsx';
import { WhatsAppMark, WHATSAPP_URL } from '../ui/WhatsAppButton.jsx';

export default function HelpHero() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { to } = useLocalizedPath();

  const POPULAR_QUERIES = [
    { label: t('help.popular.q1'), path: '/help/getting-started#how-do-i-start' },
    { label: t('help.popular.q2'), path: '/help/payouts-fiper-card#when-can-i-withdraw-profits' },
    { label: t('help.popular.q3'), path: '/help/challenges-rules#how-is-drawdown-calculated' },
    { label: t('help.popular.q4'), path: '/help/challenges-rules#what-is-the-profit-target' },
  ];

  return (
    <section className="pt-12 sm:pt-20 pb-10">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <Eyebrow>{t('help.eyebrow')}</Eyebrow>
        <h1 className="mt-5 text-4xl sm:text-6xl font-semibold leading-[1.1]">
          {t('help.title1')}<br />
          {t('help.title2')}
        </h1>
        <p className="mt-6 text-lg text-secondary max-w-2xl mx-auto leading-relaxed">{t('help.subtitle')}</p>
        <div className="mt-8 max-w-[600px] mx-auto relative z-20">
          <HelpSearch />
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href={WHATSAPP_URL} external size="md"><WhatsAppMark size={22} /> {t('help.contactSupport')}</Button>
        </div>
        <div className="mt-6 flex flex-wrap justify-center items-center gap-2 text-sm">
          <span className="text-tertiary me-1">{t('help.popularSearches')}</span>
          {POPULAR_QUERIES.map((p) => (
            <button key={p.label} type="button" onClick={() => navigate(to(p.path))}
              className="inline-flex items-center min-h-11 px-3.5 rounded-full bg-white/5 border border-subtle text-secondary hover:text-white hover:border-white/20 transition-colors">
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
