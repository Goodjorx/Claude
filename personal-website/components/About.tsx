import Image from "next/image";

export default function About() {
  return (
    <section id="sobre-mi" className="py-24 md:py-40 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <div className="w-8 h-px bg-white/20" />
          <span className="text-xs text-white/35 tracking-[0.3em] uppercase font-medium">
            Sobre mí
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left: story */}
          <div>
            <h2 className="text-headline text-white mb-8">
              Nací en Igualada.
              <br />
              <span className="text-white/30">La IA me cambió</span>
              <br />
              la vida.
            </h2>

            <div className="space-y-5 text-white/40 leading-relaxed">
              <p>
                Crecí en Igualada, un pueblo pequeño cerca de Barcelona, en una
                familia humilde rodeado de amigos que conservo desde los dos
                años. Siempre fui bueno en las ciencias y me encantaba explicar
                las cosas de manera simple.
              </p>
              <p>
                En 2018, una noche con amigos, alguien me mostró un vídeo sobre
                lo que la inteligencia artificial podía hacer.{" "}
                <span className="text-white">
                  Al día siguiente, con resaca incluida, pasé el día entero
                  investigando IA, redes neuronales y backpropagation.
                </span>{" "}
                Ese fue mi momento click.
              </p>
              <p>
                Me fui a Italia para estudiar sistemas de recomendación con los
                mejores profesores de Europa. Saqué un 10 en mi TFG sobre IA en
                mantenimiento industrial en la{" "}
                <span className="text-white">UPC</span>. Completé uno de los
                mejores Másteres en Data Science e IA de España.
              </p>
              <p>
                En noviembre de 2022 llegó ChatGPT.{" "}
                <span className="text-white">El resto es historia.</span> Hoy
                co-dirijo CenteIA Education — 500.000 personas formadas, 32
                países, €6M en el primer año.
              </p>
            </div>

            {/* Quote */}
            <div className="border-l border-white/15 pl-6 py-2 mt-8">
              <p className="text-white italic text-lg leading-relaxed">
                &ldquo;La suerte es el momento en el que el talento encuentra
                la ocasión.&rdquo;
              </p>
              <p className="text-white/25 text-sm mt-2">
                Mi filosofía — junto a &ldquo;memento mori&rdquo; tatuado.
              </p>
            </div>

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-3 mt-10">
              {[
                { icon: "📍", text: "Andorra la Vella" },
                { icon: "🎓", text: "Ing. Telecom · MSc IA (UPC)" },
                { icon: "🐱", text: "5 gatos y una tortuga" },
                { icon: "🎾", text: "Pádel, fútbol, gym" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <span className="text-base">{item.icon}</span>
                  <span className="text-sm text-white/30">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: photos */}
          <div className="space-y-4">
            {/* Portrait — Forbes Summit */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[#0d0d0d] border border-white/5">
              <Image
                src="/images/jordi-forbes.jpg"
                alt="Jordi Segura en Forbes AI Forward Summit"
                fill
                className="object-cover object-top"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/40 to-transparent" />
            </div>

            {/* Panel — speaking */}
            <div className="relative aspect-[16/9] overflow-hidden bg-[#0d0d0d] border border-white/5">
              <Image
                src="/images/jordi-panel.jpg"
                alt="Jordi Segura en panel de expertos"
                fill
                className="object-cover object-center"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/30 to-transparent" />
              <div className="absolute bottom-4 left-4 text-xs text-white/30 tracking-widest uppercase">
                Forbes AI Forward Summit · 2025
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-20 pt-16 border-t border-white/6">
          <p className="text-xs text-white/25 tracking-[0.3em] uppercase mb-8">
            Trayectoria
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "UPC — Ingeniería de Telecom", year: "~2018" },
              { label: "Italia — Recommendation Systems", year: "~2020" },
              { label: "Máster Data Science & IA", year: "2021" },
              { label: "Data Scientist", year: "2022" },
              { label: "Learning Heroes — IA PRO4", year: "2022" },
              { label: "Schneider Electric", year: "Anterior" },
              { label: "CenteIA Consulting", year: "2022" },
              { label: "MasterChef World — Head of AI", year: "2023" },
              { label: "CenteIA Education — CEO", year: "2024" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 px-4 py-2 border border-white/6 bg-white/2 hover:border-white/15 transition-colors group"
              >
                <span className="text-xs text-white/25 font-mono">
                  {item.year}
                </span>
                <span className="text-sm text-white/40 group-hover:text-white/70 transition-colors">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
