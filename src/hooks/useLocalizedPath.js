import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { LANG_CODES } from '../i18n/config.js';

export function localizedPath(path, lang) {
  if (!path) return path;
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('mailto:') || path.startsWith('tel:')) {
    return path;
  }
  const [pathname, ...rest] = path.split('#');
  const hash = rest.length ? `#${rest.join('#')}` : '';
  const clean = pathname === '' ? '/' : pathname;
  if (lang === 'en' || !LANG_CODES.includes(lang)) return `${clean}${hash}`;
  if (clean === '/') return `/${lang}${hash}`;
  return `/${lang}${clean}${hash}`;
}

export function stripLangPrefix(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length && LANG_CODES.includes(parts[0]) && parts[0] !== 'en') {
    return '/' + parts.slice(1).join('/');
  }
  return pathname || '/';
}

export default function useLocalizedPath() {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'en';
  return useMemo(
    () => ({
      lang,
      to: (path) => localizedPath(path, lang),
    }),
    [lang]
  );
}
