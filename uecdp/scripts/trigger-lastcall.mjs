#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// Monday-morning trigger (Railway Cron) for the ET360° "last call" email.
// POSTs /uecdp/api/send-lastcall, which — only on the configured send date —
// emails invited people who still haven't registered (a batch per run) via the
// Plunk-first mailer chain. Fire it several times that morning; the endpoint is
// idempotent (lastcall_sent_at) and no-ops on every other day.
//
// Env: LASTCALL_URL (default direct DP url) + REMINDER_SECRET.
// ─────────────────────────────────────────────────────────────────────────────
const url = process.env.LASTCALL_URL || 'https://uec-dp.up.railway.app/uecdp/api/send-lastcall'
const secret = (process.env.REMINDER_SECRET || process.env.EMAIL_SECRET || process.env.EMAIL_SECERET || '').trim()
if (!secret) { console.error('[lastcall] No REMINDER_SECRET configured — aborting.'); process.exit(1) }

const controller = new AbortController()
const timeout = setTimeout(() => controller.abort(), 9 * 60 * 1000)
try {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-reminder-secret': secret },
    body: '{}',
    signal: controller.signal,
  })
  console.log(`[lastcall] ${res.status} ${await res.text()}`)
  if (!res.ok) process.exit(1)
} catch (err) {
  console.error('[lastcall] request failed:', err?.message || err)
  process.exit(1)
} finally {
  clearTimeout(timeout)
}
