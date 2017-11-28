/**
 * #TODO: warning is offline
 */

let cacheName = 'pwa-push.v.0.1.0'
//it is possible to cache external URL
let cacheFiles = [
    './',
    'index.html',
    'css/styles.css',
    'js/o.o.polyfill.js',
    'js/a.o.polyfill.js',
    'js/scripts.js',
    'sw.js'
];

self.addEventListener('install', (event) => {
    console.log('SW Started...');
    event.waitUntil(
        caches.open(cacheName)
        .then((cache) => {
            console.log('SW Install appshell.');
            return cache.addAll(cacheFiles);
        })
    )
});

//read files from SW
self.addEventListener('activate', (event) => {
    console.log('SW Activate...');
    event.waitUntil(
        caches.keys()
        .then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== cacheName) {
                    console.log('SW Removing old version.')
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', (event) => {
    console.log('SW Get...', event.request.url);
    event.respondWith(
        caches.match(event.request)
        .then((res) => {
            return res || fetch(event.request);
        })
    );
})