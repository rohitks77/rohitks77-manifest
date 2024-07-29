const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  'https://rohitks77.github.io/rohitks77-manifest/index.html',
  'https://rohitks77.github.io/rohitks77-manifest/styles.css',
  'https://rohitks77.github.io/rohitks77-manifest/script.js',
  'https://rohitks77.github.io/rohitks77-manifest/icons/icon-48x48.png',
  'https://rohitks77.github.io/rohitks77-manifest/icons/icon-72x72.png',
  'https://rohitks77.github.io/rohitks77-manifest/icons/icon-96x96.png',
  'https://rohitks77.github.io/rohitks77-manifest/icons/icon-144x144.png',
  'https://rohitks77.github.io/rohitks77-manifest/icons/icon-192x192.png',
  'https://rohitks77.github.io/rohitks77-manifest/icons/icon-512x512.png'
];

// Install the service worker and cache all specified assets
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercept network requests and serve cached files if available
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return the response
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

// Activate the service worker and remove old caches
self.addEventListener('activate', function(event) {
  var cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
