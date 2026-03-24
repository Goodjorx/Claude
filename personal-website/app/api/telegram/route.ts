/**
 * Telegram Webhook → Claude API → GitHub → Vercel auto-deploy
 *
 * Flow:
 *   1. Mandas un mensaje al bot (idea, texto, o enlace URL)
 *   2. Telegram llama a este webhook
 *   3. Si es una URL, fetcha el contenido de la página
 *   4. Claude genera el artículo de blog en Markdown con tu voz
 *   5. Se hace commit del .mdx a GitHub
 *   6. Vercel detecta el push y redespliega (~30s)
 *   7. El bot responde con la URL en vivo
 *
 * Comandos:
 *   /post [idea o URL]  — Genera y publica directamente
 *   /draft [idea o URL] — Genera el texto y te lo manda sin publicar
 *
 * Variables de entorno (configurar en Vercel → Settings → Env Vars):
 *   TELEGRAM_BOT_TOKEN   — Token de @BotFather
 *   TELEGRAM_ALLOWED_ID  — Tu Telegram user ID (seguridad)
 *   ANTHROPIC_API_KEY    — API key de Claude
 *   GITHUB_TOKEN         — Personal Access Token (scope: Contents read+write)
 *   GITHUB_OWNER         — Tu usuario de GitHub (e.g. "Goodjorx")
 *   GITHUB_REPO          — Nombre del repo (e.g. "Claude")
 *   SITE_URL             — Tu dominio (e.g. "https://jordisegura.com")
 */

import Anthropic from "@anthropic-ai/sdk";
import OpenAI, { toFile } from "openai";
import { NextRequest, NextResponse } from "next/server";
import { enqueue, dequeue, remove } from "@/lib/queue";
import { createLinkedInPost } from "@/lib/linkedin";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY ?? "unset" });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY ?? "unset" });

// ─── Utilidades ──────────────────────────────────────────────────────────────

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

