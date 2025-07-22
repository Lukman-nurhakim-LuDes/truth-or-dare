 // Nama cache unik. Ubah nama ini jika Anda memperbarui file.
const CACHE_NAME = 'truth-or-dare-v2';

// Daftar file yang akan di-cache.
const urlsToCache = [
  '/',
  '/index.html',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Fredoka+One&family=Poppins:wght@400;600;700&display=swap',
  'https://fonts.gstatic.com/s/fredokaone/v13/k3kUo8kEI-tA1RRcTZGmTmHBAA.woff2', // Font pre-cache
  'https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecg.woff2' // Font pre-cache
];

// Event 'install': Dipanggil saat service worker pertama kali diinstal.
self.addEventListener('install', event => {
  // Tunggu sampai cache terbuka dan semua file penting ditambahkan.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Event 'fetch': Dipanggil setiap kali halaman meminta sumber daya (file).
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika file ditemukan di cache, kembalikan dari cache.
        if (response) {
          return response;
        }
        // Jika tidak, ambil dari jaringan (network).
        return fetch(event.request);
      }
    )
  );
});

// Event 'activate': Dipanggil untuk membersihkan cache lama.
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Hapus cache yang tidak ada di whitelist.
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

