/**
 * WhatsApp constants + the official mark. The floating button that lived here was REMOVED on 4 Nov 2026 (owner decision 40-أ — RD2 CR-3 /
 * F-037: a floating element in a third-party colour on every page, tripled on the contact and help pages); WhatsApp is now a neutral card
 * (`WhatsAppCard.jsx`) in the contact section and the help centre. The green stays only inside the official mark file (third-party mark,
 * never recoloured).
 */
export const WHATSAPP_URL = 'https://wa.me/971561111855';
export const WHATSAPP_PHONE = '+971 56 111 1855';
export const WHATSAPP_MARK = '/images/third-party/whatsapp/whatsapp-mark.svg';

export function WhatsAppMark({ size = 44, className = '' }) {
  return <img src={WHATSAPP_MARK} alt="WhatsApp" width={size} height={size} style={{ width: size, height: size }} className={`block select-none ${className}`} draggable={false} decoding="async" />;
}
