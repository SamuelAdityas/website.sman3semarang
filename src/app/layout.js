import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "SMA Negeri 3 Semarang | SPECTACULAR",
  description: "Jelajahi profil, program, fasilitas, prestasi, kegiatan, dan informasi SMA Negeri 3 Semarang.",
};

export default function RootLayout({ children }) {
  return <html lang="id">
    <body>
      <Navbar /><main>{children}</main><Footer />
    </body>
  </html>;
}