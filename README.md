### 2. Periksa `index.html` dan `manifest.json`

Pastikan path di kedua file tersebut **tidak menggunakan garis miring di depan**. Ini penting untuk Netlify.

* Di **`index.html`**, pastikan tag `img` seperti ini:
    ```html
    <img src="icons/icon-192x192.png" ... >
    ```
* Di **`manifest.json`**, pastikan `src` seperti ini:
    ```json
    "src": "icons/icon-192x192.png"
    ```

### Langkah Paling Penting

Setelah Anda memperbarui file-file di atas:
1.  **Commit dan Push** perubahan Anda ke GitHub.
2.  **Tunggu Netlify selesai melakukan deploy ulang** secara otomatis. Anda bisa memeriksanya di dashboard Netlify Anda.
3.  Setelah deploy selesai, buka kembali website Anda dan lakukan **Hard Refresh** (`Ctrl + Shift + R`).

Jika logo masih belum muncul, itu berarti folder `icons` Anda tidak ikut ter-deploy. Anda perlu memeriksa pengaturan build di Netlify untuk memastikan folder tersebut disertak
