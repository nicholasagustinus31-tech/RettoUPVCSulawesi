# Retto UPVC Sulawesi Website

Website company profile untuk Retto UPVC Sulawesi yang menampilkan informasi perusahaan, rangkaian produk, portofolio proyek, dan formulir kontak dengan captcha.

## Struktur Halaman
- `index.html` – landing page dengan hero, layanan, produk unggulan, nilai perusahaan, dan CTA.
- `about.html` – profil perusahaan, visi misi, dan tim inti.
- `products.html` – daftar kategori produk serta spesifikasi standar.
- `product-*.html` – detail masing-masing produk: swing door, sliding door, jungkit, lipat, dan pivot.
- `projects.html` – galeri proyek dan metodologi kerja.
- `contact.html` – formulir kontak, informasi kantor, area layanan, dan kontak cepat.
- `sitemap.xml` & `robots.txt` – mendukung SEO dan indexing mesin pencari.

## Teknologi
- HTML5 semantik dengan meta tag SEO lengkap dan markup schema.org (LocalBusiness).
- CSS modern (`assets/css/styles.css`) dengan warna brand #FF0000 dan font Poppins dari Google Fonts.
- JavaScript (`assets/js/main.js`) untuk animasi intersection observer dan captcha aritmatika sederhana.

## Cara Menggunakan
Buka file HTML secara langsung di browser atau unggah seluruh folder ke hosting statis. Pastikan struktur folder `assets/` tetap sama agar stylesheet dan skrip dapat dimuat dengan benar.

## Kustomisasi
- Ganti URL gambar pada section proyek atau hero sesuai aset yang dimiliki.
- Sesuaikan informasi kontak, tautan media sosial, dan nomor telepon dengan data aktual.
- Untuk integrasi formulir, arahkan atribut `action` pada `contact.html` ke endpoint pengelola email/server sesuai kebutuhan.
