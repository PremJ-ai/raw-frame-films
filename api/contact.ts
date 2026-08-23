import type { VercelRequest, VercelResponse } from "@vercel/node";
import { google } from "googleapis";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // ── Method guard ──────────────────────────────────────────────────
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // ── Parse & validate body ─────────────────────────────────────────
  const { name, phone, message, company } = req.body ?? {};

  // Honeypot: bots that fill every field get a silent success.
  if (company) {
    return res.status(200).json({ ok: true });
  }

  const missing: string[] = [];
  if (!name || typeof name !== "string" || !name.trim()) missing.push("name");
  if (!phone || typeof phone !== "string" || !phone.trim()) missing.push("phone");
  if (!message || typeof message !== "string" || !message.trim()) missing.push("message");

  if (missing.length > 0) {
    return res
      .status(400)
      .json({ error: `Missing required fields: ${missing.join(", ")}` });
  }

  // ── Google Sheets: append lead row ────────────────────────────────
  try {
    const privateKey = (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY ?? "")
      .replace(/\\n/g, "\n");

    const jwtClient = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    await jwtClient.authorize();

    const sheets = google.sheets({ version: "v4", auth: jwtClient });
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:D",
      valueInputOption: "RAW",
      requestBody: {
        values: [[name.trim(), phone.trim(), message.trim(), new Date().toISOString()]],
      },
    });
  } catch (err) {
    console.error("Sheets write failed:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again later." });
  }

  // ── Gmail: send notification ──────────────────────────────────────
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_OAUTH_CLIENT_ID,
      process.env.GMAIL_OAUTH_CLIENT_SECRET,
    );
    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_OAUTH_REFRESH_TOKEN,
    });

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    const to = process.env.NOTIFY_EMAIL_TO;
    const subject = `New lead: ${name.trim()}`;
    const body = [
      `Name:    ${name.trim()}`,
      `Phone:   ${phone.trim()}`,
      `Message: ${message.trim()}`,
    ].join("\n");

    const mimeMessage = [
      `To: ${to}`,
      `Subject: ${subject}`,
      `Content-Type: text/plain; charset="UTF-8"`,
      "",
      body,
    ].join("\r\n");

    // Gmail API expects base64url encoding (RFC 4648 §5).
    const raw = Buffer.from(mimeMessage)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw },
    });
  } catch (err) {
    // Email is a convenience notification — the lead is already captured
    // in the sheet, so we still return success.
    console.error("Gmail send failed:", err);
  }

  return res.status(200).json({ ok: true });
}
