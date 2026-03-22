export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Background glow blobs */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full animate-pulse-slow"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full animate-pulse-slow delay-300"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-indigo-400 text-sm mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          CEO & Co-founder · CenteIA Education
        </div>

        {/* Headline */}
        <h1
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6 animate-fade-in-up"
          style={{ opacity: 0 }}
        >
          Jordi Segura
          <br />
          <span className="gradient-text">Pons</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200"
          style={{ opacity: 0 }}
        >
          Ingeniero de telecomunicaciones · Máster en IA · He ayudado a{" "}
          <span className="text-white font-medium">+300.000 personas</span> a
          dominar la inteligencia artificial y transformar su carrera profesional.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300"
          style={{ opacity: 0 }}
        >
          <a
            href="#sobre-mi"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all duration-200 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
          >
            Conóceme
          </a>
          <a
            href="#contacto"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-medium transition-all duration-200"
          >
            Hablemos →
          </a>
        </div>

        {/* Social proof / stats */}
        <div
          className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in delay-500"
          style={{ opacity: 0 }}
        >
          {[
            { value: "300K+", label: "Personas formadas" },
            { value: "10K+", label: "Seguidores IG" },
            { value: "5★", label: "Trustpilot" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 animate-bounce">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
