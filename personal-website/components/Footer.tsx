export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/6 py-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold text-lg">
            JORDI<span className="text-white/20">.</span>
          </span>
          <span className="text-white/55 text-sm">© {year} Jordi Segura Pons</span>
        </div>
        <div className="flex items-center gap-6 text-white/55 text-sm">
          <a href="#sobre-mi" className="hover:text-white/50 transition-colors">Sobre mí</a>
          <a href="#servicios" className="hover:text-white/50 transition-colors">Servicios</a>
          <a href="#eventos" className="hover:text-white/50 transition-colors">Eventos</a>
          <a
            href="https://centeia.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/50 transition-colors"
          >
            CenteIA Education ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
