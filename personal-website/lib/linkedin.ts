/**
 * LinkedIn API v2 Client
 *
 * Handles OAuth 2.0 token management and post creation.
 *
 * Setup (one-time):
 *   1. Create app at https://www.linkedin.com/developers/apps
 *   2. Add product: "Share on LinkedIn" + "Sign In with LinkedIn using OpenID Connect"
 *   3. Set redirect URI to: https://jordisegura.com/api/linkedin/callback
 *   4. Visit /api/linkedin/callback?setup=1 in browser to run OAuth flow
 *   5. Store the returned access_token in LINKEDIN_ACCESS_TOKEN env var
 *
 * Env vars:
 *   LINKEDIN_CLIENT_ID
 *   LINKEDIN_CLIENT_SECRET
 *   LINKEDIN_ACCESS_TOKEN     — obtained after OAuth setup
 *   LINKEDIN_PERSON_URN       — urn:li:person:{id}  (obtained during OAuth)
 */

const LINKEDIN_API = "https://api.linkedin.com/v2";

export interface LinkedInPostResult {
  id: string;
  url: string;
}

/** Creates a text post on LinkedIn. Returns the post URL. */
export async function createLinkedInPost(text: string): Promise<LinkedInPostResult> {
  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  const personUrn = process.env.LINKEDIN_PERSON_URN;

  if (!token || !personUrn) {
    throw new Error("LINKEDIN_ACCESS_TOKEN and LINKEDIN_PERSON_URN must be set");
  }

  const body = {
    author: personUrn,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: { text },
        shareMediaCategory: "NONE",
      },
    },
    visibility: {
      "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
    },
  };

  const res = await fetch(`${LINKEDIN_API}/ugcPosts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`LinkedIn API error ${res.status}: ${err}`);
  }

  const data = (await res.json()) as { id: string };
  // LinkedIn post URL: https://www.linkedin.com/feed/update/{urn}/
  const encodedId = encodeURIComponent(data.id);
  return {
    id: data.id,
    url: `https://www.linkedin.com/feed/update/${encodedId}/`,
  };
}

/** Returns the OAuth authorization URL for the one-time setup flow. */
export function getOAuthUrl(redirectUri: string): string {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  if (!clientId) throw new Error("LINKEDIN_CLIENT_ID not set");

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    state: crypto.randomUUID(),
    scope: "openid profile w_member_social",
  });

  return `https://www.linkedin.com/oauth/v2/authorization?${params}`;
}

/** Exchanges an auth code for an access token. */
export async function exchangeCode(
  code: string,
  redirectUri: string
): Promise<{ access_token: string; expires_in: number }> {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  if (!clientId || !clientSecret) throw new Error("LinkedIn credentials not set");

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret,
  });

  const res = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`LinkedIn token exchange failed: ${err}`);
  }

  return res.json();
}

/** Fetches the authenticated user's profile to get their person URN. */
export async function getPersonUrn(accessToken: string): Promise<string> {
  const res = await fetch(`${LINKEDIN_API}/userinfo`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) throw new Error(`LinkedIn profile fetch failed: ${res.status}`);
  const data = (await res.json()) as { sub: string };
  return `urn:li:person:${data.sub}`;
}
