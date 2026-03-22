export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-16 px-6 md:px-12 overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(232,81,10,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Horizontal rule top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#1a1a1a]" />

      {/* Main content — bottom aligned */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Pre-headline */}
        <div className="animate-slide-left mb-8">
          <span className="text-xs text-[#e8510a] tracking-[0.3em] uppercase font-semibold">
            Ingeniero · Speaker · Emprendedor
          </span>
        </div>

        {/* Display headline */}
        <h1 className="text-display text-white mb-8 animate-fade-in-up max-w-5xl">
          <span className="block">Descubre cómo</span>
          <span className="block text-[#e8510a]">la IA transforma</span>
          <span className="block">tu futuro.</span>
        </h1>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pt-8 border-t border-[#1a1a1a]">
          {/* Left: tagline */}
          <p
            className="text-[#888] text-lg max-w-xl leading-relaxed animate-fade-in-up delay-200"
          >
            Llevo años haciendo que la inteligencia artificial sea accesible. He
            formado a más de{" "}
            <span className="text-white font-semibold">500.000 personas</span>{" "}
            en 32 países. CEO & Co-founder de{" "}
            <a
              href="https://centeia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#e8510a] hover:text-[#ff6a24] transition-colors"
            >
              CenteIA Education
            </a>
            .
          </p>

          {/* Right: CTAs */}
          <div
            className="flex flex-row items-center gap-4 animate-fade-in-up delay-300 shrink-0"
          >
            <a
              href="#sobre-mi"
              className="px-8 py-4 bg-[#e8510a] text-white font-bold hover:bg-[#ff6a24] transition-colors duration-200 text-sm tracking-wide"
            >
              MI HISTORIA
            </a>
            <a
              href="#servicios"
              className="px-8 py-4 border border-[#333] text-[#888] hover:text-white hover:border-white transition-all duration-200 text-sm tracking-wide"
            >
              QUÉ OFREZCO
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 right-8 hidden md:flex items-center gap-3 text-[#444] text-xs tracking-widest uppercase">
        <span>Scroll</span>
        <div className="w-8 h-px bg-[#444]" />
      </div>
    </section>
  );
}
