let cacheName = 'pwa-push.v.0.1.0'
let cacheFiles = [];

self.addEventListener('install', (event) => {
    console.log('SW Started...');
    event.waitUntil(
        caches.open(cacheName)
        .then((cache) => {
            console.log('SW Install appshell...');
            return cache.addAll(cacheFiles);
        })
    )
})