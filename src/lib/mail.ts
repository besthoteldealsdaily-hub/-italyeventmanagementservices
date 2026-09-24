import { sendViaSmtp, smtpConfigured } from "./smtp";

/** Transactional email via SMTP (if configured) or Resend. Returns false when neither is configured or on failure. */
export function mailConfigured(): boolean {
  return smtpConfigured() || Boolean(process.env.RESEND_API_KEY && process.env.QUOTE_FROM_EMAIL);
}

export async function sendMail(opts: { to: string; subject: string; text: string; replyTo?: string }): Promise<boolean> {
  if (!opts.to) return false;
  const replyTo = opts.replyTo ?? process.env.QUOTE_TO_EMAIL?.split(",")[0]?.trim();

  if (smtpConfigured()) {
    const from = process.env.SMTP_FROM ?? process.env.SMTP_USER!;
    const sent = await sendViaSmtp({ to: [opts.to], subject: opts.subject, text: opts.text, from, replyTo });
    if (sent) return true;
    // Fall through to Resend below, in case both are configured.
  }

  const key = process.env.RESEND_API_KEY;
  const from = process.env.QUOTE_FROM_EMAIL;
  if (!key || !from) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [opts.to],
        reply_to: replyTo,
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
