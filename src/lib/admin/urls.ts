/** Only same-site admin paths (no query string) are honoured as a redirect target. */
export function adminPath(v: FormDataEntryValue | string | null, fallback = "/admin"): string {
  const s = typeof v === "string" ? v : "";
  return s.startsWith("/admin") && !s.includes("//") && !s.includes("?") && !s.includes("\\") ? s : fallback;
}

/** path?ok=message or path?err=message — rendered by <Flash/>. */
export const flashUrl = (path: string, kind: "ok" | "err", msg: string) => `${path}?${kind}=${encodeURIComponent(msg)}`;
