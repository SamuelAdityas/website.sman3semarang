import CmsManagedPage from "@/components/CmsManagedPage";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import Reveal from "@/components/Reveal";
export const metadata = { title: "Galeri Sekolah | SMA Negeri 3 Semarang" };
const photos = [
    { src: "/images/gedung-utama.png", title: "Gedung utama", desc: "Tampak depan gedung sekolah." },
    { src: "/images/ruang.jpg", title: "Lingkungan sekolah", desc: "Area dan koridor sekolah." },
    { src: "/images/kegiatan-sekolah.png", title: "Kegiatan siswa", desc: "Suasana kegiatan di aula sekolah." }];
export default function GalleryPage() {
    return <CmsManagedPage section="galeri">
    <>
        <section className="page-hero">
            <div className="container-wide"><span className="eyebrow"><i /> GALERI SEKOLAH</span><h1>Potret ruang untuk<br /><span>belajar dan bertumbuh.</span></h1><p>Jelajahi beberapa dokumentasi lingkungan dan kegiatan sekolah.</p></div>
        </section>
        <section className="section-pad">
            <div className="container-wide gallery-grid">{photos.map((p, i) => <Reveal key={p.src} delay={i * 70} className={i === 0 ? "gallery-item gallery-featured" : "gallery-item"}><a href={p.src} target="_blank" rel="noreferrer" className="gallery-photo"><img src={p.src} alt={p.title} /><span className="gallery-expand"><ArrowUpRight /></span></a><h2>{p.title}</h2><p>{p.desc}</p></Reveal>)}</div>
        </section>
        <section className="section-pad map-section" id="lokasi">
            <div className="container-wide map-layout">
                <div><span className="eyebrow"><i /> LOKASI SEKOLAH</span><h2>Berada di jantung<br /><span>Kota Semarang.</span></h2><p>Gunakan peta untuk melihat lokasi sekolah dan merencanakan perjalanan. Pastikan alamat dan titik lokasi telah sesuai dengan informasi resmi.</p><p className="map-address"><MapPin /> Jl. Pemuda, Kota Semarang, Jawa Tengah</p><Link className="button button-gold" href="https://www.google.com/maps/search/?api=1&query=SMA+Negeri+3+Semarang" target="_blank">Buka Google Maps <ArrowUpRight size={17} /></Link></div>
                <div className="map-frame"><iframe title="Peta lokasi SMA Negeri 3 Semarang" src="https://maps.google.com/maps?q=SMA%20Negeri%203%20Semarang&t=&z=15&ie=UTF8&iwloc=&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
            </div>
        </section></>
    </CmsManagedPage>
}
