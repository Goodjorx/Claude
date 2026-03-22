const events = [
  {
    title: "La IA y el Empleo",
    category: "Conferencia",
    description:
      "¿La IA te va a quitar el trabajo? Desmontamos mitos y vemos con datos reales cómo la inteligencia artificial está transformando el mercado laboral — y cómo posicionarte para ganar.",
    featured: true,
  },
  {
    title: "IA + ChatGPT",
    category: "Workshop",
    description:
      "Desde cero hasta productividad real. Aprende a usar ChatGPT y los principales LLMs para automatizar tareas, crear contenido y mejorar resultados en tu día a día profesional.",
    featured: false,
  },
  {
    title: "Prompt Congress",
    category: "Congreso",
    description:
      "El arte de hablar con la IA. Técnicas avanzadas de prompt engineering para profesionales que quieren sacar el máximo rendimiento de los modelos generativos.",
    featured: false,
  },
  {
    title: "IA para Empresas",
    category: "Workshop Corporativo",
    description:
      "Formación in-company adaptada a tu sector. Casos de uso reales, ROI medible y estrategia de adopción para equipos directivos y mandos intermedios.",
    featured: false,
  },
];

export default function Events() {
  return (
    <section
      id="eventos"
      className="py-24 md:py-40 px-6 md:px-12 border-t border-[#1a1a1a]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-[#e8510a]" />
          <span className="text-xs text-[#e8510a] tracking-[0.3em] uppercase font-semibold">
            Conferencias y Eventos
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <h2 className="text-headline text-white">
            Mi misión: llevar la IA
            <br />
            <span className="text-[#444]">al máximo de personas.</span>
          </h2>
          <a
            href="#contacto"
            className="shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-[#e8510a] text-white font-bold hover:bg-[#ff6a24] transition-colors text-sm tracking-wide"
          >
            ¿QUIERES UN EVENTO SOBRE IA?
          </a>
        </div>

        {/* Events grid */}
        <div className="grid md:grid-cols-2 gap-px bg-[#1a1a1a]">
          {events.map((event, i) => (
            <div
              key={event.title}
              className={`p-8 md:p-10 group cursor-default transition-colors duration-300 ${
                event.featured
                  ? "bg-[#130d09] md:col-span-2"
                  : "bg-[#0f0f0f] hover:bg-[#111]"
              }`}
            >
              <div
                className={`flex flex-col ${event.featured ? "md:flex-row md:items-center md:gap-16" : ""}`}
              >
                <div className={event.featured ? "md:flex-1" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`text-xs px-2 py-1 font-semibold uppercase tracking-widest ${
                        event.featured
                          ? "bg-[#e8510a] text-white"
                          : "border border-[#333] text-[#555]"
                      }`}
                    >
                      {event.category}
                    </span>
                    {event.featured && (
                      <span className="text-xs text-[#e8510a] tracking-wide">
                        ★ Más solicitada
                      </span>
                    )}
                  </div>
                  <h3
                    className={`font-bold text-white mb-3 ${event.featured ? "text-2xl md:text-3xl" : "text-xl"}`}
                  >
                    {event.title}
                  </h3>
                </div>
                <p
                  className={`text-[#666] leading-relaxed ${event.featured ? "md:flex-1" : ""}`}
                >
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Past logos / mentions */}
        <div className="mt-16 pt-12 border-t border-[#1a1a1a]">
          <p className="text-xs text-[#444] tracking-[0.3em] uppercase mb-8 text-center">
            Han contado conmigo
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {["La Caixa", "Learning Heroes", "MasterChef World", "CenteIA PRO", "Prompt Congress"].map(
              (name) => (
                <span
                  key={name}
                  className="text-[#333] text-sm font-semibold tracking-wider uppercase hover:text-[#666] transition-colors"
                >
                  {name}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
