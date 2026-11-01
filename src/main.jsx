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

// Every route × language is pre-rendered at build time (scripts/prerender.mjs) and hydrated here once the path's locale chunk is in;
// 404.html is rendered fresh (its language depends on the requested path).
switchLanguage(getInitialLang()).then(() => {
  if (container.dataset.prerendered === 'route' && container.hasChildNodes()) hydrateRoot(container, tree);
  else createRoot(container).render(tree);
});
