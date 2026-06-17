/* ============================================
   Hardoi ki Awaaz — Service Worker
   PWA: caches core files for offline access
   ============================================ */

const CACHE_NAME = 'hka-cache-v5';

// Core files to cache immediately on install
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/news.html',
  '/issues.html',
  '/protest-schedule.html',
  '/about.html',
  '/contact.html',
  '/id-card.html',
  '/manifesto.html',
  '/bulletin/index.html',
  '/css/style.css',
  '/css/responsive.css',
  '/css/animations.css',
  '/css/id-card.css',
  '/js/main.js',
  '/js/news.js',
  '/js/storage.js',
  '/js/counter.js',
  '/js/id-generator.js',
  '/js/photo-uploader.js',
  '/js/photo-finder.js',
  '/js/translations.js',
  '/js/hardoi-villages.js',
  '/js/google-cse.js',

  '/assets/images/logo.jpg',
  '/assets/images/hero-bg.svg',
  '/manifest.json'
];

// Install — cache core files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate — clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch — Network-first for HTML, cache-first for static assets
// This ensures fresh content on every page refresh
self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  
  // Skip API calls — always fetch fresh from network
  if (url.includes('/api/')) {
    return;
  }

  // For HTML pages — always fetch from network first (cache-fallback)
  if (event.request.mode === 'navigate' || url.endsWith('.html')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache a copy for offline use
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // Offline: serve cached version
          return caches.match(event.request).then(function(cached) {
            if (cached) return cached;
            // For navigation, fallback to index.html
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
            return new Response('Offline', { status: 503 });
          });
        })
    );
    return;
  }

  // For static assets (CSS, JS, images) — cache-first for speed
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          // Return cached, but update cache in background
          fetch(event.request).then((response) => {
            if (response && response.status === 200) {
              const responseToCache = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache);
              });
            }
          }).catch(() => {});
          return cachedResponse;
        }
        return fetch(event.request).then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        }).catch(() => {
          return new Response('Offline', { status: 503 });
        });
      })
  );
});
