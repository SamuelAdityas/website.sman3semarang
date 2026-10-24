"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CalendarDays } from "lucide-react";
import Reveal from "@/components/Reveal";
import NewsCard from "@/components/NewsCard";

export default function NewsDetailPage() {
  const params = useParams();
  const id = params?.id;
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let alive = true;
    fetch("/api/content?section=berita", { cache: "no-store" })
      .then(r => r.ok ? r.json() : [])
      .then(data => { if (alive) setNews(Array.isArray(data) ? data : []); })
      .catch(() => { if (alive) setNews([]); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, []);
  const item = news.find(entry => String(entry.id) === String(id));
  const related = news.filter(entry => String(entry.id) !== String(id)).slice(0, 3);
  if (loading) return <main className="container-narrow section-pad"><p>Memuat artikel...</p></main>;
  if (!item) return <main className="container-narrow section-pad"><h1>Artikel tidak ditemukan</h1><p>Artikel mungkin belum dipublikasikan atau alamatnya tidak benar.</p><Link href="/berita" className="button button-outline">Kembali ke berita</Link></main>;
  return <><section className="article-top"><div className="container-narrow"><Link href="/berita" className="back-link"><ArrowLeft size={17}/> Kembali ke semua berita</Link><Reveal><span className="eyebrow"><i/> {item.category}</span><h1>{item.title}</h1><div className="article-date"><CalendarDays size={16}/>{item.date || "Kabar sekolah"}</div></Reveal></div></section><article className="article-layout container-narrow"><Reveal><img className="article-cover" src={item.image || "/images/gedung-utama.png"} alt={item.imageAlt || item.title}/></Reveal><div className="article-body"><p className="article-lead">{item.excerpt}</p>{(Array.isArray(item.body) ? item.body : [item.body]).filter(Boolean).map((paragraph,index)=><p key={index}>{paragraph}</p>)}<div className="article-actions"><Link href="/berita" className="button button-outline"><ArrowLeft size={16}/> Kembali ke berita</Link><Link href="/galeri" className="text-link">Lihat galeri sekolah <ArrowUpRight size={16}/></Link></div></div></article>{related.length>0&&<section className="section-pad related-section"><div className="container-wide"><div className="related-heading"><div><span className="eyebrow"><i/> BACA JUGA</span><h2>Cerita lainnya.</h2></div><Link href="/berita" className="button button-outline">Semua berita</Link></div><div className="news-grid">{related.map((entry,index)=><Reveal key={entry.id} delay={index*60}><NewsCard item={entry}/></Reveal>)}</div></div></section>}</>;
}
