import CmsManagedPage from "@/components/CmsManagedPage";
import Link from "next/link";import { BookOpen, Microscope, Monitor, Users, Trees, Dumbbell, ArrowUpRight } from "lucide-react";import Reveal from "@/components/Reveal";import SectionHeading from "@/components/SectionHeading";
export const metadata={title:"Fasilitas | SMA Negeri 3 Semarang"};
const facilities=[
    {icon:BookOpen,title:"Ruang belajar",text:"Ruang pembelajaran untuk mendukung kegiatan akademik dan diskusi."},
    {icon:Microscope,title:"Sarana praktikum",text:"Fasilitas praktik yang digunakan sesuai ketersediaan dan program pembelajaran."},
    {icon:Monitor,title:"Teknologi pembelajaran",text:"Pemanfaatan perangkat digital untuk mendukung literasi dan eksplorasi pengetahuan."},
    {icon:Users,title:"Ruang kegiatan",text:"Area yang dapat mendukung pertemuan, presentasi, dan kegiatan warga sekolah."},
    {icon:Trees,title:"Lingkungan sekolah",text:"Area sekolah yang perlu dijaga bersama agar tetap tertib dan nyaman."},
    {icon:Dumbbell,title:"Pengembangan minat",text:"Ruang dan sarana kegiatan yang mendukung pengembangan diri siswa."}];
export default function FacilitiesPage(){
    return <CmsManagedPage section="fasilitas">
    <>
    <section className="page-hero">
        <div className="container-wide page-hero-grid">
            <div>
                <span className="eyebrow"><i/> FASILITAS SEKOLAH</span><h1>Lingkungan yang<br/><span>mendukung proses belajar.</span></h1><p>Kenali ragam ruang dan sarana yang dapat menunjang pembelajaran serta pengembangan diri.</p></div>
                <img src="/images/proses.jpg" alt="Gedung utama sekolah"/>
            </div>
    </section>
    <section className="section-pad">
        <div className="container-wide"><Reveal><SectionHeading eyebrow="RUANG BELAJAR" title={<>Fasilitas untuk<br/><span>menjelajahi potensi.</span></>} text="Daftar ini merupakan struktur informasi fasilitas. Lengkapi dengan nama ruang, foto, dan detail sesuai kondisi aktual sekolah."/></Reveal>
        <div className="facility-grid">{facilities.map((f,i)=><Reveal key={f.title} delay={i*45}><article className="facility-card"><span className="facility-icon"><f.icon/></span><h3>{f.title}</h3><p>{f.text}</p></article></Reveal>)}</div>
        <div className="content-callout"><div><h2>Lihat suasana sekolah</h2><p>Jelajahi dokumentasi gedung, lingkungan, dan kegiatan.</p></div>
        <Link href="/galeri" className="button button-gold">Buka galeri <ArrowUpRight size={17}/></Link></div>
        </div>
    </section></>
    </CmsManagedPage>}
