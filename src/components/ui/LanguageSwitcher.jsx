import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Check, Globe } from 'lucide-react';
import { LANGUAGES, persistLang, isRtl } from '../../i18n/config.js';
import { localizedPath, stripLangPrefix } from '../../hooks/useLocalizedPath.js';

export default function LanguageSwitcher({ compact = false }) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];
  const rtl = isRtl(i18n.language);

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const handleSelect = (code) => {
    if (code === i18n.language) {
      setOpen(false);
      return;
    }
    i18n.changeLanguage(code);
    persistLang(code);
    const basePath = stripLangPrefix(location.pathname);
    const newPath = localizedPath(basePath, code) + location.search + location.hash;
    navigate(newPath);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-secondary hover:text-white transition-colors rounded-full border border-subtle"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-base leading-none">{current.flag}</span>
        {!compact && <span className="hidden sm:inline">{current.name}</span>}
        {compact && <Globe size={14} className="sm:hidden" />}
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className={`absolute top-full mt-2 min-w-[180px] glass-nav rounded-xl overflow-hidden z-50 border border-subtle ${
              rtl ? 'left-0' : 'right-0'
            }`}
            role="listbox"
          >
            {LANGUAGES.map((l) => {
              const active = l.code === i18n.language;
              return (
                <li key={l.code}>
                  <button
                    type="button"
                    onClick={() => handleSelect(l.code)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-start transition-colors ${
                      active ? 'text-white bg-white/5' : 'text-secondary hover:text-white hover:bg-white/5'
                    }`}
                    role="option"
                    aria-selected={active}
                  >
                    <span className="text-base leading-none">{l.flag}</span>
                    <span className="flex-1 text-start">{l.name}</span>
                    {active && <Check size={14} className="text-brand-red" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
