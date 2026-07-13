import { NextRequest, NextResponse } from 'next/server'
import { getAdminPocketBase } from '@/lib/pocketbase'
import { lastCallHtml, lastCallSubject } from '@/lib/lastCallEmail'
import { sendEmail, type MailChannel } from '@/lib/mailer'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 300

// Only send on this Africa/Lagos date (Monday). Safety so the cron can fire on a
// schedule without ever mailing before or after the intended day.
const SEND_DATE = process.env.LASTCALL_DATE || '2026-07-13'
// Records processed per invocation — keep the request within maxDuration. The cron
// fires several times that morning; idempotency (lastcall_sent_at) drains the pool.
const LIMIT = 400
const WAT = 60 * 60 * 1000
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)

function authorized(req: NextRequest): boolean {
  const expected = (process.env.REMINDER_SECRET || process.env.EMAIL_SECERET || process.env.EMAIL_SECRET || '').trim()
  if (!expected) return false
  const h = req.headers
  const got = (h.get('x-reminder-secret') || h.get('email_secret') || (h.get('authorization') || '').replace(/^Bearer\s+/i, '') || '').trim()
  return got === expected
}

export async function POST(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

  const todayWat = new Date(Date.now() + WAT).toISOString().slice(0, 10)
  if (todayWat !== SEND_DATE) {
    return NextResponse.json({ ok: true, skipped: true, reason: 'not the send date', today: todayWat, sendDate: SEND_DATE })
  }

  const pb = await getAdminPocketBase()

  // Everyone already registered — exclude them (computed live at send time).
  const regs = await pb.collection('et360_finale_registrations').getFullList<{ email: string }>({ fields: 'email' })
  const registered = new Set(regs.map((r) => (r.email || '').trim().toLowerCase()))

  // Next batch of invited people who haven't had the last-call yet.
  const page = await pb.collection('invite_queue').getList<{ id: string; email: string; first_name: string }>(1, LIMIT, {
    filter: 'lastcall_sent_at = ""',
  })

  const stamp = () => new Date().toISOString()
  let sent = 0, skippedRegistered = 0, invalid = 0, failed = 0
  const via: Partial<Record<MailChannel, number>> = {}

  for (const rec of page.items) {
    const email = (rec.email || '').trim()
    if (!email || !isEmail(email)) {
      invalid++
      await pb.collection('invite_queue').update(rec.id, { lastcall_sent_at: stamp() }).catch(() => {})
      continue
    }
    if (registered.has(email.toLowerCase())) {
      skippedRegistered++
      await pb.collection('invite_queue').update(rec.id, { lastcall_sent_at: stamp() }).catch(() => {})
      continue
    }
    const r = await sendEmail(email, lastCallSubject(), lastCallHtml(rec.first_name || ''))
    if (r.ok) {
      sent++
      if (r.via) via[r.via] = (via[r.via] || 0) + 1
      await pb.collection('invite_queue').update(rec.id, { lastcall_sent_at: stamp() }).catch(() => {})
    } else {
      failed++ // leave lastcall_sent_at empty so the next run retries this person
    }
    await sleep(250)
  }

  return NextResponse.json({
    ok: true,
    date: todayWat,
    processed: page.items.length,
    pendingBefore: page.totalItems,
    sent,
    skippedRegistered,
    invalid,
    failed,
    via,
  })
}
