// ─────────────────────────────────────────────────────────────────────────────
// "Last call" email: nudges invited people who have not registered yet to sign
// up. Highlights prizes, merch, learning and the energy giants in the room, plus a
// short sponsors strip. Email-client safe HTML (tables + inline styles).
// ─────────────────────────────────────────────────────────────────────────────

const BRAND = {
  green: '#052e16',
  greenMid: '#15803d',
  gold: '#E9C202',
  ink: '#1f2937',
  muted: '#6b7280',
  line: '#e5e7eb',
  logo: 'https://www.unilagenergyclub.com/assets/media/logos/unilogo.png',
}

const EVENT = {
  name: 'ET360° Grand Finale',
  date: 'Thursday, 16 July 2026',
  doors: '9:00 AM',
  venue: 'Multipurpose Hall, University of Lagos',
  admission: 'Free Entry · Open to Everyone',
  registerUrl: 'https://www.unilagenergyclub.com/et360/finale',
  siteUrl: 'https://www.unilagenergyclub.com',
  // Composed strip of all sponsor logos (trimmed + uniformly sized). Bump ?v when it changes.
  sponsors: 'https://www.unilagenergyclub.com/assets/media/email/sponsors-all.png?v=1',
  contact: 'unilagenergyclub@gmail.com',
  whatsapp: 'https://chat.whatsapp.com/J43sFbDAAF8FuQMjLkPkPz',
  instagram: 'https://www.instagram.com/unilagenergyclub/',
  linkedin: 'https://www.linkedin.com/company/unilag-energy-club/',
  x: 'https://x.com/uecunilag',
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

export function lastCallSubject(): string {
  return `You haven't registered yet: ${EVENT.name}, 16 July ⚡`
}

export function lastCallHtml(fullName = ''): string {
  const name = escapeHtml((fullName || '').trim())
  const first = name ? name.split(/\s+/)[0] : ''
  const greeting = first ? `Hi <strong>${first}</strong>,` : 'Hi there,'

  const detailRow = (label: string, value: string, accent = false) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${BRAND.line};">
        <span style="display:block;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:${BRAND.muted};font-weight:700;">${label}</span>
        <span style="display:block;font-size:15px;color:${accent ? BRAND.greenMid : BRAND.ink};font-weight:${accent ? 700 : 600};margin-top:2px;">${value}</span>
      </td>
    </tr>`

  const highlight = (emoji: string, text: string) => `
    <tr>
      <td style="padding:8px 0;vertical-align:top;width:34px;font-size:20px;line-height:1.3;">${emoji}</td>
      <td style="padding:8px 0;color:${BRAND.ink};font-size:15px;line-height:1.5;">${text}</td>
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
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">You haven't registered yet. Prizes, merch, and Nigeria's energy giants await at the ${EVENT.name} on ${EVENT.date}. It's free.</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.06);">

        <tr><td align="center" style="background:#ffffff;padding:28px 24px 6px;">
          <img src="${BRAND.logo}" alt="UNILAG Energy Club" width="64" height="64" style="display:block;border:0;width:64px;height:auto;" />
        </td></tr>
        <tr><td align="center" style="padding:0 24px 18px;">
          <span style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:${BRAND.muted};font-weight:700;">UNILAG Energy Club</span>
        </td></tr>

        <!-- Hero -->
        <tr><td style="background:${BRAND.green};padding:38px 32px;" align="center">
          <span style="display:inline-block;background:rgba(233,194,2,.15);color:${BRAND.gold};font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:6px 14px;border-radius:999px;">Don't miss out</span>
          <h1 style="margin:18px 0 8px;color:#ffffff;font-size:29px;line-height:1.15;font-weight:800;">You haven't registered yet</h1>
          <p style="margin:0;color:#bbf7d0;font-size:15px;line-height:1.5;">The <strong style="color:${BRAND.gold};">${EVENT.name}</strong> is almost here · ${EVENT.date}</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:32px;">
          <p style="margin:0 0 16px;color:${BRAND.ink};font-size:15px;line-height:1.65;">${greeting}</p>
          <p style="margin:0 0 18px;color:${BRAND.ink};font-size:15px;line-height:1.65;">
            We invited you to the <strong>${EVENT.name}</strong> and we noticed you haven't registered yet. The
            day is almost here, and there is a lot waiting for you:
          </p>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
            ${highlight('🏆', '<strong>Prizes to be won</strong> on the day')}
            ${highlight('🎁', '<strong>Exclusive ET360° merch</strong> to grab')}
            ${highlight('🎓', 'A lot to <strong>learn</strong> from real industry practitioners')}
            ${highlight('⚡', "The presence of <strong>Nigeria's energy giants</strong> in one room")}
          </table>

          <p style="margin:0 0 22px;color:${BRAND.ink};font-size:15px;line-height:1.65;">
            It's <strong>free and open to everyone</strong>, and <strong>registration is compulsory and takes less than a minute.</strong> Don't miss it.
          </p>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border:1px solid ${BRAND.line};border-radius:12px;padding:6px 20px;margin:0 0 24px;">
            ${detailRow('Date', EVENT.date)}
            ${detailRow('Doors open', EVENT.doors)}
            ${detailRow('Venue', EVENT.venue)}
            ${detailRow('Admission', EVENT.admission, true)}
          </table>

          <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:0 auto 10px;">
            <tr><td align="center" style="border-radius:999px;background:${BRAND.gold};">
              <a href="${EVENT.registerUrl}" style="display:inline-block;padding:15px 34px;font-size:15px;font-weight:800;color:${BRAND.green};text-decoration:none;border-radius:999px;">Register Free →</a>
            </td></tr>
          </table>
          <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:12px auto 0;">
            <tr><td align="center" style="border-radius:999px;background:#25D366;">
              <a href="${EVENT.whatsapp}" style="display:inline-block;padding:12px 26px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:999px;">Join the WhatsApp group 🔥</a>
            </td></tr>
          </table>
        </td></tr>

        <!-- Sponsors -->
        <tr><td style="padding:8px 24px 8px;background:#ffffff;" align="center">
          <p style="margin:0;color:${BRAND.muted};font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">In the room: the energy giants</p>
        </td></tr>
        <tr><td style="padding:0 24px 26px;background:#ffffff;" align="center">
          <img src="${EVENT.sponsors}" alt="ET360° Grand Finale sponsors and partners" width="552" style="display:block;width:100%;max-width:552px;height:auto;border:0;border-radius:12px;" />
        </td></tr>

        <!-- Footer with socials -->
        <tr><td style="background:${BRAND.green};padding:26px 32px;" align="center">
          <p style="margin:0 0 6px;color:#ffffff;font-size:14px;font-weight:700;">UNILAG Energy Club</p>
          <p style="margin:0 0 12px;color:#86efac;font-size:12px;line-height:1.6;">
            Questions? <a href="mailto:${EVENT.contact}" style="color:${BRAND.gold};text-decoration:none;">${EVENT.contact}</a>
          </p>
          <p style="margin:0 0 12px;color:#bbf7d0;font-size:13px;">
            <a href="${EVENT.instagram}" style="color:${BRAND.gold};text-decoration:none;font-weight:700;">Instagram</a>
            <span style="color:#4ade80;">&nbsp;·&nbsp;</span>
            <a href="${EVENT.linkedin}" style="color:${BRAND.gold};text-decoration:none;font-weight:700;">LinkedIn</a>
            <span style="color:#4ade80;">&nbsp;·&nbsp;</span>
            <a href="${EVENT.x}" style="color:${BRAND.gold};text-decoration:none;font-weight:700;">X (Twitter)</a>
          </p>
          <p style="margin:0;color:#4ade80;font-size:11px;">© 2026 UNILAG Energy Club · #JoinTheTransition</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}
