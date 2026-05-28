# CLAUDE.md
Context for Claude Code. Read this at the start of every session before making changes.
---
## What this is
The website for **Chinquapin Ridge Philanthropic**, a faith-based nonprofit. The site is
content-first, rarely updated, and exists primarily to (1) explain who we are and what we do,
and (2) accept donations. It is not a web app — favor simplicity and longevity over cleverness.
Live domain: **chinquapin.foundation** (registered on Porkbun).
---
## The foundation
**Legal/display name:** Chinquapin Ridge Philanthropic
**Texas SOS file number:** 806451384 (filed 2026-02-12 as a Domestic Nonprofit Corporation)
**Principal & mailing address:** 6004 South First Street, Lufkin, TX 75901-8558
**Mission statement (use verbatim where a mission is quoted):**
> "Rooted in faith, our mission is to serve women, children, and veterans in East Texas by
> offering hope, resources, and opportunities that strengthen families and reflect God's
> purpose."
**Who we serve:** women, children, and veterans in **East Texas**.
**Board members (per Certificate of Formation, Art. 6):**
- Eric Estes
- Cornelia Estes
- Adriana Estes
**Federal EIN:** 41-4375241 (issued by the IRS).
**Status:** Texas nonprofit corporation organized under Chapter 22 of the Texas Business
Organizations Code. **EIN issued** but the federal 501(c)(3) determination letter (IRS
Letter 947) has NOT been received yet. Until it is:
- `site.taxExempt501c3` stays `false`
- The footer reads "Texas nonprofit corporation, EIN 41-4375241. Federal 501(c)(3) status
  pending." — accurate while Form 1023 is in flight
- When Letter 947 arrives, flip `site.taxExempt501c3` to `true`; the footer auto-switches
  to "A 501(c)(3) nonprofit — EIN 41-4375241."
### Voice & tone
The mission is explicitly faith-based, centered on hope, family, and service. When writing
copy:
- Warm, hopeful, dignified. Speak to people being helped with respect, not pity.
- Faith is part of our identity — it can be present and sincere, but never preachy,
  exclusionary, or heavy-handed.
- Plain, human language. Avoid nonprofit jargon ("synergize," "stakeholders," "leverage").
- Concrete over abstract: name what we actually do for women, children, and veterans.
- Do NOT invent programs, statistics, impact numbers, testimonials, or partnerships.
  If specific facts aren't in this file or supplied by the owner, leave a clearly marked
  TODO and ask — never fabricate.
---
## Brand
Colors extracted from the official logo (a tree, river, hills, and wildflowers in a circle).
These are the source of truth; they live in `src/styles/global.css` as design tokens.
| Token | Hex | Use |
|-------|-----|-----|
| Deep forest green (primary) | `#24540C` | Headings, primary buttons, logo text |
| Deepest green | `#243C0C` | Footer, high-contrast text |
| Foliage green (accent) | `#3C8424` | Accents, hover states, links |
| Sage | `#6C8454` | Muted text, borders, secondary UI |
| Water blue | `#84CCCC` | Soft accents, section backgrounds |
| Sunflower yellow | `#FCCC0C` | Sparingly — calls to attention, highlights |
| Paper | `#FAFAF7` | Page background |
Yellow is an accent only — small doses (a donate highlight, an underline), never large fills.
The overall feel is natural, calm, grounded: greens dominate, blue and yellow punctuate.
**Logo files** live in the project's source assets (PNG, JPG, PDF, plus a black variant).
Use the full-color version on light backgrounds. Generate the favicon and social-share
image from the logo mark (the circular tree/river emblem) without the wordmark.
**Typography direction:** the wordmark uses a refined serif for "CHINQUAPIN RIDGE" and a
spaced sans for "PHILANTHROPIC." Match that pairing: a distinctive serif for display/headings,
a clean sans for body. Decide specific webfonts at implementation time; avoid generic defaults
(Arial, Inter, Roboto).
---
## Tech stack
- **Astro 6** — static output by default (`output: 'static'`)
- **Cloudflare Pages** — hosting + Git-based auto-deploy; `@astrojs/cloudflare` adapter
- **Tailwind CSS v4** — via the Vite plugin, tokens defined in `global.css`
- **TypeScript** — strictest preset, path aliases (`@config/*`, `@components/*`, etc.)
- **Content Collections** — type-safe markdown with build-time schema validation
- **Node 22.12+** required for builds
Deployment is push-to-deploy: a commit to `main` triggers a Cloudflare rebuild; PRs get
preview URLs. Don't add a separate deploy script or CI config unless asked.
---
## Architecture & conventions

