-- Migrasi konten statis SMAN 3 Semarang ke CMS Supabase.
-- Jalankan setelah supabase-setup.sql dan setelah kebijakan admin sudah memakai email admin yang benar.
-- Aman dijalankan ulang: slug yang sudah ada tidak ditimpa.

ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS media_type text NOT NULL DEFAULT 'image';

INSERT INTO public.site_content (section, slug, title, category, date_label, excerpt, body, image_url, image_alt, media_type, published)
VALUES
-- BERANDA: hero dan blok konten halaman depan
('beranda','beranda-hero','Temukan potensi. Wujudkan masa depan.','Hero',NULL,'Ruang bagi generasi untuk belajar dengan rasa ingin tahu, bertumbuh dalam karakter, dan berani berkarya untuk masa depan.','["Portal resmi SMA Negeri 3 Semarang.","Belajar · Bertumbuh · Berkarya."]'::jsonb,'/images/gedung-utama.png','Gedung utama SMA Negeri 3 Semarang','image',true),
('beranda','beranda-intro','Pendidikan bukan hanya tentang hari ini.','Pengantar',NULL,'Ini tentang siapa yang akan kamu jadi.','["SMA Negeri 3 Semarang menjadi ruang untuk mengenali potensi, membangun karakter, dan mempersiapkan diri menghadapi dunia yang terus berubah."]'::jsonb,'/images/siswa.jpg','Lingkungan sekolah SMAN 3 Semarang','image',true),
('beranda','beranda-sambutan','Selamat datang di SMA Negeri 3 Semarang.','Sambutan kepala sekolah',NULL,'Sambutan Kepala Sekolah — Rusmiyanto, S.Pd., M.Pd.','["Puji syukur kita panjatkan kepada Tuhan Yang Maha Esa. Website ini diharapkan menjadi sarana informasi dan komunikasi yang membantu masyarakat mengenal lingkungan sekolah, kegiatan pembelajaran, prestasi, serta berbagai program pengembangan potensi peserta didik.","Kami terus berupaya menciptakan lingkungan belajar yang mendorong siswa untuk berpikir kritis, mengembangkan karakter, berkarya, dan mempersiapkan diri menghadapi tantangan masa depan.","Mari bersama-sama membangun generasi yang unggul, berkarakter, dan siap memberikan dampak positif bagi masyarakat."]'::jsonb,'/images/kepala-sekolah.png','Kepala SMA Negeri 3 Semarang','image',true),
('beranda','beranda-value-smart','Smart','Nilai SPECTACULAR',NULL,'Mengembangkan kecerdasan, rasa ingin tahu, dan cara berpikir kritis.','[]'::jsonb,NULL,NULL,'image',true),
('beranda','beranda-value-persistent','Persistent','Nilai SPECTACULAR',NULL,'Tekun menghadapi tantangan dan terus belajar dari proses.','[]'::jsonb,NULL,NULL,'image',true),
('beranda','beranda-value-energetic','Energetic','Nilai SPECTACULAR',NULL,'Aktif, bersemangat, dan menjaga keseimbangan diri.','[]'::jsonb,NULL,NULL,'image',true),
('beranda','beranda-value-creative','Creative','Nilai SPECTACULAR',NULL,'Berani mencipta, mengeksplorasi, dan mencoba gagasan baru.','[]'::jsonb,NULL,NULL,'image',true),
('beranda','beranda-value-talented','Talented','Nilai SPECTACULAR',NULL,'Mengenali serta mengasah potensi dan minat yang beragam.','[]'::jsonb,NULL,NULL,'image',true),
('beranda','beranda-value-cultured','Cultured','Nilai SPECTACULAR',NULL,'Menghargai budaya, perbedaan, dan nilai-nilai luhur.','[]'::jsonb,NULL,NULL,'image',true),
('beranda','beranda-value-religious','Religious','Nilai SPECTACULAR',NULL,'Menumbuhkan karakter, integritas, dan sikap saling menghormati.','[]'::jsonb,NULL,NULL,'image',true),
-- PROFIL
('profil','profil-visi','Visi sekolah','Visi dan misi',NULL,'Membangun lingkungan belajar yang mendorong siswa bertumbuh dan mengembangkan potensinya.','["Perbarui teks visi sesuai dokumen resmi sekolah sebelum dipublikasikan sebagai pernyataan resmi."]'::jsonb,'/images/gedung-utama.png','Gedung utama sekolah','image',true),
('profil','profil-misi','Misi sekolah','Visi dan misi',NULL,'Pembelajaran, karakter, kreativitas, kolaborasi, dan kepedulian.','["Lengkapi butir misi dengan rumusan resmi yang berlaku di SMA Negeri 3 Semarang."]'::jsonb,NULL,NULL,'image',true),
('profil','profil-nilai','Nilai bersama','Identitas sekolah',NULL,'Menghargai potensi, membangun karakter, dan bertumbuh bersama.','["Nilai sekolah dapat diperbarui oleh admin berdasarkan arahan resmi sekolah."]'::jsonb,'/images/logo-sman3.png','Logo SMA Negeri 3 Semarang','image',true),
-- PRESTASI
('prestasi','prestasi-akademik','Akademik','Akademik',NULL,'Olimpiade, kompetisi mata pelajaran, karya ilmiah, dan kegiatan penguatan literasi.','[]'::jsonb,'/images/minat.jpeg','Kegiatan siswa','image',true),
('prestasi','prestasi-olahraga','Olahraga','Olahraga',NULL,'Pengembangan disiplin, sportivitas, kerja sama tim, dan kebugaran melalui kompetisi.','[]'::jsonb,NULL,NULL,'image',true),
('prestasi','prestasi-seni','Seni dan kreativitas','Seni dan kreativitas',NULL,'Ruang untuk menampilkan karya, pertunjukan, desain, dan gagasan kreatif.','[]'::jsonb,NULL,NULL,'image',true),
-- FASILITAS
('fasilitas','fasilitas-ruang-belajar','Ruang belajar','Fasilitas',NULL,'Ruang pembelajaran untuk mendukung kegiatan akademik dan diskusi.','[]'::jsonb,'/images/ruang.jpg','Ruang belajar','image',true),
('fasilitas','fasilitas-praktikum','Sarana praktikum','Fasilitas',NULL,'Fasilitas praktik yang digunakan sesuai ketersediaan dan program pembelajaran.','[]'::jsonb,'/images/sains.jpg','Sarana praktikum','image',true),
('fasilitas','fasilitas-teknologi','Teknologi pembelajaran','Fasilitas',NULL,'Pemanfaatan perangkat digital untuk mendukung literasi dan eksplorasi pengetahuan.','[]'::jsonb,NULL,NULL,'image',true),
('fasilitas','fasilitas-ruang-kegiatan','Ruang kegiatan','Fasilitas',NULL,'Area yang dapat mendukung pertemuan, presentasi, dan kegiatan warga sekolah.','[]'::jsonb,'/images/kegiatan-sekolah.png','Kegiatan sekolah','image',true),
('fasilitas','fasilitas-lingkungan','Lingkungan sekolah','Fasilitas',NULL,'Area sekolah yang perlu dijaga bersama agar tetap tertib dan nyaman.','[]'::jsonb,'/images/lingkungan.jpg','Lingkungan sekolah','image',true),
('fasilitas','fasilitas-minat','Pengembangan minat','Fasilitas',NULL,'Ruang dan sarana kegiatan yang mendukung pengembangan diri siswa.','[]'::jsonb,'/images/ekstra.jpg','Kegiatan pengembangan minat','image',true),
-- EKSTRAKURIKULER
('ekstrakurikuler','ekstra-organisasi','Organisasi dan kepemimpinan','Ekstrakurikuler',NULL,'Melatih komunikasi, kerja tim, pengambilan keputusan, dan tanggung jawab.','[]'::jsonb,'/images/ekstra.png','Kegiatan organisasi','image',true),
('ekstrakurikuler','ekstra-olahraga','Olahraga','Ekstrakurikuler',NULL,'Mengembangkan kebugaran, sportivitas, disiplin, dan kekompakan.','[]'::jsonb,NULL,NULL,'image',true),
('ekstrakurikuler','ekstra-seni','Seni dan kreativitas','Ekstrakurikuler',NULL,'Menyalurkan ide melalui karya visual, pertunjukan, dan kreasi.','[]'::jsonb,NULL,NULL,'image',true),
('ekstrakurikuler','ekstra-musik','Musik dan penampilan','Ekstrakurikuler',NULL,'Ruang untuk berlatih, berkolaborasi, dan mengekspresikan diri.','[]'::jsonb,NULL,NULL,'image',true),
('ekstrakurikuler','ekstra-lingkungan','Lingkungan dan kepedulian','Ekstrakurikuler',NULL,'Menguatkan kebiasaan peduli terhadap sesama dan lingkungan.','[]'::jsonb,NULL,NULL,'image',true),
('ekstrakurikuler','ekstra-sosial','Sosial dan kemanusiaan','Ekstrakurikuler',NULL,'Belajar berempati, melayani, dan berkontribusi secara bertanggung jawab.','[]'::jsonb,NULL,NULL,'image',true),
-- GALERI
('galeri','galeri-gedung','Gedung utama','Galeri',NULL,'Tampak depan gedung sekolah.','[]'::jsonb,'/images/gedung-utama.png','Gedung utama SMA Negeri 3 Semarang','image',true),
('galeri','galeri-lingkungan','Lingkungan sekolah','Galeri',NULL,'Area dan koridor sekolah.','[]'::jsonb,'/images/ruang.jpg','Lingkungan sekolah','image',true),
('galeri','galeri-kegiatan','Kegiatan siswa','Galeri',NULL,'Suasana kegiatan di aula sekolah.','[]'::jsonb,'/images/kegiatan-sekolah.png','Kegiatan siswa','image',true),
-- TATA TERTIB
('tata-tertib','aturan-waktu','Disiplin waktu','Tata tertib',NULL,'Datang tepat waktu dan mengikuti jadwal kegiatan sesuai ketentuan sekolah.','[]'::jsonb,NULL,NULL,'image',true),
('tata-tertib','aturan-belajar','Kesiapan belajar','Tata tertib',NULL,'Mempersiapkan perlengkapan, mengikuti pembelajaran, dan mengerjakan tugas dengan tanggung jawab.','[]'::jsonb,NULL,NULL,'image',true),
('tata-tertib','aturan-hormat','Sikap saling menghormati','Tata tertib',NULL,'Bersikap santun kepada warga sekolah dan menghargai perbedaan.','[]'::jsonb,NULL,NULL,'image',true),
('tata-tertib','aturan-fasilitas','Menjaga fasilitas','Tata tertib',NULL,'Menggunakan fasilitas dengan baik dan menjaga kebersihan lingkungan.','[]'::jsonb,NULL,NULL,'image',true),
('tata-tertib','aturan-perangkat','Penggunaan perangkat','Tata tertib',NULL,'Menggunakan gawai dan teknologi sesuai arahan guru serta kebijakan sekolah.','[]'::jsonb,NULL,NULL,'image',true),
('tata-tertib','aturan-integritas','Integritas dan kepedulian','Tata tertib',NULL,'Bersikap jujur, menghindari perundungan, dan melapor kepada pihak yang tepat saat membutuhkan bantuan.','[]'::jsonb,NULL,NULL,'image',true)
ON CONFLICT (slug) DO NOTHING;

-- Verifikasi jumlah konten per bagian.
SELECT section, count(*) AS total, count(*) FILTER (WHERE published) AS published
FROM public.site_content
GROUP BY section
ORDER BY section;
