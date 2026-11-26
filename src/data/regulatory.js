/**
 * The owner's MARKETING LINES (owner's decision 26 Nov 2026 — fpt-platform `legal/REGULATORY-TEXT-20261126.md`, sha256 99f324e0…, «أسطر التسويق» /
 * «Marketing lines»), VERBATIM — every sentence and every mark is the owner's; only the list marker «- » of the file is left out (the lines render as a
 * list). Arabic and English exist; every other locale reads the English lines (`localeLegal`, as the legal block of the footer does) — no translation
 * is written here, since a translation would be a rewording. Shown in the «trust» section of the home page (src/components/web/TrustSection.jsx).
 */
import { createElement } from 'react';

export const MARKETING_LINES = {
  ar: [
    "ممول من وسيط منظّم، لا من شركة تقييم. حسابك الممول حساب حقيقي لدى وسيط مرخّص من هيئة الخدمات المالية في موريشيوس.",
    "حساب حقيقي بعد الاختبار. التقييم محاكاة، والحساب الممول حقيقي — بعقد مع الوسيط نفسه.",
    "مجموعة واحدة من أول صفقة إلى الصرف. تقييم في دبي، وتمويل من الوسيط المنظّم في المجموعة.",
  ],
  en: [
    "Funded by a regulated broker, not an evaluation shop. Your funded account is a real account at a broker licensed by the Financial Services Commission of Mauritius.",
    "A real account after the test. The evaluation is simulated; the funded account is real — under contract with the broker itself.",
    "One group from first trade to payout. Evaluated in Dubai, funded by the group's regulated broker.",
  ],
};

/** WEBL-D16 (as `entityLineNodes` in ./legal.js): a dash inside a line («حقيقي — بعقد», "real — under") never starts a line — the word before the dash
 *  and the dash sit in one unbreakable span at render time; the text content stays the verbatim line. */
const DASH_GLUE = /(\S+ [—–])(?= )/;
export const marketingLineNodes = (line) => line.split(DASH_GLUE).map((part, i) => (i % 2 ? createElement('span', { key: i, className: 'whitespace-nowrap' }, part) : part));
