const CACHE_NAME = 'truth-or-dare-cache-v1';
const urlsToCache = [
    '/',
    'index.html',
    'manifest.json',
    // Tambahkan file CSS atau JS eksternal lain jika ada
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.js',
    'https://img.icons8.com/plasticine/200/000000/bottle-of-water.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
