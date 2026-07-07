import { NextRequest, NextResponse } from 'next/server'
import { getAdminPocketBase } from '@/lib/pocketbase'
import { inviteHtml, inviteSubject } from '@/lib/inviteEmail'
import { confirmationHtml, confirmationSubject } from '@/lib/confirmationEmail'
import { sendGmail, sendResendOnly } from '@/lib/mailer'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 300

// Daily drip budget (respects Gmail ~500/day and Resend free 100/day).
const GMAIL_PER_DAY = 250
const RESEND_PER_DAY = 100
const PER_DAY = GMAIL_PER_DAY + RESEND_PER_DAY
// Only backfill confirmations for registrations from this date onward (avoids
// re-mailing the ~1200 historical registrants whose confirmations already went out).
const CONFIRM_BACKFILL_FROM = process.env.CONFIRM_BACKFILL_FROM || '2026-07-07 00:00:00'

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

  const result: Record<string, unknown> = {}
  let pb
  try {
    pb = await getAdminPocketBase()
  } catch (err) {
    return NextResponse.json({ error: 'PocketBase auth failed', detail: err instanceof Error ? err.message : String(err) }, { status: 502 })
  }

  // ── 1) Invite drip: next PER_DAY pending from the queue; 250 Gmail + 100 Resend ──
  try {
    const page = await pb.collection('invite_queue').getList<{ id: string; email: string; first_name: string }>(1, PER_DAY, {
      filter: 'sent = false',
      sort: 'created',
    })
    const subject = inviteSubject()
    let gmail = 0, resend = 0, failed = 0
    const items = page.items
    for (let i = 0; i < items.length; i++) {
      const rec = items[i]
      const email = (rec.email || '').trim()
      if (!email || !isEmail(email)) continue
      const html = inviteHtml(rec.first_name || '')
      const preferGmail = i < GMAIL_PER_DAY
      let ok = preferGmail ? await sendGmail(email, subject, html) : await sendResendOnly(email, subject, html)
      let via = preferGmail ? 'gmail' : 'resend'
      if (!ok) { // cross-fallback so a hiccup doesn't drop anyone this run
        ok = preferGmail ? await sendResendOnly(email, subject, html) : await sendGmail(email, subject, html)
        via = preferGmail ? 'resend' : 'gmail'
      }
      if (ok) {
        via === 'gmail' ? gmail++ : resend++
        await pb.collection('invite_queue').update(rec.id, { sent: true, sent_at: new Date().toISOString(), channel: via }).catch(() => {})
      } else failed++
      await sleep(preferGmail ? 500 : 600)
    }
    result.invites = { totalRemaining: page.totalItems, batch: items.length, sent: gmail + resend, gmail, resend, failed }
  } catch (err) {
    result.invites = { error: err instanceof Error ? err.message : String(err) }
  }

  // ── 2) Confirmation retry: registrants (from cutoff) with no confirmation yet ──
  try {
    const pending = await pb.collection('et360_finale_registrations').getFullList<{ id: string; email: string; full_name: string }>({
      filter: `created >= "${CONFIRM_BACKFILL_FROM}" && confirmation_sent_at = ""`,
      fields: 'id,email,full_name',
    })
    let sent = 0, failed = 0
    for (const r of pending) {
      const email = (r.email || '').trim()
      if (!email || !isEmail(email)) continue
      const html = confirmationHtml(r.full_name)
      let ok = await sendGmail(email, confirmationSubject(), html)
      if (!ok) ok = await sendResendOnly(email, confirmationSubject(), html)
      if (ok) {
        sent++
        await pb.collection('et360_finale_registrations').update(r.id, { confirmation_sent_at: new Date().toISOString() }).catch(() => {})
      } else failed++
      await sleep(500)
    }
    result.confirmationRetry = { pending: pending.length, sent, failed }
  } catch (err) {
    result.confirmationRetry = { error: err instanceof Error ? err.message : String(err) }
  }

  return NextResponse.json({ ok: true, ...result })
}
