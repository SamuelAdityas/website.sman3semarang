"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, Newspaper, Trophy, Building2, Images, Users, BookOpen,
  Home, LogOut, Plus, Pencil, Trash2, Save, X, Search, ExternalLink,
  RefreshCw, UploadCloud, Eye, EyeOff, FileText, Menu, Image as ImageIcon,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const SECTIONS = [
  { id: "beranda", label: "Beranda", icon: Home, desc: "Konten utama dan informasi halaman depan" },
  { id: "profil", label: "Profil sekolah", icon: Building2, desc: "Identitas dan informasi sekolah" },
  { id: "berita", label: "Berita", icon: Newspaper, desc: "Artikel, kategori, dan ringkasan berita" },
  { id: "prestasi", label: "Prestasi", icon: Trophy, desc: "Pencapaian siswa dan sekolah" },
  { id: "fasilitas", label: "Fasilitas", icon: Building2, desc: "Fasilitas dan sarana sekolah" },
  { id: "ekstrakurikuler", label: "Ekstrakurikuler", icon: Users, desc: "Kegiatan dan minat bakat siswa" },
  { id: "galeri", label: "Galeri", icon: Images, desc: "Dokumentasi foto dan video kegiatan" },
  { id: "tata-tertib", label: "Tata tertib", icon: BookOpen, desc: "Peraturan dan ketentuan sekolah" },
];
const CATEGORIES = ["Akademik", "Prestasi", "Kegiatan sekolah", "Kesiswaan", "Lingkungan", "Pembelajaran", "Karakter", "Pengumuman", "Ekstrakurikuler", "Fasilitas", "Alumni", "Lainnya"];
const blank = { title: "", slug: "", category: "Akademik", date_label: "", excerpt: "", body: "", image_url: "", image_alt: "", media_type: "image", published: true };

