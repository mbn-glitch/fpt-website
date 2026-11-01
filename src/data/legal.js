/**
 * Legal facts of the public site — every value is copied from the platform's single source of truth (read-only):
 *   fpt-platform/config/legal.ts (LEGAL.entity, LEGAL.documents), fpt-platform/config/legal-texts/FPT-LEGAL-RISK.md § 2.1.
 * The site never paraphrases a legal text; what is not published in the platform is not shown here.
 * UX-AUDIT-7 R1 — owner decisions 1–3 (1 Nov 2026).
 */

/** Decision 1 — the ONE entity line (after the rights line, no «licence» word): legalName / legalNameAr + registrationNo + brandFull, verbatim from config/legal.ts. */
export const ENTITY_LINE = {
  ar: 'فايبر غلوبال ذ.م.م – منطقة حرة (رقم السجل التجاري 2422384) — المشغّل لبرنامج فايبر برو تريدرز (FPT)',
  en: 'Fiper Global L.L.C-FZ — Company registration number 2422384 — operating the Fiper Pro Traders (FPT) programme',
};

/** Decision 2 — the simulated-accounts statement under the fixed risk line: Risk Disclosure Statement v1.0 § 2.1, verbatim (config/legal-texts/FPT-LEGAL-RISK.md). */
export const SIMULATED_STATEMENT = {
  ar: 'كل حساب هو حساب محاكاة: تُستمد الأسعار من الأسواق الحقيقية في الوقت الفعلي، أما التنفيذ فيجري بالمحاكاة فقط، ولا يودَع أي مال للعميل ولا يُحتفظ به ولا يُتداول به، ولا يوجد أي مركز مفتوح على الحساب في أي سوق حقيقية.',
  en: 'Every Account is simulated: prices come from real markets in real time, execution is simulated only, no money of the Client is deposited, held or traded, and no position on an Account exists in any real market.',
};

/** Decision 3 — the four published FPT documents (client area routes /[locale]/legal/[key]; Arabic and English exist, every other locale reads the English one). */
const LEGAL_BASE = 'https://fptraders.app';
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

/** The client area (fpt-platform, production) and its registration / sign-in routes. */
export const CLIENT_AREA = 'https://fptraders.app';
export const REGISTER_URL = 'https://crm.fptraders.com/register';
export const LOGIN_URL = 'https://crm.fptraders.com/login';

export const localeLegal = (lang) => (lang === 'ar' ? 'ar' : 'en');
