/**
 * Legal facts of the public site — every value is copied from the platform's single source of truth (read-only):
 *   fpt-platform/config/legal.ts (LEGAL.entity, LEGAL.documents) and the owner's regulatory text fpt-platform/legal/REGULATORY-TEXT-20261126.md.
 * The site never paraphrases a legal text; what is not published in the platform is not shown here.
 * UX-AUDIT-7 R1 — owner decisions 1–3 (1 Nov 2026); FPT-WEBSITE-DOMAIN — decisions 18 / 3-ب / 33-أ (4 Nov 2026): origins in src/config/site.js.
 */
import { createElement } from 'react';
import { APP_ORIGIN } from '../config/site.js';

/** The ONE entity line — VERBATIM `LEGAL.entity.line` of fpt-platform/config/legal.ts, the same string the platform footer, the certificate,
 *  the statement, the legal pages and the foot of every e-mail render (owner decision 3-ب, 4 Nov 2026: one source, no site-specific wording).
 *  Gate: scripts/check-entity-line.mjs compares these two strings with the platform file when it is present and with their pinned sha256 always. */
export const ENTITY_LINE = {
  en: 'Fiper Global L.L.C-FZ — registered in the Meydan Free Zone, Dubai, United Arab Emirates (registration no. 2422384), Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E. Operating the Fiper Pro Traders (FPT) programme.',
  ar: 'فايبر غلوبال ذ.م.م – منطقة حرة، مسجلة في منطقة ميدان الحرة، دبي، الإمارات العربية المتحدة (رقم التسجيل 2422384)، ميدان غراندستاند، الطابق السادس، شارع ميدان، ند الشبا، دبي — المشغّل لبرنامج فايبر برو تريدرز (FPT).',
};

/** WEBL-D16 (re-check R3, 12 Nov 2026): a dash INSIDE the entity sentence («… دبي — المشغّل لبرنامج…», «L.L.C-FZ — registered…») could start a line (Arabic footer on
 *  320 / 1366). The sentence is pinned verbatim, so its characters are not touched: at render time the word before each dash and the dash itself sit in one
 *  unbreakable span — the text content stays the verbatim line (gates: check-entity-line on the source, check-line-edges --dist on the rendered pages). */
const DASH_GLUE = /(\S+ [—–])(?= )/;
export const entityLineNodes = (l) => ENTITY_LINE[l].split(DASH_GLUE).map((part, i) => (i % 2 ? createElement('span', { key: i, className: 'whitespace-nowrap' }, part) : part));

/** The owner's SHORT regulatory line (owner's decision 26 Nov 2026 — fpt-platform `legal/REGULATORY-TEXT-20261126.md`, sha256 99f324e0…, «السطر القصير» /
 *  «Short line»; = `LEGAL.entity.shortLine` of fpt-platform/config/legal.ts), VERBATIM — never paraphrased, never split. Decision 44 «نعم» (26 Nov 2026,
 *  ~08:35 Doha): it replaces the entity line in the footer of every page (Arabic and English; every other locale reads the English line). Its last sentence
 *  is risk wording of the owner's text: the site risk-line gate exempts EXACTLY this sentence, by name; the fixed risk line stays its own element.
 *  Gate: scripts/check-entity-line.mjs (pinned sha256, and = the platform's `shortLine` when that checkout carries it). */
export const SHORT_LINE = {
  en: 'Fiper Pro Traders is the trader-funding programme of the Fiper Global group, a regulated brokerage. The evaluation phase is a simulated service provided by Fiper Global L.L.C-FZ (reg. no. 2422384, Dubai). The funded account is a real account at Fiper Global MAU, licensed by the Financial Services Commission of Mauritius (licence GB23201759), to which the contractual relationship transfers on receipt. Trading carries a high level of risk.',
  ar: 'فايبر برو تريدرز برنامج تمويل المتداولين من مجموعة فايبر غلوبال، الوسيط المالي المنظّم. مرحلة التقييم خدمة محاكاة تقدّمها فايبر غلوبال ذ.م.م – منطقة حرة (قيد 2422384، دبي). الحساب الممول حساب حقيقي لدى فايبر غلوبال موريشيوس المرخّصة من هيئة الخدمات المالية في موريشيوس (رخصة GB23201759)، وتنتقل إليها العلاقة التعاقدية باستلامه. التداول ينطوي على مخاطر عالية.',
};

/** WEBL-D16 for the short line: a dash inside it («ذ.م.م – منطقة حرة») never starts a line — the word before it and the dash in one unbreakable span. */
export const shortLineNodes = (l) => SHORT_LINE[l].split(DASH_GLUE).map((part, i) => (i % 2 ? createElement('span', { key: i, className: 'whitespace-nowrap' }, part) : part));

/** Decision 3 — the four published FPT documents (client area routes /[locale]/legal/[key] on APP_ORIGIN; Arabic and English exist, every other locale reads the English one). */
const LEGAL_BASE = APP_ORIGIN;
export const LEGAL_DOCS = [
  { key: 'terms', title: { en: 'Terms and Conditions', ar: 'الشروط والأحكام' } },
  { key: 'privacy', title: { en: 'Privacy Policy', ar: 'سياسة الخصوصية' } },
  { key: 'risk', title: { en: 'Risk Disclosure Statement', ar: 'بيان الإفصاح عن المخاطر' } },
  { key: 'refund', title: { en: 'Refund and Cancellation Policy', ar: 'سياسة الاسترداد والإلغاء' } },
];
export const legalUrl = (key, lang) => `${LEGAL_BASE}/${lang === 'ar' ? 'ar' : 'en'}/legal/${key}`;

/** Registered address — config/legal.ts LEGAL.addresses.registered (verbatim). */
export const REGISTERED_ADDRESS = {
  en: ['Meydan Grandstand, 6th floor', 'Meydan Road, Nad Al Sheba', 'Dubai, U.A.E.'],
  ar: ['ميدان غراندستاند، الطابق السادس', 'شارع ميدان، ند الشبا', 'دبي، الإمارات العربية المتحدة'],
};

export const localeLegal = (lang) => (lang === 'ar' ? 'ar' : 'en');
