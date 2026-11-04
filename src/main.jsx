import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { getInitialLang, switchLanguage } from './i18n/config.js';
import './index.css';

const container = document.getElementById('root');
const tree = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Every route × language is pre-rendered at build time (scripts/prerender.mjs) and hydrated here once the path's locale chunk is in —
// the six 404 pages too (decision 53): Vercel serves the 404 file of the path's language prefix, which is the language getInitialLang() reads.
switchLanguage(getInitialLang()).then(() => {
  if (container.dataset.prerendered === 'route' && container.hasChildNodes()) hydrateRoot(container, tree);
  else createRoot(container).render(tree);
});

// UXFW-052 «offline»: a conservative service worker (public/sw.js — network first, nothing cached but the offline fallback page) registered
// after `load` at idle priority so it never competes with the first paint (LCP / CLS unaffected — measured in R3).
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const register = () => navigator.serviceWorker.register('/sw.js').catch(() => {});
    if ('requestIdleCallback' in window) requestIdleCallback(register, { timeout: 5000 });
    else setTimeout(register, 2000);
  });
}
