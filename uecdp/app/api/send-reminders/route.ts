import { NextRequest, NextResponse } from 'next/server'
import { getAdminPocketBase } from '@/lib/pocketbase'
import {
  ReminderType, reminderForDaysUntil, daysUntilEvent,
  reminderHtml, reminderSubject,
} from '@/lib/reminderEmails'
import { sendEmail } from '@/lib/mailer'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

// Representative "days until" used purely for rendering preview examples.
const PREVIEW_DAYS: Record<ReminderType, number> = {
  interval: 12, d7: 7, d3: 3, d1: 1, dayof: 0,
}
const ALL_TYPES: ReminderType[] = ['interval', 'd7', 'd3', 'd1', 'dayof']

function authorized(req: NextRequest): boolean {
  const expected = (
    process.env.REMINDER_SECRET ||
    process.env.EMAIL_SECERET ||
    process.env.EMAIL_SECRET ||
    ''
  ).trim()
  if (!expected) return false
  const h = req.headers
  const got = (
    h.get('x-reminder-secret') ||
    h.get('email_secret') ||
    (h.get('authorization') || '').replace(/^Bearer\s+/i, '') ||
    ''
  ).trim()
  return got === expected
}

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)

export async function POST(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({} as Record<string, unknown>))

  // ── Preview mode: send example(s) to a chosen address ──────────────────────
  const previewAll = body?.previewAll === true
  const previewType = typeof body?.preview === 'string' ? (body.preview as string) : ''
  if (previewAll || previewType) {
    const to = typeof body?.to === 'string' ? body.to.trim() : ''
    if (!to || !isEmail(to)) {
      return NextResponse.json({ error: 'A valid `to` email is required for preview.' }, { status: 400 })
    }
    const types: ReminderType[] = previewAll
      ? ALL_TYPES
      : (ALL_TYPES.includes(previewType as ReminderType) ? [previewType as ReminderType] : [])
    if (types.length === 0) {
      return NextResponse.json({ error: `Unknown preview type. Use one of: ${ALL_TYPES.join(', ')} or previewAll.` }, { status: 400 })
    }
    // Optional sample name for the preview greeting; empty renders the no-name variant.
    const sampleName = typeof body?.name === 'string' ? body.name.trim() : ''
    const sent: string[] = []
    for (const t of types) {
      const days = PREVIEW_DAYS[t]
      const { ok } = await sendEmail(to, `[Preview] ${reminderSubject(t, days)}`, reminderHtml(t, sampleName, days))
      if (ok) sent.push(t)
    }
    return NextResponse.json({ ok: true, preview: true, to, sent })
  }

  // ── Batch mode: today's scheduled reminder to all registrants ──────────────
  // Optional override `days` for testing which reminder would fire.
  const override = typeof body?.days === 'number' ? (body.days as number) : null
  const days = override ?? daysUntilEvent(Date.now())
  const type = reminderForDaysUntil(days)

  if (!type) {
    return NextResponse.json({ ok: true, sent: 0, days, reason: 'No reminder scheduled for today.' })
  }

  let registrants: { email: string; full_name: string }[]
  try {
    const pb = await getAdminPocketBase()
    registrants = await pb
      .collection('et360_finale_registrations')
      .getFullList<{ email: string; full_name: string }>({ fields: 'email,full_name' })
  } catch (err) {
    console.error('[send-reminders] failed to load registrants', err)
    return NextResponse.json({ error: 'Could not load registrants.' }, { status: 502 })
  }

  const subject = reminderSubject(type, days)
  let sent = 0
  let failed = 0
  const seen = new Set<string>()

  for (const r of registrants) {
    const email = (r.email || '').trim()
    if (!email || !isEmail(email) || seen.has(email.toLowerCase())) continue
    seen.add(email.toLowerCase())
    try {
      const { ok } = await sendEmail(email, subject, reminderHtml(type, r.full_name, days))
      ok ? sent++ : failed++
    } catch {
      failed++
    }
  }

  return NextResponse.json({ ok: true, type, days, total: registrants.length, sent, failed })
}
