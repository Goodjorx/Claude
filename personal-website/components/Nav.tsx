"use client";

import { useState, useEffect } from "react";

const links = [
  { label: "Sobre mí", href: "/#sobre-mi" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Prensa", href: "/#prensa" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/#contacto" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#080808]/96 backdrop-blur-sm border-b border-white/6"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="text-white font-bold text-xl tracking-tight hover:text-white/70 transition-colors duration-200"
        >
          JORDI<span className="text-white/30">.</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/55 hover:text-white transition-colors duration-200 tracking-wide"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/#contacto"
            className="text-sm px-4 py-2 bg-white text-black font-semibold hover:bg-white/90 transition-colors duration-200 tracking-wide"
          >
            Colaboremos
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/40 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#080808] border-t border-white/6 px-6 pb-8 pt-4">
          <nav className="flex flex-col gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/50 hover:text-white transition-colors text-lg font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/#contacto"
              className="inline-block px-6 py-3 bg-white text-black font-bold text-center tracking-wide"
              onClick={() => setMenuOpen(false)}
            >
              Colaboremos
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
