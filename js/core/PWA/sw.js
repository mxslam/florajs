const CACHE_NAME = 'flora-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/base.css',
  '/js/base.js',
  '/img/logos/logo192.png',
  '/img/logos/logo512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
