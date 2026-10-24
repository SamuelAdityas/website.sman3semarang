import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { news as localNews } from "@/data/news";

const ALLOWED_SECTIONS = new Set([
  "beranda", "profil", "berita", "prestasi", "fasilitas",
  "ekstrakurikuler", "galeri", "tata-tertib",
]);

function fromLocalNews() {
  return localNews.map((item) => ({
    id: item.id,
    slug: item.id,
    title: item.title,
    date: item.date || "Kabar sekolah",
    category: item.category || "Kabar sekolah",
    image: item.image || "/images/gedung-utama.png",
    imageAlt: item.imageAlt || item.title,
    excerpt: item.excerpt || "",
    body: Array.isArray(item.body) ? item.body : (item.body ? [item.body] : []),
    media_type: "image",
    published: true,
  }));
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get("section") || "berita";
  if (!ALLOWED_SECTIONS.has(section)) {
    return NextResponse.json({ error: "Bagian konten tidak valid." }, { status: 400 });
  }

  try {
    const cookieStore = cookies();
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return NextResponse.json(section === "berita" ? fromLocalNews() : []);

    const supabase = createServerClient(url, key, {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (items) => items.forEach(({ name, value, options }) => cookieStore.set(name, value, options)),
      },
    });

    const { data, error } = await supabase
      .from("site_content")
      .select("id, section, slug, title, category, date_label, excerpt, body, image_url, image_alt, media_type, published, created_at")
      .eq("section", section)
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) {
      // Keep the existing public news page available if Supabase is temporarily unavailable.
      return NextResponse.json(section === "berita" ? fromLocalNews() : [], { headers: { "Cache-Control": "no-store" } });
    }

    if ((!data || data.length === 0) && section === "berita") {
      return NextResponse.json(fromLocalNews(), { headers: { "Cache-Control": "no-store" } });
    }

    const items = (data || []).map((row) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      date: row.date_label || (row.created_at ? new Date(row.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : ""),
      category: row.category || "",
      image: row.image_url || "",
      imageAlt: row.image_alt || row.title,
      excerpt: row.excerpt || "",
      body: Array.isArray(row.body) ? row.body : (row.body ? [String(row.body)] : []),
      media_type: row.media_type || "image",
      published: Boolean(row.published),
    }));
    return NextResponse.json(items, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json(section === "berita" ? fromLocalNews() : [], { headers: { "Cache-Control": "no-store" } });
  }
}
