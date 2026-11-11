import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import Logo from '../brand/Logo.jsx';
import Button from '../ui/Button.jsx';
import LanguageSwitcher from '../ui/LanguageSwitcher.jsx';
import { localizedPath } from '../../hooks/useLocalizedPath.js';
import useAppLinks from '../../hooks/useAppLinks.js';

/** The header relationship line — English in every language (owner decision 65, 5 Nov 2026; CR-02 form: sentence case, no tracking). */
export const RELATIONSHIP_LINE = 'Part of Fiper Global';

/**
 * Header: ground-chrome + blur 14 (the one surface allowed a blur), ≤ 64 px on phones (lockup 24 + the relationship line 12 px / 1.5),
 * one secondary button (the hero carries the page's primary), language switcher with its name visible.
 * WEB-VIS-1 (design office frame w1, 7 Nov 2026): on desktop the bar is 76 px (src/web.css), the lockup 28 px, FIVE links 15 px / 28 px apart
 * (how it works · sizes and fees · rules · certificates · FAQ — the first three and the certificates are home / evaluations anchors), and two 40 px pill
 * actions «Log in» (ghost) + «Start the evaluation» (outline — the kit paints it red, but the red budget of the home page is two primaries: the hero and
 * the popular size card — owner decision 41-أ / CR-14; recorded as a question). The language switcher stays beside them (six languages).
 * Owner decision 65 (5 Nov 2026 — UXFW-062; proposed package CR-16): the relationship line under the lockup is «Part of Fiper Global» in ENGLISH in the six
 * languages (the English-lockup rule, CR-11), one text line, never a chip, never clipped — on ≤ 320 px it takes its own row across the full header width
 * (`.fpt-header-rel` in index.css); from 360 px it fits beside the controls (113 px at 12 px). The footer entity line is a different line and is untouched.
 * Design office WEBL-D08 (LAUNCH-I18N-1, 11 Nov 2026): the desktop bar is a three-column grid in the flow (src/web.css) and starts at 1280 px (`xl:`) — below it
 * the phone header with the menu sheet serves, so the five links can never run over the switcher and the actions.
 * Mobile menu = an opaque sheet (ground-bg) under the header that covers the page, locks the scroll and closes on Escape (R-19 / R-20).
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const location = useLocation();
  const closeRef = useRef(null);
  // FPT-WEBSITE-DOMAIN: sign-up / sign-in live on app.fptraders.app in the page language (+ ?ref= when the visit carries a partner code)
  const app = useAppLinks();

  const LINKS = [
    { label: t('nav.how'), to: '/#how-it-works' },
    { label: t('nav.sizes'), to: '/#sizes' },
    { label: t('nav.rules'), to: '/challenges#rules' },
    { label: t('nav.certificates'), to: '/#certificates' },
    { label: t('nav.faq'), to: '/#faq' },
  ];
  /** Secondary pages (about · partners · contact · help) keep their menu rows on phones; the desktop bar carries the five kit links. */
  const MORE = [
    { label: t('nav.challenges'), to: '/challenges' },
    { label: t('nav.partners'), to: '/partners' },
    { label: t('nav.about'), to: '/about' },
    { label: t('nav.help'), to: '/help' },
    { label: t('nav.contact'), to: '/contact' },
  ];

  useEffect(() => { setOpen(false); }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey); };
  }, [open]);

  const linkCls = ({ isActive }) => `inline-flex items-center min-h-11 text-[15px] whitespace-nowrap transition-colors ${isActive ? 'text-white' : 'text-secondary hover:text-white'}`;
  const isHash = (to) => to.includes('#');

  return (
    <header className="fixed inset-x-0 top-0 z-[80] header-chrome">
      <nav className="fpt-header-nav max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[72px] h-16 sm:h-20 flex items-center justify-between gap-3 min-w-0" aria-label={t('common.mainNav')}>
        <Link to={localizedPath('/', lang)} className="fpt-header-home flex flex-col items-start justify-center gap-0.5 min-w-0 min-h-11">
          {/* logo v2 (fpt-brand v1.2.1, CR-11): the official ENGLISH white lockup in every language — 24 px on phones, 28 px from sm (the kit's bar); never clipped, never mirrored */}
          <span className="sm:hidden"><Logo variant="lockup" size={24} /></span>
          <span className="fpt-header-lockup hidden sm:block"><Logo variant="lockup" size={28} /></span>
          {/* CR-02 (owner, 31 Oct 2026): «Part of Fiper Global» in sentence case, 12 px, label colour, no uppercase, no tracking.
              Owner decision 65 (5 Nov 2026): ENGLISH in every language (lang="en"), one text line, never truncated — its own full-width row on ≤ 320 px. */}
          <span className="fpt-header-rel text-xs text-tertiary leading-[1.5] whitespace-nowrap" lang="en">{RELATIONSHIP_LINE}</span>
        </Link>

        <ul className="fpt-header-links hidden xl:flex items-center gap-7">
          {LINKS.map((l) => (
            <li key={l.to}>
              {isHash(l.to)
                ? <Link to={localizedPath(l.to, lang)} className={linkCls({ isActive: false })}>{l.label}</Link>
                : <NavLink to={localizedPath(l.to, lang)} className={linkCls}>{l.label}</NavLink>}
            </li>
          ))}
        </ul>

        <div className="hidden xl:flex items-center gap-2.5">
          <LanguageSwitcher className="fpt-header-lang" />
          <a href={app.signin} target="_blank" rel="noopener noreferrer" className="fpt-nav-pill">{t('nav.login')}</a>
          <a href={app.signup} target="_blank" rel="noopener noreferrer" className="fpt-nav-pill fpt-nav-pill--cta">{t('nav.startChallenge')}</a>
        </div>

        <div className="flex xl:hidden items-center gap-2 shrink-0">
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
        <div id="site-menu" className="xl:hidden fixed inset-x-0 top-16 sm:top-20 bottom-0 z-[100] bg-bg overflow-y-auto border-t border-subtle" role="dialog" aria-modal="true" aria-label={t('common.mainNav')}>
          <div className="px-5 py-4 flex flex-col">
            {[...LINKS, ...MORE].map((l) => (
              isHash(l.to)
                ? <Link key={l.to} to={localizedPath(l.to, lang)} onClick={() => setOpen(false)} className="flex items-center min-h-12 py-3 text-base border-b border-subtle text-secondary">{l.label}</Link>
                : <NavLink key={l.to} to={localizedPath(l.to, lang)} onClick={() => setOpen(false)} className={({ isActive }) => `flex items-center min-h-12 py-3 text-base border-b border-subtle ${isActive ? 'text-white' : 'text-secondary'}`}>{l.label}</NavLink>
            ))}
            <div className="mt-6 flex flex-col gap-3">
              <Button href={app.signup} external size="md">
                {t('nav.startChallenge')}
              </Button>
              <a href={app.signin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center min-h-11 text-sm text-secondary hover:text-white">
                {t('nav.login')}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
