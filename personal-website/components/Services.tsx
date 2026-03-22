const services = [
  {
    number: "01",
    title: "Conferencias",
    description:
      "Desgloso conceptos complejos de IA en explicaciones claras y prácticas. Adaptadas a empresas, emprendedores y profesionales de cualquier sector. Desde el impacto de la IA en el empleo hasta aplicaciones concretas con ChatGPT y LLMs.",
    tags: ["Keynote", "Workshop", "Panel"],
    cta: "Ver conferencias",
    ctaHref: "#eventos",
    highlight: true,
  },
  {
    number: "02",
    title: "Consultoría",
    description:
      "Auditoría de procesos con IA: calidad, ética y transparencia tecnológica. Diseño de estrategias de adopción de inteligencia artificial para tu empresa, desde flujos de automatización hasta integración de LLMs en productos y servicios.",
    tags: ["Auditoría IA", "Estrategia", "Automatización"],
    cta: "Hablemos",
    ctaHref: "#contacto",
    highlight: false,
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-24 md:py-40 px-6 md:px-12 border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-[#e8510a]" />
              <span className="text-xs text-[#e8510a] tracking-[0.3em] uppercase font-semibold">
                Qué ofrezco
              </span>
            </div>
            <h2 className="text-headline text-white">
              Soluciones IA
              <br />
              <span className="text-[#444]">para personas y empresas.</span>
            </h2>
          </div>
          <p className="text-[#666] max-w-sm leading-relaxed md:pb-2">
            Combino divulgación, auditoría y estrategia adaptada a tus
            necesidades. Sin tecnicismos innecesarios.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 gap-px bg-[#1a1a1a]">
          {services.map((service) => (
            <div
              key={service.number}
              className={`p-10 md:p-14 flex flex-col justify-between min-h-[400px] transition-colors duration-300 group ${
                service.highlight
                  ? "bg-[#0f0f0f] hover:bg-[#130d09]"
                  : "bg-[#0f0f0f] hover:bg-[#0f0f0f]"
              }`}
            >
              <div>
                {/* Number */}
                <div className="flex items-center justify-between mb-10">
                  <span className="text-5xl font-black text-[#1a1a1a] group-hover:text-[#e8510a] transition-colors duration-500">
                    {service.number}
                  </span>
                  <div
                    className={`w-10 h-10 flex items-center justify-center border ${
                      service.highlight
                        ? "border-[#e8510a] text-[#e8510a]"
                        : "border-[#333] text-[#555]"
                    }`}
                  >
                    →
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-[#666] leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 border border-[#222] text-[#555] uppercase tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <a
                href={service.ctaHref}
                className={`inline-flex items-center gap-3 mt-10 text-sm font-semibold tracking-wide transition-colors ${
                  service.highlight
                    ? "text-[#e8510a] hover:text-[#ff6a24]"
                    : "text-[#666] hover:text-white"
                }`}
              >
                {service.cta}
                <span className="text-lg">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
