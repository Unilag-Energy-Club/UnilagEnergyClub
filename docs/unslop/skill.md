---
name: unslop-energy-event-registration
description: Avoid the repeated AI defaults that make energy-summit / event registration landing pages look generated. Derived from an 8-sample unslop analysis. This is a "what to avoid" profile, not a prescription for one new stock style.
---

# Unslop profile — Energy event registration landing pages

Across 8 independently-generated samples, the pages differed in skin but were the
same latent template. Avoid the tics below. None of these is banned on its own —
the slop signal is doing *several of them together* in the default way.

## Avoid — structure
- The stock hero formula in order: eyebrow pill → headline with one colored key-phrase → muted subhead → primary+outline CTA pair → numeric stat row. If you use these parts, break the order or drop some.
- A 3–4 item "big number + caption" stat strip right under the hero.
- The fixed part-list: nav → hero → 3-column value cards → day-by-day agenda → speaker grid → pricing → form → FAQ → footer. Reorder or cut.
- A `<form>` that fakes success with a JS `.hidden` class swap and no backend. Wire a real submission or don't imply one.

## Avoid — decoration
- Radial-gradient "glow orbs" (2–3 blurred amber + cool-hue circles) in a dark hero. This was the single most repeated device (7/8).
- `rounded-2xl`/~20px bordered cards as the container for *every* block (8/8). Vary containers; let some content sit on bare background.
- `rounded-full` pill as the default for every button (7/8).
- Sticky nav with `backdrop-blur`; colored glow `box-shadow` + `translateY(-Npx)` hover lift on the CTA; noise/grain overlay; faint grid-line background. Each is fine once; together they read as generated.

## Avoid — color & type
- Amber/gold-on-near-black as the default "energy/tech" palette (6/8). Especially the amber + emerald/cyan dual-glow duotone.
- Reaching for Space Grotesk (display) or Inter (body), or the two-Google-Font `<link>` boilerplate. Use a distinctive or brand-owned typeface.
- Uppercase, letter-spaced eyebrow micro-labels above *every* section (8/8 — the most universal tic). Use them sparingly, not as a caption on every block.
- A single gradient/`bg-clip-text` colored word in the H1 as the "important" word.

## Avoid — copy
- Fabricated precise stats as social proof ("6,000 attendees / 120+ speakers / 40+ countries"). If you don't have the number, don't invent it.
- The "[X], not [Y]." antithesis headline ("Operators, not observers.").
- "Zero/No [fluff/filler/press]" absolutist framing.
- "Power / Powering [what's next]" as the operative verb.
- Em-dash-heavy clause-chaining in every hero/subhead line.
- Invented testimonial pull-quotes (fake name + title + company) on a dark band.

## Prefer instead
- Concrete, specific, checkable copy in your own voice; real venue/date/facts.
- One clear primary action; real backend behavior.
- Your brand's actual colors and type, used with restraint.
- Let some sections breathe on bare background rather than boxing everything.

## Caveats on this run
- 8 samples (not 20) — solid signal, but rarer patterns may be undercounted.
- Final auto-synthesis step failed (nested `claude -p` denied Bash for a grep count); this file was synthesized from the completed `analysis.md`.
- sample_0002's screenshot renders mostly blank because its content is gated behind `IntersectionObserver` scroll-reveal that never triggered in the headless shot — itself a slop-adjacent failure mode (decorative JS-gated reveals).