```
src/
  config/      site.ts (org facts), nav.ts (navigation) — single sources of truth
  content/     markdown, schema-validated (news; add team/programs as needed)
  layouts/     BaseLayout.astro (SEO, OG, JSON-LD, ClientRouter)
  components/
    ui/        small presentational pieces (Header, Footer, DonateButton)
    sections/  larger composed page sections (Hero, ImpactStats, etc.)
  pages/       file-based routing
  lib/         pure helpers (jsonld.ts, formatters) — no side effects
  styles/      global.css with design tokens
```

**Non-negotiable conventions for this project:**
1. **`src/config/site.ts` is the single source of truth** for every org-wide fact —
   name, mission, EIN, address, contact, donation URL, social links. NEVER hardcode any
   of these inline in a page or component. Need the phone number? Import it from config.
2. **Content goes in collections, not in markup.** Board members, programs, and news are
   markdown files with validated schemas. Adding a board member = adding a file, not
   editing a component.
3. **Donations stay on a hosted platform.** We never build payment forms, never collect
   card data, never touch PCI scope. Donate flows link out to / embed the hosted provider
   (Every.org is the current pick). A donate button reads its URL from `site.config`.
4. **Server Islands for anything dynamic** (e.g. a live donation total). Keep the rest of
   the page static.
5. **Accessibility is required, not optional:** semantic HTML, alt text on every image,
   skip link, visible focus states, color contrast that passes WCAG AA against the green
   palette, and `prefers-reduced-motion` respected for view transitions.
---
## Coding standards (from the owner's coding.md — enforce these)
- **Hard limit: 450 lines per file.** Split before you approach it. No exceptions.
- **Separation of concerns:** UI, content, config, and logic stay in separate layers.
- **SOLID, DRY, KISS, YAGNI, Law of Demeter.** Build what's needed now, simply.
- **Descriptive, intention-revealing names.** No `data`, `tmp`, `foo`.
- **One responsibility per function.** Flatten with guard clauses / early returns.
- **No inline functions** inside JSX, `.map()`, or control blocks — name them.
- **No magic values** — extract to named constants or config.
- **Security-first:** never hardcode secrets (use env / Cloudflare bindings), validate
  external input, no `eval`. Fail fast and loudly on misconfiguration.
- **Composition over inheritance.** Prefer small, pure, composable functions.
- **Comment the *why*, not the *what*.** The code explains what; comments explain intent.
- **External libraries:** document package, version, why it's needed, and a usage example.
Before finishing a change: run `npm run check`. Keep diffs small and localized — one
concern per commit, with a clear message.
---
## Open items (need owner input — do not invent)
- [ ] **IRS Letter 947** (501(c)(3) determination letter) — when received, flip
      `site.taxExempt501c3` to `true`. EIN itself is already in config.
- [ ] **Public contact email** (and phone, if desired)
- [ ] **Donation platform account + URL** (Every.org recommended for fee-free 501(c)(3))
- [ ] **Program descriptions** — concrete services for women, children, veterans
- [ ] **About / origin story** copy
- [ ] **Board member titles + bios/photos** (currently legal names only)
- [ ] **Social media handles** (if any are active)
- [ ] **Logo files** (replace placeholder favicon and add wordmark to header)

**Known but NOT public-facing** (do not put on the website):
- Texas taxpayer number 32104453967 — donors need the *federal* EIN, not this
- Webfile number FQ457009 — Comptroller credential
- Registered agent (Steve Bradley) and organizer (Ryan Peak) — legal-filing roles

When public-facing items are missing, leave a visible `TODO` and ask the owner — never
fill the gap with placeholder facts that could read as real.
---
## Guardrails — never do these
- Never fabricate stats, impact numbers, testimonials, program details, or partners.
- Never hardcode org facts outside `site.config`.
- Never build or embed raw payment/card collection — link to the hosted donor platform.
- Never commit secrets, API keys, or `.env` contents.
- Never exceed 450 lines in a file.
- Never change donation, legal, or contact info on your own initiative — these are
  owner-controlled facts; surface a TODO instead.
