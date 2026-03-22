const experiences = [
  {
    company: "CenteIA Education",
    role: "CEO & Co-founder",
    period: "2022 — Presente",
    description:
      "Co-fundé y dirijo CenteIA Education, la academia de IA más grande en español. Hemos formado a más de 300.000 profesionales en inteligencia artificial, machine learning y tecnologías emergentes a través de programas como CenteIA PRO y CriptoIA PRO.",
    tags: ["AI Education", "Leadership", "Edtech", "Escala"],
    accent: "#6366f1",
  },
  {
    company: "MasterChef World",
    role: "Head of AI",
    period: "2023 — Presente",
    description:
      "Responsable de la estrategia e implementación de inteligencia artificial en MasterChef World. Aplico IA para transformar experiencias gastronómicas y optimizar procesos en uno de los formatos de televisión más reconocidos a nivel mundial.",
    tags: ["AI Strategy", "Entretenimiento", "Innovación"],
    accent: "#f59e0b",
  },
  {
    company: "CenteIA Consulting",
    role: "AI Consultant",
    period: "2021 — 2023",
    description:
      "Consultoría especializada en inteligencia artificial para empresas. Auditoría de procesos, diseño de estrategias de adopción de IA y formación a equipos directivos sobre transformación digital.",
    tags: ["Consultoría", "Automatización", "B2B"],
    accent: "#10b981",
  },
  {
    company: "Learning Heroes",
    role: "Formador & Mentor",
    period: "2020 — 2022",
    description:
      "Formador y mentor en programas de aprendizaje acelerado. Diseñé y co-impartí el programa IA PRO4, formando a centenares de profesionales en aplicaciones prácticas de la inteligencia artificial.",
    tags: ["Formación", "Mentoring", "IA PRO"],
    accent: "#8b5cf6",
  },
  {
    company: "Schneider Electric",
    role: "Ingeniero",
    period: "Anterior",
    description:
      "Experiencia en ingeniería dentro de uno de los líderes globales en gestión de la energía y automatización industrial.",
    tags: ["Ingeniería", "Automatización", "Industrial"],
    accent: "#3b82f6",
  },
];

export default function Experience() {
  return (
    <section
      id="experiencia"
      className="py-32 px-6"
      style={{ borderTop: "1px solid #1e2433" }}
    >
      <div className="max-w-4xl mx-auto">
        <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
          Experiencia
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-16">
          Trayectoria profesional
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-indigo-500/50 via-indigo-500/20 to-transparent" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <div key={i} className="relative pl-8">
                {/* Dot */}
                <div
                  className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#09090f]"
                  style={{ backgroundColor: exp.accent }}
                />

                <div className="group">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        {exp.role}
                      </h3>
                      <p className="text-indigo-400 text-sm">{exp.company}</p>
                    </div>
                    <span className="text-gray-500 text-sm font-mono whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full bg-[#0f1623] border border-[#1e2433] text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
