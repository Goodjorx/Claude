import { getPostBySlug, getAllPosts } from "@/lib/blog";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Jordi Segura`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <main className="flex flex-col min-h-screen">
      <Nav />

      {/* Article header */}
      <header className="pt-36 pb-12 px-6 md:px-12 border-b border-[#1a1a1a]">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#555] hover:text-white transition-colors text-sm mb-10"
          >
            ← Volver al blog
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs px-2 py-1 border border-white/20 text-white uppercase tracking-widest">
              {post.category}
            </span>
            <span className="text-[#444] text-xs">{post.readTime}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-[#666] text-lg mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-4 pt-6 border-t border-[#1a1a1a]">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-white text-xs font-black">
              JS
            </div>
            <div>
              <div className="text-white text-sm font-semibold">
                Jordi Segura Pons
              </div>
              <div className="text-[#555] text-xs">
                {new Date(post.date).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Article body */}
      <article className="flex-1 py-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto prose-jordi">
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-bold text-white mt-8 mb-3">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-[#888] leading-relaxed mb-5">{children}</p>
              ),
              strong: ({ children }) => (
                <strong className="text-white font-semibold">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="text-[#aaa] italic">{children}</em>
              ),
              ul: ({ children }) => (
                <ul className="space-y-2 my-6 ml-4">{children}</ul>
              ),
              li: ({ children }) => (
                <li className="text-[#888] flex gap-3">
                  <span className="text-white shrink-0">—</span>
                  <span>{children}</span>
                </li>
              ),
              ol: ({ children }) => (
                <ol className="space-y-2 my-6 ml-4 list-decimal list-inside text-[#888]">
                  {children}
                </ol>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-white/20 pl-6 my-8 text-[#aaa] italic">
                  {children}
                </blockquote>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/70 transition-colors underline underline-offset-2"
                >
                  {children}
                </a>
              ),
              hr: () => <hr className="border-[#1a1a1a] my-12" />,
              code: ({ children }) => (
                <code className="bg-[#0f0f0f] border border-[#1a1a1a] px-2 py-0.5 rounded text-sm text-white font-mono">
                  {children}
                </code>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* Bottom CTA */}
      <section className="py-16 px-6 md:px-12 border-t border-[#1a1a1a] bg-[#050505]">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-white font-bold text-lg mb-1">
              ¿Te ha resultado útil?
            </p>
            <p className="text-[#666]">
              Sígueme en LinkedIn o Instagram para más contenido sobre IA.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href="https://linkedin.com/in/jordisegurapons"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 border border-[#333] text-[#888] hover:text-white hover:border-white transition-all text-sm"
            >
              LinkedIn
            </a>
            <a
              href="https://instagram.com/jordisegurap"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-white text-black hover:bg-white/90 transition-colors text-sm font-semibold"
            >
              Instagram
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
