const CACHE = 'neon-tac-v2'

self.addEventListener('install', (e) => {
  e.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.open(CACHE).then((cache) =>
      cache.match(e.request).then((cached) => {
        const fetched = fetch(e.request)
          .then((res) => {
            if (e.request.method === 'GET' && res.status === 200) {
              cache.put(e.request, res.clone())
            }
            return res
          })
          .catch(() => cached)
        return cached || fetched
      })
    )
  )
})