function slugify(value) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function isVideo(item) {
  return item?.media_type === "video" || /\.(mp4|webm|mov|m4v)(\?|$)/i.test(item?.image_url || "");
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [active, setActive] = useState("berita");
  const [items, setItems] = useState([]);
  const [counts, setCounts] = useState({});
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const activeSection = SECTIONS.find((section) => section.id === active) || SECTIONS[2];

  const loadSection = useCallback(async (sectionId = active, quiet = false) => {
    if (!quiet) setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/admin/content?section=${encodeURIComponent(sectionId)}`, { cache: "no-store" });
      const data = await response.json();
      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }
      if (!response.ok) throw new Error(data.error || "Data gagal dimuat.");
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Tidak dapat memuat data CMS.");
    } finally {
      if (!quiet) setLoading(false);
    }
  }, [active, router]);

  const loadCounts = useCallback(async () => {
    const results = await Promise.all(SECTIONS.map(async (section) => {
      try {
        const response = await fetch(`/api/admin/content?section=${encodeURIComponent(section.id)}`, { cache: "no-store" });
        if (!response.ok) return [section.id, 0];
        const data = await response.json();
        return [section.id, Array.isArray(data) ? data.length : 0];
      } catch { return [section.id, 0]; }
    }));
    setCounts(Object.fromEntries(results));
  }, []);

  useEffect(() => { loadSection(active); }, [active, loadSection]);
  useEffect(() => { loadCounts(); }, [loadCounts]);

  const filteredItems = useMemo(() => items.filter((item) =>
    `${item.title || ""} ${item.excerpt || ""} ${item.category || ""}`.toLowerCase().includes(search.toLowerCase())
  ), [items, search]);
  const totalItems = Object.values(counts).reduce((sum, value) => sum + value, 0);
  const publishedItems = items.filter((item) => item.published).length;

  function newItem() {
    setForm({ ...blank, category: active === "berita" ? "Akademik" : "" });
    setEditing("new"); setShowEditor(true); setNotice(""); setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function editItem(item) {
    setForm({ ...blank, ...item, body: Array.isArray(item.body) ? item.body.join("\n\n") : String(item.body || "") });
    setEditing(item.id); setShowEditor(true); setNotice(""); setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function closeEditor() { setEditing(null); setForm(blank); setShowEditor(false); }

  async function save(event) {
    event.preventDefault(); setSaving(true); setNotice(""); setError("");
    try {
      const bodyParagraphs = form.body.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
      const payload = {
        ...form,
        section: active,
        slug: slugify(form.slug || form.title),
        category: form.category || (active === "berita" ? "Kegiatan sekolah" : activeSection.label),
        body: bodyParagraphs,
        image_alt: form.image_alt || form.title,
      };
      const response = await fetch("/api/admin/content", {
        method: editing === "new" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, id: editing === "new" ? undefined : editing }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Gagal menyimpan konten.");
      setNotice(editing === "new" ? "Konten berhasil ditambahkan." : "Perubahan berhasil disimpan.");
      closeEditor(); await loadSection(active); await loadCounts();
    } catch (err) { setError(err.message || "Terjadi kesalahan saat menyimpan."); }
    finally { setSaving(false); }
  }

  async function deleteItem(item) {
    if (!window.confirm(`Hapus “${item.title}”? Tindakan ini tidak dapat dibatalkan.`)) return;
    setError(""); setNotice("");
    try {
      const response = await fetch("/api/admin/content", {
        method: "DELETE", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, section: active }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Gagal menghapus konten.");
      setNotice("Konten berhasil dihapus."); await loadSection(active); await loadCounts();
    } catch (err) { setError(err.message || "Gagal menghapus konten."); }
  }

  async function uploadMedia(file) {
    if (!file) return;
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");
    if (!isImage && !isVideo) { setError("Pilih file gambar atau video."); return; }
    const maxSize = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) { setError(`Ukuran ${isVideo ? "video" : "gambar"} maksimal ${isVideo ? "50" : "10"} MB.`); return; }
    setUploading(true); setError(""); setNotice("");
    try {
      const supabase = createClient();
      const extension = file.name.split(".").pop()?.toLowerCase() || (isVideo ? "mp4" : "jpg");
      const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${extension}`;
      const path = `${active}/${safeName}`;
      const { error: uploadError } = await supabase.storage.from("website-media").upload(path, file, { upsert: false, contentType: file.type });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("website-media").getPublicUrl(path);
      setForm((current) => ({ ...current, image_url: data.publicUrl, media_type: isVideo ? "video" : "image" }));
      setNotice(`${isVideo ? "Video" : "Gambar"} berhasil diunggah.`);
    } catch (err) {
      setError(`Upload gagal: ${err.message || "Periksa sesi login dan kebijakan Storage Supabase."}`);
    } finally { setUploading(false); }
  }

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.assign("/admin/login");
  }

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${mobileMenu ? "mobile-open" : ""}`}>
        <Link href="/admin/dashboard" className="admin-sidebar-brand" onClick={() => setMobileMenu(false)}>
          <span className="admin-brand-mark small"><BookOpen size={20} /></span>
          <span><strong>SMAN 3</strong><small>ADMIN PANEL</small></span>
        </Link>
        <div className="admin-sidebar-label">MENU UTAMA</div>
        <nav className="admin-nav" aria-label="Menu pengelolaan konten">
          {SECTIONS.map((section) => {
            const Icon = section.icon;
            return <button key={section.id} className={`admin-nav-item ${active === section.id ? "active" : ""}`} onClick={() => { setActive(section.id); setEditing(null); setShowEditor(false); setSearch(""); setNotice(""); setError(""); setMobileMenu(false); }}>
              <Icon size={18} /><span>{section.label}</span><span className="admin-nav-count">{counts[section.id] ?? "—"}</span>
            </button>;
          })}
        </nav>
        <div className="admin-sidebar-bottom">
          <Link href="/" target="_blank" className="admin-nav-item"><ExternalLink size={17} />Lihat website</Link>
          <button onClick={logout} className="admin-nav-item"><LogOut size={17} />Keluar</button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-title"><button className="admin-mobile-menu" onClick={() => setMobileMenu((value) => !value)} aria-label="Buka menu"><Menu size={20} /></button><div><span className="admin-eyebrow">CONTENT MANAGEMENT SYSTEM</span><h1>Dashboard</h1></div></div>
          <div className="admin-topbar-user"><span className="admin-avatar">A</span><span><strong>Administrator</strong><small>Pengelola website</small></span></div>
        </header>

        <section className="admin-content">
          <div className="admin-welcome">
            <div><p className="admin-muted">Selamat datang kembali</p><h2>Kelola konten sekolah.</h2><p className="admin-muted">Tambah, ubah, dan atur publikasi konten melalui satu panel.</p></div>
            <div className="admin-welcome-icon"><LayoutDashboard size={32} /></div>
          </div>

          <div className="admin-stats-grid">
            <div className="admin-stat-card"><span>Total entri CMS</span><strong>{totalItems}</strong><small>Di seluruh bagian konten</small></div>
            <div className="admin-stat-card"><span>Bagian website</span><strong>{SECTIONS.length}</strong><small>Beranda hingga tata tertib</small></div>
            <div className="admin-stat-card"><span>Konten terbit di bagian ini</span><strong>{publishedItems}</strong><small>{activeSection.label}</small></div>
          </div>

          <section className="admin-panel">
            <div className="admin-panel-heading">
              <div><span className="admin-eyebrow">MANAJEMEN KONTEN</span><h2>{activeSection.label}</h2><p className="admin-muted">{activeSection.desc}</p></div>
              <button className="admin-primary-btn admin-add-btn" onClick={newItem}><Plus size={18} /> Tambah konten</button>
            </div>
            {notice && <div className="admin-success" role="status">{notice}</div>}
            {error && <div className="admin-error admin-alert" role="alert">{error}</div>}

            {showEditor && <form className="admin-editor" onSubmit={save}>
              <div className="admin-editor-heading"><h3>{editing === "new" ? "Tambah konten baru" : "Edit konten"}</h3><button type="button" className="admin-icon-btn" onClick={closeEditor} aria-label="Tutup editor"><X size={18} /></button></div>
              <div className="admin-form-row">
                <label>Judul / nama *<input required maxLength={180} value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value, slug: editing === "new" ? "" : current.slug }))} placeholder="Masukkan judul konten" /></label>
                <label>Slug URL <small>Opsional; dibuat otomatis dari judul</small><input value={form.slug} onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))} placeholder="contoh-judul-konten" /></label>
              </div>
              {active === "berita" && <div className="admin-form-row"><label>Kategori berita<select value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}>{CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}</select></label><label>Label tanggal<input value={form.date_label} onChange={(event) => setForm((current) => ({ ...current, date_label: event.target.value }))} placeholder="Contoh: 23 Oktober 2026" /></label></div>}
              <label>Deskripsi / ringkasan<textarea rows={3} value={form.excerpt} onChange={(event) => setForm((current) => ({ ...current, excerpt: event.target.value }))} placeholder="Ringkasan yang ditampilkan pada kartu konten" /></label>
              <label>Isi / detail konten<textarea rows={6} value={form.body} onChange={(event) => setForm((current) => ({ ...current, body: event.target.value }))} placeholder="Tuliskan isi konten. Pisahkan paragraf dengan satu baris kosong." /></label>
              <div className="admin-form-row">
                <label>Teks alternatif media<input value={form.image_alt} onChange={(event) => setForm((current) => ({ ...current, image_alt: event.target.value }))} placeholder="Deskripsi gambar atau video" /></label>
                <label>URL media<input value={form.image_url} onChange={(event) => setForm((current) => ({ ...current, image_url: event.target.value, media_type: /\.(mp4|webm|mov|m4v)(\?|$)/i.test(event.target.value) ? "video" : current.media_type }))} placeholder="https://... atau unggah file di bawah" /></label>
              </div>
              <label className="admin-upload-field"><span><UploadCloud size={17} /> Upload foto atau video</span><input type="file" accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime" disabled={uploading} onChange={(event) => uploadMedia(event.target.files?.[0])} /><small>{uploading ? "Mengunggah ke Supabase Storage..." : "Foto maksimal 10 MB · Video maksimal 50 MB · Disimpan pada bucket website-media"}</small></label>
              {form.image_url && <div className="admin-media-preview">{isVideo(form) ? <video src={form.image_url} controls /> : <img src={form.image_url} alt={form.image_alt || "Pratinjau media"} />}</div>}
              <label className="admin-publish-toggle"><input type="checkbox" checked={form.published} onChange={(event) => setForm((current) => ({ ...current, published: event.target.checked }))} /><span><strong>Publikasikan konten</strong><small>Konten yang tidak dicentang disimpan sebagai draft.</small></span></label>
              <div className="admin-editor-actions"><button type="button" className="admin-secondary-btn" onClick={closeEditor}>Batal</button><button className="admin-primary-btn" disabled={saving || uploading}><Save size={17} />{saving ? "Menyimpan..." : editing === "new" ? "Simpan konten" : "Simpan perubahan"}</button></div>
            </form>}

            <div className="admin-table-tools"><label className="admin-search"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={`Cari ${activeSection.label.toLowerCase()}...`} /></label><div className="admin-tools-right"><span>{filteredItems.length} konten</span><button className="admin-icon-btn" onClick={() => { loadSection(active, true); loadCounts(); }} aria-label="Muat ulang data"><RefreshCw size={16} /></button></div></div>
            {loading ? <div className="admin-empty"><RefreshCw size={23} className="admin-spin" /><p>Memuat data dari Supabase...</p></div> : filteredItems.length === 0 ? <div className="admin-empty"><div className="admin-empty-icon"><FileText size={25} /></div><h3>Belum ada konten di bagian ini</h3><p>Tambahkan entri pertama menggunakan tombol di atas.</p><button className="admin-secondary-btn" onClick={newItem}><Plus size={16} /> Tambah konten</button></div> : <div className="admin-record-list">{filteredItems.map((item) => <article key={item.id} className="admin-record">
              <div className="admin-record-thumb">{item.image_url ? (isVideo(item) ? <video src={item.image_url} /> : <img src={item.image_url} alt="" />) : <ImageIcon size={22} />}</div>
              <div className="admin-record-body"><h3>{item.title}</h3><div className="admin-record-meta">{item.category && <span className="admin-record-tag">{item.category}</span>}<span className={`admin-status ${item.published ? "published" : "draft"}`}>{item.published ? <Eye size={12} /> : <EyeOff size={12} />}{item.published ? "Terbit" : "Draft"}</span></div><p>{item.excerpt || (Array.isArray(item.body) ? item.body.join(" ") : item.body) || "Belum ada deskripsi."}</p><small>{item.date_label || (item.created_at ? new Date(item.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "Belum ada tanggal")}</small></div>
              <div className="admin-record-actions"><button className="admin-icon-btn" onClick={() => editItem(item)} aria-label={`Edit ${item.title}`} title="Edit"><Pencil size={16} /></button><button className="admin-icon-btn danger" onClick={() => deleteItem(item)} aria-label={`Hapus ${item.title}`} title="Hapus"><Trash2 size={16} /></button></div>
            </article>)}</div>}
          </section>
          <p className="admin-footer-note">SMA Negeri 3 Semarang · Panel pengelolaan konten</p>
        </section>
      </main>
    </div>
  );
}
