import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import Logo from '../brand/Logo.jsx';
import Button from '../ui/Button.jsx';
import LanguageSwitcher from '../ui/LanguageSwitcher.jsx';
import { localizedPath } from '../../hooks/useLocalizedPath.js';

const REGISTER = 'https://crm.fptraders.com/register';
const LOGIN = 'https://crm.fptraders.com/login';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const LINKS = [
    { label: t('nav.home'), to: '/' },
    { label: t('nav.challenges'), to: '/challenges' },
    { label: t('nav.howItWorks'), to: '/#how-it-works', hash: true },
    { label: t('nav.ecosystem'), to: '/#ecosystem', hash: true },
    { label: t('nav.about'), to: '/about' },
    { label: t('nav.help'), to: '/help' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-6">
        <Link to={localizedPath('/', lang)} className="flex items-center gap-3 shrink-0" aria-label="Fiper Pro Traders home">
          <Logo variant="icon" size={46} />
          <div className="flex flex-col leading-none">
            <span className="text-[15px] font-semibold tracking-tight">Fiper Pro Traders</span>
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-tertiary mt-1">
              {t('nav.partOfFiperGlobal')}
            </span>
          </div>
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {LINKS.map((l) =>
            l.hash ? (
              <li key={l.label}>
                <a
                  href={localizedPath(l.to, lang)}
                  className="px-4 py-2 text-sm text-secondary hover:text-white transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ) : (
              <li key={l.label}>
                <NavLink
                  to={localizedPath(l.to, lang)}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm transition-colors ${
                      isActive ? 'text-white' : 'text-secondary hover:text-white'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            )
          )}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href={LOGIN}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-secondary hover:text-white transition-colors"
          >
            {t('nav.login')}
          </a>
          <Button href={REGISTER} external size="sm">
            {t('nav.startChallenge')}
          </Button>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <LanguageSwitcher compact />
          <button
            className="p-2 text-white"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden glass-nav border-t border-subtle">
          <div className="px-6 py-6 flex flex-col gap-1">
            {LINKS.map((l) =>
              l.hash ? (
                <a
                  key={l.label}
                  href={localizedPath(l.to, lang)}
                  onClick={() => setOpen(false)}
                  className="py-3 text-base text-secondary hover:text-white"
                >
                  {l.label}
                </a>
              ) : (
                <NavLink
                  key={l.label}
                  to={localizedPath(l.to, lang)}
                  onClick={() => setOpen(false)}
                  className="py-3 text-base text-secondary hover:text-white"
                >
                  {l.label}
                </NavLink>
              )
            )}
            <div className="mt-4 flex flex-col gap-3">
              <a
                href={LOGIN}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center py-3 text-sm text-secondary border border-subtle rounded-full"
              >
                {t('nav.login')}
              </a>
              <Button href={REGISTER} external size="md">
                {t('nav.startChallenge')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
