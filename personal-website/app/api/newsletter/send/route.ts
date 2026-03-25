/**
 * Newsletter Send Endpoint
 *
 * Triggered by Telegram bot (/newsletter command).
 * 1. Generates newsletter HTML via Claude
 * 2. Sends preview to Telegram for approval
 * 3. On approval, sends to all subscribers via Resend
 *
 * Requires CRON_SECRET as bearer token.
 */

import { NextRequest, NextResponse } from "next/server";
import { generateNewsletter, sendNewsletter } from "@/lib/newsletter";
import { enqueue } from "@/lib/queue";

export async function POST(req: NextRequest) {
  const auth = req.headers.get("Authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { action, id, context, chatId } = (await req.json()) as {
    action: "generate" | "send";
    id?: string;
    context?: string;
    chatId?: number;
  };

  if (action === "generate") {
    const html = await generateNewsletter(context);
    const queueId = await enqueue({
      type: "newsletter",
      content: html,
      chatId: chatId ?? 0,
    });
    return NextResponse.json({ ok: true, id: queueId, preview: html.slice(0, 500) });
  }

  if (action === "send" && id) {
    // The Telegram bot will call this after approval
    const { dequeue } = await import("@/lib/queue");
    const item = await dequeue(id);
    if (!item) return NextResponse.json({ error: "Item not found" }, { status: 404 });

    const sent = await sendNewsletter(item.content);
    return NextResponse.json({ ok: true, sent });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
