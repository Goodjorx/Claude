"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="flex flex-col min-h-screen">
      <Nav />

      <section className="flex-1 pt-40 pb-24 px-6 md:px-12">
        <div className="max-w-xl mx-auto">

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-white/20" />
              <span className="text-xs text-white/50 tracking-[0.3em] uppercase font-medium">
                Newsletter
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              IA Sin Filtros
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">
              Cada semana: las noticias de IA más importantes, traducidas y explicadas en español, con mi perspectiva real de lo que significa para tu negocio.
            </p>
          </div>

          {/* What you get */}
          <div className="space-y-4 mb-12">
            {[
              "Las 3-5 noticias de IA que importan esta semana",
              "Traducidas y analizadas en español, sin tecnicismos",
              "1 herramienta de IA práctica y accionable",
              "Mi punto de vista honesto, no el hype",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-white/65">
                <span className="text-white mt-0.5 shrink-0">—</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Form */}
          {status === "success" ? (
            <div className="border border-white/10 p-8 text-center">
              <div className="text-2xl mb-3">✓</div>
              <p className="text-white font-semibold mb-2">Ya estás dentro.</p>
              <p className="text-white/55 text-sm">Te llegará el próximo viernes. Si no ves el email, revisa spam.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-white/50 tracking-[0.2em] uppercase mb-2">
                  Nombre <span className="text-white/25 normal-case tracking-normal">(opcional)</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full bg-transparent border border-white/10 px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white/35 transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-white/50 tracking-[0.2em] uppercase mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="w-full bg-transparent border border-white/10 px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white/35 transition-colors text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full px-8 py-4 bg-white text-black font-bold hover:bg-white/90 active:scale-[0.99] transition-all text-sm tracking-wider disabled:opacity-60"
              >
                {status === "loading" ? "SUSCRIBIENDO..." : "SUSCRIBIRME →"}
              </button>

              {status === "error" && (
                <p className="text-red-400 text-xs text-center">
                  Algo falló. Inténtalo de nuevo.
                </p>
              )}

              <p className="text-white/30 text-xs text-center">
                Sin spam. Cada viernes. Baja cuando quieras.
              </p>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
