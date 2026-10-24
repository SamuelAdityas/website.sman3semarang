import "./globals.css";
import SiteShell from "@/components/SiteShell";
export const metadata = { title: "SMA Negeri 3 Semarang | SPECTACULAR", description: "Jelajahi profil, program, fasilitas, prestasi, kegiatan, dan informasi SMA Negeri 3 Semarang." };
export default function RootLayout({ children }) { return <html lang="id"><body><SiteShell>{children}</SiteShell></body></html>; }
