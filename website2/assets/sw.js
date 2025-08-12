// Simple service worker for offline caching
const CACHE_NAME = 'energize-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/contact.html',
  '/assets/style.css',
  '/assets/main.js',
  '/assets/favicon.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
