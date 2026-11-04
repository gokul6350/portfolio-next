import { NextRequest } from "next/server";

// Email open-tracking pixel: GET /api/t/<tag>.gif
// Returns a 1x1 transparent GIF, logs the open, and pushes a phone
// notification via ntfy.sh to the private topic in NTFY_TOPIC.
export const dynamic = "force-dynamic";

const GIF = Buffer.from(
  "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
  "base64"
);

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const tag = id.replace(/\.gif$/i, "").replace(/[^a-z0-9_-]/gi, "").slice(0, 64);
  const ua = req.headers.get("user-agent") ?? "";
  const when = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const via = /GoogleImageProxy/i.test(ua) ? "Gmail" : /Outlook|Microsoft/i.test(ua) ? "Outlook" : "other client";
  const city = decodeURIComponent(req.headers.get("x-vercel-ip-city") ?? "");
  const country = req.headers.get("x-vercel-ip-country") ?? "";
  const where = [city, country].filter(Boolean).join(", ") || "unknown location";

  // ?s=<unix seconds at send time>. Hits within 2 min of sending are almost
  // always the recipient's mail-security scanner, not a human.
  const sentAt = Number(req.nextUrl.searchParams.get("s"));
  const ageSec = Number.isFinite(sentAt) && sentAt > 0 ? Math.round(Date.now() / 1000 - sentAt) : null;
  const scanner = ageSec !== null && ageSec < 120;
  const ageTxt = ageSec === null ? "" : ageSec < 3600 ? `${Math.max(ageSec, 0)}s after send` : `${(ageSec / 3600).toFixed(1)}h after send`;

  console.log(JSON.stringify({ event: "email_open", tag, via, where, ageSec, scanner, ua, when }));

  const topic = process.env.NTFY_TOPIC;
  if (topic && tag) {
    try {
      await fetch(`https://ntfy.sh/${topic}`, {
        method: "POST",
        body:
          `${tag} - ${when} IST\n` +
          `${scanner ? "Likely mail-security scanner (not a person)" : "Likely a real open"}${ageTxt ? ` - ${ageTxt}` : ""}\n` +
          `via ${via} - ${where}\nUA: ${ua.slice(0, 90)}`,
        headers: {
          Title: scanner ? "Scanner hit (ignore)" : "Email opened",
          Tags: scanner ? "robot" : "envelope",
          Priority: scanner ? "1" : "4",
        },
      });
    } catch {
      // never fail the image because of the notifier
    }
  }

  return new Response(GIF, {
    headers: {
      "Content-Type": "image/gif",
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}
