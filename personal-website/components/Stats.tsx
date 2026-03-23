const stats = [
  { value: "+500K", label: "Personas formadas en IA" },
  { value: "32", label: "Países alcanzados" },
  { value: "+5", label: "Años implementando IA" },
];

export default function Stats() {
  return (
    <section className="border-y border-[#1a1a1a] py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 gap-0">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-6 px-3 sm:px-6 md:px-10 ${
                i < stats.length - 1 ? "border-r border-[#1a1a1a]" : ""
              }`}
            >
              <div
                className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-2 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-[#888] leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
