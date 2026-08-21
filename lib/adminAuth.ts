/** Lightweight single-password admin session, built on Web Crypto (crypto.subtle) rather than
 *  Node's `crypto` module so the same code runs unchanged in middleware.ts's Edge runtime and
 *  in Node-runtime route handlers. The cookie carries an expiry plus an HMAC of that expiry,
 *  keyed by ADMIN_PASSWORD — no separate session secret to provision, and no server-side
 *  session store: anyone holding the (correct-length-of-time) cookie is trusted. Adequate for
 *  a single site-owner admin gate; not intended for multi-user auth. */

export const ADMIN_COOKIE_NAME = "kalam_admin_session";
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
export const SESSION_TTL_SECONDS = SESSION_TTL_MS / 1000;

function requirePassword(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error("ADMIN_PASSWORD env var isn't set.");
  }
  return password;
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function sign(message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(requirePassword()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return toHex(signature);
}

/** Constant-time string compare — avoids leaking match length via early-exit timing on both
 *  the password check and the session signature check. */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function checkPassword(candidate: string): Promise<boolean> {
  return timingSafeEqual(candidate, requirePassword());
}

export async function createSessionCookie(): Promise<string> {
  const expires = Date.now() + SESSION_TTL_MS;
  const signature = await sign(String(expires));
  return `${expires}.${signature}`;
}

export async function verifySessionCookie(value: string | undefined): Promise<boolean> {
  if (!value) return false;
  const [expiresStr, signature] = value.split(".");
  if (!expiresStr || !signature) return false;

  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || expires < Date.now()) return false;

  try {
    const expected = await sign(expiresStr);
    return timingSafeEqual(signature, expected);
  } catch {
    return false;
  }
}