function isUrl(text: string): boolean {
  try {
    const url = new URL(text.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/** Extrae todas las URLs de un texto y devuelve las URLs + el prompt restante */
function extractUrlsAndPrompt(text: string): { urls: string[]; prompt: string } {
  const urlRegex = /https?:\/\/[^\s]+/g;
  const urls = text.match(urlRegex) ?? [];
  const prompt = text.replace(urlRegex, "").replace(/\s{2,}/g, " ").trim();
  return { urls, prompt };
}

/** Lee un tweet via oEmbed (no requiere API key de X) */
async function fetchXContent(url: string): Promise<string> {
  const oembedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}&omit_script=true`;
  const res = await fetch(oembedUrl, { signal: AbortSignal.timeout(8_000) });
  if (!res.ok) throw new Error(`No se pudo leer el tweet (${res.status})`);
  const data = (await res.json()) as { html: string; author_name: string };
  const tweetText = data.html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
    .replace(/\s+/g, " ").trim();
  return `Post de @${data.author_name} en X:\n${tweetText}`;
}

/** Fetcher universal: elige oEmbed para X/Twitter, scraping normal para el resto */
async function fetchAnyUrl(url: string): Promise<string> {
  const isX = /^https?:\/\/(twitter\.com|x\.com)\//.test(url);
  if (isX) return fetchXContent(url);
  return fetchUrlContent(url);
}

/** Extrae el texto principal de una página web (limpia el HTML) */
async function fetchUrlContent(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; JordiBlogBot/1.0; +https://jordisegura.com)",
      Accept: "text/html,application/xhtml+xml",
    },
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) throw new Error(`No se pudo acceder a la URL (${res.status})`);

  const html = await res.text();

  // Strip HTML tags, scripts, styles — keep readable text
  const text = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s{3,}/g, "\n\n")
    .trim()
    .slice(0, 8000); // Claude context limit safety

  return text;
}

async function sendTelegram(chatId: number, text: string, markdown = true) {
  const payload: Record<string, unknown> = {
    chat_id: chatId,
    text,
    disable_web_page_preview: true,
  };
  if (markdown) payload.parse_mode = "Markdown";

  await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );
}

async function sendTelegramWithKeyboard(
  chatId: number,
  text: string,
  inlineKeyboard: object
): Promise<number> {
  const res = await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
        disable_web_page_preview: true,
        reply_markup: inlineKeyboard,
      }),
    }
  );
  const data = (await res.json()) as { result?: { message_id: number } };
  return data.result?.message_id ?? 0;
}

async function editTelegramMessage(
  chatId: number,
  messageId: number,
  text: string,
  inlineKeyboard?: object
): Promise<void> {
  const payload: Record<string, unknown> = {
    chat_id: chatId,
    message_id: messageId,
    text,
    parse_mode: "Markdown",
    disable_web_page_preview: true,
  };
  if (inlineKeyboard) payload.reply_markup = inlineKeyboard;

  await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/editMessageText`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );
}

async function answerCallback(callbackQueryId: string, text?: string): Promise<void> {
  await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/answerCallbackQuery`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ callback_query_id: callbackQueryId, text }),
    }
  );
}

/** Descarga un archivo de Telegram y devuelve su contenido como ArrayBuffer */
async function getTelegramFile(fileId: string): Promise<ArrayBuffer> {
  const metaRes = await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getFile?file_id=${fileId}`
  );
  const meta = (await metaRes.json()) as { result: { file_path: string } };
  const fileUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${meta.result.file_path}`;
  const fileRes = await fetch(fileUrl);
  return fileRes.arrayBuffer();
}

/** Transcribe un audio usando OpenAI Whisper */
async function transcribeAudio(buf: ArrayBuffer, fileName: string): Promise<string> {
  const file = await toFile(buf, fileName, { type: "audio/ogg" });
  const result = await openai.audio.transcriptions.create({
    model: "whisper-1",
    file,
    language: "es",
  });
  return result.text;
}

// ─── Generación del artículo ─────────────────────────────────────────────────

interface GenerateOptions {
  input: string;         // idea en texto, o contenido ya scrapeado
  sourceUrl?: string;    // URL original si aplica
  sourceType: "idea" | "url" | "article" | "mixed";
  dateOverride?: string; // YYYY-MM-DD para batch scheduling
}

async function generateBlogPost(opts: GenerateOptions): Promise<string> {
  const { input, sourceUrl, sourceType, dateOverride } = opts;

  const contextLine =
    sourceType === "url"
      ? `A continuación tienes el contenido de este artículo/web (${sourceUrl}). Úsalo como base para generar el post en la voz de Jordi:\n\n${input}`
      : sourceType === "article"
      ? `A continuación tienes un artículo o texto que Jordi quiere adaptar a su blog con su propia voz:\n\n${input}`
      : sourceType === "mixed"
      ? `Jordi quiere escribir un post combinando estas fuentes e instrucciones. Úsalas como inspiración y escríbelo en su voz:\n\n${input}`
      : `Jordi quiere escribir sobre esta idea: ${input}`;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2500,
    system: `Eres el ghostwriter de Jordi Segura Pons, CEO y Co-founder de CenteIA Education.

Sobre Jordi:
- 25 años, de Igualada (Barcelona), vive en Andorra la Vella
- Ingeniero de Telecomunicaciones + Máster en IA por la UPC + formación en el MIT
- Ha formado a +500.000 personas en IA en 32 países
- Head of AI en MasterChef World
- Co-fundó CenteIA Education: €6M en el primer año, 32 países
- Tatuaje: "memento mori" — filosofía: la suerte = talento + ocasión

Estilo de escritura de Jordi:
- Directo, sin rodeos, sin tecnicismos gratuitos
- Primera persona siempre
- Empieza con un gancho: anécdota personal, dato sorprendente o pregunta incómoda
- No tiene miedo de tener opinión propia y defenderla
- Cercano pero con autoridad — como Gary Vee pero sobre IA en español
- Nunca suena corporativo ni genérico
- Los ejemplos son concretos y reales (personas reales, cifras reales)

IMPORTANTE: Si el input viene de una URL o artículo externo, NO copies el contenido literalmente.
Extrae las ideas clave y recréalas con la voz y perspectiva de Jordi. Añade su punto de vista.

Genera el artículo completo en Markdown con este frontmatter EXACTO al inicio:

---
title: "[TÍTULO DIRECTO E IMPACTANTE, sin clickbait vacío]"
date: "${dateOverride ?? today()}"
excerpt: "[1 frase que haga querer leer, máx 160 chars]"
category: "[IA | Reflexiones | Emprendimiento | Tecnología | Automatización]"
readTime: "[X min]"
---

Estructura del artículo (600-1000 palabras):
1. Apertura con gancho (3-4 frases potentes)
2. El problema o la tesis central (sección ## opcional)
3. Desarrollo con 2-3 puntos accionables y ejemplos concretos
4. Cierre que inspire a hacer algo, no a pensar en hacer algo
5. Si encaja naturalmente, menciona CenteIA Education al final

Devuelve ÚNICAMENTE el Markdown completo. Sin comentarios, sin explicaciones adicionales.`,
    messages: [{ role: "user", content: contextLine }],
  });

  const block = message.content[0];
  if (block.type !== "text") throw new Error("Unexpected response type");
  return block.text;
}

// ─── LinkedIn & X content generators ─────────────────────────────────────────

async function generateLinkedInPost(input: string, sourceUrl?: string): Promise<string> {
  const context = sourceUrl
    ? `Noticia/fuente: ${sourceUrl}\n\nContenido: ${input}`
    : input;

  const msg = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 800,
    system: `Eres el ghostwriter de Jordi Segura Pons para LinkedIn.

Jordi: CEO CenteIA Education, ha formado a +500.000 personas en IA, 32 países, 25 años, Andorra.

Formato de post LinkedIn que funciona para Jordi:
- Línea 1: hook potente (dato, pregunta incómoda o afirmación polémica) — sin emojis al inicio
- Línea 2: en blanco
- Bloques de 1-3 líneas separados por líneas en blanco (LinkedIn corta a 3 líneas si no hay espacios)
- CTA al final: invita a comentar o compartir experiencia
- Máx 3 hashtags al final (#InteligenciaArtificial #IA #Futuro por ejemplo)
- Total: 150-300 palabras
- Tono: directo, sin corporativismos, primera persona

Devuelve SOLO el texto del post. Sin comillas, sin comentarios.`,
    messages: [{ role: "user", content: `Escribe un post de LinkedIn sobre esto:\n\n${context}` }],
  });

  const block = msg.content[0];
  if (block.type !== "text") throw new Error("Unexpected response");
  return block.text.trim();
}

async function generateXThread(input: string, sourceUrl?: string): Promise<string> {
  const context = sourceUrl
    ? `Fuente: ${sourceUrl}\n\nContenido: ${input}`
    : input;

  const msg = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1000,
    system: `Eres el ghostwriter de Jordi Segura Pons para X (Twitter).

Genera un hilo de 5-7 tweets numerados. Formato:
1/ Hook que para el scroll (máx 240 chars)
2/ Contexto o problema (máx 240 chars)
3/ Punto 1 (máx 240 chars)
4/ Punto 2 (máx 240 chars)
5/ Punto 3 (máx 240 chars)
6/ (opcional) Dato impactante (máx 240 chars)
7/ CTA + mención CenteIA si encaja (máx 240 chars)

Cada tweet separado por línea en blanco. Tono: directo, concreto, con perspectiva real de negocio.
Devuelve SOLO los tweets numerados. Sin comentarios adicionales.`,
    messages: [{ role: "user", content: `Crea un hilo sobre:\n\n${context}` }],
  });

  const block = msg.content[0];
  if (block.type !== "text") throw new Error("Unexpected response");
  return block.text.trim();
}

// ─── GitHub commit ───────────────────────────────────────────────────────────

async function commitToGitHub(slug: string, mdxContent: string): Promise<string> {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const token = process.env.GITHUB_TOKEN;
  const filePath = `personal-website/content/blog/${slug}.mdx`;

  if (!owner || !repo || !token) throw new Error("Faltan variables de GitHub");

  // GET existing SHA if file already exists (needed for updates)
  let sha: string | undefined;
  const check = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
    { headers: { Authorization: `token ${token}`, Accept: "application/vnd.github.v3+json" } }
  );
  if (check.ok) {
    const existing = (await check.json()) as { sha: string };
    sha = existing.sha;
  }

  const payload: Record<string, string> = {
    message: `blog: ${slug}`,
    content: Buffer.from(mdxContent).toString("base64"),
    branch: "main",
  };
  if (sha) payload.sha = sha;

  const put = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
    {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!put.ok) {
    const err = await put.text();
    throw new Error(`GitHub: ${err}`);
  }

  const siteUrl = process.env.SITE_URL ?? "https://jordisegura.com";
  return `${siteUrl}/blog/${slug}`;
}

// ─── Pipeline completo ───────────────────────────────────────────────────────

async function runPipeline(
  chatId: number,
  rawInput: string,
  publish: boolean
) {
  const trimmed = rawInput.trim();
  const { urls, prompt } = extractUrlsAndPrompt(trimmed);

  let sourceType: "idea" | "url" | "article" | "mixed" = "idea";
  let contentForClaude = trimmed;
  let sourceUrl: string | undefined;

  if (urls.length === 0) {
    // Sin URLs: idea corta o artículo largo pegado
    if (trimmed.length > 500) {
      sourceType = "article";
      await sendTelegram(chatId, `📝 Texto largo detectado. Adaptando a tu voz...`);
    } else {
      sourceType = "idea";
      await sendTelegram(chatId, `💡 Generando artículo desde la idea...`);
    }
  } else if (urls.length === 1 && !prompt) {
    // Una sola URL sin prompt — comportamiento original
    sourceType = "url";
    sourceUrl = urls[0];
    await sendTelegram(chatId, `🌐 Leyendo el enlace...`);
    contentForClaude = await fetchAnyUrl(urls[0]);
    await sendTelegram(chatId, `✅ Contenido extraído. Generando artículo...`);
  } else {
    // Múltiples URLs, o URL + prompt — modo combinado
    sourceType = "mixed";
    const label = urls.length === 1 ? "1 fuente" : `${urls.length} fuentes`;
    await sendTelegram(chatId, `🌐 Leyendo ${label}...`);

    const fetched: string[] = [];
    for (const url of urls) {
      try {
        const content = await fetchAnyUrl(url);
        fetched.push(`--- Fuente: ${url} ---\n${content.slice(0, 4000)}`);
      } catch {
        fetched.push(`--- Fuente: ${url} --- (no se pudo acceder)`);
      }
    }

    contentForClaude = [
      prompt ? `Instrucción de Jordi: ${prompt}` : "",
      ...fetched,
    ].filter(Boolean).join("\n\n");

    await sendTelegram(chatId, `✅ Fuentes leídas. Generando artículo...`);
  }

  // 2. Generate with Claude
  const mdx = await generateBlogPost({ input: contentForClaude, sourceUrl, sourceType });

  if (!publish) {
    // Draft mode: send the text back in chunks
    const chunks: string[] = [];
    for (let i = 0; i < mdx.length; i += 3800) {
      chunks.push(mdx.slice(i, i + 3800));
    }
    await sendTelegram(chatId, `📄 *Borrador generado:*`);
    for (const chunk of chunks) {
      await sendTelegram(chatId, chunk, false); // sin parse_mode: MDX rompería el parser
    }
    await sendTelegram(chatId, `_Usa /post [mismo input] para publicarlo._`);
    return;
  }

  // 3. Publish: commit to GitHub
  await sendTelegram(chatId, `📤 Publicando en GitHub...`);
  const titleMatch = mdx.match(/^title:\s*["']?(.+?)["']?\s*$/m);
  const rawTitle = titleMatch?.[1] ?? trimmed;
  const slug = `${today()}-${slugify(rawTitle)}`;
  const liveUrl = await commitToGitHub(slug, mdx);

  await sendTelegram(
    chatId,
    `✅ *¡Publicado!*\n\n🔗 ${liveUrl}\n\n_(Vercel tardará ~30s en publicarlo)_`
  );
}

// ─── Callback query handler (inline keyboard buttons) ────────────────────────

interface CallbackQuery {
  id: string;
  from: { id: number };
  message?: { chat: { id: number }; message_id: number };
  data?: string;
}

async function handleCallbackQuery(cq: CallbackQuery): Promise<void> {
  const chatId = cq.message?.chat.id;
  const msgId = cq.message?.message_id;
  const data = cq.data ?? "";

  if (!chatId) return;
  await answerCallback(cq.id); // acknowledge immediately

  // ── skip:{id} ──────────────────────────────────────────────────────────────
  if (data.startsWith("skip:")) {
    const id = data.slice(5);
    await remove(id);
    if (msgId) {
      await editTelegramMessage(chatId, msgId, `_Saltado_ ✓`, { inline_keyboard: [] });
    }
    return;
  }

  // ── gen:{type}:{id} — generate content from queue item ────────────────────
  if (data.startsWith("gen:")) {
    const [, type, id] = data.split(":");
    const item = await dequeue(id);
    if (!item) {
      await sendTelegram(chatId, "❌ Item expirado. Lanza /digest de nuevo.");
      return;
    }

    await sendTelegram(chatId, `⏳ Generando ${type === "blog" ? "artículo" : type === "linkedin" ? "post LinkedIn" : "hilo X"}...`);

    try {
      if (type === "blog") {
        const mdx = await generateBlogPost({ input: item.content, sourceUrl: item.sourceUrl, sourceType: "url" });
        const newId = await enqueue({ type: "blog", content: mdx, sourceTitle: item.sourceTitle, sourceUrl: item.sourceUrl, chatId });
        const preview = mdx.slice(0, 600) + (mdx.length > 600 ? "..." : "");
        await sendTelegramWithKeyboard(chatId, `📝 *Borrador blog:*\n\n${preview}`, {
          inline_keyboard: [
            [{ text: "✅ Publicar", callback_data: `pub:blog:${newId}` }],
            [{ text: "❌ Descartar", callback_data: `skip:${newId}` }],
          ],
        });

      } else if (type === "linkedin") {
        const post = await generateLinkedInPost(item.content, item.sourceUrl);
        const newId = await enqueue({ type: "linkedin", content: post, sourceTitle: item.sourceTitle, sourceUrl: item.sourceUrl, chatId });
        await sendTelegramWithKeyboard(chatId, `💼 *Post LinkedIn:*\n\n${post}`, {
          inline_keyboard: [
            [{ text: "✅ Publicar en LinkedIn", callback_data: `pub:linkedin:${newId}` }],
            [{ text: "❌ Descartar", callback_data: `skip:${newId}` }],
          ],
        });

      } else if (type === "thread") {
        const thread = await generateXThread(item.content, item.sourceUrl);
        await sendTelegram(chatId, `🐦 *Hilo para X (copia y pega):*\n\n${thread}`, false);
        await remove(id);
      }
    } catch (err) {
      await sendTelegram(chatId, `❌ Error generando: ${String(err)}`);
    }
    return;
  }

  // ── pub:{platform}:{id} — publish approved content ────────────────────────
  if (data.startsWith("pub:")) {
    const [, platform, id] = data.split(":");
    const item = await dequeue(id);
    if (!item) {
      await sendTelegram(chatId, "❌ Item expirado.");
      return;
    }

    await sendTelegram(chatId, `📤 Publicando...`);

    try {
      if (platform === "blog") {
        const titleMatch = item.content.match(/^title:\s*["']?(.+?)["']?\s*$/m);
        const rawTitle = titleMatch?.[1] ?? item.sourceTitle ?? "post";
        const slug = `${today()}-${slugify(rawTitle)}`;
        const liveUrl = await commitToGitHub(slug, item.content);
        await remove(id);
        if (msgId) await editTelegramMessage(chatId, msgId, `✅ *Blog publicado*\n🔗 ${liveUrl}\n_(Vercel ~30s)_`, { inline_keyboard: [] });

      } else if (platform === "linkedin") {
        const result = await createLinkedInPost(item.content);
        await remove(id);
        if (msgId) await editTelegramMessage(chatId, msgId, `✅ *LinkedIn publicado*\n🔗 ${result.url}`, { inline_keyboard: [] });

      } else if (platform === "newsletter") {
        const { sendNewsletter } = await import("@/lib/newsletter");
        const sent = await sendNewsletter(item.content);
        await remove(id);
        if (msgId) await editTelegramMessage(chatId, msgId, `✅ *Newsletter enviada* a ${sent} suscriptores`, { inline_keyboard: [] });
      }
    } catch (err) {
      await sendTelegram(chatId, `❌ Error publicando: ${String(err)}`);
    }
    return;
  }
}

// ─── Handler principal ───────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      message?: {
        chat: { id: number };
        from?: { id: number };
        text?: string;
        voice?: { file_id: string; duration: number };
        audio?: { file_id: string; file_name?: string };
        document?: { file_id: string; file_name?: string; mime_type?: string };
      };
      callback_query?: CallbackQuery;
    };

    // ── Inline keyboard callback ──────────────────────────────────────────────
    if (body?.callback_query) {
      const cq = body.callback_query;
      const allowedId = process.env.TELEGRAM_ALLOWED_ID;
      if (allowedId && String(cq.from.id) !== allowedId) return NextResponse.json({ ok: true });
      await handleCallbackQuery(cq);
      return NextResponse.json({ ok: true });
    }

    const msg = body?.message;
    if (!msg) return NextResponse.json({ ok: true });

    const chatId = msg.chat.id;
    const userId = msg.from?.id;
    const text = (msg.text ?? "").trim();

    // Seguridad: solo tu ID
    const allowedId = process.env.TELEGRAM_ALLOWED_ID;
    if (allowedId && String(userId) !== allowedId) {
      await sendTelegram(chatId, "⛔ No autorizado.");
      return NextResponse.json({ ok: true });
    }

    // ── /start / /help ──
    if (text === "/start" || text === "/help") {
      await sendTelegram(
        chatId,
        `🤖 *Content Bot — jordisegura.com*\n\n` +
        `*── BLOG ──*\n` +
        `📌 */post [idea o URL]* — Genera y publica en el blog\n` +
        `👁 */draft [idea o URL]* — Genera sin publicar\n\n` +
        `*── REDES ──*\n` +
        `💼 */linkedin [idea o URL]* — Post LinkedIn (con aprobación)\n` +
        `🐦 */thread [idea o URL]* — Hilo X (texto para copiar)\n\n` +
        `*── DIGEST & NEWSLETTER ──*\n` +
        `📰 */digest* — Fuerza el digest de noticias ahora\n` +
        `📧 */newsletter [contexto?]* — Genera borrador newsletter\n\n` +
        `*── OTROS ──*\n` +
        `🎙️ *Audio/voz* — Transcribo y genero borrador\n` +
        `📋 *CSV/TXT* — Batch de ideas (1 por línea)\n\n` +
        `El digest llega automáticamente cada mañana a las 8h UTC.`
      );
      return NextResponse.json({ ok: true });
    }

    // ── /digest ──
    if (text === "/digest" || text.startsWith("/digest ")) {
      await sendTelegram(chatId, `📰 Scrapeando noticias...`);
      const siteUrl = process.env.SITE_URL ?? "https://jordisegura.com";
      const cronSecret = process.env.CRON_SECRET ?? "";
      const res = await fetch(`${siteUrl}/api/cron/digest?secret=${encodeURIComponent(cronSecret)}`);
      const data = (await res.json()) as { ok: boolean; stories?: number; message?: string };
      if (data.ok) {
        await sendTelegram(chatId, `✅ Digest enviado con ${data.stories ?? 0} historias.`);
      } else {
        await sendTelegram(chatId, `❌ Error en el digest: ${data.message ?? "desconocido"}`);
      }
      return NextResponse.json({ ok: true });
    }

    // ── /linkedin ──
    if (text.startsWith("/linkedin ")) {
      const input = text.slice(10).trim();
      if (!input) {
        await sendTelegram(chatId, "❌ Escribe algo después de /linkedin");
        return NextResponse.json({ ok: true });
      }
      await sendTelegram(chatId, `💼 Generando post LinkedIn...`);

      let content = input;
      let sourceUrl: string | undefined;
      const { urls, prompt } = extractUrlsAndPrompt(input);
      if (urls.length > 0) {
        await sendTelegram(chatId, `🌐 Leyendo fuente...`);
        try {
          const fetched = await fetchAnyUrl(urls[0]);
          content = prompt ? `${prompt}\n\n${fetched}` : fetched;
          sourceUrl = urls[0];
        } catch { /* use raw input */ }
      }

      const post = await generateLinkedInPost(content, sourceUrl);
      const id = await enqueue({ type: "linkedin", content: post, sourceUrl, chatId });
      await sendTelegramWithKeyboard(chatId, `💼 *Post LinkedIn:*\n\n${post}`, {
        inline_keyboard: [
          [{ text: "✅ Publicar en LinkedIn", callback_data: `pub:linkedin:${id}` }],
          [{ text: "❌ Descartar", callback_data: `skip:${id}` }],
        ],
      });
      return NextResponse.json({ ok: true });
    }

    // ── /thread ──
    if (text.startsWith("/thread ")) {
      const input = text.slice(8).trim();
      if (!input) {
        await sendTelegram(chatId, "❌ Escribe algo después de /thread");
        return NextResponse.json({ ok: true });
      }
      await sendTelegram(chatId, `🐦 Generando hilo X...`);

      let content = input;
      let sourceUrl: string | undefined;
      const { urls, prompt } = extractUrlsAndPrompt(input);
      if (urls.length > 0) {
        await sendTelegram(chatId, `🌐 Leyendo fuente...`);
        try {
          const fetched = await fetchAnyUrl(urls[0]);
          content = prompt ? `${prompt}\n\n${fetched}` : fetched;
          sourceUrl = urls[0];
        } catch { /* use raw input */ }
      }

      const thread = await generateXThread(content, sourceUrl);
      await sendTelegram(chatId, `🐦 *Hilo para X (copia y pega):*\n\n${thread}`, false);
      return NextResponse.json({ ok: true });
    }

    // ── /newsletter ──
    if (text === "/newsletter" || text.startsWith("/newsletter ")) {
      const context = text.startsWith("/newsletter ") ? text.slice(12).trim() : undefined;
      await sendTelegram(chatId, `📧 Generando newsletter "IA Sin Filtros"...`);

      const siteUrl = process.env.SITE_URL ?? "https://jordisegura.com";
      const cronSecret = process.env.CRON_SECRET ?? "";

      const res = await fetch(`${siteUrl}/api/newsletter/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cronSecret}`,
        },
        body: JSON.stringify({ action: "generate", context, chatId }),
      });

      const data = (await res.json()) as { ok: boolean; id?: string; preview?: string };
      if (!data.ok || !data.id) {
        await sendTelegram(chatId, `❌ Error generando newsletter.`);
        return NextResponse.json({ ok: true });
      }

      const preview = (data.preview ?? "").slice(0, 500);
      await sendTelegramWithKeyboard(
        chatId,
        `📧 *Newsletter lista. Preview:*\n\n${preview}...`,
        {
          inline_keyboard: [
            [{ text: "✅ Enviar a suscriptores", callback_data: `pub:newsletter:${data.id}` }],
            [{ text: "❌ Descartar", callback_data: `skip:${data.id}` }],
          ],
        }
      );
      return NextResponse.json({ ok: true });
    }

    // ── /draft ──
    if (text.startsWith("/draft ")) {
      const input = text.slice(7).trim();
      if (!input) {
        await sendTelegram(chatId, "❌ Escribe algo después de /draft");
        return NextResponse.json({ ok: true });
      }
      await runPipeline(chatId, input, false);
      return NextResponse.json({ ok: true });
    }

    // ── /post ──
    if (text.startsWith("/post ")) {
      const input = text.slice(6).trim();
      if (!input) {
        await sendTelegram(chatId, "❌ Escribe algo después de /post");
        return NextResponse.json({ ok: true });
      }
      await runPipeline(chatId, input, true);
      return NextResponse.json({ ok: true });
    }

    // ── Audio / Voz ──
    if (msg.voice || msg.audio) {
      const fileId = (msg.voice ?? msg.audio)!.file_id;
      const fileName = msg.audio?.file_name ?? "audio.ogg";
      await sendTelegram(chatId, `🎙️ Transcribiendo audio...`);
      const buf = await getTelegramFile(fileId);
      const transcription = await transcribeAudio(buf, fileName);
      await sendTelegram(chatId, `📝 Transcripción:\n_${transcription}_`);
      await runPipeline(chatId, transcription, false); // draft por defecto
      return NextResponse.json({ ok: true });
    }

    // ── CSV / Documento (batch) ──
    if (msg.document) {
      const { file_id, file_name = "ideas.csv" } = msg.document;
      const isCSV =
        file_name.endsWith(".csv") ||
        file_name.endsWith(".txt") ||
        msg.document.mime_type === "text/csv" ||
        msg.document.mime_type === "text/plain";

      if (!isCSV) {
        await sendTelegram(chatId, "❌ Mándame un CSV o TXT con una idea por línea.");
        return NextResponse.json({ ok: true });
      }

      const buf = await getTelegramFile(file_id);
      const lines = new TextDecoder("utf-8")
        .decode(buf)
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l && !l.startsWith("#") && !l.toLowerCase().startsWith("idea")); // skip header

      const MAX_BATCH = 5;
      const toProcess = lines.slice(0, MAX_BATCH);
      const skipped = lines.length - toProcess.length;

      await sendTelegram(
        chatId,
        `📋 *Batch recibido:* ${lines.length} ideas${skipped > 0 ? ` (procesando las primeras ${MAX_BATCH}, manda el resto después)` : ""}`
      );

      for (let i = 0; i < toProcess.length; i++) {
        const line = toProcess[i];
        // Formato: "idea, YYYY-MM-DD" — fecha es opcional
        const parts = line.split(",");
        const idea = parts[0].replace(/^["']|["']$/g, "").trim();
        const dateOverride = parts[1]?.trim().match(/^\d{4}-\d{2}-\d{2}$/)?.[0];

        await sendTelegram(chatId, `⏳ (${i + 1}/${toProcess.length}) Generando: _${idea}_`);
        const mdx = await generateBlogPost({ input: idea, sourceType: "idea", dateOverride });
        const titleMatch = mdx.match(/^title:\s*["']?(.+?)["']?\s*$/m);
        const rawTitle = titleMatch?.[1] ?? idea;
        const postDate = dateOverride ?? today();
        const slug = `${postDate}-${slugify(rawTitle)}`;
        const liveUrl = await commitToGitHub(slug, mdx);
        await sendTelegram(chatId, `✅ Publicado: ${liveUrl}`);
      }

      await sendTelegram(chatId, `🎉 *Batch completado.*`);
      return NextResponse.json({ ok: true });
    }

    // Cualquier otro mensaje
    await sendTelegram(
      chatId,
      "Usa /post o /draft seguido de una idea, URL o texto.\n\n/help para más info."
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[telegram-bot]", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, service: "jordi-blog-bot" });
}
