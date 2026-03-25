/**
 * Daily Digest Cron Job — 8am UTC
 *
 * Scrapes AI news feeds, Claude picks top 5, sends to Telegram with inline keyboard.
 * Jordi taps a button to generate content for each story.
 *
 * Triggered by Vercel Cron (vercel.json) or manually via /api/cron/digest?secret=...
 *
 * Env vars: CRON_SECRET, TELEGRAM_BOT_TOKEN, TELEGRAM_ALLOWED_ID,
 *           ANTHROPIC_API_KEY, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
 */

import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { fetchAllFeeds, type FeedItem } from "@/lib/scraper";
import { enqueue } from "@/lib/queue";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function pickTopStories(items: FeedItem[]): Promise<FeedItem[]> {
  if (items.length === 0) return [];

  const list = items
    .map((item, i) => `${i + 1}. [${item.source}${item.isVideo ? " 🎥" : ""}] ${item.title}\n   ${item.summary}`)
    .join("\n\n");

  const msg = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 500,
    system: `Eres el asistente de contenido de Jordi Segura Pons (speaker IA, CEO CenteIA Education, 500k estudiantes).
Selecciona las 5 noticias más relevantes para el perfil de Jordi: IA práctica, negocio, transformación empresarial, formación IA.
Prioriza: avances importantes, controversias, herramientas nuevas, impacto en empleos/empresas, videos virales de IA.
Evita: noticias muy técnicas/investigación pura, crypto/blockchain, política no relacionada con IA.
Responde SOLO con los números separados por comas. Ejemplo: 2,5,7,12,15`,
    messages: [{ role: "user", content: `Elige los 5 mejores de estos ${items.length} artículos:\n\n${list}` }],
  });

  const block = msg.content[0];
  if (block.type !== "text") return items.slice(0, 5);

  const indices = block.text
    .trim()
    .split(",")
    .map((s) => parseInt(s.trim(), 10) - 1)
    .filter((i) => i >= 0 && i < items.length);

  return indices.slice(0, 5).map((i) => items[i]);
}

async function sendDigestToTelegram(stories: FeedItem[]): Promise<void> {
  const chatId = process.env.TELEGRAM_ALLOWED_ID;
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!chatId || !token) return;

  // Header message
  await sendMessage(token, chatId, `📰 *Digest IA — ${new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}*\n\n${stories.length} historias para hoy:`);

  // One message per story with inline keyboard
  for (let i = 0; i < stories.length; i++) {
    const story = stories[i];
    const icon = story.isVideo ? "🎥" : "📰";
    const text =
      `${icon} *#${i + 1} — ${escapeMarkdown(story.title)}*\n` +
      `_${escapeMarkdown(story.source)}_\n\n` +
      `${escapeMarkdown(story.summary.slice(0, 200))}${story.summary.length > 200 ? "..." : ""}\n\n` +
      `🔗 ${story.link}`;

    // Store story in queue first to get an ID for callback data
    const id = await enqueue({
      type: "blog",
      content: `${story.title}\n\n${story.summary}\n\nFuente: ${story.link}`,
      sourceTitle: story.title,
      sourceUrl: story.link,
      chatId: parseInt(chatId),
    });

    const inlineKeyboard = {
      inline_keyboard: [
        [
          { text: "📝 Blog", callback_data: `gen:blog:${id}` },
          { text: "💼 LinkedIn", callback_data: `gen:linkedin:${id}` },
          { text: "🐦 Thread X", callback_data: `gen:thread:${id}` },
        ],
        [
          { text: "❌ Saltar", callback_data: `skip:${id}` },
        ],
      ],
    };

    await sendMessage(token, chatId, text, inlineKeyboard);
  }
}

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, "\\$&");
}

async function sendMessage(
  token: string,
  chatId: string,
  text: string,
  replyMarkup?: object
): Promise<void> {
  const payload: Record<string, unknown> = {
    chat_id: chatId,
    text,
    parse_mode: "Markdown",
    disable_web_page_preview: true,
  };
  if (replyMarkup) payload.reply_markup = replyMarkup;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function GET(req: NextRequest) {
  // Validate cron secret (Vercel sends Authorization header for cron jobs)
  const authHeader = req.headers.get("Authorization");
  const querySecret = req.nextUrl.searchParams.get("secret");
  const cronSecret = process.env.CRON_SECRET;

  const isVercelCron = authHeader === `Bearer ${cronSecret}`;
  const isManual = cronSecret && querySecret === cronSecret;

  if (cronSecret && !isVercelCron && !isManual) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const allItems = await fetchAllFeeds();

    if (allItems.length === 0) {
      return NextResponse.json({ ok: true, message: "No items fetched" });
    }

    const top = await pickTopStories(allItems);
    await sendDigestToTelegram(top);

    return NextResponse.json({ ok: true, stories: top.length });
  } catch (err) {
    console.error("[cron/digest]", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
