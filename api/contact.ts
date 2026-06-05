import type { VercelRequest, VercelResponse } from "@vercel/node";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactBody {
  name?: string;
  email?: string;
  message?: string;
  website?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to =
    process.env.CONTACT_TO_EMAIL ?? "c.dhamdhere@somaiya.edu";
  const from =
    process.env.CONTACT_FROM_EMAIL ??
    "Portfolio <onboarding@resend.dev>";

  if (!apiKey) {
    return res.status(503).json({
      error: "Contact API not configured",
      fallback: "mailto",
    });
  }

  const body = (req.body ?? {}) as ContactBody;
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const honeypot = String(body.website ?? "").trim();

  if (honeypot) {
    return res.status(200).json({ ok: true });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!EMAIL_REGEX.test(email) || name.length > 120 || message.length > 5000) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text: [
          `New message from your portfolio`,
          ``,
          `Name: ${name}`,
          `Email: ${email}`,
          ``,
          message,
          ``,
          `—`,
          `Sent via cdhamdhere.xyz contact form`,
        ].join("\n"),
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("[contact] Resend error:", response.status, errText);
      return res.status(502).json({ error: "Failed to send email" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[contact]", err);
    return res.status(500).json({ error: "Server error" });
  }
}
