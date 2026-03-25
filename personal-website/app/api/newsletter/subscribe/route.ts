/**
 * Newsletter Subscribe Endpoint
 * Saves email to content/subscribers.json in GitHub.
 */

import { NextRequest, NextResponse } from "next/server";
import { addSubscriber } from "@/lib/newsletter";

export async function POST(req: NextRequest) {
  const { email, name } = (await req.json()) as { email?: string; name?: string };

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  try {
    await addSubscriber(email.toLowerCase().trim(), name?.trim());
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[newsletter/subscribe]", err);
    return NextResponse.json({ error: "Error al suscribirse" }, { status: 500 });
  }
}
