import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { searchFaqs, categories } from '../../data/helpContent.js';

export default function HelpSearch({ size = 'lg', className = '' }) {
  const [q, setQ] = useState('');
  const [debounced, setDebounced] = useState('');
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({top:0,left:0,width:0});
  const wrapRef = useRef(null);
  const inputRef = useRef(null);
  const portalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const id = setTimeout(() => setDebounced(q), 200);
    return () => clearTimeout(id);
  }, [q]);

  const updatePos = () => {
    if (wrapRef.current) {
      const r = wrapRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + window.scrollY + 8, left: r.left + window.scrollX, width: r.width });
    }
  };

  useEffect(() => {
    if (!open) return;
    const fn = (e) => {
      if (!wrapRef.current?.contains(e.target) && !portalRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('click', fn);
    return () => document.removeEventListener('click', fn);
  }, [open]);

  const handleOpen = () => { updatePos(); setOpen(true); };

  const results = useMemo(() => debounced ? searchFaqs(debounced, 8) : [], [debounced]);
  const categoryMap = useMemo(() => Object.fromEntries(categories.map((c) => [c.id, c])), []);

  const goTo = (faq) => {
    setOpen(false); setQ('');
    navigate(`/help/${categoryMap[faq.categoryId].slug}#${faq.id}`);
  };

  const heightCls = size === 'sm' ? 'h-12 text-sm' : 'h-14 sm:h-16 text-base';
  const iconSize = size === 'sm' ? 18 : 20;

  const dropdown = open ? createPortal(
    <div ref={portalRef} style={{position:'absolute',top:pos.top,left:pos.left,width:pos.width,zIndex:999999,background:'#0A0A0A',border:'1px solid rgba(255,255,255,0.1)',borderRadius:16,boxShadow:'0 20px 60px rgba(0,0,0,0.8)',maxHeight:400,overflowY:'auto',overscrollBehavior:'contain'}}>
      {!debounced && <div style={{padding:'20px',fontSize:13,color:'rgba(255,255,255,0.35)'}}>Type to search… or browse categories below.</div>}
      {debounced && results.length === 0 && <div style={{padding:'20px',fontSize:13,color:'rgba(255,255,255,0.35)'}}>No matches — try different keywords.</div>}
      {results.length > 0 && (
        <ul style={{listStyle:'none',margin:0,padding:0}}>
          {results.map((f) => {
            const cat = categoryMap[f.categoryId];
            return (
              <li key={f.id} style={{borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                <button onClick={() => goTo(f)} style={{width:'100%',textAlign:'left',padding:'14px 20px',background:'transparent',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:12,color:'#fff'}}>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.15em',color:'#FCA5A5',marginBottom:3}}>{cat.title}</div>
                    <div style={{fontSize:13,color:'#fff',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{f.question}</div>
                  </div>
                  <ArrowRight size={13} style={{color:'rgba(255,255,255,0.3)',flexShrink:0}} />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>,
    document.body
  ) : null;

  return (
    <>
      <div ref={wrapRef} className={`relative w-full ${className}`}>
        <div className={`relative flex items-center ${heightCls} bg-[#0A0A0A] border rounded-2xl transition-colors ${open ? 'border-[#F42821] shadow-[0_0_0_4px_rgba(244,40,33,0.12)]' : 'border-subtle'}`}>
          <Search size={iconSize} className="absolute left-5 text-tertiary pointer-events-none" />
          <input ref={inputRef} type="text" value={q}
            onChange={(e) => { setQ(e.target.value); handleOpen(); }}
            onFocus={handleOpen}
            placeholder="Search for answers…"
            className="w-full h-full bg-transparent pl-14 pr-12 outline-none text-white placeholder:text-tertiary"
            aria-label="Search the help center"
          />
          {q && (
            <button onClick={() => { setQ(''); setOpen(false); inputRef.current?.focus(); }} className="absolute right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-secondary">
              <X size={14} />
            </button>
          )}
        </div>
      </div>
      {dropdown}
    </>
  );
}