"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/about", label: "Profil" },
  { href: "/fasilitas", label: "Fasilitas" },
  { href: "/ekstrakurikuler", label: "Ekstrakurikuler" },
  { href: "/prestasi", label: "Prestasi" },
  { href: "/galeri", label: "Galeri" },
  { href: "/berita", label: "Berita" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      {/* Bar informasi paling atas */}
      <div className="topline">
        <div className="container-wide topline-inner">
          <span>PORTAL INFORMASI SMA NEGERI 3 SEMARANG</span>

          <span className="topline-tag">
            SPECTACULAR · TUMBUH · BERKARYA
          </span>
        </div>
      </div>

      {/* Navigasi utama */}
      <nav className="navbar container-wide" aria-label="Navigasi utama">
        {/* Logo dan identitas sekolah */}
        <Link
          href="/"
          className="brand"
          onClick={closeMenu}
          aria-label="SMAN 3 Semarang - Beranda"
        >
          <img
            src="/images/logo-sman3.png"
            alt="Logo SMA Negeri 3 Semarang"
            className="brand-logo"
          />

          <span className="brand-copy">
            <strong>
              SMA NEGERI <b>3</b>
            </strong>

            <small>SEMARANG</small>
          </span>
        </Link>

        {/* Menu desktop */}
        <div className="desktop-nav">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
            >
              {link.label}
            </Link>
          ))}

          <Link href="/tata-tertib" className="nav-cta">
            <span>Tata tertib</span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>

        {/* Tombol menu mobile */}
        <button
          type="button"
          className="mobile-toggle"
          aria-label={open ? "Tutup menu navigasi" : "Buka menu navigasi"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? (
            <X size={25} aria-hidden="true" />
          ) : (
            <Menu size={25} aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Menu mobile */}
      <div
        id="mobile-navigation"
        className={`mobile-menu ${open ? "is-open" : ""}`}
        aria-hidden={!open}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="mobile-nav-link"
            tabIndex={open ? 0 : -1}
            onClick={closeMenu}
          >
            {link.label}
          </Link>
        ))}

        <Link
          href="/tata-tertib"
          className="mobile-nav-cta"
          tabIndex={open ? 0 : -1}
          onClick={closeMenu}
        >
          Tata tertib siswa
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}