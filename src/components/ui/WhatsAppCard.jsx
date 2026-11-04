import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { WhatsAppMark, WHATSAPP_URL, WHATSAPP_PHONE } from './WhatsAppButton.jsx';

/**
 * WhatsApp as a NEUTRAL card (owner decision 40-أ, 4 Nov 2026 — RD2 CR-3 / F-037): the floating green button is gone from every page; the
 * channel is a card in the identity's own colours — the Lucide `message-circle` icon in the muted icon tile, the official WhatsApp mark only as a
 * small third-party mark INSIDE the card (never recoloured, never a site colour), the phone number in the text font with tabular digits
 * (F-067), one arrow. `compact` = the one-line variant used in the help centre side column.
 */
export default function WhatsAppCard({ compact = false, className = '' }) {
  const { t } = useTranslation();
  if (compact) {
    return (
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-whatsapp-card="compact" className={`group flex items-center gap-3 min-h-12 rounded-xl border border-subtle bg-bg px-3 py-2 hover:border-white/20 transition-colors ${className}`}>
        <MessageCircle size={18} className="text-fg-muted shrink-0" aria-hidden="true" />
        <span className="flex-1 min-w-0 text-base text-white">{t('contact.whatsapp.title')}</span>
        <WhatsAppMark size={20} />
        <ArrowUpRight size={14} className="text-tertiary flip-rtl shrink-0" aria-hidden="true" />
      </a>
    );
  }
  return (
    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-whatsapp-card="true" className={`group block rounded-3xl p-7 sm:p-8 bg-card border border-subtle hover:border-white/20 transition-colors ${className}`}>
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-xl bg-white/5 border border-subtle flex items-center justify-center shrink-0">
          <MessageCircle size={20} className="text-fg-muted" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="fpt-eyebrow">{t('contact.whatsapp.title')}</div>
          <h3 className="mt-2 text-2xl font-semibold leading-[1.3]">{t('contact.whatsapp.desc')}</h3>
          <div className="mt-3 flex items-center gap-2">
            <WhatsAppMark size={20} />
            <span className="text-lg text-white fpt-num-text">{WHATSAPP_PHONE}</span>
          </div>
          <span className="mt-4 inline-flex items-center gap-1.5 min-h-11 text-base text-white/80 group-hover:text-white">
            {t('contact.whatsapp.cta')} <ArrowUpRight size={14} className="flip-rtl" aria-hidden="true" />
          </span>
        </div>
      </div>
    </a>
  );
}
