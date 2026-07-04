// ─────────────────────────────────────────────────────────────────────────────
// Shared transactional mailer for the ET360° Grand Finale.
//
// Delivery priority: n8n (Gmail) FIRST; if that fails or isn't configured, fall
// back to Resend. A send is considered successful the moment either path accepts
// the message. Both the confirmation and reminder routes go through here so the
// failover behaviour is identical everywhere.
// ─────────────────────────────────────────────────────────────────────────────

export type MailChannel = 'n8n' | 'resend'

export interface MailResult {
  ok: boolean
  via: MailChannel | null
  // Per-channel outcome for logging/debugging (skipped | ok | failed + reason).
  attempts: { channel: MailChannel; ok: boolean; detail?: string }[]
}

const RESEND_ENDPOINT = 'https://api.resend.com/emails'
const DEFAULT_FROM = 'UNILAG Energy Club <noreply@unilagenergyclub.com>'

/** Primary channel: the n8n webhook that sends through Gmail. */
async function sendViaN8n(to: string, subject: string, html: string): Promise<boolean> {
  const webhookUrl = (process.env.N8N_EMAIL_WEBHOOK || '').trim()
  // The site .env spells the secret EMAIL_SECERET; accept the corrected spelling too.
  const secret = (process.env.EMAIL_SECERET || process.env.EMAIL_SECRET || '').trim()
  if (!webhookUrl) throw new Error('N8N_EMAIL_WEBHOOK not configured')

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Header name configured on the n8n Header Auth credential.
      ...(secret ? { EMAIL_SECRET: secret } : {}),
    },
    body: JSON.stringify({
      template: { to, subject, body: html, isHtml: true },
      variables: {},
    }),
  })
  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`n8n webhook ${res.status}: ${detail.slice(0, 200)}`)
  }
  return true
}

/** Fallback channel: Resend transactional API (verified domain sender). */
async function sendViaResend(to: string, subject: string, html: string): Promise<boolean> {
  const apiKey = (process.env.RESEND_API_KEY || '').trim()
  const from = (process.env.RESEND_FROM || DEFAULT_FROM).trim()
  if (!apiKey) throw new Error('RESEND_API_KEY not configured')

  const res = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ from, to: [to], subject, html }),
  })
  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`resend ${res.status}: ${detail.slice(0, 200)}`)
  }
  return true
}

/**
 * Send one email, trying n8n first and falling back to Resend.
 * Never throws — inspect the returned MailResult (`ok`, `via`, `attempts`).
 */
export async function sendEmail(to: string, subject: string, html: string): Promise<MailResult> {
  const attempts: MailResult['attempts'] = []

  const channels: [MailChannel, (t: string, s: string, h: string) => Promise<boolean>][] = [
    ['n8n', sendViaN8n],
    ['resend', sendViaResend],
  ]

  for (const [channel, fn] of channels) {
    try {
      await fn(to, subject, html)
      attempts.push({ channel, ok: true })
      return { ok: true, via: channel, attempts }
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err)
      attempts.push({ channel, ok: false, detail })
      console.error(`[mailer] ${channel} failed for ${to}: ${detail}`)
    }
  }

  return { ok: false, via: null, attempts }
}
