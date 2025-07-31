const CACHE_NAME = 'couple-playland-cache-v2'; // Diperbarui ke versi 2 untuk pembaruan cache
const urlsToCache = [
    '/',
    '/index.html',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    '/icons/kiss.png',
    '/icons/dadu.png',
    '/icons/draw.png',
    '/icons/word.png',
    '/icons/otak.png',
    '/icons/pasangan.png', // Tambahkan ikon pasangan ke cache
    // '/offline.html', // Opsional: tambahkan halaman offline jika Anda membuatnya
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js',
    'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js',
    'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js'
];

self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Cache opened');
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting()) // Memaksa service worker baru untuk segera aktif
    );
});

self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => self.clients.claim()) // Mengambil alih kontrol klien yang ada
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                // Jika tidak ada di cache, coba ambil dari jaringan
                return fetch(event.request).then(
                    fetchResponse => {
                        // Periksa jika kita menerima respons yang valid
                        if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
                            return fetchResponse;
                        }

                        // Klon respons karena stream hanya bisa dibaca sekali
                        const responseToCache = fetchResponse.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return fetchResponse;
                    }
                ).catch(error => {
                    console.error('Service Worker: Fetch failed:', error);
                    // Jika fetch gagal (misalnya, offline), coba berikan fallback
                    // if (event.request.mode === 'navigate') {
                    //     return caches.match('/offline.html'); // Mengembalikan halaman offline jika navigasi gagal
                    // }
                    // Untuk aset lain, cukup lemparkan error atau kembalikan respons kosong
                    throw error;
                });
            })
    );
});
