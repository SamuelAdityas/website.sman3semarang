-- Jalankan di Supabase SQL Editor untuk mengaktifkan penyimpanan tipe media (foto/video).
alter table public.site_content add column if not exists media_type text not null default 'image';
