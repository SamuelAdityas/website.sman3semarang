import { ShieldCheck, Clock, Users, BookOpen, Smartphone, HeartHandshake } from "lucide-react";import Reveal from "@/components/Reveal";import SectionHeading from "@/components/SectionHeading";
export const metadata={title:"Tata Tertib Siswa | SMA Negeri 3 Semarang"};
const rules=[
    {icon:Clock,title:"Disiplin waktu",text:"Datang tepat waktu dan mengikuti jadwal kegiatan sesuai ketentuan sekolah."},
    {icon:BookOpen,title:"Kesiapan belajar",text:"Mempersiapkan perlengkapan, mengikuti pembelajaran, dan mengerjakan tugas dengan tanggung jawab."},
    {icon:Users,title:"Sikap saling menghormati",text:"Bersikap santun kepada warga sekolah dan menghargai perbedaan."},
    {icon:ShieldCheck,title:"Menjaga fasilitas",text:"Menggunakan fasilitas dengan baik dan menjaga kebersihan lingkungan."},
    {icon:Smartphone,title:"Penggunaan perangkat",text:"Menggunakan gawai dan teknologi sesuai arahan guru serta kebijakan sekolah."},
    {icon:HeartHandshake,title:"Integritas dan kepedulian",text:"Bersikap jujur, menghindari perundungan, dan melapor kepada pihak yang tepat saat membutuhkan bantuan."}];
export default function RulesPage(){
    return <>
    <section className="page-hero"><div className="container-wide"><span className="eyebrow"><i/> TATA TERTIB SISWA</span><h1>Disiplin dengan tujuan.<br/><span>Hormati sesama.</span></h1><p>Pedoman umum untuk mendukung lingkungan belajar yang aman, tertib, dan saling menghargai.</p></div></section>
    <section className="section-pad"><div className="container-wide"><Reveal><SectionHeading eyebrow="PEDOMAN UMUM" title={<>Kebiasaan baik membentuk<br/><span>lingkungan yang baik.</span></>} text="Poin berikut bersifat ringkasan umum, bukan pengganti dokumen tata tertib resmi sekolah. Gunakan dokumen terbaru sekolah untuk aturan, sanksi, dan prosedur yang mengikat."/></Reveal>
        <div className="rules-list">{rules.map((r,i)=><Reveal key={r.title} delay={i*40}><article className="rule-row"><span className="rule-icon"><r.icon/></span><div><h3>{r.title}</h3><p>{r.text}</p></div><span className="rule-number">{String(i+1).padStart(2,"0")}</span></article></Reveal>)}</div></div>
    </section></>}
