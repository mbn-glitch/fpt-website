import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import Logo from '../brand/Logo.jsx';
import Button from '../ui/Button.jsx';
import LanguageSwitcher from '../ui/LanguageSwitcher.jsx';
import { localizedPath } from '../../hooks/useLocalizedPath.js';
import { REGISTER_URL, LOGIN_URL } from '../../data/legal.js';

/**
 * Header: ground-chrome + blur 14 (the one surface allowed a blur), ≤ 64 px on phones (lockup 24 + the relationship line 12 px / 1.5),
 * one secondary button (the hero carries the page's primary), language switcher with its name visible.
 * Mobile menu = an opaque sheet (ground-bg) under the header that covers the page, locks the scroll and closes on Escape (R-19 / R-20).
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const location = useLocation();
  const closeRef = useRef(null);

  const LINKS = [
    { label: t('nav.home'), to: '/' },
    { label: t('nav.challenges'), to: '/challenges' },
    { label: t('nav.partners'), to: '/partners' },
    { label: t('nav.about'), to: '/about' },
    { label: t('nav.help'), to: '/help' },
    { label: t('nav.contact'), to: '/contact' },
  ];

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[80] header-chrome">
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-3 min-w-0" aria-label={t('common.mainNav')}>
        <Link to={localizedPath('/', lang)} className="flex flex-col items-start justify-center gap-0.5 min-w-0 min-h-11 overflow-hidden">
          {/* logo v2 (fpt-brand v1.2.1, CR-11): the official ENGLISH white lockup in every language — 24 px on phones, 32 px from sm; never clipped, never mirrored */}
          <span className="sm:hidden"><Logo variant="lockup" size={24} /></span>
          <span className="hidden sm:block"><Logo variant="lockup" size={32} /></span>
          {/* CR-02 (owner, 31 Oct 2026): «Part of Fiper Global» in sentence case, 12 px, label colour, no uppercase, no tracking */}
          <span className="text-xs text-tertiary leading-[1.5] truncate max-w-full" lang={lang}>{t('footer.partOf')}</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={localizedPath(l.to, lang)}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `inline-flex items-center min-h-11 px-3 text-sm whitespace-nowrap transition-colors ${isActive ? 'text-white' : 'text-secondary hover:text-white'}`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher />
          <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-11 px-2 text-sm text-secondary hover:text-white transition-colors">
            {t('nav.login')}
          </a>
          <Button href={REGISTER_URL} external size="sm" variant="outline">
            {t('nav.startChallenge')}
          </Button>
        </div>

        <div className="flex lg:hidden items-center gap-2 shrink-0">
          <LanguageSwitcher />
          <button
            type="button"
            className="inline-flex items-center justify-center w-11 h-11 rounded-full text-white border border-subtle"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? t('common.closeMenu') : t('common.openMenu')}
            ref={closeRef}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="site-menu" className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-[100] bg-bg overflow-y-auto border-t border-subtle" role="dialog" aria-modal="true" aria-label={t('common.mainNav')}>
          <div className="px-5 py-4 flex flex-col">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={localizedPath(l.to, lang)}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `flex items-center min-h-12 py-3 text-base border-b border-subtle ${isActive ? 'text-white' : 'text-secondary'}`}
              >
                {l.label}
              </NavLink>
            ))}
            <div className="mt-6 flex flex-col gap-3">
              <Button href={REGISTER_URL} external size="md">
                {t('nav.startChallenge')}
              </Button>
              <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center min-h-11 text-sm text-secondary hover:text-white">
                {t('nav.login')}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
