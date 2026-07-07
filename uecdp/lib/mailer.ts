// ─────────────────────────────────────────────────────────────────────────────
// Shared transactional mailer for the ET360° Grand Finale.
//
// Delivery priority (each tried in order until one accepts the message):
//   1. n8n primary webhook   (Gmail)
//   2. n8n secondary webhook (Gmail, different n8n instance — resilience)
//   3. Resend                (transactional API, verified domain, 100/day free)
//   4. Plunk                 (transactional API, ~3000/month free — last resort)
// A send is successful the moment any channel accepts it.
//
// Two entry points:
//   • sendEmail(...)        — one-off send; always tries channels in fixed order.
//   • createBulkSender(...) — for blasting many emails (interval reminders). It
//     remembers channel health across the batch: a channel that fails is put on a
//     short cooldown and skipped, so a dead source isn't re-hit for every message —
//     the batch flows through whichever channel is up, and re-probes periodically.
// ─────────────────────────────────────────────────────────────────────────────

export type MailChannel = 'n8n' | 'n8n-2' | 'resend' | 'plunk'

export interface MailResult {
  ok: boolean
  via: MailChannel | null
  // Per-channel outcome for logging/debugging (ok, or failed + reason).
  attempts: { channel: MailChannel; ok: boolean; detail?: string }[]
}

type SendFn = (to: string, subject: string, html: string) => Promise<boolean>

const RESEND_ENDPOINT = 'https://api.resend.com/emails'
const PLUNK_ENDPOINT = 'https://next-api.useplunk.com/v1/send'
const DEFAULT_FROM = 'UNILAG Energy Club <noreply@unilagenergyclub.com>'
const DEFAULT_FROM_EMAIL = 'noreply@unilagenergyclub.com'
const DEFAULT_FROM_NAME = 'UNILAG Energy Club'
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

/** Last-resort channel: Plunk transactional API (generous free tier). */
async function sendViaPlunk(to: string, subject: string, html: string): Promise<boolean> {
  const apiKey = (process.env.PLUNK_API_KEY || '').trim()
  if (!apiKey) throw new Error('PLUNK_API_KEY not configured')
  const from = (process.env.PLUNK_FROM || DEFAULT_FROM_EMAIL).trim()
  const name = (process.env.PLUNK_FROM_NAME || DEFAULT_FROM_NAME).trim()

  const res = await fetch(PLUNK_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ to, subject, body: html, from, name, subscribed: true }),
  })
  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`plunk ${res.status}: ${detail.slice(0, 200)}`)
  }
  return true
}

// Fixed priority order: n8n primary → n8n secondary → Resend → Plunk.
// Bulk sending reorders a *copy* of this by live health.
const CHANNELS: [MailChannel, SendFn][] = [
  ['n8n', sendViaN8n],
  ['n8n-2', sendViaN8n2],
  ['resend', sendViaResend],
  ['plunk', sendViaPlunk],
]

/** Try each channel in the given order; first acceptance wins. Never throws. */
async function attemptInOrder(
  order: [MailChannel, SendFn][],
  to: string,
  subject: string,
  html: string,
  onFail?: (channel: MailChannel) => void,
  onOk?: (channel: MailChannel) => void,
  logTag = 'mailer',
): Promise<MailResult> {
  const attempts: MailResult['attempts'] = []
  for (const [channel, fn] of order) {
    try {
      await fn(to, subject, html)
      attempts.push({ channel, ok: true })
      onOk?.(channel)
      return { ok: true, via: channel, attempts }
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err)
      attempts.push({ channel, ok: false, detail })
      onFail?.(channel)
      console.error(`[${logTag}] ${channel} failed for ${to}: ${detail}`)
    }
  }
  return { ok: false, via: null, attempts }
}

/**
 * One-off send: n8n primary → n8n secondary → Resend, fixed order.
 * Never throws — inspect the returned MailResult (`ok`, `via`, `attempts`).
 */
export async function sendEmail(to: string, subject: string, html: string): Promise<MailResult> {
  return attemptInOrder(CHANNELS, to, subject, html)
}

/**
 * Channel-controlled senders for scheduled drips that must respect a fixed
 * per-channel daily budget (e.g. 250 via Gmail + 100 via Resend). Unlike
 * sendEmail(), these do NOT auto-fail-over — the caller decides fallback.
 */
export async function sendGmail(to: string, subject: string, html: string): Promise<boolean> {
  try { await sendViaN8n(to, subject, html); return true } catch { /* try secondary */ }
  try { await sendViaN8n2(to, subject, html); return true } catch { return false }
}
export async function sendResendOnly(to: string, subject: string, html: string): Promise<boolean> {
  try { await sendViaResend(to, subject, html); return true } catch { return false }
}

export interface BulkSender {
  send(to: string, subject: string, html: string): Promise<MailResult>
  stats(): {
    sent: number
    failed: number
    via: Record<MailChannel, number>
    cooldowns: Partial<Record<MailChannel, number>>
  }
}

/**
 * Adaptive sender for bulk runs (e.g. interval reminders to all registrants).
 *
 * Health model: channels keep their fixed priority order (n8n → n8n-2 → Resend).
 * On failure a channel is put on cooldown for `cooldownSends` subsequent messages
 * and moved to the back of the line, so a dead source isn't re-hit on every email.
 * After the cooldown it's re-probed — so when a higher-priority source recovers,
 * traffic returns to it. If every channel is cooling down, all are still tried (we
 * never silently drop a message).
 */
export function createBulkSender(opts: { cooldownSends?: number } = {}): BulkSender {
  const cooldownSends = opts.cooldownSends ?? 12
  let counter = 0
  let sent = 0
  let failed = 0
  const via: Record<MailChannel, number> = { 'n8n': 0, 'n8n-2': 0, 'resend': 0, 'plunk': 0 }
  const skipUntil = new Map<MailChannel, number>() // channel → counter value it's skipped until

  function orderFor(): [MailChannel, SendFn][] {
    const active: [MailChannel, SendFn][] = []
    const cooling: [MailChannel, SendFn][] = []
    for (const ch of CHANNELS) {
      if ((skipUntil.get(ch[0]) ?? 0) <= counter) active.push(ch)
      else cooling.push(ch)
    }
    // Healthy channels first in priority order; cooling ones appended as last resort.
    return [...active, ...cooling]
  }

  return {
    async send(to, subject, html) {
      counter++
      const result = await attemptInOrder(
        orderFor(),
        to,
        subject,
        html,
        (channel) => {
          // Cool this channel down: skip it for the next `cooldownSends` messages.
          skipUntil.set(channel, counter + cooldownSends)
        },
        (channel) => {
          skipUntil.delete(channel)
        },
        'mailer:bulk',
      )
      if (result.ok && result.via) {
        sent++
        via[result.via]++
      } else {
        failed++
      }
      return result
    },
    stats() {
      const cooldowns: Partial<Record<MailChannel, number>> = {}
      skipUntil.forEach((until, c) => {
        if (until > counter) cooldowns[c] = until - counter
      })
      return { sent, failed, via, cooldowns }
    },
  }
}
