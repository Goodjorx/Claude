const channels = [
  {
    name: "LinkedIn",
    description: "Para propuestas profesionales y networking",
    url: "https://linkedin.com/in/jordisegurapons",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    cta: "Conectar en LinkedIn →",
    accent: "hover:border-blue-500/50 hover:bg-blue-500/5",
  },
  {
    name: "Instagram",
    description: "Contenido diario sobre IA y tecnología",
    url: "https://instagram.com/jordisegurap",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    cta: "Seguir en Instagram →",
    accent: "hover:border-pink-500/50 hover:bg-pink-500/5",
  },
  {
    name: "CenteIA Education",
    description: "Únete a la academia de IA más grande en español",
    url: "https://education.centeia.com",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
    cta: "Ver programas →",
    accent: "hover:border-indigo-500/50 hover:bg-indigo-500/5",
  },
];

export default function Contact() {
  return (
    <section
      id="contacto"
      className="py-32 px-6"
      style={{ borderTop: "1px solid #1e2433" }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
          Contacto
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
          ¿Hablamos?
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto mb-16">
          Si quieres colaborar, tienes un proyecto de IA en mente, o simplemente
          quieres conectar — estoy en las siguientes plataformas.
        </p>

        <div className="grid sm:grid-cols-3 gap-4">
          {channels.map((channel) => (
            <a
              key={channel.name}
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col items-center text-center p-6 rounded-2xl border border-[#1e2433] bg-[#0f1623] transition-all duration-300 ${channel.accent}`}
            >
              <div className="w-12 h-12 rounded-2xl bg-[#1e2433] flex items-center justify-center mb-4 text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                {channel.icon}
              </div>
              <h3 className="text-white font-semibold mb-1">{channel.name}</h3>
              <p className="text-gray-500 text-sm mb-4">
                {channel.description}
              </p>
              <span className="text-indigo-400 text-sm group-hover:text-indigo-300 transition-colors">
                {channel.cta}
              </span>
            </a>
          ))}
        </div>

        {/* Email fallback */}
        <p className="mt-12 text-gray-600 text-sm">
          También puedes encontrarme en{" "}
          <span className="text-gray-400">jordisegurapons.com</span>
        </p>
      </div>
    </section>
  );
}
