#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// Daily reminder trigger for the ET360° Grand Finale — run by Railway Cron.
//
// Set a Cron Schedule of "0 8 * * *" (08:00 UTC = 09:00 Africa/Lagos) on a Railway
// service that runs `npm run send-reminders`. This POSTs the hosted app's own
// /uecdp/api/send-reminders endpoint, which decides whether today is a reminder day
// — every 3 days while >7 days out, then the 7-day, 3-day, 1-day and morning-of
// reminders — and emails every registrant through the failover mailer
// (n8n primary → n8n secondary → Resend). No n8n scheduler involved.
//
// Env:
//   REMINDERS_URL   default https://uec-dp.up.railway.app/uecdp/api/send-reminders
//                   (the DP service directly — bypasses Cloudflare header stripping)
//   REMINDER_SECRET (or EMAIL_SECRET / EMAIL_SECERET) — shared reminder auth secret
// ─────────────────────────────────────────────────────────────────────────────

const url = process.env.REMINDERS_URL || 'https://uec-dp.up.railway.app/uecdp/api/send-reminders'
const secret = (process.env.REMINDER_SECRET || process.env.EMAIL_SECRET || process.env.EMAIL_SECERET || '').trim()

if (!secret) {
  console.error('[reminders] No REMINDER_SECRET / EMAIL_SECRET configured — aborting.')
  process.exit(1)
}

const controller = new AbortController()
const timeout = setTimeout(() => controller.abort(), 5 * 60 * 1000) // batch can be large

try {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Hyphenated header survives Cloudflare too, in case REMINDERS_URL is the www host.
      'x-reminder-secret': secret,
    },
    body: '{}',
    signal: controller.signal,
  })
  const text = await res.text()
  console.log(`[reminders] ${res.status} ${text}`)
  if (!res.ok) process.exit(1)
} catch (err) {
  console.error('[reminders] request failed:', err?.message || err)
  process.exit(1)
} finally {
  clearTimeout(timeout)
}
