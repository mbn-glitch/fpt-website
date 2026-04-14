import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { searchFaqs, categories } from '../../data/helpContent.js';

export default function HelpSearch({ size = 'lg', className = '' }) {
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
    const onDocClick = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const results = useMemo(
    () => (debounced ? searchFaqs(debounced, 8) : []),
    [debounced]
  );

  const categoryMap = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c])),
    []
  );

  const goTo = (faq) => {
    setOpen(false);
    setQ('');
    navigate(`/help/${categoryMap[faq.categoryId].slug}#${faq.id}`);
  };

  const heightCls = size === 'sm' ? 'h-12 text-sm' : 'h-14 sm:h-16 text-base';
  const iconSize = size === 'sm' ? 18 : 20;

  return (
    <div ref={wrapRef} className={`relative w-full ${className}`}>
      <div
        className={`relative flex items-center ${heightCls} bg-[#0A0A0A] border rounded-2xl transition-colors ${
          open ? 'border-[#F42821] shadow-[0_0_0_4px_rgba(244,40,33,0.12)]' : 'border-subtle'
        }`}
      >
        <Search
          size={iconSize}
          className="absolute left-5 text-tertiary pointer-events-none"
        />
        <input
          ref={inputRef}
          type="text"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search for answers… (e.g., ‘profit target’, ‘payout’, ‘leverage’)"
          className="w-full h-full bg-transparent pl-14 pr-12 outline-none text-white placeholder:text-tertiary"
          aria-label="Search the help center"
        />
        {q && (
          <button
            onClick={() => {
              setQ('');
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="absolute right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-secondary"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-[#0A0A0A] border border-subtle rounded-2xl overflow-hidden z-40 shadow-2xl">
          {!debounced && (
            <div className="px-5 py-5 text-sm text-tertiary">
              Type to search… or browse categories below.
            </div>
          )}
          {debounced && results.length === 0 && (
            <div className="px-5 py-5 text-sm text-tertiary">
              No matches found. Try different keywords or{' '}
              <a href="/contact" className="text-white hover:underline">
                contact support
              </a>
              .
            </div>
          )}
          {results.length > 0 && (
            <ul className="max-h-[400px] overflow-y-auto divide-y divide-[#ffffff0a]">
              {results.map((f) => {
                const cat = categoryMap[f.categoryId];
                return (
                  <li key={f.id}>
                    <button
                      onClick={() => goTo(f)}
                      className="group w-full text-left px-5 py-4 hover:bg-white/[0.03] transition-colors flex items-start gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FCA5A5]">
                          {cat.title}
                        </div>
                        <div
                          className="mt-1 text-sm text-white truncate"
                          dangerouslySetInnerHTML={{
                            __html: highlight(f.question, debounced),
                          }}
                        />
                      </div>
                      <ArrowRight
                        size={14}
                        className="mt-1 text-tertiary group-hover:text-white group-hover:translate-x-0.5 transition-all"
                      />
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

function highlight(text, query) {
  const tokens = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 1);
  if (!tokens.length) return escapeHtml(text);
  const pattern = new RegExp(`(${tokens.map(escapeRegex).join('|')})`, 'gi');
  return escapeHtml(text).replace(
    pattern,
    '<mark class="bg-[#F42821]/20 text-white rounded px-0.5">$1</mark>'
  );
}
function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (m) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]
  ));
}
