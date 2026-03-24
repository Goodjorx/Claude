/**
 * LinkedIn OAuth 2.0 Callback — One-time setup
 *
 * Usage:
 *   1. Visit /api/linkedin/callback?setup=1 in your browser
 *   2. Authorizes with LinkedIn, returns your access_token and person URN
 *   3. Copy those values to Vercel env vars: LINKEDIN_ACCESS_TOKEN, LINKEDIN_PERSON_URN
 *
 * Note: LinkedIn access tokens last 60 days. Revisit this URL to refresh when needed.
 */

import { NextRequest, NextResponse } from "next/server";
import { getOAuthUrl, exchangeCode, getPersonUrn } from "@/lib/linkedin";

export async function GET(req: NextRequest) {
  const siteUrl = process.env.SITE_URL ?? "https://jordisegura.com";
  const redirectUri = `${siteUrl}/api/linkedin/callback`;

  const code = req.nextUrl.searchParams.get("code");
  const setup = req.nextUrl.searchParams.get("setup");

  // Step 1: Redirect to LinkedIn OAuth
  if (setup === "1") {
    const url = getOAuthUrl(redirectUri);
    return NextResponse.redirect(url);
  }

  // Step 2: Handle callback with code
  if (code) {
    try {
      const tokens = await exchangeCode(code, redirectUri);
      const personUrn = await getPersonUrn(tokens.access_token);

      const expiresDate = new Date(Date.now() + tokens.expires_in * 1000).toLocaleDateString("es-ES");

      return new NextResponse(
        `<html><body style="font-family:monospace;padding:40px;background:#0f0f0f;color:#fff;">
<h2>✅ LinkedIn OAuth completo</h2>
<p>Copia estas variables en Vercel → Settings → Environment Variables:</p>
<pre style="background:#1a1a1a;padding:20px;margin:20px 0;">
LINKEDIN_ACCESS_TOKEN=${tokens.access_token}
LINKEDIN_PERSON_URN=${personUrn}
</pre>
<p style="color:#888;">Token válido hasta: ${expiresDate}</p>
<p style="color:#888;">Repite este proceso cuando el token expire.</p>
</body></html>`,
        { headers: { "Content-Type": "text/html" } }
      );
    } catch (err) {
      return new NextResponse(
        `<html><body style="padding:40px;"><h2>❌ Error</h2><pre>${String(err)}</pre></body></html>`,
        { headers: { "Content-Type": "text/html" }, status: 500 }
      );
    }
  }

  return NextResponse.json({ error: "Use ?setup=1 to start OAuth flow" }, { status: 400 });
}
