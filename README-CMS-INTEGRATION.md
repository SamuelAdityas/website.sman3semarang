# Integrasi CMS seluruh halaman

## Sebelum mulai
1. Backup folder proyek dan database.
2. Pastikan `supabase-setup.sql` sudah dijalankan dan placeholder email admin pada policy sudah diganti.
3. Pastikan bucket `website-media` ada.

## Migrasi data awal
1. Buka Supabase Dashboard → SQL Editor → New query.
2. Jalankan isi `supabase-migrate-static-content.sql`.
3. Skrip mengisi data awal untuk Beranda, Profil, Prestasi, Fasilitas, Ekstrakurikuler, Galeri, dan Tata tertib. Data Berita yang sudah ada tidak ditimpa.
4. Query terakhir menampilkan jumlah baris per section.

## Jalankan website
```bash
npm install
npm run dev
```
Buka `/admin/dashboard`. Konten tiap menu sekarang dapat ditambah, diedit, dihapus, dan dipublikasikan. Halaman publik menggunakan data terbit dari Supabase. Jika suatu section belum memiliki data atau API tidak tersedia, kode halaman lama ditampilkan sebagai fallback.

## Catatan penting
- Konten awal profil berisi beberapa placeholder yang perlu diverifikasi dengan dokumen resmi sekolah sebelum dipublikasikan.
- Jangan menaruh `service_role` key di `NEXT_PUBLIC_*` atau di kode browser.
- Uji satu konten per section: edit judul/deskripsi, simpan, lalu periksa halaman publik.
