const stories = [
  {
    name: "Javier",
    result: "Contratado como subdirector de hotel",
    quote:
      "Apliqué IA para optimizar la gestión del hotel y en 3 meses me ascendieron a subdirector. Lo que aprendí con Jordi cambió mi carrera.",
    tag: "Hostelería",
  },
  {
    name: "Francisco",
    result: "+1.500€/mes con su chatbot",
    quote:
      "Aprendí a crear chatbots con IA y ahora los vendo a empresas. Gano 1.500€ al mes extras. Nunca habría imaginado que esto era posible.",
    tag: "Emprendimiento",
  },
  {
    name: "José",
    result: "+1.000€/mes gestionando RRSS con IA",
    quote:
      "Gestiono las redes sociales de varias empresas usando IA. Trabajo menos horas y gano más. La formación fue el antes y el después.",
    tag: "Marketing",
  },
  {
    name: "Encarna",
    result: "Ha escrito 3 libros con IA",
    quote:
      "Con la ayuda de la IA pude escribir y publicar tres libros. Siempre quise ser autora y Jordi me enseñó las herramientas para hacerlo realidad.",
    tag: "Contenido",
  },
];

export default function SocialProof() {
  return (
    <section className="py-24 md:py-40 px-6 md:px-12 border-t border-[#1a1a1a] bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-[#e8510a]" />
          <span className="text-xs text-[#e8510a] tracking-[0.3em] uppercase font-semibold">
            Historias reales
          </span>
        </div>
        <h2 className="text-headline text-white mb-4">
          Lo que más me llena:
          <br />
          <span className="text-[#444]">ver la transformación.</span>
        </h2>
        <p className="text-[#666] max-w-xl mb-16 leading-relaxed">
          Estas son solo algunas de las historias de nuestra primera promoción.
          Son la recompensa real de este trabajo.
        </p>

        {/* Stories grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1a1a1a]">
          {stories.map((story, i) => (
            <div
              key={story.name}
              className="p-8 bg-[#050505] hover:bg-[#0a0a0a] transition-colors group"
            >
              {/* Tag */}
              <span className="text-xs text-[#444] uppercase tracking-widest border border-[#1a1a1a] px-2 py-1">
                {story.tag}
              </span>

              {/* Result */}
              <div className="mt-6 mb-4">
                <div className="text-[#e8510a] font-black text-lg leading-tight">
                  {story.result}
                </div>
                <div className="text-white font-semibold mt-1">{story.name}</div>
              </div>

              {/* Quote */}
              <p className="text-[#555] text-sm leading-relaxed group-hover:text-[#777] transition-colors">
                &ldquo;{story.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>

        {/* Bottom stat */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-[#1a1a1a]">
          <p className="text-[#555] text-lg">
            Más de{" "}
            <span className="text-white font-bold">500.000 personas</span> ya
            han dado el paso. ¿Y tú?
          </p>
          <a
            href="https://education.centeia.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#e8510a] text-white font-bold hover:bg-[#ff6a24] transition-colors text-sm tracking-wide shrink-0"
          >
            VER PROGRAMAS DE CenteIA →
          </a>
        </div>
      </div>
    </section>
  );
}
