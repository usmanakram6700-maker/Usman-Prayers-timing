const CACHE_NAME = 'usman-prayer-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './assets/icon.jpg',
  './assets/wallpaper_night.jpg',
  './assets/wallpaper_dawn.jpg',
  './assets/wallpaper_arches.jpg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});