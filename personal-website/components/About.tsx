import Image from "next/image";

const timeline = [
  { year: "2018", milestone: "Momento click — primera noche investigando IA" },
  { year: "2020", milestone: "Erasmus en Italia · Sistemas de recomendación" },
  { year: "2021", milestone: "Máster en Data Science & IA · UPC Barcelona" },
  { year: "2022", milestone: "Data Scientist · Schneider Electric" },
  { year: "2022", milestone: "CenteIA Consulting — primeros clientes" },
  { year: "2023", milestone: "Head of AI · MasterChef World" },
  { year: "2024", milestone: "CEO & Co-founder · CenteIA Education" },
  { year: "2025", milestone: "500K+ personas formadas · Forbes AI Forward Summit" },
];

export default function About() {
  return (
    <section id="sobre-mi" className="py-24 md:py-40 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <div className="w-8 h-px bg-white/20" />
          <span className="text-xs text-white/50 tracking-[0.3em] uppercase font-medium">
            Sobre mí
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left: story */}
          <div>
            <h2 className="text-headline text-white mb-8">
              Nací en Igualada.
              <br />
              <span className="text-white/50">La IA me cambió</span>
              <br />
              la vida.
            </h2>

            <div className="space-y-5 text-white/70 leading-relaxed">
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
            <div className="border-l-2 border-white/20 pl-6 py-1 mt-10">
              <p className="text-white italic text-lg leading-relaxed">
                &ldquo;La suerte es el momento en el que el talento encuentra
                la ocasión.&rdquo;
              </p>
            </div>
          </div>

          {/* Right: photos — two different images */}
          <div className="space-y-4">
            {/* Studio portrait */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[#0d0d0d]">
              <Image
                src="/images/jordi-studio.jpg"
                alt="Jordi Segura"
                fill
                className="object-cover object-top"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/50 to-transparent" />
            </div>

            {/* Speaking — Forbes panel */}
            <div className="relative aspect-[16/9] overflow-hidden bg-[#0d0d0d]">
              <Image
                src="/images/jordi-panel.jpg"
                alt="Jordi Segura en panel de expertos"
                fill
                className="object-cover object-center"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/30 to-transparent" />
              <div className="absolute bottom-4 left-4 text-xs text-white/50 tracking-widest uppercase">
                Forbes AI Forward Summit · 2025
              </div>
            </div>
          </div>
        </div>

        {/* Vertical timeline */}
        <div className="mt-24 pt-16 border-t border-white/6">
          <p className="text-xs text-white/40 tracking-[0.3em] uppercase mb-12">
            Trayectoria
          </p>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[3.5rem] top-0 bottom-0 w-px bg-white/6 hidden md:block" />
            <div className="space-y-0">
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-8 md:gap-12 items-start py-5 border-b border-white/4 group hover:border-white/10 transition-colors"
                >
                  <span className="text-xs font-mono text-white/50 w-12 shrink-0 pt-0.5 group-hover:text-white/70 transition-colors">
                    {item.year}
                  </span>
                  <span className="text-white/75 group-hover:text-white transition-colors leading-snug">
                    {item.milestone}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
