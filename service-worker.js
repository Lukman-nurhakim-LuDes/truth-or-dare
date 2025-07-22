// Nama cache diubah ke v5 untuk memaksa pembaruan
const CACHE_NAME = 'truth-or-dare-cache-v5'; 
const urlsToCache = [
    '/',
    './', // Menambahkan path root relatif
    'index.html',
    'manifest.json',
    'icons/icon-192x192.png',
    'icons/icon-512x512.png',
    'README.md',
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.js',
    'https://api.iconify.design/mdi:bottle-soda-classic-outline.svg?color=white'
];

// Saat service worker di-install, buat cache baru
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache and caching new assets');
                return cache.addAll(urlsToCache);
            })
    );
});

// Saat service worker aktif, hapus cache yang lama
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Ambil file dari cache jika ada, jika tidak, ambil dari network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});
