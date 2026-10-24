-- Jalankan di Supabase Dashboard > SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  section text not null default 'berita',
  slug text not null unique,
  title text not null,
  category text not null default 'Kegiatan sekolah',
  date_label text,
  excerpt text not null default '',
  body jsonb not null default '[]'::jsonb,
  image_url text,
  image_alt text,
  media_type text not null default 'image',
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

drop policy if exists "Public can read published content" on public.site_content;
create policy "Public can read published content"
on public.site_content for select
to anon, authenticated
using (published = true);

drop policy if exists "Admin can read all content" on public.site_content;
create policy "Admin can read all content"
on public.site_content for select
to authenticated
using ((auth.jwt() ->> 'email') = lower('ADMIN_EMAIL_HERE'));

-- Replace the email below with the exact admin email. The direct JWT claim policies
-- below are simpler for a single-admin class project; do not expose service_role keys.
drop policy if exists "Admin insert content" on public.site_content;
create policy "Admin insert content"
on public.site_content for insert to authenticated
with check ((auth.jwt() ->> 'email') = lower('ADMIN_EMAIL_HERE'));

drop policy if exists "Admin update content" on public.site_content;
create policy "Admin update content"
on public.site_content for update to authenticated
using ((auth.jwt() ->> 'email') = lower('ADMIN_EMAIL_HERE'))
with check ((auth.jwt() ->> 'email') = lower('ADMIN_EMAIL_HERE'));

drop policy if exists "Admin delete content" on public.site_content;
create policy "Admin delete content"
on public.site_content for delete to authenticated
using ((auth.jwt() ->> 'email') = lower('ADMIN_EMAIL_HERE'));

-- Storage: create a PUBLIC bucket named website-media in Storage UI first.
-- Then replace ADMIN_EMAIL_HERE below and run these policies.
drop policy if exists "Public view website media" on storage.objects;
create policy "Public view website media"
on storage.objects for select to public
using (bucket_id = 'website-media');

drop policy if exists "Admin upload website media" on storage.objects;
create policy "Admin upload website media"
on storage.objects for insert to authenticated
with check (bucket_id = 'website-media' and (auth.jwt() ->> 'email') = lower('ADMIN_EMAIL_HERE'));

drop policy if exists "Admin update website media" on storage.objects;
create policy "Admin update website media"
on storage.objects for update to authenticated
using (bucket_id = 'website-media' and (auth.jwt() ->> 'email') = lower('ADMIN_EMAIL_HERE'))
with check (bucket_id = 'website-media' and (auth.jwt() ->> 'email') = lower('ADMIN_EMAIL_HERE'));

drop policy if exists "Admin delete website media" on storage.objects;
create policy "Admin delete website media"
on storage.objects for delete to authenticated
using (bucket_id = 'website-media' and (auth.jwt() ->> 'email') = lower('ADMIN_EMAIL_HERE'));

-- Kompatibilitas untuk tabel yang dibuat sebelum dukungan upload video ditambahkan.
alter table public.site_content add column if not exists media_type text not null default 'image';
