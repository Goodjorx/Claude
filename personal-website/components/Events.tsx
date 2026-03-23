import Image from "next/image";

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
  {
    title: "IA y Liderazgo",
    category: "Masterclass",
    description:
      "Para directivos y líderes de equipo. Cómo tomar decisiones estratégicas en la era de la IA: qué automatizar, cómo gestionar el cambio y liderar equipos en plena transformación digital.",
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
        {/* Full-width conference photo */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/7] md:aspect-[21/9] mb-20 overflow-hidden bg-[#0f0f0f]">
          <Image
            src="/images/foto atril womenalia.jpeg"
            alt="Jordi Segura dando conferencia"
            fill
            className="object-cover object-top"
            quality={85}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(8,8,8,0.8) 0%, transparent 60%), linear-gradient(to top, rgba(8,8,8,0.6) 0%, transparent 50%)",
            }}
          />
          <div className="absolute bottom-8 left-8 md:left-12 max-w-[calc(100%-4rem)]">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-white/20" />
              <span className="text-xs text-white/55 tracking-[0.3em] uppercase font-semibold">
                Conferencias y Eventos
              </span>
            </div>
            <h2 className="text-headline text-white">
              Mi misión: llevar la IA
              <br />
              <span className="text-white/65">al máximo de personas.</span>
            </h2>
          </div>
        </div>

        {/* CTA row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-16">
          <p className="text-[#888] max-w-lg">
            Aterrizo conceptos técnicos complejos de manera sencilla y
            entretenida. Práctico, directo y adaptado a tu audiencia.
          </p>
          <a
            href="#contacto"
            className="shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold hover:bg-white/90 transition-colors text-sm tracking-wide"
          >
            ¿QUIERES UN EVENTO SOBRE IA?
          </a>
        </div>

        {/* Events grid */}
        <div className="grid md:grid-cols-2 gap-px bg-[#1a1a1a]">
          {events.map((event) => (
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
                          ? "bg-white text-black"
                          : "border border-[#333] text-[#777]"
                      }`}
                    >
                      {event.category}
                    </span>
                    {event.featured && (
                      <span className="text-xs text-white/35 tracking-wide">
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
                  className={`text-[#888] leading-relaxed ${event.featured ? "md:flex-1" : ""}`}
                >
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Past logos */}
        <div className="mt-16 pt-12 border-t border-[#1a1a1a]">
          <p className="text-xs text-[#666] tracking-[0.3em] uppercase mb-8 text-center">
            Han contado conmigo
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {[
              "La Caixa",
              "Expo Real Estate México",
              "5° Congreso Inversiones Inmobiliarias",
              "MasterChef World",
              "Prompt Congress",
            ].map((name) => (
              <span
                key={name}
                className="text-[#555] text-sm font-semibold tracking-wider uppercase hover:text-[#888] transition-colors"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
