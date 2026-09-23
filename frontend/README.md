# SkillForge frontend

Vite + React + TypeScript. State: Redux (auth), TanStack Query (server data). Routing: React Router.

## Design foundation

Light SaaS (Notion/Stripe-like): off-white canvas, ink text, one blue accent, 10px radius, quiet shadows. No mesh gradients.

- Tokens: [`src/index.css`](src/index.css)
- Primitives: `Button`, `Input`, `PageHeader` in `src/components/ui/`
- Marketing: [`MarketingLayout.tsx`](src/components/layout/MarketingLayout.tsx) for `/`
- App: [`AppShell.tsx`](src/components/layout/AppShell.tsx) for topics, practice, dashboard, profile, auth

## Routes

`/`, `/topics`, `/topics/:id`, `/login`, `/register`, `/anonymous/sessions/:id`, `/practice/sessions/:id`, `/dashboard`, `/profile`.
