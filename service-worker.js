// Nama cache diubah ke v2 untuk memaksa pembaruan
const CACHE_NAME = 'truth-or-dare-cache-v2'; 
const urlsToCache = [
    '/',
    'index.html',
    'manifest.json',
    'icons/icon-192x192.png', // Pastikan path ini ada di cache
    'icons/icon-512x512.png', // Pastikan path ini ada di cache
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
```

### 2. Perbarui `manifest.json` (Penting)

Pastikan juga path di `manifest.json` Anda sudah benar (menggunakan `icons/` bukan `ikon/`).

```json
{
  "name": "Truth or Dare - Edisi Seru",
  "short_name": "T or D",
  "start_url": ".",
  "display": "standalone",
  "background_color": "#1e3a8a",
  "theme_color": "#4c1d95",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "icons/icon-192x192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "icons/icon-512x512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ]
}
```

### Langkah Selanjutnya:

1.  **Ganti** isi file `service-worker.js` dan `manifest.json` Anda dengan kode di atas.
2.  **Commit dan deploy ulang** proyek Anda ke Netlify.
3.  Setelah deploy selesai, buka kembali website Anda dan lakukan **Hard Refresh** dengan menekan `Ctrl + Shift + R` (atau `Cmd + Shift + R` di Mac). Ini akan memaksa browser untuk mengambil *service worker* yang baru.

Logo Anda seharusnya sudah muncul sekarang. Jika Anda mengganti file lagi di masa depan, cukup ubah nama *cache* di `service-worker.js` (misalnya menjadi `v3`, `v4`, dst.) dan deploy ula
