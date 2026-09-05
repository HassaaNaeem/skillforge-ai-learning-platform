# SkillForge frontend

Vite + React + TypeScript. State: Redux (auth), TanStack Query (server data). Routing: React Router.

## Design foundation

Light SaaS (Notion/Stripe-like): off-white canvas, ink text, one blue accent, 10px radius, quiet shadows. No mesh gradients.

- Tokens: [`src/index.css`](src/index.css)
- Primitives: `Button`, `Input`, `PageHeader` in `src/components/ui/`
- Marketing: [`MarketingLayout.tsx`](src/components/layout/MarketingLayout.tsx) for `/`
- App: [`AppShell.tsx`](src/components/layout/AppShell.tsx) for `/login`, `/topics`, and future practice
- Pages: `/` landing, `/login`, `/topics`

New feature screens should reuse AppShell and primitives.

## M14 polish (deferred)

Do **not** redesign the brand or layout system later. M14 is for:

- empty / loading / error consistency
- mobile and accessibility pass
- real product screenshots on the landing
- spacing/typography refinement only
