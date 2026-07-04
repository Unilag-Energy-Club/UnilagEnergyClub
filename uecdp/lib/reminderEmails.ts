// ─────────────────────────────────────────────────────────────────────────────
// Automated reminder emails for ET360° Grand Finale registrants.
// Email-client–safe HTML (tables + inline styles). Five variants + a schedule.
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
  // Local event day (Africa/Lagos, UTC+1).
  dateISO: '2026-07-16',
  dateLong: 'Thursday, 16 July 2026',
  doors: '9:00 AM',
  venue: 'Multipurpose Hall, University of Lagos',
  admission: 'Free · Open to all',
  contact: 'unilagenergyclub@gmail.com',
  siteUrl: 'https://www.unilagenergyclub.com/et360/finale',
  mapUrl: 'https://maps.google.com/?q=Multipurpose+Hall+University+of+Lagos+Akoka',
}

export type ReminderType = 'interval' | 'd7' | 'd3' | 'd1' | 'dayof'

/**
 * Given whole days until the event, decide which reminder (if any) goes out today.
 * - milestones at 7, 3, 1, and day-of (0)
 * - otherwise a light "countdown" every 3 days while still more than a week out
 * Returns null on days with no scheduled reminder (and after the event).
 */
export function reminderForDaysUntil(days: number): ReminderType | null {
  if (days < 0) return null
  if (days === 0) return 'dayof'
  if (days === 1) return 'd1'
  if (days === 3) return 'd3'
  if (days === 7) return 'd7'
  if (days > 7 && days % 3 === 0) return 'interval'
  return null
}

