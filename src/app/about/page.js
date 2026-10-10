import Link from "next/link";
import {
  ArrowUpRight,
  Target,
  Eye,
  HeartHandshake,
} from "lucide-react";

import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export const metadata = {
  title: "Profil Sekolah | SMA Negeri 3 Semarang",
  description:
    "Kenali profil, lingkungan belajar, dan nilai-nilai SMA Negeri 3 Semarang.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Profil Sekolah */}
      <section className="page-hero">
        <div className="container-wide page-hero-grid">
          <div>
            <span className="eyebrow">
              <i />
              PROFIL SEKOLAH
            </span>

            <h1>
              Mengenal lebih dekat
              <br />
              <span>SMA Negeri 3 Semarang.</span>
            </h1>

            <p>
              Tempat belajar, membangun karakter, dan
              mengembangkan potensi generasi muda.
            </p>
          </div>

          <img
            src="/images/gedung-utama.png"
            alt="Gedung utama SMA Negeri 3 Semarang"
          />
        </div>
      </section>

      {/* Tentang Sekolah */}
      <section className="section-pad">
        <div className="container-wide about-intro">
          <Reveal>
            <img
              src="/images/siswa.jpg"
              alt="Siswa SMA Negeri 3 Semarang"
              loading="lazy"
            />
          </Reveal>

          <Reveal delay={100}>
            <span className="eyebrow">
              <i />
              TENTANG SEKOLAH
            </span>

            <h2>
              Ruang belajar untuk
              <br />
              <span>masa depan yang lebih baik.</span>
            </h2>

            <p>
              SMA Negeri 3 Semarang merupakan lingkungan
              pendidikan tempat siswa mengembangkan
              pengetahuan, keterampilan, dan karakter.
              Website ini menjadi pintu masuk untuk mengenal
              informasi sekolah, kegiatan, fasilitas, serta
              pengembangan diri.
            </p>

            <p>
              Informasi resmi seperti sejarah, visi-misi,
              data tenaga pendidik, dan kebijakan sekolah
              sebaiknya dilengkapi berdasarkan dokumen
              terbaru yang telah disahkan pihak sekolah.
            </p>

            <Link
              className="button button-gold"
              href="/berita"
            >
              Lihat kabar sekolah
              <ArrowUpRight size={17} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Visi, Misi, dan Nilai */}
      <section className="values-section section-pad">
        <div className="container-wide">
          <Reveal>
            <SectionHeading
              eyebrow="ARAH BERSAMA"
              title={
                <>
                  Belajar dengan tujuan.
                  <br />
                  <span>Bertumbuh dengan karakter.</span>
                </>
              }
              text="Nilai yang menjadi inspirasi dalam membangun pengalaman belajar yang positif."
            />
          </Reveal>

          <div className="principles-grid">
            <Reveal>
              <article className="principle-card">
                <Eye size={28} />

                <h3>Visi</h3>

                <p>
                  Menjadi komunitas belajar yang mendorong
                  potensi, karakter, dan kesiapan siswa
                  menghadapi masa depan.
                </p>

                <small>
                  Rumusan inspiratif — sesuaikan dengan visi
                  resmi sekolah.
                </small>
              </article>
            </Reveal>

            <Reveal delay={80}>
              <article className="principle-card">
                <Target size={28} />

                <h3>Misi</h3>

                <p>
                  Mendukung pembelajaran yang bermakna,
                  pengembangan bakat, kolaborasi, serta
                  budaya tanggung jawab.
                </p>

                <small>
                  Rumusan inspiratif — sesuaikan dengan misi
                  resmi sekolah.
                </small>
              </article>
            </Reveal>

            <Reveal delay={160}>
              <article className="principle-card">
                <HeartHandshake size={28} />

                <h3>Nilai Bersama</h3>

                <p>
                  Menghidupi sikap saling menghormati,
                  integritas, kepedulian, dan semangat
                  untuk terus belajar.
                </p>

                <small>
                  Nilai dapat dikembangkan bersama kebijakan
                  sekolah.
                </small>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Ajakan Menjelajahi Sekolah */}
      <section className="closing-cta">
        <div className="container-wide closing-inner">
          <div className="closing-copy">
            <span className="eyebrow eyebrow-light">
              <i />
              JELAJAHI LEBIH LANJUT
            </span>

            <h2>
              Kenali ruang untuk
              <br />
              <em>bertumbuh.</em>
            </h2>

            <p>
              Temukan fasilitas, kegiatan, prestasi, dan
              cerita dari lingkungan sekolah.
            </p>
          </div>

          <div className="cta-links">
            <Link
              href="/fasilitas"
              className="button button-white"
            >
              Fasilitas
              <ArrowUpRight size={17} />
            </Link>

            <Link
              href="/ekstrakurikuler"
              className="button button-glass"
            >
              Ekstrakurikuler
              <ArrowUpRight size={17} />
            </Link>
          </div>

          {/* Logo Resmi SMAN 3 Semarang */}
          <div className="about-logo-wrap">
            <div className="about-logo-ring about-logo-ring-outer" />
            <div className="about-logo-ring about-logo-ring-inner" />

            <img
              src="/images/logo-sman3.png"
              alt="Logo resmi SMA Negeri 3 Semarang"
              className="about-logo-image"
            />
          </div>
        </div>
      </section>
    </>
  );
}
