import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Admin authentication: one owner password (ADMIN_PASSWORD) + signed, HttpOnly session cookie.
 * Secrets (set as Cloudflare runtime secrets): ADMIN_PASSWORD, SESSION_SECRET (16+ random chars).
 * Every admin page and every admin server action must call requireAdmin() — layouts alone don't protect pages.
 */

export const SESSION_COOKIE = "iems_admin";
const SESSION_HOURS = 12;
const enc = new TextEncoder();

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD && (process.env.SESSION_SECRET ?? "").length >= 16);
}

function b64url(bytes: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(bytes)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function hmac(secret: string, data: string): Promise<ArrayBuffer> {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return crypto.subtle.sign("HMAC", key, enc.encode(data));
}

/** Constant-time string comparison (via HMAC digests of equal length). */
async function safeEqual(a: string, b: string): Promise<boolean> {
  const secret = process.env.SESSION_SECRET ?? "x";
  const [ha, hb] = await Promise.all([hmac(secret, a), hmac(secret, b)]);
  const va = new Uint8Array(ha);
  const vb = new Uint8Array(hb);
  let diff = 0;
  for (let i = 0; i < va.length; i++) diff |= va[i] ^ vb[i];
  return diff === 0;
}

export async function checkPassword(input: string): Promise<boolean> {
  if (!adminConfigured()) return false;
  return safeEqual(input, process.env.ADMIN_PASSWORD as string);
}

export async function createSessionToken(): Promise<string> {
  const exp = Date.now() + SESSION_HOURS * 3600_000;
  const sig = b64url(await hmac(process.env.SESSION_SECRET as string, `admin.${exp}`));
  return `${exp}.${sig}`;
}

async function verifyToken(token: string | undefined): Promise<boolean> {
  if (!token || !adminConfigured()) return false;
  const [expStr, sig] = token.split(".");
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Date.now() || !sig) return false;
  const expected = b64url(await hmac(process.env.SESSION_SECRET as string, `admin.${exp}`));
  return safeEqual(sig, expected);
}

export async function isAdmin(): Promise<boolean> {
  const jar = await cookies();
  return verifyToken(jar.get(SESSION_COOKIE)?.value);
}

/** Redirects to the login page unless the visitor holds a valid admin session. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login");
}

export async function startSession() {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_HOURS * 3600,
  });
}

export async function endSession() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}
