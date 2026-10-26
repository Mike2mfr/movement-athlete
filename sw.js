// Offline support: app files are cached on install; Google Fonts are cached the first time they load.
const VERSION = 'ma-v19-2026-10-26';
const AUDIO = 'mind-audio-v1';
const AUD = ["./audio/mind/awake.mp3", "./audio/mind/centering.mp3", "./audio/mind/count10.mp3", "./audio/mind/count100.mp3", "./audio/mind/count25.mp3", "./audio/mind/count5.mp3", "./audio/mind/count50.mp3", "./audio/mind/dreamset.mp3", "./audio/mind/golden.mp3", "./audio/mind/incubate.mp3", "./audio/mind/mirror.mp3", "./audio/mind/rehearsal.mp3", "./audio/mind/scenes.mp3", "./audio/mind/screen.mp3", "./audio/mind/short.mp3", "./audio/mind/sleep.mp3", "./audio/mind/tap.mp3", "./audio/mind/wild.mp3"];
const APP = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(APP)).then(() => self.skipWaiting())); caches.open(AUDIO).then(c => Promise.all(AUD.map(u => c.match(u).then(h => h || c.add(u).catch(() => {}))))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION && k !== AUDIO).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    // network first for the page so updates arrive, cache as fallback when offline
    if (req.mode === 'navigate') { e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(VERSION).then(x => x.put('./index.html', c)); return r; }).catch(() => caches.match('./index.html'))); return; }
    if (url.pathname.includes('/audio/')) { e.respondWith(caches.open(AUDIO).then(c => c.match(req).then(hit => hit || fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; })))); return; }
    e.respondWith(caches.match(req).then(r => r || fetch(req)));
    return;
  }
  if (url.hostname.endsWith('googleapis.com') || url.hostname.endsWith('gstatic.com')) {
    e.respondWith(caches.open(VERSION + '-fonts').then(c => c.match(req).then(hit => hit || fetch(req).then(r => { c.put(req, r.clone()); return r; }))));
  }
});
