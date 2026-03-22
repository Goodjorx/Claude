const projects = [
  {
    title: "CenteIA PRO",
    description:
      "El programa de inteligencia artificial más completo en español. Formación intensiva y práctica para profesionales que quieren dominar la IA desde cero hasta nivel avanzado.",
    url: "https://educationai.centeia.com",
    tags: ["Educación", "IA", "+300K alumnos"],
    gradient: "from-indigo-500/20 to-purple-500/10",
    border: "border-indigo-500/20",
    emoji: "🎓",
  },
  {
    title: "CriptoIA PRO",
    description:
      "Programa especializado en la intersección de la inteligencia artificial y las finanzas descentralizadas. Para profesionales del mundo cripto y blockchain.",
    url: "https://centeia.com",
    tags: ["DeFi", "Blockchain", "IA Aplicada"],
    gradient: "from-amber-500/20 to-orange-500/10",
    border: "border-amber-500/20",
    emoji: "🔗",
  },
  {
    title: "Agencia de Automatización",
    description:
      "Ayudo a empresas a automatizar sus procesos con IA. Desde workflows simples hasta pipelines complejos de procesamiento de datos y generación de contenido.",
    url: "https://instagram.com/jordisegurap",
    tags: ["Automatización", "No-Code", "B2B"],
    gradient: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/20",
    emoji: "⚡",
  },
  {
    title: "AI Content Agency",
    description:
      "Agencia de contenido potenciada por IA. Producimos y distribuimos contenido educativo sobre inteligencia artificial para marcas y profesionales.",
    url: "https://instagram.com/jordisegurap",
    tags: ["Contenido", "IA Generativa", "Marca personal"],
    gradient: "from-pink-500/20 to-rose-500/10",
    border: "border-pink-500/20",
    emoji: "✍️",
  },
];

export default function Projects() {
  return (
    <section
      id="proyectos"
      className="py-32 px-6"
      style={{ borderTop: "1px solid #1e2433" }}
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
          Proyectos
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
          Lo que estoy construyendo
        </h2>
        <p className="text-gray-400 max-w-xl mb-16">
          Proyectos activos en los que estoy involucrado, desde educación masiva
          hasta automatización empresarial.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative rounded-2xl border ${project.border} bg-gradient-to-br ${project.gradient} p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer`}
              style={{ background: undefined }}
            >
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.gradient} opacity-40`}
              />
              <div className="absolute inset-0 rounded-2xl bg-[#09090f]/60" />
              <div
                className={`absolute inset-0 rounded-2xl border ${project.border} group-hover:opacity-100 opacity-50 transition-opacity`}
              />

              <div className="relative z-10">
                <div className="text-3xl mb-4">{project.emoji}</div>
                <h3 className="text-white font-semibold text-xl mb-2 group-hover:text-indigo-300 transition-colors">
                  {project.title}
                  <span className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                    ↗
                  </span>
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
