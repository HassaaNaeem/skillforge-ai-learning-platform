# SkillForge

AI-powered developer learning and interview platform. See [docs/SkillForge_Project_Spec.md](docs/SkillForge_Project_Spec.md) for the full product spec and [AGENTS.md](AGENTS.md) for how this project is built (as a hands-on learning environment, not just an AI-generated app).

## Status

**Milestone 0 — Architecture & tooling.** Scaffolding only: monorepo, TypeScript, linting/formatting, env config, health-check endpoints. No application features, no database, no Redis/AI/real-time yet.

## Architecture

Monorepo with three workspaces:

- `frontend/` — React + TypeScript + Vite + Tailwind CSS
- `backend/` — Express + TypeScript, with two entrypoints sharing one codebase:
  - `src/server.ts` — the API process (Express + Socket.io, added M8)
  - `src/worker.ts` — the background-job process (BullMQ processors, added M6)
- `packages/shared/` — Zod schemas + inferred TypeScript types shared between frontend and backend (populated starting M1/M2)

External services: Neon (managed PostgreSQL via Prisma, from M1) and Redis (cache, rate limiting, BullMQ queue, pub/sub — from M2 onward).

## Running locally

```bash
npm install          # installs all workspaces
npm run dev          # runs frontend (http://localhost:5173) and backend (http://localhost:4000) together
```

Individual workspaces:

```bash
npm run dev -w frontend
npm run dev -w backend        # API
npm run dev:worker -w backend # worker placeholder
```

Other scripts (run from repo root, apply across all workspaces):

```bash
npm run typecheck
npm run lint
npm run build
npm run format         # prettier --write
npm run format:check
```

Copy `.env.example` to `.env` in `backend/` (and `frontend/` if needed) before running.

## Milestone roadmap

| # | Milestone | Type |
|---|-----------|------|
| M0 | Architecture + tooling | Mixed |
| M1 | PostgreSQL + Prisma + Neon | Learning |
| M2 | Auth + anonymous mode (Redis-backed sessions) | Mixed |
| M3 | Core practice platform | Mixed |
| M4 | Axios + Redux Toolkit + TanStack Query | Learning |
| M5–M8 | Redis + background jobs (BullMQ) + AI integration + Socket.io (one combined real-time evaluation pipeline) | Learning |
| M9 | Cloudinary + Multer (uploads) | Learning |
| M10 | Dashboard + Recharts + DnD Kit | Mixed |
| M11 | Testing (Vitest/Jest + RTL) | Learning |
| M12 | Docker + Nginx | Learning |
| M13 | GitHub Actions + CI/CD + deployment | Learning |
| M14 | Final polish | Mixed |

Target: 7–10 focused days, hard max ~14. See the M0 plan doc for the full day-by-day breakdown and scope cuts.
