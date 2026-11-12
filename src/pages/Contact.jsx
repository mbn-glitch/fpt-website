import { useTranslation } from 'react-i18next';
import { MapPin, Mail, ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO.jsx';
import Section, { Eyebrow } from '../components/ui/Section.jsx';
import WhatsAppCard from '../components/ui/WhatsAppCard.jsx';
import { REGISTERED_ADDRESS, localeLegal } from '../data/legal.js';
import { SUPPORT_EMAIL, SUPPORT_MAILTO } from '../config/site.js';

/**
 * Contact — honest channels only (UXFW-037): the support mailbox `help@fptraders.app` (owner decision 18 — the platform setting `support.email`,
 * the same address as the mail foot and the legal pages) and WhatsApp as a NEUTRAL card (owner decision 40-أ, 4 Nov 2026 — no floating button,
 * no red primary on this page: the two channels are equal cards); the simulated form, the «24/7 · 12+ countries · < 4 h» pills and the SLA blocks
 * are gone. The address is the registered address from config/legal.ts.
 */
export default function Contact() {
  const { t, i18n } = useTranslation();
  const l = localeLegal(i18n.language);
  const address = REGISTERED_ADDRESS[l];
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(REGISTERED_ADDRESS.en.join(', '))}`;

  return (
    <>
      <SEO title={t('contact.title')} path="/contact" description={t('contact.metaDescription')} />

      <section className="pt-12 sm:pt-20 pb-10">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <Eyebrow>{t('contact.eyebrow')}</Eyebrow>
          <h1 className="mt-5 fpt-h1 fpt-display">{t('contact.title')}</h1>
          <p className="mt-6 text-lg text-secondary max-w-2xl mx-auto leading-relaxed">{t('contact.subtitle')}</p>
        </div>
      </section>

      <Section className="!pt-4" aria-labelledby="contact-channels-title">
        <h2 id="contact-channels-title" className="sr-only">{t('contact.channelsTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <a href={SUPPORT_MAILTO} className="group block rounded-3xl p-7 sm:p-8 bg-card border border-subtle hover:border-white/20 transition-colors" data-support-email="true">
            <div className="flex items-start gap-4 max-[359px]:flex-col">{/* as WhatsAppCard: below 360 px the icon tile sits above the text (the three cards keep one shape) */}
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-subtle flex items-center justify-center shrink-0">
                <Mail size={20} className="text-fg-muted" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <div className="fpt-eyebrow">{t('contact.email.title')}</div>
                <h3 className="mt-2 text-2xl font-semibold leading-[1.3]">{t('contact.email.desc')}</h3>
                <div className="mt-3 text-lg text-white fpt-num-text break-all">{SUPPORT_EMAIL}</div>
                <span className="mt-4 inline-flex items-center gap-1.5 min-h-11 text-base text-white/80 group-hover:text-white">
                  {t('contact.email.cta')} <ArrowUpRight size={14} className="flip-rtl" aria-hidden="true" />
                </span>
              </div>
            </div>
          </a>

          <WhatsAppCard />

          <div className="rounded-3xl p-7 sm:p-8 bg-card border border-subtle md:col-span-2">
            <div className="flex items-start gap-4 max-[359px]:flex-col">{/* as WhatsAppCard: below 360 px the icon tile sits above the text (the three cards keep one shape) */}
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-subtle flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-fg-muted" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <div className="fpt-eyebrow">{t('contact.address.tag')}</div>
                <h3 className="mt-2 text-2xl font-semibold leading-[1.3]">{t('contact.address.title')}</h3>
                {/* the registered address exists in Arabic and English only (config/legal.ts): ITS language is declared, the translated card around it keeps the page's */}
                <address className="mt-3 text-base text-secondary leading-relaxed not-italic" lang={l} dir={l === 'ar' ? 'rtl' : 'ltr'}>
                  {address.map((line) => <div key={line}>{line}</div>)}
                </address>
                <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 min-h-11 text-base text-white/80 hover:text-white">
                  {t('contact.address.directions')} <ArrowUpRight size={14} className="flip-rtl" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-6 text-base text-tertiary max-w-2xl">{t('contact.clientAreaNote')}</p>
      </Section>
    </>
  );
}
