/* FPT public site — conservative service worker (UX-AUDIT-7 R3, UXFW-052 «offline»).
   Network first, ALWAYS: no page, script, style, font or image is ever served from this worker while the network answers; nothing is
   cached except the one offline fallback page and the files it needs. A navigation that fails (no network) gets /offline.html instead of
   the browser's error page. Registered after the window `load` event at idle priority (src/main.jsx) so it never competes with the first paint. */
const VERSION = 'fpt-offline-v1';
const OFFLINE_URL = '/offline.html';
const PRECACHE = [OFFLINE_URL, '/brand/fpt-lockup-horizontal-en-white.svg', '/brand/fpt-tile.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(VERSION).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  // navigations: the network, and only when it is unreachable the offline page (never a cached copy of a real page)
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).catch(() => caches.match(OFFLINE_URL)));
    return;
  }
  // the offline page's own assets: network first, the precached copy as the fallback
  const url = new URL(req.url);
  if (url.origin === self.location.origin && PRECACHE.includes(url.pathname)) {
    event.respondWith(fetch(req).catch(() => caches.match(url.pathname)));
  }
});
