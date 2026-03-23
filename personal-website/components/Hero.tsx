import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-16 px-6 md:px-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#080808]">
        {/* Hero photo */}
        <Image
          src="/images/jordi-stage.jpg"
          alt="Jordi Segura hablando en conferencia"
          fill
          className="object-cover object-center"
          priority
          quality={85}
        />
        {/* Dark overlay — heavy at bottom for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, #080808 0%, #080808 20%, rgba(8,8,8,0.78) 55%, rgba(8,8,8,0.45) 100%)",
          }}
        />
      </div>

      {/* Thin top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/8" />

      {/* Pre-label — pinned just below nav, never overlaps */}
      <div className="absolute top-[72px] left-6 md:left-12 z-10 animate-slide-left">
        <span className="text-xs text-white/55 tracking-[0.35em] uppercase font-medium">
          Ingeniero · Speaker · CEO de CenteIA Education
        </span>
      </div>

      {/* ── Main content — pinned to bottom ─────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">

        {/* Display headline — line-by-line clip reveal */}
        <h1 className="text-display text-white mb-10 max-w-5xl">
          <span className="reveal-line">
            <span style={{ animationDelay: "0.08s" }}>Descubre cómo</span>
          </span>
          <span className="reveal-line">
            <span style={{ animationDelay: "0.22s" }} className="text-white/55">
              la IA transforma
            </span>
          </span>
          <span className="reveal-line">
            <span style={{ animationDelay: "0.36s" }}>tu futuro.</span>
          </span>
        </h1>

        {/* Bottom row: tagline + CTAs */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pt-8 border-t border-white/8">
          <p className="text-white/60 text-lg max-w-xl leading-relaxed animate-fade-in-up delay-500">
            Llevo años haciendo que la inteligencia artificial sea accesible. He
            formado a más de{" "}
            <span className="text-white font-semibold">500.000 personas</span>{" "}
            en 32 países. CEO & Co-founder de{" "}
            <a
              href="https://centeia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline underline-offset-4 decoration-white/25 hover:decoration-white/60 transition-all"
            >
              CenteIA Education
            </a>
            .
          </p>

          <div className="flex flex-row items-center gap-3 animate-fade-in-up delay-600 shrink-0">
            <a
              href="#sobre-mi"
              className="px-8 py-4 bg-white text-black font-bold hover:bg-white/90 active:scale-95 transition-all duration-150 text-sm tracking-wider"
            >
              MI HISTORIA
            </a>
            <a
              href="#servicios"
              className="px-8 py-4 border border-white/20 text-white/65 hover:text-white hover:border-white/45 transition-all duration-200 text-sm tracking-wider"
            >
              QUÉ OFREZCO
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 right-8 hidden md:flex items-center gap-3 text-white/18 text-xs tracking-widest uppercase animate-fade-in delay-800">
        <span>Scroll</span>
        <div className="w-8 h-px bg-white/18" />
      </div>
    </section>
  );
}
