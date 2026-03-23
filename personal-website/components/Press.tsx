import Image from "next/image";

// ─── Datos de prensa ─────────────────────────────────────────────────────────
// Pendientes (paywall / no indexados): Forbes ×4, Mundo Deportivo, El Confidencial, La Vanguardia

const featured = [
  {
    publication: "El Mundo",
    section: "Actualidad Económica",
    date: "Oct 2025",
    headline:
      "La centella jovencísima de la IA que no teme al futuro laboral",
    type: "Entrevista",
    url: "https://www.elmundo.es/economia/empresas/2025/10/13/68e539b5e9cf4a7e748b45a3.html",
  },
  {
    publication: "Forbes",
    section: "Forbes AI Forward Summit",
    date: "Nov 2025",
    headline: "The 50 Dreams List and the man behind it",
    type: "Feature",
    url: "https://forbes.es/lista-forbes-the-50-dreams-list-and-the-man-behind/",
  },
  {
    publication: "La Vanguardia",
    section: "Economía",
    date: "Mar 2026",
    headline:
      "La startup de formación en inteligencia artificial factura seis millones de euros",
    type: "Corporativo",
    url: "#", // add URL manually
  },
];

const allPress = [
  {
    publication: "El Confidencial",
    date: "Mar 2026",
    headline:
      'Jordi Segura, experto en IA: "Uno de los métodos que mejor nos sirven es el método ROCE"',
    url: "https://www.elconfidencial.com/alma-corazon-vida/2026-02-18/jordi-segura-experto-inteligencia-artificial-metodos-mejor-sirven-roce-1qrt_4305450/",
  },
  {
    publication: "The New Barcelona Post",
    date: "Feb 2026",
    headline:
      "CenteIA, la academia que acerca la inteligencia artificial a todo el mundo",
    url: "https://www.thenewbarcelonapost.com/centeia-academia-inteligencia-artificial-curos-gratuito/",
  },
  {
    publication: "Emprendedores",
    date: "Feb 2026",
    headline: "CenteIA Education: de 1.000€ a 6M en un año",
    url: "https://emprendedores.es/ideas-de-negocio/centeia-formacion-ia/",
  },
  {
    publication: "El Economista",
    date: "Dic 2025",
    headline:
      "CenteIA espera facturar 10 millones en 2026 y ampliar su catálogo de formaciones",
    url: "https://www.eleconomista.es/tecnologia/noticias/13694221/12/25/centeia-espera-facturar-10-millones-en-2026-y-ampliar-su-catalogo-de-formaciones.html",
  },
  {
    publication: "El Economista",
    date: "Nov 2025",
    headline: "La IA supone casi el 3% de las emisiones corporativas",
    url: "https://www.eleconomista.es/tecnologia/noticias/13659020/11/25/la-ia-supone-casi-el-3-de-las-emisiones-corporativas.html",
  },
  {
    publication: "Mundo Deportivo",
    date: "Nov 2025",
    headline:
      "Las 9 herramientas de IA para ser imparable en 2026: los secretos de un experto para mejorar la productividad",
    url: "https://www.mundodeportivo.com/tecnologia/20251129/1002576983/9-herramientas-ia-imparable-2026-secretos-experto-mejorar-productividad-nmd.html",
  },
  {
    publication: "Forbes",
    date: "Nov 2025",
    headline: "Así ha sido el Forbes AI Forward Summit 2025",
    url: "#", // add URL manually
  },
  {
    publication: "Forbes",
    date: "Nov 2025",
    headline: "Estas son las conclusiones de Forbes AI Forward Summit 2025",
    url: "#", // add URL manually
  },
  {
    publication: "Forbes",
    date: "Nov 2025",
    headline: "Esta es la agenda de Forbes AI Forward Summit 2025",
    url: "#", // add URL manually
  },
  {
    publication: "El Debate",
    date: "Nov 2025",
    headline:
      "«La IA no está reservada solo para jóvenes»: la empresa catalana que forma a 500.000 personas de todo el mundo",
    url: "https://www.eldebate.com/espana/cataluna/20251104/ia-no-esta-reservada-solo-jovenes-empresa-catalana-forma-500000-personas-todo-mundo_351011.html",
  },
  {
    publication: "Via Empresa",
    date: "Oct 2025",
    headline:
      "CenteIA, la empresa catalana que democratiza la inteligencia artificial en todo el mundo",
    url: "https://www.viaempresa.cat/es/empresa/centeia-empresa-catalana-democratiza-inteligencia-artificial-en-todo-mundo_2221161_102.html",
  },
  {
    publication: "The Objective",
    date: "Oct 2025",
    headline:
      "El gurú del corazón del MIT: «Los popes de Silicon Valley están locos»",
    url: "https://theobjective.com/actualidad/2025-10-14/oscar-corominas-guru-corazon-mit-entrevista/",
  },
  {
    publication: "El Mundo",
    date: "Oct 2025",
    headline:
      "La centella jovencísima de la IA que no teme al futuro laboral",
    url: "https://www.elmundo.es/economia/empresas/2025/10/13/68e539b5e9cf4a7e748b45a3.html",
  },
  {
    publication: "Forbes Brandvoice",
    date: "2025",
    headline:
      "CenteIA Education: cuando la IA deja de ser técnica y empieza a ser profesional",
    url: "https://forbes.es/brandvoice/882874/centeia-education-cuando-la-inteligencia-artificial-deja-de-ser-tecnica-y-empieza-a-ser-profesional/",
  },
];

