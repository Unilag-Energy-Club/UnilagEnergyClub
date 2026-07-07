import { NextRequest, NextResponse } from 'next/server'
import { confirmationHtml, confirmationSubject } from '@/lib/confirmationEmail'
import { sendEmail } from '@/lib/mailer'
import { getAdminPocketBase } from '@/lib/pocketbase'

// Best-effort: stamp the registration so the daily backfill knows this person's
// confirmation already went out (and won't re-send it). Never blocks the response.
async function markConfirmed(email: string): Promise<void> {
  try {
    const pb = await getAdminPocketBase()
    const rec = await pb.collection('et360_finale_registrations').getFirstListItem(`email = "${email}"`, { sort: '-created' })
    if (rec && !rec.confirmation_sent_at) {
      await pb.collection('et360_finale_registrations').update(rec.id, { confirmation_sent_at: new Date().toISOString() })
    }
  } catch { /* field may not exist yet / lookup failed — backfill is the safety net */ }
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// CORS: in production the SPA and this service share the same origin (Caddy
// proxies /uecdp/*), so these headers are belt-and-suspenders for any cross-origin
// dev/preview calls. The endpoint only triggers an email — no sensitive data is read.
const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

const isValidEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const name = typeof body?.name === 'string' ? body.name.trim() : ''
    const email = typeof body?.email === 'string' ? body.email.trim() : ''

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'A valid email is required.' },
        { status: 400, headers: CORS_HEADERS }
      )
    }

    // Render the branded HTML server-side, then send via the shared mailer:
    // n8n (Gmail) first, Resend as automatic fallback.
    const result = await sendEmail(email, confirmationSubject(), confirmationHtml(name))

    if (!result.ok) {
      console.error('[send-confirmation] all channels failed', JSON.stringify(result.attempts))
      return NextResponse.json(
        { error: 'Failed to send confirmation email.' },
        { status: 502, headers: CORS_HEADERS }
      )
    }

    await markConfirmed(email)
    return NextResponse.json({ ok: true, via: result.via }, { headers: CORS_HEADERS })
  } catch (err) {
    console.error('[send-confirmation] unexpected error', err)
    return NextResponse.json(
      { error: 'Unexpected error sending confirmation email.' },
      { status: 500, headers: CORS_HEADERS }
    )
  }
}
