export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[#1a1a1a] py-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-white font-black text-lg">
            JORDI<span className="text-[#e8510a]">.</span>
          </span>
          <span className="text-[#444] text-sm">© {year} Jordi Segura Pons</span>
        </div>
        <div className="flex items-center gap-6 text-[#444] text-sm">
          <a href="#sobre-mi" className="hover:text-[#888] transition-colors">Sobre mí</a>
          <a href="#servicios" className="hover:text-[#888] transition-colors">Servicios</a>
          <a href="#eventos" className="hover:text-[#888] transition-colors">Eventos</a>
          <a
            href="https://centeia.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#e8510a] transition-colors"
          >
            CenteIA Education ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
