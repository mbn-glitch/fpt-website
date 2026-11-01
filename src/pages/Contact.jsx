import { useTranslation } from 'react-i18next';
import { MapPin, ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO.jsx';
import Section, { Eyebrow } from '../components/ui/Section.jsx';
import Button from '../components/ui/Button.jsx';
import { WhatsAppMark, WHATSAPP_URL, WHATSAPP_PHONE } from '../components/ui/WhatsAppButton.jsx';
import { REGISTERED_ADDRESS, localeLegal } from '../data/legal.js';

/**
 * Contact — honest channels only (UXFW-037, owner decision): the platform's support e-mail setting (`support.email`) is not set, so the one
 * published channel is WhatsApp; the simulated form, the «24/7 · 12+ countries · < 4 h» pills, the SLA blocks and the unsourced e-mail
 * addresses are gone. The address is the registered address from config/legal.ts.
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
          <h1 className="mt-5 text-4xl sm:text-6xl font-semibold leading-[1.1]">{t('contact.title')}</h1>
          <p className="mt-6 text-lg sm:text-xl text-secondary max-w-2xl mx-auto leading-relaxed">{t('contact.subtitle')}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={WHATSAPP_URL} external size="lg">
              <WhatsAppMark size={24} /> {t('contact.whatsapp.cta')}
            </Button>
          </div>
        </div>
      </section>

      <Section className="!pt-4" aria-labelledby="contact-channels-title">
        <h2 id="contact-channels-title" className="sr-only">{t('contact.channelsTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="group block rounded-3xl p-7 sm:p-8 bg-card border border-subtle hover:border-white/20 transition-colors">
            <div className="flex items-start gap-4">
              <WhatsAppMark size={44} />
              <div className="min-w-0">
                <div className="fpt-eyebrow">{t('contact.whatsapp.title')}</div>
                <h3 className="mt-2 text-2xl font-semibold leading-[1.3]">{t('contact.whatsapp.desc')}</h3>
                <div className="mt-3 text-lg text-white fpt-unit">{WHATSAPP_PHONE}</div>
                <span className="mt-4 inline-flex items-center gap-1.5 min-h-11 text-sm text-white/80 group-hover:text-white">
                  {t('contact.whatsapp.cta')} <ArrowUpRight size={14} className="flip-rtl" aria-hidden="true" />
                </span>
              </div>
            </div>
          </a>

          <div className="rounded-3xl p-7 sm:p-8 bg-card border border-subtle" lang={l} dir={l === 'ar' ? 'rtl' : 'ltr'}>
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-subtle flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-fg-muted" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <div className="fpt-eyebrow">{t('contact.address.tag')}</div>
                <h3 className="mt-2 text-2xl font-semibold leading-[1.3]">{t('contact.address.title')}</h3>
                <address className="mt-3 text-base text-secondary leading-relaxed not-italic">
                  {address.map((line) => <div key={line}>{line}</div>)}
                </address>
                <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 min-h-11 text-sm text-white/80 hover:text-white">
                  {t('contact.address.directions')} <ArrowUpRight size={14} className="flip-rtl" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-6 text-sm text-tertiary max-w-2xl">{t('contact.clientAreaNote')}</p>
      </Section>
    </>
  );
}