/** Whole days from `now` (ms) until the event day, in Africa/Lagos (UTC+1). */
export function daysUntilEvent(nowMs: number): number {
  const WAT = 60 * 60 * 1000 // +01:00, no DST in Nigeria
  const todayWat = new Date(nowMs + WAT).toISOString().slice(0, 10)
  const a = Date.parse(`${todayWat}T00:00:00Z`)
  const b = Date.parse(`${EVENT.dateISO}T00:00:00Z`)
  return Math.round((b - a) / (24 * 60 * 60 * 1000))
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

interface Copy {
  chip: string
  heading: (first: string) => string
  lead: string
  showLogistics: boolean
}

function copyFor(type: ReminderType, days: number): Copy {
  switch (type) {
    case 'dayof':
      return {
        chip: 'Today',
        heading: (f) => `It's today${f ? `, ${f}` : ''}! ☀️`,
        lead: `The ET360° Grand Finale is happening today. Doors open at <strong>${EVENT.doors}</strong> — come early, settle in, and let's talk about the future of energy in Nigeria.`,
        showLogistics: true,
      }
    case 'd1':
      return {
        chip: 'Tomorrow',
        heading: (f) => `See you tomorrow${f ? `, ${f}` : ''}! 🎉`,
        lead: `Just one more sleep. The Grand Finale is <strong>tomorrow</strong> — here's everything you need so you can walk straight in.`,
        showLogistics: true,
      }
    case 'd3':
      return {
        chip: '3 days to go',
        heading: (f) => `3 days left${f ? `, ${f}` : ''} ⏳`,
        lead: `The Grand Finale is just <strong>3 days away</strong>. Add it to your calendar if you haven't, and tell a friend — entry is free and open to all.`,
        showLogistics: false,
      }
    case 'd7':
      return {
        chip: 'One week to go',
        heading: (f) => `One week to go${f ? `, ${f}` : ''} 🗓️`,
        lead: `We're now <strong>7 days out</strong> from the ET360° Grand Finale. A room full of professionals, students, and industry leaders — and a real conversation about where Nigeria's energy is heading.`,
        showLogistics: false,
      }
    case 'interval':
    default:
      return {
        chip: `${days} days to go`,
        heading: (f) => `${days} days to the Grand Finale${f ? `, ${f}` : ''}`,
        lead: `Just a friendly countdown — the ET360° Grand Finale is <strong>${days} days away</strong>. We're looking forward to hosting you.`,
        showLogistics: false,
      }
  }
}

export function reminderSubject(type: ReminderType, days: number): string {
  switch (type) {
    case 'dayof': return `Today: ${EVENT.name} — doors ${EVENT.doors} ☀️`
    case 'd1': return `Tomorrow: ${EVENT.name} 🎉`
    case 'd3': return `3 days to the ${EVENT.name} ⏳`
    case 'd7': return `One week to the ${EVENT.name} 🗓️`
    default: return `${days} days to the ${EVENT.name}`
  }
}

export function reminderHtml(type: ReminderType, fullName: string, days: number): string {
  const name = escapeHtml((fullName || '').trim())
  const first = name ? name.split(/\s+/)[0] : ''
  const c = copyFor(type, days)

  const detailRow = (label: string, value: string, accent = false) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${BRAND.line};">
        <span style="display:block;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:${BRAND.muted};font-weight:700;">${label}</span>
        <span style="display:block;font-size:15px;color:${accent ? BRAND.greenMid : BRAND.ink};font-weight:${accent ? 700 : 600};margin-top:2px;">${value}</span>
      </td>
    </tr>`

  const logisticsBlock = c.showLogistics
    ? `<table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:4px auto 0;">
         <tr><td align="center" style="border-radius:999px;background:${BRAND.green};">
           <a href="${EVENT.mapUrl}" style="display:inline-block;padding:12px 26px;font-size:13px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:999px;">Get Directions →</a>
         </td></tr>
       </table>`
    : ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${EVENT.name}</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${c.chip} — ${EVENT.name}, ${EVENT.dateLong}.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.06);">

        <tr><td align="center" style="background:#ffffff;padding:26px 24px 6px;">
          <img src="${BRAND.logo}" alt="UNILAG Energy Club" width="56" height="56" style="display:block;border:0;width:56px;height:auto;" />
        </td></tr>
        <tr><td align="center" style="padding:0 24px 16px;">
          <span style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:${BRAND.muted};font-weight:700;">UNILAG Energy Club</span>
        </td></tr>

        <tr><td style="background:${BRAND.green};padding:34px 32px;" align="center">
          <span style="display:inline-block;background:rgba(233,194,2,.15);color:${BRAND.gold};font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:6px 14px;border-radius:999px;">${c.chip}</span>
          <h1 style="margin:16px 0 6px;color:#ffffff;font-size:28px;line-height:1.15;font-weight:800;">${c.heading(first)}</h1>
          <p style="margin:0;color:#bbf7d0;font-size:14px;line-height:1.5;">${EVENT.dateLong}</p>
        </td></tr>

        <tr><td style="padding:30px 32px;">
          <p style="margin:0 0 18px;color:${BRAND.ink};font-size:15px;line-height:1.65;">${c.lead}</p>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border:1px solid ${BRAND.line};border-radius:12px;padding:6px 20px;margin:0 0 22px;">
            ${detailRow('Date', EVENT.dateLong)}
            ${detailRow('Doors open', EVENT.doors)}
            ${detailRow('Venue', EVENT.venue)}
            ${detailRow('Admission', EVENT.admission, true)}
          </table>

          <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:0 auto 12px;">
            <tr><td align="center" style="border-radius:999px;background:${BRAND.gold};">
              <a href="${EVENT.siteUrl}" style="display:inline-block;padding:14px 30px;font-size:14px;font-weight:700;color:${BRAND.green};text-decoration:none;border-radius:999px;">View Event Details →</a>
            </td></tr>
          </table>
          ${logisticsBlock}
        </td></tr>

        <tr><td style="background:${BRAND.green};padding:24px 32px;" align="center">
          <p style="margin:0 0 6px;color:#ffffff;font-size:14px;font-weight:700;">UNILAG Energy Club</p>
          <p style="margin:0 0 10px;color:#86efac;font-size:12px;line-height:1.6;">Questions? <a href="mailto:${EVENT.contact}" style="color:${BRAND.gold};text-decoration:none;">${EVENT.contact}</a></p>
          <p style="margin:0;color:#4ade80;font-size:11px;">© 2026 UNILAG Energy Club · #JoinTheTransition</p>
        </td></tr>

      </table>
      <p style="margin:14px 0 0;color:#9ca3af;font-size:11px;line-height:1.5;">You're receiving this because you registered for the ${EVENT.name}.</p>
    </td></tr>
  </table>
</body>
</html>`
}
