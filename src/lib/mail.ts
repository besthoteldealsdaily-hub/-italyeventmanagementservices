/** Transactional email via Resend (same env vars as the lead notifications). Returns false when not configured or on failure. */
export function mailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.QUOTE_FROM_EMAIL);
}

export async function sendMail(opts: { to: string; subject: string; text: string; replyTo?: string }): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.QUOTE_FROM_EMAIL;
  if (!key || !from || !opts.to) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [opts.to],
        reply_to: opts.replyTo ?? process.env.QUOTE_TO_EMAIL?.split(",")[0]?.trim(),
        subject: opts.subject,
        text: opts.text,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Best-effort alert to the owner (email + webhook). Never throws. */
export async function notifyOwner(subject: string, text: string): Promise<void> {
  const to = process.env.QUOTE_TO_EMAIL?.split(",")[0]?.trim();
  const tasks: Promise<unknown>[] = [];
  if (to) tasks.push(sendMail({ to, subject, text }));
  const hook = process.env.LEAD_WEBHOOK_URL;
  if (hook) {
    tasks.push(
      fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: `${subject}\n${text}` }) }).catch(() => null),
    );
  }
  await Promise.allSettled(tasks);
}
