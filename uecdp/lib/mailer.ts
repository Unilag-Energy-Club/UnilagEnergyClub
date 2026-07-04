// ─────────────────────────────────────────────────────────────────────────────
// Shared transactional mailer for the ET360° Grand Finale.
//
// Delivery priority (each tried in order until one accepts the message):
//   1. n8n primary webhook   (Gmail)
//   2. n8n secondary webhook (Gmail, different n8n instance — resilience)
//   3. Resend                (transactional API, verified domain)
// A send is successful the moment any channel accepts it. Both the confirmation
// and reminder routes go through here so failover behaves identically everywhere.
// ─────────────────────────────────────────────────────────────────────────────

export type MailChannel = 'n8n' | 'n8n-2' | 'resend'

export interface MailResult {
  ok: boolean
  via: MailChannel | null
  // Per-channel outcome for logging/debugging (ok, or failed + reason).
  attempts: { channel: MailChannel; ok: boolean; detail?: string }[]
}

const RESEND_ENDPOINT = 'https://api.resend.com/emails'
const DEFAULT_FROM = 'UNILAG Energy Club <noreply@unilagenergyclub.com>'
// Secondary n8n instance; overridable via env for future rotation.
const DEFAULT_N8N_WEBHOOK_2 = 'https://n8n.shinzii.me/webhook/email-send-uec'

// The site .env spells the secret EMAIL_SECERET; accept the corrected spelling too.
// Both n8n webhooks are guarded by the same Header Auth secret.
function n8nSecret(): string {
  return (process.env.EMAIL_SECERET || process.env.EMAIL_SECRET || '').trim()
}

/** POST the shared { template, variables } payload to an n8n Gmail webhook. */
async function postToN8n(webhookUrl: string, to: string, subject: string, html: string): Promise<boolean> {
  const secret = n8nSecret()
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
    throw new Error(`${res.status}: ${detail.slice(0, 200)}`)
  }
  return true
}

/** Channel 1 — primary n8n webhook. */
async function sendViaN8n(to: string, subject: string, html: string): Promise<boolean> {
  const webhookUrl = (process.env.N8N_EMAIL_WEBHOOK || '').trim()
  if (!webhookUrl) throw new Error('N8N_EMAIL_WEBHOOK not configured')
  return postToN8n(webhookUrl, to, subject, html)
}

/** Channel 2 — secondary n8n webhook (different instance) before falling back to Resend. */
async function sendViaN8n2(to: string, subject: string, html: string): Promise<boolean> {
  const webhookUrl = (process.env.N8N_EMAIL_WEBHOOK_2 || DEFAULT_N8N_WEBHOOK_2).trim()
  if (!webhookUrl) throw new Error('N8N_EMAIL_WEBHOOK_2 not configured')
  return postToN8n(webhookUrl, to, subject, html)
}

/** Channel 3 — Resend transactional API (verified domain sender). */
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
 * Send one email, trying each channel in priority order until one accepts it:
 * n8n primary → n8n secondary → Resend.
 * Never throws — inspect the returned MailResult (`ok`, `via`, `attempts`).
 */
export async function sendEmail(to: string, subject: string, html: string): Promise<MailResult> {
  const attempts: MailResult['attempts'] = []

  const channels: [MailChannel, (t: string, s: string, h: string) => Promise<boolean>][] = [
    ['n8n', sendViaN8n],
    ['n8n-2', sendViaN8n2],
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
