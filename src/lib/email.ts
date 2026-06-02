interface NotifyPayload {
  name: string;
  birthDate: string;
  birthTime: string;
  gender: string;
  region: string;
}

// Entry notification. On a server-backed deploy (Vercel/Node) this hits the
// built-in `/api/notify` route. On a static host (GitHub Pages) there is no
// server, so set NEXT_PUBLIC_NOTIFY_ENDPOINT to an external function URL
// (Vercel/Cloudflare/Resend proxy) to enable it; otherwise it no-ops.
const ENDPOINT = process.env.NEXT_PUBLIC_NOTIFY_ENDPOINT || '/api/notify';
const STATIC_EXPORT = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true';

export async function sendNotification(payload: NotifyPayload): Promise<void> {
  // On static export with no external endpoint configured, skip silently.
  if (STATIC_EXPORT && !process.env.NEXT_PUBLIC_NOTIFY_ENDPOINT) return;
  try {
    await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    // notification is best-effort; never block onboarding.
  }
}
