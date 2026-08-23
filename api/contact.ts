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

  const emailUser = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID;

  // ── Google Sheets: append lead row ────────────────────────────────
  if (emailUser && privateKey && sheetId) {
    try {
      const formattedKey = privateKey.replace(/\\n/g, "\n");
      const jwtClient = new google.auth.JWT({
        email: emailUser,
        key: formattedKey,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });

      await jwtClient.authorize();

      const sheets = google.sheets({ version: "v4", auth: jwtClient });
      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: "Sheet1!A:D",
        valueInputOption: "RAW",
        requestBody: {
          values: [[name.trim(), phone.trim(), message.trim(), new Date().toISOString()]],
        },
      });
    } catch (err) {
      console.error("Sheets write failed:", err);
      console.log("Captured Lead:", { name, phone, message, timestamp: new Date().toISOString() });
    }
  } else {
    console.log("Google Sheets credentials not set. Captured Lead:", { name, phone, message, timestamp: new Date().toISOString() });
  }

  // ── Gmail: send notification ──────────────────────────────────────
  if (
    process.env.GMAIL_OAUTH_CLIENT_ID &&
    process.env.GMAIL_OAUTH_CLIENT_SECRET &&
    process.env.GMAIL_OAUTH_REFRESH_TOKEN
  ) {
    try {
      const oauth2Client = new google.auth.OAuth2(
        process.env.GMAIL_OAUTH_CLIENT_ID,
        process.env.GMAIL_OAUTH_CLIENT_SECRET,
      );
      oauth2Client.setCredentials({
        refresh_token: process.env.GMAIL_OAUTH_REFRESH_TOKEN,
      });

      const gmail = google.gmail({ version: "v1", auth: oauth2Client });
      const to = process.env.NOTIFY_EMAIL_TO || "prem.lm.joshi@gmail.com";
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
      console.error("Gmail send failed:", err);
    }
  }

  return res.status(200).json({ ok: true });
}
