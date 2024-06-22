// Example service worker for caching Blogger content (using Workbox)

importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.2.0/workbox-sw.js');

workbox.setConfig({ debug: false });

// Cache Blogger posts and pages
workbox.routing.registerRoute(
  new RegExp('https://www.rohitks77.com.np/.*'),
  new workbox.strategies.NetworkFirst({
    cacheName: 'blogger-content-cache',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  })
);

// Cache Google Fonts
workbox.routing.registerRoute(
  new RegExp('https://fonts.(googleapis|gstatic).com/.*'),
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-cache',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Cache images, CSS, JS, etc.
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'blogger-assets-cache',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
