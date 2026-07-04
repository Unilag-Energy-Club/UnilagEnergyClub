# ET360° Finale reminders — Railway Cron (no n8n)

Reminders are triggered by **Railway Cron**, not n8n. A tiny script
(`uecdp/scripts/trigger-reminders.mjs`) POSTs the hosted app's own
`/uecdp/api/send-reminders` endpoint once a day; the endpoint decides whether
today is a reminder day and emails all registrants through the failover mailer
(n8n primary → n8n secondary → Resend).

## Reminder schedule (Africa/Lagos)

The endpoint (`reminderForDaysUntil`) sends **at most one** email per day, based on
whole days until the event (16 July 2026):

| Days out | Reminder |
| --- | --- |
| every 3 days while **> 7** days out (…, 12, 9) | light countdown (`interval`) |
| 7 | one week to go (`d7`) |
| 3 | 3 days to go (`d3`) |
| 2 | 2 days to go (`d2`) |
| 1 | tomorrow (`d1`) |
| 0 | today — doors 9:00 AM (`dayof`) |

Days with no entry (e.g. 6, 5, 4) send nothing.

## Railway setup (one-time)

Create a **new Railway service** in the same project, from the same repo:

- **Root Directory:** `uecdp`
- **Start Command:** `npm run send-reminders`
- **Cron Schedule:** `0 8 * * *`  (08:00 UTC = **09:00 Africa/Lagos**)
- **Variables:**
  - `REMINDER_SECRET` = the shared secret (same value as the DP service's `EMAIL_SECERET`/`EMAIL_SECRET`)
  - `REMINDERS_URL` *(optional)* — defaults to `https://uec-dp.up.railway.app/uecdp/api/send-reminders` (the DP service directly, which avoids Cloudflare's stripping of underscore auth headers)

Railway runs the service on the schedule, the script fires once and exits. Because
it runs exactly once per day, there's no double-send risk. Re-running manually
(Railway "Run" button, or `npm run send-reminders` locally with the env set) is
safe on a non-reminder day — it just reports `sent: 0`.

## Manual trigger / testing

```bash
# send today's reminder (if any) via the live endpoint
REMINDER_SECRET=… npm run send-reminders

# preview every template to one address (no batch send)
curl -X POST https://uec-dp.up.railway.app/uecdp/api/send-reminders \
  -H 'x-reminder-secret: …' -H 'Content-Type: application/json' \
  -d '{"previewAll":true,"to":"you@example.com","name":"Ada"}'

# force a specific reminder day for a dry run of the batch logic
curl -X POST https://uec-dp.up.railway.app/uecdp/api/send-reminders \
  -H 'x-reminder-secret: …' -H 'Content-Type: application/json' \
  -d '{"days":2}'
```
