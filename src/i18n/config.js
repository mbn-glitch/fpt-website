import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';

/** The six locales — names only, never a flag (EMOJI = 0; a flag is a country, not a language). */
export const LANGUAGES = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'ar', name: 'العربية', dir: 'rtl' },
  { code: 'tr', name: 'Türkçe', dir: 'ltr' },
  { code: 'fr', name: 'Français', dir: 'ltr' },
  { code: 'es', name: 'Español', dir: 'ltr' },
  { code: 'pt', name: 'Português', dir: 'ltr' },
];

export const LANG_CODES = LANGUAGES.map((l) => l.code);

const STORAGE_KEY = 'fpt-lang';

/** English is bundled (fallback); every other locale is its own chunk, loaded before the page renders in it (UXFW-047/053: the first scene carries one locale, not six). */
const LOADERS = import.meta.glob('./locales/*.json', { import: 'default' });
const loaded = new Set(['en']);
export async function loadLanguage(code) {
  if (!LANG_CODES.includes(code) || loaded.has(code)) return;
  const bundle = await LOADERS[`./locales/${code}.json`]();
  i18n.addResourceBundle(code, 'translation', bundle, true, true);
  loaded.add(code);
}

/** The path is the only authority on the language (the root is English, /<lang>/… the others) — the static HTML of every route is
 *  pre-rendered in that language and hydrated with the same one; the stored preference only feeds the switcher. */
export function getInitialLang() {
  if (typeof window === 'undefined') return 'en';
  const seg = window.location.pathname.split('/').filter(Boolean)[0];
  if (seg && LANG_CODES.includes(seg) && seg !== 'en') return seg;
  return 'en';
}

i18n.use(initReactI18next).init({
  resources: { en: { translation: en } },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  // resources are bundled / pre-loaded: initialise synchronously so i18n.language is final BEFORE React hydrates the pre-rendered HTML
  initImmediate: false,
  react: { useSuspense: false },
});

/** Load the locale's chunk (if needed) and switch — the one entry point for every language change. */
export async function switchLanguage(code) {
  await loadLanguage(code);
  await i18n.changeLanguage(code);
}

export function persistLang(code) {
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch (_) {}
}

export function isRtl(code) {
  return LANGUAGES.find((l) => l.code === code)?.dir === 'rtl';
}

export default i18n;
