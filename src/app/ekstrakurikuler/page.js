import Link from "next/link"; import { Palette, Music, Trophy, Leaf, Users, Heart, ArrowUpRight } from "lucide-react"; import Reveal from "@/components/Reveal"; import SectionHeading from "@/components/SectionHeading";
export const metadata = { title: "Ekstrakurikuler | SMA Negeri 3 Semarang" };
const groups = [
    { icon: Users, title: "Organisasi dan kepemimpinan", text: "Melatih komunikasi, kerja tim, pengambilan keputusan, dan tanggung jawab." }, 
    { icon: Trophy, title: "Olahraga", text: "Mengembangkan kebugaran, sportivitas, disiplin, dan kekompakan." }, 
    { icon: Palette, title: "Seni dan kreativitas", text: "Menyalurkan ide melalui karya visual, pertunjukan, dan kreasi." }, 
    { icon: Music, title: "Musik dan penampilan", text: "Ruang untuk berlatih, berkolaborasi, dan mengekspresikan diri." }, 
    { icon: Leaf, title: "Lingkungan dan kepedulian", text: "Menguatkan kebiasaan peduli terhadap sesama dan lingkungan." }, 
    { icon: Heart, title: "Sosial dan kemanusiaan", text: "Belajar berempati, melayani, dan berkontribusi secara bertanggung jawab." }];
export default function ExtracurricularPage() {
    return <>
    <section className="page-hero">
        <div className="container-wide page-hero-grid"><div>
            <span className="eyebrow"><i /> EKSTRAKURIKULER</span>
            <h1>Temukan minatmu.<br /><span>Kembangkan potensimu.</span></h1>
            <p>Belajar tidak berhenti di ruang kelas. Pengembangan diri membantu siswa mencoba, bekerja sama, dan bertumbuh.</p>
            </div>
            <img src="/images/ekstra.png" alt="Kegiatan siswa di aula" />
        </div>
    </section>
    <section className="section-pad">
        <div className="container-wide"><Reveal><SectionHeading eyebrow="PILIH RUANG BERTUMBUH" title={<>Belajar melalui<br /><span>pengalaman nyata.</span></>} text="Kategori berikut adalah contoh pengelompokan. Perbarui dengan daftar ekstrakurikuler aktif yang disahkan sekolah." /></Reveal>
        <div className="facility-grid">{groups.map((g, i) => <Reveal key={g.title} delay={i * 45}><article className="facility-card"><span className="facility-icon"><g.icon /></span><h3>{g.title}</h3><p>{g.text}</p></article></Reveal>)}</div>
        <div className="content-callout">
            <div><h2>Ingin mengikuti kegiatan?</h2><p>Periksa jadwal, syarat keanggotaan, dan kontak pembina melalui kanal resmi sekolah.</p></div>
            <Link href="/berita" className="button button-gold">Lihat informasi <ArrowUpRight size={17} /></Link></div>
        </div>
    </section></> }