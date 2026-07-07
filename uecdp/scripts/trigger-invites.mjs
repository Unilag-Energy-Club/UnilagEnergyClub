#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// Daily 10:00-WAT trigger (Railway Cron) for the ET360° invitation drip.
// POSTs /uecdp/api/send-invites, which sends today's slice of the remaining
// invitations (250 via Gmail + 100 via Resend) and retries any registration
// confirmations that failed under the daily limits. Stops on its own once the
// invite queue is exhausted.
//
// Env: REMINDERS_URL_INVITES (default direct DP url) + REMINDER_SECRET.
// ─────────────────────────────────────────────────────────────────────────────
const url = process.env.INVITES_URL || 'https://uec-dp.up.railway.app/uecdp/api/send-invites'
const secret = (process.env.REMINDER_SECRET || process.env.EMAIL_SECRET || process.env.EMAIL_SECERET || '').trim()
if (!secret) { console.error('[invites] No REMINDER_SECRET configured — aborting.'); process.exit(1) }

const controller = new AbortController()
const timeout = setTimeout(() => controller.abort(), 9 * 60 * 1000) // large batch
try {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-reminder-secret': secret },
    body: '{}',
    signal: controller.signal,
  })
  console.log(`[invites] ${res.status} ${await res.text()}`)
  if (!res.ok) process.exit(1)
} catch (err) {
  console.error('[invites] request failed:', err?.message || err)
  process.exit(1)
} finally {
  clearTimeout(timeout)
}
