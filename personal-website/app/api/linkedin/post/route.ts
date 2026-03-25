/**
 * LinkedIn Post Endpoint
 *
 * Called internally after Jordi approves a LinkedIn post via Telegram.
 * Requires CRON_SECRET as bearer token for security.
 */

import { NextRequest, NextResponse } from "next/server";
import { createLinkedInPost } from "@/lib/linkedin";

export async function POST(req: NextRequest) {
  const auth = req.headers.get("Authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { text } = (await req.json()) as { text: string };
  if (!text?.trim()) {
    return NextResponse.json({ error: "text is required" }, { status: 400 });
  }

  const result = await createLinkedInPost(text);
  return NextResponse.json({ ok: true, ...result });
}
