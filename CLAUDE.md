# LoyaltyCard

Digital loyalty stamp card system for Portuguese local businesses (cafes, bakeries, salons, barbershops).

## Stack
- **Framework:** Next.js 16, App Router, TypeScript
- **Styling:** Tailwind CSS v4, lucide-react icons, Inter font
- **Database:** Prisma + SQLite (schema at `prisma/schema.prisma`)
- **Language:** All UI in Portuguese

## Architecture
- `src/app/page.tsx` — Landing page (hero, features, pricing)
- `src/app/entrar/` — Sign in
- `src/app/registar/` — Sign up
- `src/app/painel/` — Business dashboard (layout with sidebar)
  - `page.tsx` — Overview stats
  - `cartoes/` — Loyalty card designer and list
  - `clientes/` — Customer management
  - `recompensas/` — Rewards management
  - `qr-balcao/` — Counter QR code for scanning
  - `definicoes/` — Business settings
- `src/app/c/[slug]/` — Public customer card view
- `src/app/carimbo/[slug]/` — Stamp confirmation page (after QR scan)
- `src/app/api/` — API routes (cards, customers, rewards, stamps)

## Design
- Rose/pink color scheme (#f43f5e primary)
- Mobile-first, warm and inviting
- Key UI: stamp card circles that fill up visually
- Customer-facing pages should feel delightful

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npx prisma generate` — Generate Prisma client
- `npx prisma db push` — Push schema to database

## Notes
- All API routes return mock data (no DB connected yet)
- Auth is placeholder (redirects directly to dashboard)
- QR code on the counter page is a visual placeholder
