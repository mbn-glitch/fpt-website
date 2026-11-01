import { useTranslation } from 'react-i18next';

export const WHATSAPP_URL = 'https://wa.me/971561111855';
export const WHATSAPP_PHONE = '+971 56 111 1855';
/** The official WhatsApp mark (green disc + glyph) — the only place the WhatsApp green appears (third-party mark file, never a site colour). */
export const WHATSAPP_MARK = '/images/third-party/whatsapp/whatsapp-mark.svg';

export function WhatsAppMark({ size = 44, className = '' }) {
  return <img src={WHATSAPP_MARK} alt="" aria-hidden="true" width={size} height={size} style={{ width: size, height: size }} className={`block select-none ${className}`} draggable={false} decoding="async" />;
}

/**
 * The one floating contact affordance (ID-12 / AN-18): 44 px, bottom-end (logical — mirrors in RTL), inside the safe area,
 * no pulse, no hover scale, no glow; rendered inside the footer landmark so it belongs to a region (axe).
 */
export default function WhatsAppButton() {
  const { t } = useTranslation();
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsapp.ariaLabel')}
      title={t('whatsapp.tooltip')}
      data-whatsapp-fab="true"
      className="fixed z-30 flex items-center justify-center w-11 h-11 rounded-full"
      style={{ insetInlineEnd: 16, bottom: 'calc(16px + env(safe-area-inset-bottom, 0px))' }}
    >
      <WhatsAppMark size={44} />
    </a>
  );
}
