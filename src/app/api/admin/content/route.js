import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const ALLOWED_SECTIONS = new Set(["beranda", "profil", "berita", "prestasi", "fasilitas", "ekstrakurikuler", "galeri", "tata-tertib"]);

async function getSupabase() {
  const store = cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { error: "Konfigurasi Supabase belum lengkap. Periksa .env.local.", status: 500 };
  const supabase = createServerClient(url, key, { cookies: {
    getAll: () => store.getAll(),
    setAll: (items) => items.forEach(({ name, value, options }) => store.set(name, value, options)),
  }});
  const { data: { user }, error } = await supabase.auth.getUser();
  const expected = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (error || !user || !expected || user.email?.toLowerCase() !== expected) return { error: "Sesi admin tidak valid atau akses ditolak. Silakan login kembali.", status: 401 };
  return { supabase };
}

function cleanBody(value) {
  if (Array.isArray(value)) return value.map((part) => String(part).trim()).filter(Boolean);
  return String(value || "").split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
}
function makeSlug(value) {
  return String(value || "konten").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `konten-${Date.now()}`;
}
function validateSection(value) {
  return ALLOWED_SECTIONS.has(value) ? value : null;
}

export async function GET(request) {
  const auth = await getSupabase();
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });
  const { searchParams } = new URL(request.url);
  const section = validateSection(searchParams.get("section") || "berita");
  if (!section) return NextResponse.json({ error: "Bagian konten tidak valid." }, { status: 400 });
  const { data, error } = await auth.supabase.from("site_content").select("*").eq("section", section).order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}

export async function POST(request) {
  const auth = await getSupabase();
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });
  try {
    const item = await request.json();
    const section = validateSection(item.section || "berita");
    if (!section) return NextResponse.json({ error: "Bagian konten tidak valid." }, { status: 400 });
    if (!String(item.title || "").trim()) return NextResponse.json({ error: "Judul wajib diisi." }, { status: 400 });
    const slugBase = makeSlug(item.slug || item.title);
    const payload = {
      section, slug: `${slugBase}-${Date.now().toString(36)}`, title: String(item.title).trim(),
      category: String(item.category || (section === "berita" ? "Kegiatan sekolah" : section)).trim(),
      date_label: item.date_label || null, excerpt: String(item.excerpt || ""), body: cleanBody(item.body),
      image_url: item.image_url || null, image_alt: item.image_alt || item.title,
      media_type: item.media_type === "video" ? "video" : "image", published: Boolean(item.published),
    };
    const { data, error } = await auth.supabase.from("site_content").insert(payload).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data, { status: 201 });
  } catch { return NextResponse.json({ error: "Data tidak valid." }, { status: 400 }); }
}

export async function PUT(request) {
  const auth = await getSupabase();
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });
  try {
    const item = await request.json();
    const section = validateSection(item.section || "berita");
    if (!section) return NextResponse.json({ error: "Bagian konten tidak valid." }, { status: 400 });
    if (!item.id) return NextResponse.json({ error: "ID konten wajib ada." }, { status: 400 });
    const payload = {
      title: String(item.title || "").trim(), category: String(item.category || (section === "berita" ? "Kegiatan sekolah" : section)).trim(),
      date_label: item.date_label || null, excerpt: String(item.excerpt || ""), body: cleanBody(item.body),
      image_url: item.image_url || null, image_alt: item.image_alt || item.title,
      media_type: item.media_type === "video" ? "video" : "image", published: Boolean(item.published), updated_at: new Date().toISOString(),
    };
    if (item.slug) payload.slug = makeSlug(item.slug);
    const { data, error } = await auth.supabase.from("site_content").update(payload).eq("id", item.id).eq("section", section).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data);
  } catch { return NextResponse.json({ error: "Data tidak valid." }, { status: 400 }); }
}

export async function DELETE(request) {
  const auth = await getSupabase();
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });
  try {
    const { id, section: sectionValue = "berita" } = await request.json();
    const section = validateSection(sectionValue);
    if (!section) return NextResponse.json({ error: "Bagian konten tidak valid." }, { status: 400 });
    if (!id) return NextResponse.json({ error: "ID konten wajib ada." }, { status: 400 });
    const { error } = await auth.supabase.from("site_content").delete().eq("id", id).eq("section", section);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: "Permintaan tidak valid." }, { status: 400 }); }
}
