const CACHE_NAME = 'cache-v1';
const FILES_TO_CACHE = [
  'index.html',
  'app.js',
  'manifest.json',
  'index.js',
  'index.css',
]

self.addEventListener('install', e => e.waitUntil(
  caches.open(CACHE_NAME).then(c => c.addAll(FILES_TO_CACHE))));

// activate event
self.addEventListener('activate', e => {
    console.log('service worker has been activated');
})

self.addEventListener('fetch', e => e.respondWith(
  caches.match(e.request).then((r) => {
    return r || fetch(e.request).then((res) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(e.request, res.clone());
        return res;
      })
    })
  })
));