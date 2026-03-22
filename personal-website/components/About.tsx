const skills = [
  "Inteligencia Artificial",
  "Machine Learning",
  "Generative AI",
  "Prompt Engineering",
  "Automatización",
  "No-Code / Low-Code",
  "Educación Online",
  "Content Strategy",
  "Python",
  "APIs & Integraciones",
];

export default function About() {
  return (
    <section
      id="sobre-mi"
      className="py-32 px-6"
      style={{ borderTop: "1px solid #1e2433" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: text */}
          <div>
            <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
              Sobre mí
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-8">
              Hago que la IA sea{" "}
              <span className="gradient-text">accesible para todos</span>
            </h2>

            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                Soy ingeniero de telecomunicaciones con un Máster en
                Inteligencia Artificial por la Universidad de Barcelona y
                formación en MIT Professional Education. Llevo años aplicando
                IA en sectores muy distintos, desde la industria hasta el mundo
                del entretenimiento.
              </p>
              <p>
                Co-fundé{" "}
                <a
                  href="https://centeia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  CenteIA Education
                </a>{" "}
                con la convicción de que la inteligencia artificial debe ser una
                herramienta al servicio de las personas, no una barrera. Hemos
                formado a más de 300.000 profesionales en todo el mundo en
                español.
              </p>
              <p>
                Paralelamente, dirijo una agencia de automatización y una
                agencia de contenido con IA, y actúo como Head of AI en
                MasterChef World, donde aplico la IA para transformar
                experiencias.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <a
                href="https://linkedin.com/in/jordisegurapons"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
              <a
                href="https://instagram.com/jordisegurap"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                Instagram
              </a>
            </div>
          </div>

          {/* Right: skills + location */}
          <div className="space-y-8">
            {/* Skills */}
            <div>
              <p className="text-gray-500 text-sm mb-4">Áreas de expertise</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-sm border border-[#1e2433] bg-[#0f1623] text-gray-300 hover:border-indigo-500/50 hover:text-indigo-300 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Info card */}
            <div className="rounded-2xl border border-[#1e2433] bg-[#0f1623] p-6 space-y-4">
              {[
                {
                  icon: "📍",
                  label: "Ubicación",
                  value: "Andorra la Vella",
                },
                {
                  icon: "🎓",
                  label: "Formación",
                  value: "Ing. Telecomunicaciones · MSc IA (UB) · MIT",
                },
                {
                  icon: "🚀",
                  label: "Rol actual",
                  value: "CEO & Co-founder, CenteIA Education",
                },
                {
                  icon: "🌍",
                  label: "Idiomas",
                  value: "Castellano · Catalán · Inglés",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <div className="text-xs text-gray-500">{item.label}</div>
                    <div className="text-sm text-gray-300">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
