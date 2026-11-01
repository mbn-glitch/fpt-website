import { useEffect, useId, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { LANGUAGES, persistLang, switchLanguage } from '../../i18n/config.js';
import { localizedPath, stripLangPrefix } from '../../hooks/useLocalizedPath.js';

/**
 * Language switcher — the current language NAME is always visible (never an icon-only button), 44 px target, accessible name,
 * opaque list (ground-panel, no blur), 44 px rows, Escape / outside click close, the check mark in the text colour (R-19 / R-29 / ID-09).
 */
export default function LanguageSwitcher({ className = '' }) {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const listId = useId();

  const current = LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onClick); document.removeEventListener('keydown', onKey); };
  }, [open]);

  const handleSelect = (code) => {
    setOpen(false);
    if (code === i18n.language) return;
    const basePath = stripLangPrefix(location.pathname);
    switchLanguage(code).then(() => {
      persistLang(code);
      navigate(localizedPath(basePath, code) + location.search + location.hash);
    });
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 h-11 px-3 text-sm text-white rounded-full border border-subtle hover:border-white/20 transition-colors min-w-0"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${t('common.language')}: ${current.name}`}
      >
        <Globe size={16} aria-hidden="true" />
        <span lang={current.code} className="truncate max-w-[22vw] sm:max-w-none">{current.name}</span>
        <ChevronDown size={14} aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={t('common.language')}
          className="absolute top-full mt-2 min-w-[200px] bg-card rounded-2xl overflow-hidden z-[90] border border-subtle shadow-[0_20px_40px_rgba(10,10,10,0.6)] end-0"
        >
          {LANGUAGES.map((l) => {
            const active = l.code === i18n.language;
            return (
              <li key={l.code}>
                <button
                  type="button"
                  onClick={() => handleSelect(l.code)}
                  lang={l.code}
                  dir={l.dir}
                  className={`w-full flex items-center justify-between gap-3 h-11 px-4 text-sm text-start transition-colors ${
                    active ? 'text-white bg-white/5' : 'text-secondary hover:text-white hover:bg-white/5'
                  }`}
                  role="option"
                  aria-selected={active}
                >
                  <span>{l.name}</span>
                  {active && <Check size={16} aria-hidden="true" className="text-white" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
