# aexa-ai — Project Map

Next.js 15 marketing site + interactive AI demos for Aexa AI Studios.

**Stack:** Next.js 15, React 19, TypeScript, Tailwind v4, Framer Motion, GSAP, Spline 3D, shadcn/ui

**Run:** `npm run dev` → localhost:3000

---

## File Map

### Pages
| File | Purpose |
|---|---|
| `src/app/page.tsx` | Homepage — assembles all sections |
| `src/app/layout.tsx` | Root layout, theme provider, fonts |
| `src/app/portfolio/dental-demo/page.tsx` | Dental clinic demo agent page |

### Sections (homepage)
| File | Section |
|---|---|
| `src/components/sections/HeroSection.tsx` | Hero with Spline 3D + CTA |
| `src/components/sections/ServicesSection.tsx` | Services offered |
| `src/components/sections/BusinessProblemSection.tsx` | Pain point framing |
| `src/components/sections/PortfolioSection.tsx` | Demo projects showcase |
| `src/components/sections/ContactSection.tsx` | Contact form (Resend) |
| `src/components/sections/FooterSection.tsx` | Footer |

### Demo Components
| File | Purpose |
|---|---|
| `src/components/VoiceAgentDemo.tsx` | VAPI voice agent UI |
| `src/components/VoiceCallButton.tsx` | Trigger VAPI call |
| `src/components/InvoiceExtractDemo.tsx` | Invoice extraction demo (Anthropic SDK) |

### API Routes
| File | Purpose |
|---|---|
| `src/app/api/schedule-appointment/route.ts` | Google Calendar booking |
| `src/app/api/check-availability/route.ts` | Calendar availability check |
| `src/app/api/extract-invoice/route.ts` | Invoice extraction via Claude |

### Shared
| File | Purpose |
|---|---|
| `src/data/pageContent.ts` | All copy/text content — edit here first |
| `src/lib/calendar.ts` | Google Calendar helpers |
| `src/lib/email.ts` | Resend email helpers |
| `src/lib/utils.ts` | cn() and misc utils |
| `src/components/header.tsx` | Nav header |
| `src/components/theme-switcher.tsx` | Dark/light toggle |

### UI Components
`src/components/ui/` — shadcn base components + custom: shimmer-button, focus-cards, 3d-card, wobble-card, ripple-button, SlimScrollArea

---

## Key Dependencies
- `@anthropic-ai/sdk` — Claude API (invoice extraction)
- `@vapi-ai/web` — voice agent calls
- `@splinetool/react-spline` — 3D hero scene
- `resend` — contact form emails
- `googleapis` — Google Calendar integration
- `framer-motion` + `gsap` — animations

## Env Vars (`.env`)
- `VAPI_*` — voice agent config
- `RESEND_*` — email
- `GOOGLE_*` — calendar credentials
- `ANTHROPIC_API_KEY` — Claude API

---

## What's Pending
- Real estate demo agent (new page under `src/app/portfolio/`)
- Restaurant demo agent (new page under `src/app/portfolio/`)
- 2-3 project showcase one-pagers

## Rules
- All page copy lives in `src/data/pageContent.ts` — don't hardcode strings in components
- Read only the specific file you need to change — don't explore the whole codebase
