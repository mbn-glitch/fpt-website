import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FAQAccordion({ faqs, defaultOpenId }) {
  const [openId, setOpenId] = useState(defaultOpenId || (faqs[0]?.id ?? null));

  // Deep-link support — open FAQ whose hash matches
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;
      const hit = faqs.find((f) => f.id === hash);
      if (hit) {
        setOpenId(hit.id);
        // scroll after paint
        setTimeout(() => {
          const el = document.getElementById(hit.id);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
      }
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, [faqs]);

  const toggle = (id) => setOpenId((curr) => (curr === id ? null : id));

  return (
    <ul className="divide-y divide-[#ffffff0f]">
      {faqs.map((f) => {
        const open = openId === f.id;
        return (
          <li
            key={f.id}
            id={f.id}
            className="scroll-mt-28 border border-subtle rounded-xl bg-[#0F0F0F] mb-3 overflow-hidden last:mb-0"
          >
            <button
              onClick={() => toggle(f.id)}
              aria-expanded={open}
              className="w-full flex items-start justify-between gap-6 text-left px-5 py-5 hover:bg-white/[0.02] transition-colors"
            >
              <span className="text-[16px] sm:text-[17px] font-medium text-white leading-snug">
                {f.question}
              </span>
              <ChevronDown
                size={20}
                className={`mt-0.5 shrink-0 text-tertiary transition-transform duration-300 ${
                  open ? 'rotate-180 text-[#F42821]' : ''
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.2, 0, 0, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-6 text-[15px] text-secondary leading-[1.7]">
                    {f.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
