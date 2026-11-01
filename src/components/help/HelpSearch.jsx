import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, X, ArrowRight } from 'lucide-react';
import { searchFaqs, categories } from '../../data/helpContent.js';
import useLocalizedPath from '../../hooks/useLocalizedPath.js';

/** Help search — localized placeholder and states, opaque result list (no portal, no blur), localized target links. */
export default function HelpSearch({ size = 'lg', className = '' }) {
  const { t, i18n } = useTranslation();
  const { to } = useLocalizedPath();
  const lang = i18n.language?.split('-')[0] || 'en';
  const [q, setQ] = useState('');
  const [debounced, setDebounced] = useState('');
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const id = setTimeout(() => setDebounced(q), 200);
    return () => clearTimeout(id);
  }, [q]);

  useEffect(() => {
    if (!open) return undefined;
    const fn = (e) => { if (!wrapRef.current?.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('click', fn);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('click', fn); document.removeEventListener('keydown', onKey); };
  }, [open]);

  const results = useMemo(() => (debounced ? searchFaqs(debounced, 8) : []), [debounced]);
  const categoryMap = useMemo(() => Object.fromEntries(categories.map((c) => [c.id, c])), []);

  const goTo = (faq) => {
    setOpen(false); setQ('');
    navigate(to(`/help/${categoryMap[faq.categoryId].slug}#${faq.id}`));
  };

  const heightCls = size === 'sm' ? 'h-12 text-sm' : 'h-14 text-base';

  return (
    <div ref={wrapRef} className={`relative w-full ${className}`}>
      <div className={`relative flex items-center ${heightCls} bg-card border rounded-2xl transition-colors ${open ? 'border-white/40' : 'border-subtle'}`}>
        <Search size={18} className="absolute start-4 text-tertiary pointer-events-none" aria-hidden="true" />
        <input
          ref={inputRef}
          type="search"
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder={t('help.searchPlaceholder')}
          className="w-full h-full bg-transparent ps-12 pe-12 outline-none text-white placeholder:text-tertiary"
          aria-label={t('help.searchLabel')}
        />
        {q && (
          <button type="button" onClick={() => { setQ(''); setOpen(false); inputRef.current?.focus(); }} className="absolute end-2 w-11 h-11 rounded-full flex items-center justify-center text-secondary hover:text-white" aria-label={t('help.clearSearch')}>
            <X size={14} aria-hidden="true" />
          </button>
        )}
      </div>
      {open && (
        <div id="help-search-results" role="region" aria-live="polite" className="absolute inset-x-0 top-full mt-2 z-30 bg-card border border-subtle rounded-2xl max-h-[400px] overflow-y-auto text-start">
          {!debounced && <p className="p-5 text-[13px] text-tertiary">{t('help.searchHint')}</p>}
          {debounced && results.length === 0 && <p className="p-5 text-[13px] text-tertiary">{t('help.searchNoMatch')}</p>}
          {results.length > 0 && (
            <ul>
              {results.map((f) => {
                const cat = categoryMap[f.categoryId];
                const catTitle = (lang !== 'en' && cat.titles?.[lang]) ? cat.titles[lang] : cat.title;
                const question = (lang !== 'en' && f.questions?.[lang]) ? f.questions[lang] : f.question;
                return (
                  <li key={f.id} className="border-b border-subtle last:border-0">
                    <button type="button" onClick={() => goTo(f)} className="w-full text-start px-5 min-h-12 py-3 flex items-center gap-3 text-white hover:bg-white/5">
                      <span className="flex-1 min-w-0">
                        <span className="block text-[13px] text-tertiary">{catTitle}</span>
                        <span className="block text-sm truncate">{question}</span>
                      </span>
                      <ArrowRight size={13} className="text-tertiary shrink-0 flip-rtl" aria-hidden="true" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
