# LoyaltyCard — Project Context

## What This Is
White-label SaaS product: digital loyalty stamp card for Portuguese cafés, bakeries, salons, and barbershops.
Target market: small businesses that currently use paper stamp cards.

## Stack Decisions
- **Frontend/Backend**: Next.js 16 + TypeScript + Tailwind CSS (App Router, server components)
- **Database**: PostgreSQL + Prisma ORM
- **Hosting**: Vercel (free tier to start)
- **PWA**: Progressive Web App — no native app download required, works via browser
- **Notifications**: Push notifications (web push) + SMS for near-reward nudges

## Architecture
- Multi-tenant: each business is a tenant
- Customer-facing: PWA that stores loyalty card in browser, add-to-homescreen prompt
- Business-facing: admin panel for card design, reward config, analytics
- QR code at counter: customer scans to receive a stamp (authenticated via phone number or cookie)
- Stamp validation: server-side to prevent fraud (QR contains a rotating token)

## Key Domain Rules
- Stamp card: configurable number of stamps to earn reward (default: 10)
- Rewards: free item, percentage discount, or custom — configured per card
- Nudge notifications: trigger when customer is 1-2 stamps away from reward
- Analytics: active customers, return rate, redemption rate, stamps per day
- No app install: PWA with service worker for offline card display
- Anti-fraud: QR codes rotate, stamps require proximity (business scans or vice versa)

## Pricing Model
- Free: 1 card template, 50 customers
- Pro (€10/month): unlimited cards, SMS notifications, full analytics

## Development Guidelines
- Type hints everywhere (strict TypeScript)
- Error handling on all API routes
- Comments explain WHY, not what
- Tests exercise real code — no mocks
- Conventional commits: feat:, fix:, chore:
- main branch is always shippable