const mediaLogos = [
  "El Mundo",
  "Forbes",
  "El Economista",
  "La Vanguardia",
  "El Confidencial",
  "Emprendedores",
  "Mundo Deportivo",
  "The Objective",
];

// ─── Componente ───────────────────────────────────────────────────────────────

export default function Press() {
  return (
    <section
      id="prensa"
      className="py-24 md:py-40 px-6 md:px-12 border-t border-white/6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <div className="w-8 h-px bg-white/20" />
          <span className="text-xs text-white/55 tracking-[0.3em] uppercase font-medium">
            En los medios
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start mb-20">
          {/* Left: headline + photo */}
          <div>
            <h2 className="text-headline text-white mb-8">
              Prensa &amp;
              <br />
              <span className="text-white/50">apariciones.</span>
            </h2>

            {/* Forbes portrait photo */}
            <div className="relative aspect-[1/1] overflow-hidden bg-[#0d0d0d] border border-white/5">
              <Image
                src="/images/jordi-forbes.jpg"
                alt="Jordi Segura en Forbes AI Forward Summit"
                fill
                className="object-cover object-top"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/50 to-transparent" />
              <div className="absolute bottom-4 left-4 text-xs text-white/55 tracking-widest uppercase">
                Forbes AI Forward Summit · 2025
              </div>
            </div>
          </div>

          {/* Right: featured articles */}
          <div className="space-y-0 md:pt-24">
            {featured.map((item, i) => (
              <a
                key={i}
                href={item.url}
                target={item.url !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group block py-6 border-b border-white/6 hover:border-white/15 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-white tracking-wide uppercase">
                      {item.publication}
                    </span>
                    <span className="text-xs text-white/35 uppercase tracking-wide">
                      {item.type}
                    </span>
                  </div>
                  <span className="text-xs text-white/40 shrink-0">{item.date}</span>
                </div>
                <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors">
                  {item.headline}
                </p>
                <span className="inline-block mt-3 text-xs text-white/35 group-hover:text-white/60 transition-colors">
                  Leer artículo →
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Panel photo — full width */}
        <div className="relative aspect-[16/6] overflow-hidden bg-[#0d0d0d] border border-white/5 mb-20">
          <Image
            src="/images/jordi-conference.jpg"
            alt="Jordi Segura en conferencia"
            fill
            className="object-cover object-top"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/60 to-transparent" />
          <div className="absolute bottom-6 left-8 text-xs text-white/55 tracking-widest uppercase">
            En conferencia
          </div>
        </div>

        {/* Media logos bar */}
        <div className="border-t border-white/6 pt-12 mb-12">
          <p className="text-xs text-white/55 tracking-[0.3em] uppercase mb-8">
            También en
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-4 items-center">
            {mediaLogos.map((name) => (
              <span
                key={name}
                className="text-white/55 text-sm font-semibold tracking-wide uppercase hover:text-white/75 transition-colors"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Full press list */}
        <div className="border-t border-white/6 pt-12">
          <p className="text-xs text-white/55 tracking-[0.3em] uppercase mb-8">
            Todas las apariciones — {allPress.length} artículos
          </p>
          <div className="space-y-0">
            {allPress.map((item, i) => (
              <a
                key={i}
                href={item.url}
                target={item.url !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex items-start gap-6 py-4 border-b border-white/5 hover:border-white/12 transition-colors"
              >
                <span className="text-xs text-white/35 shrink-0 w-20 pt-0.5">
                  {item.date}
                </span>
                <span className="text-xs font-bold text-white/65 shrink-0 w-28 pt-0.5 uppercase tracking-wide group-hover:text-white/85 transition-colors">
                  {item.publication}
                </span>
                <span className="text-sm text-white/55 group-hover:text-white/80 transition-colors flex-1 leading-relaxed">
                  {item.headline}
                </span>
                <span className="text-white/30 group-hover:text-white/55 transition-colors shrink-0 pt-0.5">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
