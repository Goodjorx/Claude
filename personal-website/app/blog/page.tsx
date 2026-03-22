import { getAllPosts } from "@/lib/blog";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Blog — Jordi Segura",
  description:
    "Reflexiones sobre inteligencia artificial, tecnología y el futuro del trabajo.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="flex flex-col min-h-screen">
      <Nav />

      {/* Header */}
      <section className="pt-36 pb-16 px-6 md:px-12 border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-[#e8510a]" />
            <span className="text-xs text-[#e8510a] tracking-[0.3em] uppercase font-semibold">
              Blog
            </span>
          </div>
          <h1 className="text-headline text-white mb-4">
            Ideas sobre IA
            <br />
            <span className="text-[#444]">y el futuro.</span>
          </h1>
          <p className="text-[#666] max-w-xl text-lg">
            Reflexiones directas sobre inteligencia artificial, tecnología y
            cómo navegar esta era exponencial.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="flex-1 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {posts.length === 0 ? (
            <p className="text-[#555] text-center py-20">
              Próximamente — los primeros artículos están en camino.
            </p>
          ) : (
            <div className="divide-y divide-[#1a1a1a]">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col md:flex-row md:items-start md:justify-between gap-4 py-10 hover:bg-[#0a0a0a] -mx-6 px-6 md:-mx-12 md:px-12 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs px-2 py-1 border border-[#222] text-[#555] uppercase tracking-widest">
                        {post.category}
                      </span>
                      <span className="text-[#444] text-xs">{post.readTime}</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#e8510a] transition-colors leading-snug mb-3">
                      {post.title}
                    </h2>
                    <p className="text-[#666] leading-relaxed max-w-2xl">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center gap-3 text-[#444] group-hover:text-[#e8510a] transition-colors md:pt-1">
                    <span className="text-sm font-mono">
                      {new Date(post.date).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="text-lg">→</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
