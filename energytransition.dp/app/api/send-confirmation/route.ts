import { NextRequest, NextResponse } from 'next/server'
import { confirmationHtml, confirmationSubject } from '@/lib/confirmationEmail'

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

    const webhookUrl = (process.env.N8N_EMAIL_WEBHOOK || '').trim()
    // The .env var is spelled EMAIL_SECERET; also accept the corrected spelling.
    const secret = (process.env.EMAIL_SECERET || process.env.EMAIL_SECRET || '').trim()

    if (!webhookUrl) {
      console.error('[send-confirmation] N8N_EMAIL_WEBHOOK is not configured')
      return NextResponse.json(
        { error: 'Email service is not configured.' },
        { status: 500, headers: CORS_HEADERS }
      )
    }

    // n8n "Process Template with Variables" node expects { template, variables }.
    // We render the full HTML server-side and pass it through as the body.
    const payload = {
      template: {
        to: email,
        subject: confirmationSubject(),
        body: confirmationHtml(name),
        isHtml: true,
      },
      variables: {},
    }

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Header name configured on the n8n Header Auth credential.
        ...(secret ? { EMAIL_SECRET: secret } : {}),
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      console.error('[send-confirmation] webhook failed', res.status, detail.slice(0, 300))
      return NextResponse.json(
        { error: 'Failed to send confirmation email.' },
        { status: 502, headers: CORS_HEADERS }
      )
    }

    return NextResponse.json({ ok: true }, { headers: CORS_HEADERS })
  } catch (err) {
    console.error('[send-confirmation] unexpected error', err)
    return NextResponse.json(
      { error: 'Unexpected error sending confirmation email.' },
      { status: 500, headers: CORS_HEADERS }
    )
  }
}
