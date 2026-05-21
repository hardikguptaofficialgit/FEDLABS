# FED Labs

Standalone marketing site for **FED Labs** — products built by the FED Engineering team (Federation of Entrepreneurship Development).

The flagship narrative is the **Founder Operating System**: autonomous startup intelligence and execution infrastructure for founders.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Phosphor Icons (filled weight)

## Getting started

```bash
cd fed-labs
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3001](http://localhost:3001). The main FED frontend (Vite) typically runs on port 5173.

## Environment

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_FED_MAIN_URL` | URL of the main FED Society site (for "Back to FED" links) |
| `NEXT_PUBLIC_SITE_URL` | This site's public URL (optional, for future use) |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server on port **3001** |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |

## Link from main FED site

When ready, add a nav item in the parent `fed-frontend` topbar pointing to this app, e.g.:

```env
VITE_FED_LABS_URL=http://localhost:3001
```

## Design

Visual identity mirrors the main FED frontend: dark `#1C1C1C` background, orange–red gradients, Open Sans, glass cards.

Assets copied from the parent repo: `public/logo.svg`, `public/herobgimage.png`.

## Phase 1 scope

Marketing landing page only — no backend, auth, or live product dashboards.
