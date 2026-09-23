# SkillForge

Interview practice for developers. Pick a track, write an open-ended answer, and get AI feedback without waiting on the HTTP request. Guests can try a session immediately; accounts keep history, a dashboard, and a profile photo.

## What it does

- **Practice tracks** — JavaScript, TypeScript, React, Node.js, PostgreSQL, Git. Questions stay hidden until you start.
- **Guest or account** — Anonymous sessions live in Redis (45 minutes). Signed-in sessions live in Postgres.
- **AI evaluation** — After submit, a BullMQ worker calls Gemini and writes `feedback`, `score`, and `isCorrect`.
- **Live update** — The session page joins a Socket.io room. The worker publishes on Redis; the API emits to that room. No polling.
- **Dashboard** — Session stats, score over time (Recharts), and a drag-to-reorder focus queue (DnD Kit).
- **Profile photo** — Multer + Cloudinary; only the image URL is stored.

## Architecture

npm workspaces: `frontend/`, `backend/`, `packages/shared/`.

| Process | Command | Role |
|---|---|---|
| Frontend | `npm run dev -w frontend` | Vite + React at http://localhost:5173 |
| API | `npm run dev -w backend` | Express + Socket.io at http://localhost:4000 |
| Worker | `npm run dev:worker -w backend` | BullMQ consumer (required for AI feedback) |

External services: **Neon** (Postgres via Prisma), **Redis** (cache, guest sessions, queue, pub/sub), **Gemini**, **Cloudinary**.

## Run locally

You need Node 22+, Redis on `REDIS_URL`, and a Neon database.

```bash
npm install
```

Copy `backend/.env.example` to `backend/.env` and fill in the values. Copy `frontend/.env.example` to `frontend/.env` if you do not already have `VITE_API_URL`.

```bash
npm run dev                 # frontend + API
npm run dev:worker -w backend
```

Apply migrations from `backend/` when the schema changes:

```bash
npx prisma migrate deploy
npx prisma generate
```

Other root scripts: `npm run typecheck`, `npm run lint`, `npm run build`, `npm run format`.

## Environment

**Backend** (`backend/.env`)

| Variable | Purpose |
|---|---|
| `DATABASE_URL` / `DIRECT_URL` | Neon pooled + migrate URLs |
| `JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET` | Auth cookies |
| `REDIS_URL` | Cache, guests, BullMQ, Socket.io bridge |
| `GEMINI_API_KEY` | Answer evaluation |
| `CLOUDINARY_*` | Avatar uploads (optional until you upload a photo) |

**Frontend** (`frontend/.env`)

| Variable | Purpose |
|---|---|
| `VITE_API_URL` | API origin, e.g. `http://localhost:4000` |

## Product routes

| Path | Who |
|---|---|
| `/` | Landing |
| `/topics`, `/topics/:id` | Start a session (guest or signed in) |
| `/anonymous/sessions/:id` | Guest practice |
| `/practice/sessions/:id` | Account practice |
| `/dashboard`, `/profile` | Signed-in only |
