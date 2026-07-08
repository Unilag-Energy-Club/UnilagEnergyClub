// ─────────────────────────────────────────────────────────────────────────────
// Branded confirmation email for ET360° Grand Finale registrations.
// Email-client–safe HTML: tables + inline styles only (no flexbox / external CSS).
// ─────────────────────────────────────────────────────────────────────────────

const BRAND = {
  green: '#052e16', // green-950
  greenMid: '#15803d', // green-700
  gold: '#E9C202', // club gold
  ink: '#1f2937',
  muted: '#6b7280',
  line: '#e5e7eb',
  // Logo is served by the live site (apex has no DNS — use www).
  logo: 'https://www.unilagenergyclub.com/assets/media/logos/unilogo.png',
}

const EVENT = {
  name: 'ET360° Grand Finale',
  date: 'Thursday, 16 July 2026',
  venue: 'University of Lagos',
  admission: 'Free Entry · Open to the Public',
  contact: 'unilagenergyclub@gmail.com',
  siteUrl: 'https://www.unilagenergyclub.com/et360/finale',
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function confirmationSubject(): string {
  return `You're registered — ${EVENT.name}, 16 July 2026 🎉`
}

export function confirmationHtml(fullName: string): string {
  const name = escapeHtml((fullName || '').trim() || 'there')
  const firstName = name.split(/\s+/)[0]

  const detailRow = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${BRAND.line};">
        <span style="display:block;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:${BRAND.muted};font-weight:700;">${label}</span>
        <span style="display:block;font-size:15px;color:${BRAND.ink};font-weight:600;margin-top:2px;">${value}</span>
      </td>
    </tr>`

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${EVENT.name}</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Your spot for the ${EVENT.name} on ${EVENT.date} is confirmed.</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.06);">

          <!-- Logo bar -->
          <tr>
            <td align="center" style="background:#ffffff;padding:28px 24px 8px;">
              <img src="${BRAND.logo}" alt="UNILAG Energy Club" width="64" height="64" style="display:block;border:0;width:64px;height:auto;" />
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:0 24px 18px;">
              <span style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:${BRAND.muted};font-weight:700;">UNILAG Energy Club</span>
            </td>
          </tr>

          <!-- Hero band -->
          <tr>
            <td style="background:${BRAND.green};padding:36px 32px;" align="center">
              <span style="display:inline-block;background:rgba(233,194,2,.15);color:${BRAND.gold};font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:6px 14px;border-radius:999px;">Registration Confirmed</span>
              <h1 style="margin:18px 0 6px;color:#ffffff;font-size:30px;line-height:1.15;font-weight:800;">You're in, ${firstName}! 🎉</h1>
              <p style="margin:0;color:#bbf7d0;font-size:15px;line-height:1.5;">Your seat at the <strong style="color:${BRAND.gold};">${EVENT.name}</strong> is reserved.</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 16px;color:${BRAND.ink};font-size:15px;line-height:1.65;">
                Hi ${name}, thank you for registering to attend the ${EVENT.name} — the grand culmination of Nigeria's most ambitious energy transition bootcamp. We can't wait to host you.
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border:1px solid ${BRAND.line};border-radius:12px;padding:8px 20px;margin:8px 0 24px;">
                ${detailRow('Event', EVENT.name)}
                ${detailRow('Date', EVENT.date)}
                ${detailRow('Venue', EVENT.venue)}
                <tr><td style="padding:10px 0;">
                  <span style="display:block;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:${BRAND.muted};font-weight:700;">Admission</span>
                  <span style="display:block;font-size:15px;color:${BRAND.greenMid};font-weight:700;margin-top:2px;">${EVENT.admission}</span>
                </td></tr>
              </table>

              <!-- CTA -->
              <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:0 auto 8px;">
                <tr>
                  <td align="center" style="border-radius:999px;background:${BRAND.gold};">
                    <a href="${EVENT.siteUrl}" style="display:inline-block;padding:14px 30px;font-size:14px;font-weight:700;color:${BRAND.green};text-decoration:none;border-radius:999px;">View Event Details →</a>
                  </td>
                </tr>
              </table>

              <p style="margin:22px 0 0;color:${BRAND.muted};font-size:13px;line-height:1.6;text-align:center;">
                Add it to your calendar and tell a friend — entry is free and open to all.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:${BRAND.green};padding:26px 32px;" align="center">
              <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:0 auto 18px;">
                <tr><td align="center" style="border-radius:999px;background:#25D366;">
                  <a href="https://chat.whatsapp.com/J43sFbDAAF8FuQMjLkPkPz" style="display:inline-block;padding:12px 24px;font-size:13px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:999px;">Join the transition team for more updates 🔥</a>
                </td></tr>
              </table>
              <p style="margin:0 0 6px;color:#ffffff;font-size:14px;font-weight:700;">UNILAG Energy Club</p>
              <p style="margin:0 0 12px;color:#86efac;font-size:12px;line-height:1.6;">
                Questions? <a href="mailto:${EVENT.contact}" style="color:${BRAND.gold};text-decoration:none;">${EVENT.contact}</a>
              </p>
              <p style="margin:0;color:#4ade80;font-size:11px;">© 2026 UNILAG Energy Club · #JoinTheTransition</p>
            </td>
          </tr>

        </table>
        <p style="margin:16px 0 0;color:#9ca3af;font-size:11px;line-height:1.5;">You're receiving this because you registered for the ${EVENT.name}.</p>
      </td>
    </tr>
  </table>
</body>
</html>`
}
