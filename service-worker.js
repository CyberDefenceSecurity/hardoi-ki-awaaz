/* ============================================
   Hardoi ki Awaaz — Service Worker
   PWA: caches core files for offline access
   ============================================ */

const CACHE_NAME = 'hka-cache-v3';

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

  '/assets/images/logo.svg',
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

// Fetch — serve from cache first, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip API calls — always fetch fresh from network
  if (event.request.url.includes('/api/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          // Cache the fetched file for next time
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        }).catch(() => {
          // Offline fallback — return cached index.html for navigation
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
          return new Response('Offline', { status: 503 });
        });
      })
  );
});
