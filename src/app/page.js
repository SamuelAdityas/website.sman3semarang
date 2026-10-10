import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Trophy, Zap, Lightbulb, Star, Landmark, HeartHandshake, FlaskConical, Users, MapPin, Quote } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import NewsCard from "@/components/NewsCard";
import { news } from "@/data/news";
const values = [
    { letter: "S", title: "Smart", text: "Mengembangkan kecerdasan, rasa ingin tahu, dan cara berpikir kritis.", icon: BookOpen },
    { letter: "P", title: "Persistent", text: "Tekun menghadapi tantangan dan terus belajar dari proses.", icon: Trophy },
    { letter: "E", title: "Energetic", text: "Aktif, bersemangat, dan menjaga keseimbangan diri.", icon: Zap },
    { letter: "C", title: "Creative", text: "Berani mencipta, mengeksplorasi, dan mencoba gagasan baru.", icon: Lightbulb },
    { letter: "T", title: "Talented", text: "Mengenali serta mengasah potensi dan minat yang beragam.", icon: Star },
    { letter: "C", title: "Cultured", text: "Menghargai budaya, perbedaan, dan nilai-nilai luhur.", icon: Landmark },
    { letter: "R", title: "Religious", text: "Menumbuhkan karakter, integritas, dan sikap saling menghormati.", icon: HeartHandshake },
];
export default function Home() {
    return <>
        <section className="hero"><img className="hero-photo" src="/images/gedung-utama.png" alt="Gedung utama SMA Negeri 3 Semarang" /><div className="hero-shade" /><div className="container-wide hero-inner"><Reveal><span className="hero-kicker"><i /> PORTAL SMA NEGERI 3 SEMARANG</span></Reveal><Reveal delay={80}><h1>Temukan potensi.<br /><em>Wujudkan masa depan.</em></h1></Reveal><Reveal delay={160}><p>Ruang bagi generasi untuk belajar dengan rasa ingin tahu, bertumbuh dalam karakter, dan berani berkarya untuk masa depan.</p></Reveal><Reveal delay={230}><div className="hero-actions"><Link href="/about" className="button button-gold">Kenali SMAN 3 <ArrowUpRight size={18} /></Link><Link href="/berita" className="button button-glass">Jelajahi kabar sekolah <ArrowRight size={18} /></Link></div></Reveal><div className="hero-bottom"><span><span className="hero-dot" /> BELAJAR · BERTUMBUH · BERKARYA</span><span>SEMARANG, JAWA TENGAH</span></div></div></section>
        <section className="intro-section section-pad"><div className="container-wide intro-grid"><Reveal><span className="eyebrow"><i /> SALAM DARI SMAN 3</span><h2 className="intro-title">Pendidikan bukan hanya tentang hari ini. <span>Ini tentang siapa yang akan kamu jadi.</span></h2><p className="intro-copy">SMA Negeri 3 Semarang menjadi ruang untuk mengenali potensi, membangun karakter, dan mempersiapkan diri menghadapi dunia yang terus berubah.</p><Link className="button button-outline" href="/about">Kenali perjalanan kami <ArrowUpRight size={17} /></Link></Reveal><Reveal delay={120}><div className="intro-photo"><img src="/images/siswa.jpg" alt="Lingkungan sekolah SMAN 3 Semarang" loading="lazy" /><div className="photo-note"><span>LINGKUNGAN SEKOLAH</span><strong>Tempat tumbuhnya<br />generasi masa depan.</strong></div></div></Reveal></div></section>
        {/* Sambutan Kepala Sekolah */}     
        <section className="principal-section section-pad">
            <div className="container-wide principal-grid">

                {/* Foto Kepala Sekolah */}
                <Reveal>
                    <div className="principal-photo-wrapper">
                        <img
                            src="/images/kepala-sekolah.png"
                            alt="Kepala SMA Negeri 3 Semarang"
                            className="principal-photo"
                            loading="lazy"
                        />

                        <div className="principal-photo-caption">
                            <span>Kepala Sekolah</span>
                            <strong>Rusmiyanto, S.Pd., M.Pd</strong>
                        </div>
                    </div>
                </Reveal>

                {/* Teks Sambutan */}
                <Reveal delay={120}>
                    <div className="principal-content">
                        <span className="eyebrow">
                            <i />
                            SAMBUTAN KEPALA SEKOLAH
                        </span>

                        <Quote
                            className="principal-quote-icon"
                            size={38}
                            aria-hidden="true"
                        />

                        <h2>
                            Selamat datang di
                            <span> SMA Negeri 3 Semarang.</span>
                        </h2>

                        <p>
                            Puji syukur kita panjatkan kepada Tuhan Yang Maha Esa.
                            Selamat datang di website resmi SMA Negeri 3 Semarang.
                            Website ini diharapkan menjadi sarana informasi dan
                            komunikasi yang membantu masyarakat mengenal lingkungan
                            sekolah, kegiatan pembelajaran, prestasi, serta berbagai
                            program pengembangan potensi peserta didik.
                        </p>

                        <p>
                            Kami terus berupaya menciptakan lingkungan belajar yang
                            mendorong siswa untuk berpikir kritis, mengembangkan
                            karakter, berkarya, dan mempersiapkan diri menghadapi
                            tantangan masa depan.
                        </p>

                        <p className="principal-closing">
                            Mari bersama-sama membangun generasi yang unggul,
                            berkarakter, dan siap memberikan dampak positif bagi
                            masyarakat.
                        </p>

                        <div className="principal-signature">
                            <span>Hormat kami,</span>
                            <strong>Rusmiyanto, S.Pd., M.Pd</strong>
                            <small>Kepala SMA Negeri 3 Semarang</small>
                        </div>
                    </div>
                </Reveal>

            </div>
        </section>
        <section className="values-section section-pad"><div className="container-wide"><Reveal><SectionHeading eyebrow="IDENTITAS KAMI" title={<>SPECTACULAR bukan sekadar nama.<br /><span>Ini cara kami bertumbuh.</span></>} text="Tujuh nilai untuk mendorong generasi yang berpengetahuan, berkarakter, kreatif, dan peduli." /></Reveal><div className="values-grid">{values.map((v, i) => <Reveal key={v.title} delay={i * 50}><article className="value-card"><div className="value-top"><span>{v.letter}</span><v.icon size={23} /></div><h3>{v.title}</h3><p>{v.text}</p></article></Reveal>)}</div><div className="values-bottom"><p>Potensi tumbuh saat diberi <strong>ruang, dukungan, dan kesempatan.</strong></p><Link href="/about" className="text-link">Baca profil sekolah <ArrowUpRight size={17} /></Link></div></div></section>
        <section className="split-banner">
            <div className="container-wide split-banner-inner">
                <Reveal>
                    <span className="eyebrow eyebrow-light">
                        <i /> SEMANGAT BELAJAR
                    </span>

                    <h2>
                        Berani bertanya.
                        <br />
                        <em>Berani bertumbuh.</em>
                    </h2>

                    <p>
                        Setiap hari adalah kesempatan untuk mencoba,
                        belajar dari proses, dan memberi dampak positif.
                    </p>

                    <Link href="/fasilitas" className="button button-white">
                        Jelajahi fasilitas <ArrowUpRight size={17} />
                    </Link>
                </Reveal>

                <div className="school-logo-wrap">
                    <div className="school-logo-ring school-logo-ring-one" />
                    <div className="school-logo-ring school-logo-ring-two" />

                    <img
                        src="/images/logo-sman3.png"
                        alt="Logo resmi SMA Negeri 3 Semarang"
                        className="school-logo-image"
                    />
                </div>
            </div>
        </section>

        <section className="experience-section section-pad"><div className="container-wide"><Reveal><SectionHeading eyebrow="LEBIH DARI RUANG KELAS" title={<>Ruang untuk mencoba.<br /><span>Ruang untuk berkembang.</span></>} text="Kenali lingkungan, aktivitas, dan kesempatan yang dapat mendukung perjalanan belajar siswa." /></Reveal><div className="experience-grid"><Reveal><Link href="/fasilitas" className="experience-card experience-large"><img src="/images/gedung-utama.png" alt="Gedung utama SMAN 3 Semarang" loading="lazy" /><span className="experience-shade" /><span className="experience-content"><small>LINGKUNGAN SEKOLAH</small><strong>Ruang belajar<br />untuk bertumbuh.</strong><span className="experience-arrow"><ArrowUpRight /></span></span></Link></Reveal><div className="experience-stack"><Reveal delay={90}><Link href="/galeri" className="experience-card"><img src="/images/lingkungan-sekolah.png" alt="Area sekolah" loading="lazy" /><span className="experience-shade" /><span className="experience-content"><small>GALERI SEKOLAH</small><strong>Lihat keseharian sekolah.</strong><span className="experience-arrow"><ArrowUpRight /></span></span></Link></Reveal><Reveal delay={170}><Link href="/ekstrakurikuler" className="experience-card"><img src="/images/kegiatan-sekolah.png" alt="Kegiatan siswa di aula sekolah" loading="lazy" /><span className="experience-shade" /><span className="experience-content"><small>PENGEMBANGAN DIRI</small><strong>Temukan potensimu.</strong><span className="experience-arrow"><ArrowUpRight /></span></span></Link></Reveal></div></div></div></section>
        <section className="news-section section-pad"><div className="container-wide"><div className="news-heading-row"><Reveal><SectionHeading eyebrow="KABAR SEKOLAH" title={<>Cerita yang terus<br /><span>bergerak maju.</span></>} text="Baca artikel dan informasi seputar pembelajaran, lingkungan, serta pengembangan diri." /></Reveal><Link href="/berita" className="button button-outline">Semua berita <ArrowUpRight size={17} /></Link></div><div className="news-grid">{news.slice(0, 3).map((item, i) => <Reveal key={item.id} delay={i * 80}><NewsCard item={item} /></Reveal>)}</div></div></section>

        <section className="location-strip">
            <div className="container-wide">
                <div className="location-strip-inner">
                    <div>
                        <span className="eyebrow eyebrow-light">
                            <i /> TEMUKAN KAMI
                        </span>

                        <h2>
                            Berada di jantung
                            <br />
                            <em>Kota Semarang.</em>
                        </h2>
                    </div>

                    <div className="location-action">
                        <p>
                            <MapPin size={18} />
                            Jl. Pemuda, Kota Semarang, Jawa Tengah
                        </p>

                        <Link
                            href="/galeri#lokasi"
                            className="button button-white"
                        >
                            Lihat lokasi <ArrowUpRight size={17} />
                        </Link>
                    </div>
                </div>

                <div className="homepage-map">
                    <iframe
                        src="https://www.google.com/maps?q=SMA+Negeri+3+Semarang&output=embed"
                        title="Peta lokasi SMA Negeri 3 Semarang"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                    />
                </div>
            </div>
        </section>

    </>
}
