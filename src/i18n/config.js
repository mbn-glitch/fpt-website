import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ar from './locales/ar.json';
import tr from './locales/tr.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import pt from './locales/pt.json';

export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'es', name: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'pt', name: 'Português', flag: '🇧🇷', dir: 'ltr' },
];

export const LANG_CODES = LANGUAGES.map((l) => l.code);

const STORAGE_KEY = 'fpt-lang';

function getInitialLang() {
  if (typeof window === 'undefined') return 'en';
  const seg = window.location.pathname.split('/').filter(Boolean)[0];
  if (seg && LANG_CODES.includes(seg)) return seg;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && LANG_CODES.includes(stored)) return stored;
  return 'en';
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
    tr: { translation: tr },
    fr: { translation: fr },
    es: { translation: es },
    pt: { translation: pt },
  },
  lng: getInitialLang(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export function persistLang(code) {
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch (_) {}
}

export function isRtl(code) {
  return LANGUAGES.find((l) => l.code === code)?.dir === 'rtl';
}

export default i18n;
