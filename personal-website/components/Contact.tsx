"use client";

const services = [
  { value: "conferencia", label: "Conferencia / Keynote" },
  { value: "consultoria", label: "Consultoría IA" },
  { value: "formacion", label: "Formación Corporativa" },
  { value: "colaboracion", label: "Colaboración / Medio" },
  { value: "otro", label: "Otro" },
];

export default function Contact() {
  return (
    <section
      id="contacto"
      className="py-24 md:py-40 px-6 md:px-12 border-t border-white/6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-32 items-start">
          {/* Left */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-white/20" />
              <span className="text-xs text-white/50 tracking-[0.3em] uppercase font-medium">
                Contacto
              </span>
            </div>
            <h2 className="text-headline text-white mb-8">¿Hablamos?</h2>
            <p className="text-white/55 leading-relaxed mb-10 text-lg">
              Si tienes una empresa que quiere adoptar IA, quieres un evento o
              conferencia, o simplemente quieres conectar — escríbeme.
            </p>

            {/* Social links */}
            <div className="space-y-0">
              {[
                {
                  label: "LinkedIn",
                  handle: "/in/jordisegurapons",
                  url: "https://linkedin.com/in/jordisegurapons",
                  icon: (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
                {
                  label: "Instagram",
                  handle: "@jordisegurap",
                  url: "https://instagram.com/jordisegurap",
                  icon: (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  ),
                },
                {
                  label: "TikTok",
                  handle: "@jordisegurap",
                  url: "https://tiktok.com/@jordisegurap",
                  icon: (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.67a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 py-4 border-b border-white/6 group hover:border-white/15 transition-colors"
                >
                  <div className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/35 group-hover:border-white/30 group-hover:text-white transition-colors">
                    {social.icon}
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">
                      {social.label}
                    </div>
                    <div className="text-white/35 text-xs">{social.handle}</div>
                  </div>
                  <span className="ml-auto text-white/20 group-hover:text-white/60 transition-colors">
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: contact form */}
          <div>
            <form
              action="https://formsubmit.co/jordi@centeia.com"
              method="POST"
              className="space-y-5"
            >
              {/* Formsubmit config */}
              <input type="hidden" name="_subject" value="Nuevo contacto desde jordisegura.com" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              {/* Nombre */}
              <div>
                <label className="block text-xs text-white/50 tracking-[0.2em] uppercase mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  required
                  placeholder="Tu nombre"
                  className="w-full bg-transparent border border-white/10 px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white/35 transition-colors text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs text-white/50 tracking-[0.2em] uppercase mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="tu@email.com"
                  className="w-full bg-transparent border border-white/10 px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white/35 transition-colors text-sm"
                />
              </div>

              {/* Empresa */}
              <div>
                <label className="block text-xs text-white/50 tracking-[0.2em] uppercase mb-2">
                  Empresa{" "}
                  <span className="text-white/25 normal-case tracking-normal">
                    (opcional)
                  </span>
                </label>
                <input
                  type="text"
                  name="empresa"
                  placeholder="Nombre de tu empresa"
                  className="w-full bg-transparent border border-white/10 px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white/35 transition-colors text-sm"
                />
              </div>

              {/* Servicio */}
              <div>
                <label className="block text-xs text-white/50 tracking-[0.2em] uppercase mb-2">
                  ¿En qué puedo ayudarte?
                </label>
                <select
                  name="servicio"
                  required
                  defaultValue=""
                  className="w-full bg-[#0f0f0f] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/35 transition-colors text-sm appearance-none cursor-pointer"
                >
                  <option value="" disabled className="text-white/30">
                    Selecciona una opción
                  </option>
                  {services.map((s) => (
                    <option key={s.value} value={s.value} className="bg-[#0f0f0f]">
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mensaje */}
              <div>
                <label className="block text-xs text-white/50 tracking-[0.2em] uppercase mb-2">
                  Mensaje
                </label>
                <textarea
                  name="mensaje"
                  required
                  rows={4}
                  placeholder="Cuéntame en qué puedo ayudarte..."
                  className="w-full bg-transparent border border-white/10 px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white/35 transition-colors text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-white text-black font-bold hover:bg-white/90 active:scale-[0.99] transition-all text-sm tracking-wider"
              >
                ENVIAR MENSAJE →
              </button>

              <p className="text-white/25 text-xs text-center">
                Respondo en menos de 48h · jordi@centeia.com
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
