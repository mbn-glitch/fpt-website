/**
 * Legal facts of the public site — every value is copied from the platform's single source of truth (read-only):
 *   fpt-platform/config/legal.ts (LEGAL.entity, LEGAL.documents), fpt-platform/config/legal-texts/FPT-LEGAL-RISK.md § 2.1.
 * The site never paraphrases a legal text; what is not published in the platform is not shown here.
 * UX-AUDIT-7 R1 — owner decisions 1–3 (1 Nov 2026); FPT-WEBSITE-DOMAIN — decisions 18 / 3-ب / 33-أ (4 Nov 2026): origins in src/config/site.js.
 */
import { APP_ORIGIN } from '../config/site.js';

/** The ONE entity line — VERBATIM `LEGAL.entity.line` of fpt-platform/config/legal.ts, the same string the platform footer, the certificate,
 *  the statement, the legal pages and the foot of every e-mail render (owner decision 3-ب, 4 Nov 2026: one source, no site-specific wording).
 *  Gate: scripts/check-entity-line.mjs compares these two strings with the platform file when it is present and with their pinned sha256 always. */
export const ENTITY_LINE = {
  en: 'Fiper Global L.L.C-FZ — registered in the Meydan Free Zone, Dubai, United Arab Emirates (registration no. 2422384), Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E. Operating the Fiper Pro Traders (FPT) programme.',
  ar: 'فايبر غلوبال ذ.م.م – منطقة حرة، مسجلة في منطقة ميدان الحرة، دبي، الإمارات العربية المتحدة (رقم التسجيل 2422384)، ميدان غراندستاند، الطابق السادس، شارع ميدان، ند الشبا، دبي — المشغّل لبرنامج فايبر برو تريدرز (FPT).',
};

/** Decision 2 — the simulated-accounts statement under the fixed risk line: Risk Disclosure Statement v1.0 § 2.1, verbatim (config/legal-texts/FPT-LEGAL-RISK.md). */
export const SIMULATED_STATEMENT = {
  ar: 'كل حساب هو حساب محاكاة: تُستمد الأسعار من الأسواق الحقيقية في الوقت الفعلي، أما التنفيذ فيجري بالمحاكاة فقط، ولا يودَع أي مال للعميل ولا يُحتفظ به ولا يُتداول به، ولا يوجد أي مركز مفتوح على الحساب في أي سوق حقيقية.',
  en: 'Every Account is simulated: prices come from real markets in real time, execution is simulated only, no money of the Client is deposited, held or traded, and no position on an Account exists in any real market.',
};

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
