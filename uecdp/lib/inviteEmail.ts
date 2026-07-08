// ─────────────────────────────────────────────────────────────────────────────
// Invitation email that encourages recipients to register for the ET360° Grand Finale.
// Email-client–safe HTML (tables + inline styles). Optional first-name greeting.
// ─────────────────────────────────────────────────────────────────────────────

const BRAND = {
  green: '#052e16', // green-950
  greenMid: '#15803d', // green-700
  gold: '#E9C202', // club gold
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
  // Animated carousel of moments from ET360° (auto-plays in Gmail/Apple Mail).
  // ?v query keeps a clean CDN cache key; bump it whenever the GIF changes.
  gallery: 'https://www.unilagenergyclub.com/assets/media/email/finale-gallery.gif?v=1',
  contact: 'unilagenergyclub@gmail.com',
  instagram: 'https://www.instagram.com/unilagenergyclub/',
  linkedin: 'https://www.linkedin.com/company/unilag-energy-club/',
  x: 'https://x.com/uecunilag',
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

export function inviteSubject(): string {
  return `You're invited: ${EVENT.name}, 16 July 2026 ⚡`
}

export function inviteHtml(fullName = ''): string {
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

  const socialLink = (href: string, label: string) =>
    `<a href="${href}" style="color:${BRAND.gold};text-decoration:none;font-weight:700;">${label}</a>`

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${EVENT.name}</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">You're invited to the ${EVENT.name} on ${EVENT.date}. Free entry, open to everyone. Register now.</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.06);">

        <!-- Logo -->
        <tr><td align="center" style="background:#ffffff;padding:28px 24px 6px;">
          <img src="${BRAND.logo}" alt="UNILAG Energy Club" width="64" height="64" style="display:block;border:0;width:64px;height:auto;" />
        </td></tr>
        <tr><td align="center" style="padding:0 24px 18px;">
          <span style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:${BRAND.muted};font-weight:700;">UNILAG Energy Club</span>
        </td></tr>

        <!-- Hero -->
        <tr><td style="background:${BRAND.green};padding:38px 32px;" align="center">
          <span style="display:inline-block;background:rgba(233,194,2,.15);color:${BRAND.gold};font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:6px 14px;border-radius:999px;">You're Invited</span>
          <h1 style="margin:18px 0 8px;color:#ffffff;font-size:30px;line-height:1.15;font-weight:800;">Be part of Nigeria's energy future</h1>
          <p style="margin:0;color:#bbf7d0;font-size:15px;line-height:1.5;">The <strong style="color:${BRAND.gold};">${EVENT.name}</strong> · ${EVENT.date}</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:32px;">
          <p style="margin:0 0 16px;color:${BRAND.ink};font-size:15px;line-height:1.65;">
            ${greeting}
          </p>
          <p style="margin:0 0 16px;color:${BRAND.ink};font-size:15px;line-height:1.65;">
            The UNILAG Energy Club is opening its doors for its first flagship event, and we'd love for you to
            celebrate it with us.
          </p>
          <p style="margin:0 0 16px;color:${BRAND.ink};font-size:15px;line-height:1.65;">
            On <strong>16 July</strong>, we're hosting the <strong>Grand Finale of Energy Transition 360 (ET360°)</strong>
            at the Multipurpose Hall, University of Lagos.
          </p>
          <p style="margin:0 0 16px;color:${BRAND.ink};font-size:15px;line-height:1.65;">
            It brings together professionals, students, policymakers, and industry leaders for an honest look at
            where Nigeria's energy is heading and the opportunities opening up across the sector.
          </p>
          <p style="margin:0 0 22px;color:${BRAND.ink};font-size:15px;line-height:1.65;">
            It's <strong>free and open to everyone</strong>. Come listen, ask questions, and meet people who care
            about the future of energy. <strong>Registration is compulsory and takes less than a minute.</strong>
          </p>

          <!-- Details -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border:1px solid ${BRAND.line};border-radius:12px;padding:6px 20px;margin:0 0 24px;">
            ${detailRow('Date', EVENT.date)}
            ${detailRow('Doors open', EVENT.doors)}
            ${detailRow('Venue', EVENT.venue)}
            ${detailRow('Admission', EVENT.admission, true)}
          </table>

          <!-- CTA -->
          <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:0 auto 10px;">
            <tr><td align="center" style="border-radius:999px;background:${BRAND.gold};">
              <a href="${EVENT.registerUrl}" style="display:inline-block;padding:15px 34px;font-size:15px;font-weight:800;color:${BRAND.green};text-decoration:none;border-radius:999px;">Register Free →</a>
            </td></tr>
          </table>
          <p style="margin:14px 0 0;color:${BRAND.muted};font-size:13px;line-height:1.6;text-align:center;">
            Or visit <a href="${EVENT.siteUrl}" style="color:${BRAND.greenMid};font-weight:700;text-decoration:none;">unilagenergyclub.com</a>, and please share this with a friend.
          </p>
        </td></tr>

        <!-- Photo carousel (animated GIF; first frame shows in clients that don't animate) -->
        <tr><td style="padding:0 0 4px;background:#ffffff;" align="center">
          <p style="margin:0 0 12px;color:${BRAND.muted};font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">Moments from ET360° Bootcamp</p>
          <a href="${EVENT.registerUrl}" style="text-decoration:none;">
            <img src="${EVENT.gallery}" width="600" alt="Moments from ET360° Bootcamp: students, professionals and future energy leaders" style="display:block;width:100%;max-width:600px;height:auto;border:0;" />
          </a>
        </td></tr>

        <!-- Footer with socials -->
        <tr><td style="background:${BRAND.green};padding:26px 32px;" align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:0 auto 18px;">
            <tr><td align="center" style="border-radius:999px;background:#25D366;">
              <a href="https://chat.whatsapp.com/J43sFbDAAF8FuQMjLkPkPz" style="display:inline-block;padding:12px 24px;font-size:13px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:999px;">Join the transition team for more updates 🔥</a>
            </td></tr>
          </table>
          <p style="margin:0 0 6px;color:#ffffff;font-size:14px;font-weight:700;">UNILAG Energy Club</p>
          <p style="margin:0 0 12px;color:#86efac;font-size:12px;line-height:1.6;">
            Questions? <a href="mailto:${EVENT.contact}" style="color:${BRAND.gold};text-decoration:none;">${EVENT.contact}</a>
          </p>
          <p style="margin:0 0 12px;color:#bbf7d0;font-size:13px;">
            ${socialLink(EVENT.instagram, 'Instagram')}
            <span style="color:#4ade80;">&nbsp;·&nbsp;</span>
            ${socialLink(EVENT.linkedin, 'LinkedIn')}
            <span style="color:#4ade80;">&nbsp;·&nbsp;</span>
            ${socialLink(EVENT.x, 'X (Twitter)')}
          </p>
          <p style="margin:0;color:#4ade80;font-size:11px;">© 2026 UNILAG Energy Club · #JoinTheTransition</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}
