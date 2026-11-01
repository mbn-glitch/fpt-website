import React from 'react';
import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom/server';
import App from './App.jsx';
import { LANG_CODES, isRtl, switchLanguage } from './i18n/config.js';

/**
 * Build-time render of one URL (scripts/prerender.mjs): loads the path's locale, switches to it and renders the app with
 * react-dom/static `prerender` twice (warm-up, then final) so every lazy page chunk / Suspense boundary is inlined in the HTML. React 19 emits the page's
 * <title>/<meta>/<link> (src/components/SEO.jsx) as hoistables at the start of the markup; prerender.mjs lifts them into <head>.
 * Used only at build time — nothing here runs in the browser.
 */
export async function render(url) {
  const seg = url.split('/').filter(Boolean)[0];
  const lang = seg && LANG_CODES.includes(seg) && seg !== 'en' ? seg : 'en';
  await switchLanguage(lang);
  const tree = (
    <React.StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </React.StrictMode>
  );
  // Warm-up pass resolves the route's lazy chunk (React.lazy caches the module); the final pass renders with an unbounded progressive
  // chunk size so Fizz never outlines a boundary (an outlined boundary = hidden segment + move script = an empty <main> at first paint, CLS 0.9).
  const OPTS = { progressiveChunkSize: 1 << 30 };
  await new Response((await prerender(tree, OPTS)).prelude).text();
  const { prelude } = await prerender(tree, OPTS);
  const rendered = await new Response(prelude).text();
  if (/<template id="B:|<!--\$\?-->/.test(rendered)) throw new Error(`prerender ${url}: a Suspense boundary is still deferred in the static markup`);
  const m = rendered.match(/^((?:<title>[\s\S]*?<\/title>|<meta [^>]*>|<link [^>]*>)+)/);
  const head = m ? m[1].replace(/></g, '>\n    <') : '';
  const html = m ? rendered.slice(m[1].length) : rendered;
  return { html, head, lang, dir: isRtl(lang) ? 'rtl' : 'ltr' };
}
