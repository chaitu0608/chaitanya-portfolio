import type { VercelRequest, VercelResponse } from "@vercel/node";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_BODY_BYTES = 12_000;

const ALLOWED_ORIGINS = new Set([
  "https://www.cdhamdhere.xyz",
  "https://cdhamdhere.xyz",
  "http://localhost:8000",
  "http://localhost:5173",
]);

interface ContactBody {
  name?: string;
  email?: string;
  message?: string;
  website?: string;
}

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  if (Array.isArray(forwarded) && forwarded[0]) {
    return forwarded[0].split(",")[0]?.trim() || "unknown";
  }
  return req.socket?.remoteAddress ?? "unknown";
}

function isAllowedOrigin(req: VercelRequest): boolean {
  const origin = req.headers.origin;
  if (!origin || typeof origin !== "string") return true;
  return ALLOWED_ORIGINS.has(origin);
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

/** Strip CR/LF and control chars that could affect email headers */
function stripControlChars(value: string): string {
  let out = "";
  for (const ch of value) {
    const code = ch.charCodeAt(0);
    if (code === 9 || code === 10 || code === 13) {
      out += " ";
      continue;
    }
    if (code < 32 || code === 127) continue;
    out += ch;
  }
  return out;
}

function sanitizeField(value: string, maxLen: number): string {
  return stripControlChars(value).replace(/\s+/g, " ").trim().slice(0, maxLen);
}

function bodyTooLarge(req: VercelRequest): boolean {
  const raw = req.headers["content-length"];
  const len = typeof raw === "string" ? Number.parseInt(raw, 10) : 0;
  return Number.isFinite(len) && len > MAX_BODY_BYTES;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  if (bodyTooLarge(req)) {
    return res.status(413).json({ error: "Payload too large" });
  }

  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    return res.status(429).json({ error: "Too many requests. Try again later." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "c.dhamdhere@somaiya.edu";
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  if (!apiKey) {
    return res.status(503).json({
      error: "Contact API not configured",
      fallback: "mailto",
    });
  }

  const body = (req.body ?? {}) as ContactBody;
  const name = sanitizeField(String(body.name ?? ""), 120);
  const email = sanitizeField(String(body.email ?? ""), 254);
  const message = sanitizeField(String(body.message ?? ""), 5000);
  const honeypot = String(body.website ?? "").trim();

  if (honeypot) {
    return res.status(200).json({ ok: true });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!EMAIL_REGEX.test(email)) {
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
      console.error("[contact] Resend error:", response.status);
      return res.status(502).json({ error: "Failed to send email" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[contact]", err instanceof Error ? err.message : "unknown");
    return res.status(500).json({ error: "Server error" });
  }
}
