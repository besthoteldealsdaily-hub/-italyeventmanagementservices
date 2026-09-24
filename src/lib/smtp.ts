/**
 * Transactional email via SMTP (e.g. Gmail with an App Password), sent over Cloudflare's TCP
 * Sockets API through the `worker-mailer` package. That API only exists in the deployed Worker
 * (and in `wrangler`-backed local runs, e.g. `npm run preview`) — not under plain `next dev` — so
 * the import is dynamic and every failure is swallowed, matching sendMail()'s "return false, never
 * throw" contract. Kept separate from mail.ts/leads.ts's Resend path so either channel can be used.
 */

export function smtpConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

export interface SmtpMail {
  to: string[];
  subject: string;
  text: string;
  from: string;
  replyTo?: string;
}

export async function sendViaSmtp(mail: SmtpMail): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return false;
  const port = Number(process.env.SMTP_PORT ?? 587);

  try {
    const { WorkerMailer } = await import("worker-mailer");
    await WorkerMailer.send(
      {
        host,
        port,
        secure: port === 465,
        credentials: { username: user, password: pass },
        authType: "plain",
      },
      {
        from: mail.from,
        to: mail.to,
        reply: mail.replyTo,
        subject: mail.subject,
        text: mail.text,
      },
    );
    return true;
  } catch (e) {
    console.error("[smtp] send failed:", e instanceof Error ? e.message : e);
    return false;
  }
}
