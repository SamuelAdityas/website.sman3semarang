import Link from "next/link";import { Trophy, Medal, Star, ArrowUpRight } from "lucide-react";import Reveal from "@/components/Reveal";import SectionHeading from "@/components/SectionHeading";
export const metadata={title:"Prestasi | SMA Negeri 3 Semarang"};
const areas=[
    {icon:Trophy,title:"Akademik",text:"Olimpiade, kompetisi mata pelajaran, karya ilmiah, dan kegiatan penguatan literasi."},
    {icon:Medal,title:"Olahraga",text:"Pengembangan disiplin, sportivitas, kerja sama tim, dan kebugaran melalui kompetisi."},
    {icon:Star,title:"Seni dan kreativitas",text:"Ruang untuk menampilkan karya, pertunjukan, desain, dan gagasan kreatif."}];
export default function AchievementsPage(){
    return <>
    <section className="page-hero">
        <div className="container-wide page-hero-grid"><div><span className="eyebrow"><i/> PRESTASI SISWA</span><h1>Merayakan proses.<br/><span>Menghargai pencapaian.</span></h1><p>Prestasi tumbuh dari ketekunan, latihan, kolaborasi, dan keberanian untuk terus belajar.</p></div>
        <img src="/images/minat.jpeg" alt="Kegiatan siswa di sekolah"/></div>
    </section>
    <section className="section-pad">
        <div className="container-wide"><Reveal><SectionHeading eyebrow="RUANG UNTUK BERSINAR" title={<>Setiap potensi punya<br/><span>jalannya sendiri.</span></>} text="Kategori berikut dapat digunakan untuk mengelompokkan prestasi yang telah dikonfirmasi oleh sekolah."/></Reveal>
        <div className="principles-grid">{areas.map((a,i)=><Reveal key={a.title} delay={i*70}><article className="principle-card"><a.icon/><h3>{a.title}</h3><p>{a.text}</p></article></Reveal>)}</div>
        <div className="content-callout"><div><h2>Informasi prestasi terbaru</h2><p>Tambahkan nama siswa atau tim, nama kompetisi, tingkat perlombaan, tanggal, dan hasil berdasarkan dokumentasi resmi.</p></div>
        <Link className="button button-gold" href="/berita">Lihat kabar sekolah <ArrowUpRight size={17}/></Link></div></div>
    </section></>}
