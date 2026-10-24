# Website SMA Negeri 3 Semarang — versi perbaikan

Proyek Next.js App Router, React, dan CSS responsif. Sudah mencakup navigasi besar dan responsif, animasi reveal, hover states, pencarian/filter berita, 10 artikel, dan halaman tambahan.

## Halaman
- `/` Beranda
- `/about` Profil sekolah
- `/berita` Daftar berita, pencarian, dan filter kategori
- `/berita/[id]` Detail berita
- `/galeri` Galeri sekolah dan peta lokasi
- `/prestasi` Prestasi
- `/fasilitas` Fasilitas
- `/ekstrakurikuler` Ekstrakurikuler
- `/tata-tertib` Tata tertib siswa

## Menjalankan proyek
1. Ekstrak ZIP.
2. Buka folder `sman3-semarang-website` di VS Code.
3. Jalankan `npm install`.
4. Jalankan `npm run dev`.
5. Buka `http://localhost:3000`.

Node.js 18.17+ direkomendasikan untuk Next.js 14. Jika ada `node_modules` lama dari ZIP/proyek sebelumnya, hapus folder `node_modules` dan `package-lock.json`, lalu jalankan `npm install` kembali.

## Foto
Foto logo dan tiga foto sekolah yang diberikan pengguna disimpan di `public/images/`.

## Catatan sebelum publikasi
Beberapa deskripsi halaman, contoh berita, dan kategori fasilitas/ekstrakurikuler disiapkan sebagai konten awal desain, bukan pernyataan bahwa kegiatan tertentu benar-benar terjadi. Sebelum website dipublikasikan sebagai kanal resmi, verifikasi berita, tanggal, nama kegiatan, visi-misi, daftar fasilitas/ekstrakurikuler, kontak, alamat lengkap, dan tata tertib dengan pihak sekolah. Halaman tata tertib secara eksplisit memberi catatan bahwa dokumen resmi sekolah harus menjadi acuan. Peta memakai pencarian Google Maps untuk SMA Negeri 3 Semarang.

## Admin CMS (tambahan)

### Menjalankan secara lokal
1. Salin `.env.example` menjadi `.env.local`.
2. Ganti nilai `ADMIN_USERNAME`, `ADMIN_PASSWORD`, dan `SESSION_SECRET` dengan kredensial rahasia milik Anda. Gunakan `SESSION_SECRET` acak yang panjang (minimal 32 karakter).
3. Jalankan `npm install`, lalu `npm run dev`.
4. Buka `http://localhost:3000/admin/login` dan masuk menggunakan kredensial dari `.env.local`.
5. Kelola entri melalui menu Beranda, Profil Sekolah, Berita, Prestasi, Fasilitas, Ekstrakurikuler, Galeri, dan Tata Tertib.

### Catatan penting
- Endpoint pengelolaan konten memverifikasi token sesi bertanda tangan di server; cookie sesi bersifat HttpOnly.
- Data CMS saat ini disimpan di `data/cms.json`, sehingga cocok untuk pengembangan lokal atau server Node.js dengan filesystem persisten. Untuk deployment serverless/multi-instance, pindahkan penyimpanan ke database seperti PostgreSQL/MySQL dan gunakan penyedia autentikasi produksi.
- Halaman daftar dan detail **Berita** sudah membaca data CMS. Halaman publik lain masih memiliki konten yang ditulis langsung di komponen masing-masing; agar semua perubahan Profil, Prestasi, Fasilitas, Ekstrakurikuler, Galeri, Tata Tertib, dan Beranda otomatis terlihat di publik, komponen halaman tersebut perlu dihubungkan ke CMS pada tahap berikutnya.
- Isi `.env.local` jangan pernah di-commit ke GitHub.


## Supabase CMS
Lihat `SUPABASE-SETUP.md` untuk konfigurasi database dan Storage.


## Admin CMS + Supabase setup

1. Install dependencies: `npm install`.
2. Copy `.env.example` to `.env.local` and fill in the Supabase Project URL, publishable/anon key, and the exact admin email. Never use a `service_role` key in browser code or commit `.env.local`.
3. In Supabase Authentication > Users, create/invite the admin user with the same email and set a password.
4. Open SQL Editor, replace every `ADMIN_EMAIL_HERE` in `supabase-setup.sql` with the lowercase admin email, then run the SQL.
5. In Supabase Storage, create a **public** bucket named `website-media`. The SQL includes upload/read/update/delete policies for that bucket.
6. Run `npm run dev` and visit `/admin/login`.

The admin dashboard currently manages the **Berita** section: create, edit, publish/unpublish, delete, and upload an image to Supabase Storage. The public `/berita` listing and `/berita/[id]` detail read published rows from `site_content`. The other website sections still use their existing page content and are not yet connected to editable CMS fields.

If login succeeds but the dashboard API returns an RLS error, check that the admin email in `.env.local` exactly matches the authenticated Supabase user and that `ADMIN_EMAIL_HERE` was replaced in the SQL before running it.


## Memulihkan berita lama ke Supabase

Versi ini menjaga agar halaman Berita tetap menampilkan `src/data/news.js` sebagai fallback ketika tabel Supabase masih kosong atau sementara tidak dapat diakses.

Agar berita lama juga muncul di Dashboard CMS dan dapat diedit dari sana:
1. Buka Supabase Dashboard → SQL Editor → New query.
2. Buka file `supabase-restore-existing-news.sql` dari folder proyek.
3. Salin seluruh isi file ke SQL Editor lalu klik Run.
4. Periksa hasil query verifikasi: bagian `berita` seharusnya berisi 10 konten (kecuali beberapa slug sudah pernah ada).
5. Muat ulang `/admin/dashboard`.

Skrip menggunakan `ON CONFLICT (slug) DO NOTHING`, sehingga aman dijalankan ulang dan tidak menimpa artikel yang sudah ada. Halaman Profil, Prestasi, Fasilitas, Ekstrakurikuler, Galeri, dan Tata Tertib pada source code saat ini masih memiliki konten statis lokal; entri di bagian CMS selain Berita belum otomatis mengubah halaman publik. Jangan menghapus file `src/data/news.js` atau file halaman yang sudah ada.
