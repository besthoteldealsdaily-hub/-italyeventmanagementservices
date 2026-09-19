"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { checkPassword, endSession, startSession } from "@/lib/auth";
import { getDb, nowIso } from "@/lib/db/client";

export interface LoginState {
  error?: string;
}

const MAX_ATTEMPTS = 5;
const WINDOW_MIN = 15;

// Fallback limiter when the database is not enabled (per isolate, best effort)
const memory = new Map<string, number[]>();

async function tooManyAttempts(ip: string): Promise<boolean> {
  const since = new Date(Date.now() - WINDOW_MIN * 60_000).toISOString();
  const db = await getDb();
  if (db) {
    await db.run("DELETE FROM login_attempts WHERE at < ?", since);
    return (await db.scalar("SELECT COUNT(*) FROM login_attempts WHERE ip = ? AND at >= ?", ip, since)) >= MAX_ATTEMPTS;
  }
  const hits = (memory.get(ip) ?? []).filter((t) => t > Date.now() - WINDOW_MIN * 60_000);
  memory.set(ip, hits);
  return hits.length >= MAX_ATTEMPTS;
}

async function recordFailure(ip: string) {
  const db = await getDb();
  if (db) await db.run("INSERT INTO login_attempts (ip, at) VALUES (?, ?)", ip, nowIso());
  else memory.set(ip, [...(memory.get(ip) ?? []), Date.now()]);
}

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const h = await headers();
  const ip = h.get("cf-connecting-ip") ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (await tooManyAttempts(ip)) return { error: `Too many attempts. Try again in ${WINDOW_MIN} minutes.` };

  const password = String(formData.get("password") ?? "");
  if (!(await checkPassword(password))) {
    await recordFailure(ip);
    return { error: "Wrong password." };
  }
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}
