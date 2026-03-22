/**
 * Telegram Webhook → Claude API → GitHub → Vercel auto-deploy
 *
 * Flow:
 *   1. You send a message to your Telegram bot
 *   2. Telegram calls this webhook
 *   3. Claude generates a full blog post in Markdown
 *   4. This route commits the .mdx file to GitHub
 *   5. Vercel detects the push and auto-redeploys (~30s)
 *   6. Bot replies with the live URL
 *
 * Commands:
 *   /post Tu idea o el artículo completo que quieres publicar
 *   /draft igual que /post pero solo genera el texto sin publicar
 *
 * Required env vars (set in Vercel dashboard):
 *   TELEGRAM_BOT_TOKEN   — Token from @BotFather
 *   TELEGRAM_ALLOWED_ID  — Your personal Telegram user ID (security)
 *   ANTHROPIC_API_KEY    — Your Claude API key
 *   GITHUB_TOKEN         — Personal Access Token (repo scope)
 *   GITHUB_OWNER         — GitHub username (e.g. "Goodjorx")
 *   GITHUB_REPO          — Repo name (e.g. "Claude")
 *   SITE_URL             — Your live site URL (e.g. "https://jordisegurapons.com")
 */

import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── helpers ────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

function today(): string {
  return new Date().toISOString().split("T")[0];
}

async function replyTelegram(chatId: number, text: string) {
  await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
        disable_web_page_preview: true,
      }),
    }
  );
}

async function generateBlogPost(userInput: string): Promise<string> {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: userInput,
      },
    ],
    system: `Eres el ghostwriter de Jordi Segura Pons, CEO y Co-founder de CenteIA Education.

Jordi tiene 25 años, nació en Igualada (Barcelona). Ingeniero de Telecomunicaciones con Máster en IA por la UPC.
Ha formado a más de 500.000 personas en IA en 32 países. Es Head of AI en MasterChef World. Vive en Andorra.
Su estilo es directo, sin tecnicismos innecesarios, cercano pero con autoridad. Como Gary Vee pero sobre IA.
Escribe siempre en español. Primera persona. Conversacional pero con sustancia.

Genera un artículo de blog completo en formato Markdown con este frontmatter exacto al inicio:

---
title: "[TÍTULO IMPACTANTE EN ESPAÑOL]"
date: "${today()}"
excerpt: "[UNA FRASE QUE HAGA QUERER LEER MÁS, máx 150 chars]"
category: "[IA | Reflexiones | Emprendimiento | Tecnología]"
readTime: "[X min]"
---

Estructura del artículo:
- Abre con un gancho potente (anécdota, pregunta provocadora o dato sorprendente)
- Desarrolla con ejemplos concretos y accionables
- Usa ## para secciones (máx 4)
- Termina con un cierre que inspire acción
- Longitud: 600-900 palabras
- Incluye al menos una mención natural a CenteIA Education al final cuando sea relevante

Devuelve SOLO el markdown completo, sin explicaciones adicionales.`,
  });

  const block = message.content[0];
  if (block.type !== "text") throw new Error("Unexpected response type");
  return block.text;
}

async function commitToGitHub(
  slug: string,
  content: string
): Promise<{ success: boolean; url?: string }> {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const token = process.env.GITHUB_TOKEN;
  const filePath = `personal-website/content/blog/${slug}.mdx`;

  if (!owner || !repo || !token) {
    throw new Error("Missing GitHub env vars");
  }

  // Check if file already exists (to get its SHA for updates)
  let sha: string | undefined;
  const checkRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
    {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );
  if (checkRes.ok) {
    const existing = await checkRes.json() as { sha: string };
    sha = existing.sha;
  }

  const body: Record<string, string> = {
    message: `Add blog post: ${slug}`,
    content: Buffer.from(content).toString("base64"),
    branch: "main",
  };
  if (sha) body.sha = sha;

  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
    {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub API error: ${err}`);
  }

  const siteUrl = process.env.SITE_URL ?? "https://jordisegurapons.com";
  return { success: true, url: `${siteUrl}/blog/${slug}` };
}

// ─── main handler ───────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      message?: {
        chat: { id: number };
        from?: { id: number };
        text?: string;
      };
    };
    const message = body?.message;
    if (!message) return NextResponse.json({ ok: true });

    const chatId = message.chat.id;
    const userId = message.from?.id;
    const text = message.text?.trim() ?? "";

    // Security: only respond to your own Telegram ID
    const allowedId = process.env.TELEGRAM_ALLOWED_ID;
    if (allowedId && String(userId) !== allowedId) {
      await replyTelegram(chatId, "⛔ No autorizado.");
      return NextResponse.json({ ok: true });
    }

    // ── /start or help ──
    if (text === "/start" || text === "/help") {
      await replyTelegram(
        chatId,
        `👋 *Blog Bot de Jordi*\n\n` +
          `Comandos:\n` +
          `• \`/post [idea o artículo]\` — Genera y publica\n` +
          `• \`/draft [idea]\` — Solo genera el texto (no publica)\n\n` +
          `Ejemplo:\n` +
          `_/post La IA en el sector inmobiliario: 5 aplicaciones reales_`
      );
      return NextResponse.json({ ok: true });
    }

    // ── /draft — generate only ──
    if (text.startsWith("/draft ")) {
      const input = text.slice(7).trim();
      if (!input) {
        await replyTelegram(chatId, "❌ Escribe la idea después de /draft");
        return NextResponse.json({ ok: true });
      }

      await replyTelegram(chatId, "⏳ Generando artículo...");
      const mdx = await generateBlogPost(input);

      // Telegram has 4096 char limit, send in chunks if needed
      const chunks: string[] = [];
      for (let i = 0; i < mdx.length; i += 4000) {
        chunks.push(mdx.slice(i, i + 4000));
      }
      for (const chunk of chunks) {
        await replyTelegram(chatId, `\`\`\`\n${chunk}\n\`\`\``);
      }
      return NextResponse.json({ ok: true });
    }

    // ── /post — generate and publish ──
    if (text.startsWith("/post ")) {
      const input = text.slice(6).trim();
      if (!input) {
        await replyTelegram(chatId, "❌ Escribe la idea después de /post");
        return NextResponse.json({ ok: true });
      }

      await replyTelegram(chatId, "⏳ Generando artículo con Claude...");
      const mdx = await generateBlogPost(input);

      // Extract title for slug
      const titleMatch = mdx.match(/^title:\s*["']?(.+?)["']?\s*$/m);
      const rawTitle = titleMatch?.[1] ?? input;
      const slug = `${today()}-${slugify(rawTitle)}`;

      await replyTelegram(chatId, "📤 Publicando en GitHub...");
      const { url } = await commitToGitHub(slug, mdx);

      await replyTelegram(
        chatId,
        `✅ *Publicado.*\n\n` +
          `🔗 ${url}\n\n` +
          `_(Vercel tardará ~30s en hacer el deploy)_`
      );
      return NextResponse.json({ ok: true });
    }

    // Unknown command
    await replyTelegram(
      chatId,
      "Usa /post [idea] para publicar o /help para ver los comandos."
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Telegram webhook error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

// Telegram sends GET to verify the webhook URL exists
export async function GET() {
  return NextResponse.json({ ok: true, service: "jordi-blog-bot" });
}
