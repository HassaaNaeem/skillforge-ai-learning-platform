# SkillForge — AI-Powered Developer Learning & Interview Platform

## 1. Product Summary

SkillForge is a full-stack platform for developers to practice technical topics, simulate interviews, receive AI feedback, build personalized learning plans, and track progress.

The product has two modes.

### Anonymous mode
Users can use meaningful parts of the platform without signing in.

They can:
- browse topics
- start limited practice sessions
- answer questions
- receive AI feedback
- view current-session results

Long-term history and progress are not persisted for anonymous users.

### Authenticated mode
Users can:
- save practice sessions
- track progress
- view analytics
- save questions
- create/edit learning plans
- receive personalized recommendations
- upload a resume/profile image where appropriate

Authentication therefore exists for a real product reason.

## 2. Main Product Goal

Build a polished developer-learning product that demonstrates modern full-stack engineering.

It should feel like a credible startup/MVP, not a tutorial app.

It should showcase:
- modern React + TypeScript
- strong API architecture
- PostgreSQL + Prisma
- Neon
- Redis
- background jobs
- AI integration
- real-time communication
- file uploads
- authentication
- testing
- Docker
- Nginx
- CI/CD
- deployment
- good UX

## 3. Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Redux Toolkit
- TanStack Query
- React Hook Form
- Zod
- Recharts
- DnD Kit

### Backend
- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma ORM
- Neon PostgreSQL
- Redis
- BullMQ or equivalent Redis-backed job queue
- Socket.io
- Multer
- Cloudinary
- JWT and/or OAuth/Auth0
- Zod

### Testing
- Vitest or Jest
- React Testing Library
- appropriate API/integration testing

### Infrastructure
- Docker
- Docker Compose
- Nginx
- GitHub Actions
- CI/CD
- Cloud deployment

## 4. Product Areas

### Landing page
Public product explanation, topic highlights, start-practice CTA, AI interview CTA, and anonymous-vs-authenticated explanation.

### Topic explorer
Topics may include:
- JavaScript
- TypeScript
- React
- Node.js
- Express
- SQL
- PostgreSQL
- MongoDB
- Git
- System Design
- Web Fundamentals
- Testing
- Docker
- Redis

Each topic can have description, difficulty, practice modes, question counts, and authenticated-user progress.

### Practice mode
User chooses:
- topic
- difficulty
- number of questions
- practice mode

Modes:
- multiple choice
- technical written answer
- interview question
- scenario/problem-solving question

Anonymous sessions are temporary. Authenticated sessions can be saved.

### AI interview mode
User chooses role/topic, difficulty, and interview type.

Flow:
Start interview → AI question → user answer → evaluation → possible follow-up → final evaluation.

Evaluation can include:
- correctness
- clarity
- depth
- missing concepts
- strengths
- weaknesses
- score
- recommendations

Use a structured AI workflow with predictable input/output schemas.

### AI study plan
Authenticated users can request a personalized plan based on role, skill level, study time, weak topics, and target technologies.

The output may look like:
Week 1: React performance, SQL joins, TypeScript narrowing
Week 2: Testing, Node error handling, Redis fundamentals

Plan items should be reorderable.

### Dashboard
Authenticated users can see:
- total sessions
- average score
- topic performance
- weekly activity
- interview performance
- weak topics
- recent sessions
- study-plan progress

Use Recharts for meaningful visualizations.

### Saved questions
Authenticated users can save, remove, filter, and practice saved questions.

### Resume/profile upload
Authenticated users can upload a resume and/or profile image.

Flow:
Browser → Multer → backend → Cloudinary → relevant metadata/URL persisted in database.

Optional: process resume text/metadata for AI feedback.

## 5. Authentication

Support:
- registration
- login
- logout
- current user/session retrieval
- protected routes
- authenticated-only persistence

Optional/desired:
- Google OAuth through Auth0 or another suitable provider

Expected behavior:
Anonymous → temporary session → use features → session expires/no permanent progress
Authenticated → use features → persist sessions → history/progress

## 6. Database

Use PostgreSQL through Prisma and Neon.

Suggested models:

### User
id, name, email, passwordHash/provider data, avatarUrl, createdAt, updatedAt

### Topic
id, name, slug, description, difficulty metadata, createdAt

### Question
id, topicId, type, difficulty, prompt, options when relevant, answer/evaluation metadata where appropriate, createdAt

### PracticeSession
id, userId nullable if temporary persistence is needed, topicId, mode, difficulty, score, startedAt, completedAt

### Answer
id, sessionId, questionId, response, isCorrect, score, feedback, createdAt

### InterviewSession
id, userId nullable if temporary, topicId, role, difficulty, status, score, startedAt, completedAt

### InterviewMessage
id, interviewSessionId, sender, content, createdAt

### LearningPlan
id, userId, title, description, createdAt, updatedAt

### LearningPlanItem
id, learningPlanId, topicId, position, status, notes

### SavedQuestion
id, userId, questionId, createdAt

### UserProgress
id, userId, topicId, questionsAnswered, questionsCorrect, averageScore, lastPracticedAt

### Upload
Optional model for stored asset metadata.

Refine the schema during architecture planning.

## 7. Database Learning Requirements

Deliberately teach:
- Prisma schema design
- one-to-many relations
- many-to-many patterns where useful
- indexes
- unique constraints
- transactions
- pagination
- filtering
- sorting
- counting/aggregation
- relation queries
- typed Prisma results

Avoid unnecessary schema complexity.

## 8. Redis

Redis must have a real product purpose.

Use it for focused capabilities such as:
- caching popular topics
- caching dashboard summaries/expensive analytics
- rate limiting anonymous/expensive AI endpoints
- Redis-backed background-job queues
- short-lived state where useful

Learn:
- connection
- GET
- SET
- DEL
- TTL/expiration
- cache-aside
- invalidation
- basic queue concepts

## 9. Background Jobs

Use jobs for work that should not block a normal HTTP request.

Primary example:

User submits answer
→ API accepts
→ evaluation job created
→ Redis queue
→ worker
→ AI API
→ save evaluation in PostgreSQL
→ notify frontend

Possible additional jobs:
- progress recalculation
- resume analysis
- notification creation

## 10. Real-Time Communication

Use Socket.io where immediate updates improve UX.

Primary use case:
AI interview/evaluation processing status.

Example:
Submit answer → background job → processing → socket event → frontend updates result/status.

Possible additional uses:
- notifications
- interview activity
- job completion status

Learn:
- connection
- emit
- on
- rooms
- client/server events
- disconnect
- error handling

Do not build an unnecessary chat system.

## 11. DnD Kit

Use DnD Kit for the personalized learning plan.

Users can reorder study items and persist their positions in PostgreSQL.

## 12. Recharts

Use charts for:
- progress over time
- topic performance
- weekly activity
- interview scores

Avoid meaningless charts.

## 13. Frontend State Strategy

Use Redux Toolkit and TanStack Query deliberately.

Redux Toolkit:
- authentication/session state
- local UI state
- active practice/interview client state
- preferences

TanStack Query:
- topics
- questions
- practice history
- analytics
- saved questions
- server mutations
- server caching

The project should support a clear answer to:
> Why is this Redux state instead of TanStack Query state?

## 14. Axios

Create a centralized Axios layer and learn:
- instance
- base URL
- request interceptor
- response interceptor
- auth headers
- error normalization
- 401 handling
- typed API services

## 15. Validation

Use Zod at important boundaries:
- forms
- API inputs
- AI structured output
- environment configuration where appropriate

## 16. UI/UX

Prioritize:
- responsive layout
- clean navigation
- strong empty states
- loading states
- error states
- accessible forms
- polished dashboard
- useful charts
- clear interview UI
- good mobile behavior

AI may generate much of the UI; application logic remains the learning priority.

## 17. Testing

Do not chase 100% coverage.

Frontend:
- anonymous practice
- login
- protected dashboard
- practice submission
- error handling
- important drag/drop behavior

Backend:
- registration
- login
- authorization
- practice creation
- answer submission
- saved questions
- validation
- rate limiting where practical

Add a few high-value integration/E2E flows if time permits.

## 18. Docker

Containerize the main services.

Target local setup:
- frontend
- backend API
- worker
- Redis

Neon can remain managed PostgreSQL.

Learn:
- image
- container
- Dockerfile
- environment variables
- ports
- volumes where useful
- networks
- Compose services

## 19. Nginx

Use Nginx as a reverse proxy in deployment.

Concept:
Internet → Nginx → frontend/API → Express → PostgreSQL/Redis

Keep configuration focused.

## 20. CI/CD

GitHub Actions should run at least:

Pull request:
checkout → install → lint → typecheck → tests → build

Main branch:
checks → build → deploy

## 21. Security Basics

Implement practical security:
- password hashing
- secure auth/session approach
- authorization checks
- validation
- rate limiting for expensive endpoints
- protected secrets
- safe error responses
- upload restrictions
- sensible CORS
- no password/hash leakage

## 22. Suggested Milestones

### M0 — Architecture + tooling
Folder structure, packages, TypeScript, linting, environment config, scripts, Git.

### M1 — PostgreSQL + Prisma + Neon
Schema, migrations, relations, seed data, Prisma client, basic queries.

### M2 — Authentication + anonymous mode
Registration, login, current user, protected routes, anonymous sessions, user persistence.

### M3 — Core practice platform
Topics, question browsing, practice sessions, submissions, results.

### M4 — Axios + Redux Toolkit + TanStack Query
API layer, interceptors, auth state, server state, caching/invalidation.

### M5 — Redis
Connection, caching, TTL, invalidation, rate limiting.

### M6 — Background jobs
Redis-backed queue, producer, worker, retries/error handling.

### M7 — AI integration
Structured AI calls, question generation, evaluation, study plan, output validation.

### M8 — Socket.io
Connections, events, interview processing updates, relevant rooms.

### M9 — Cloudinary + Multer
Profile/resume upload, validation, upload flow, metadata persistence.

### M10 — Dashboard + Recharts + DnD Kit
Analytics, charts, learning plan, drag/drop, persisted ordering.

### M11 — Testing
Backend tests, frontend tests, key integration flows.

### M12 — Docker + Nginx
Dockerfiles, Compose, Nginx, production architecture.

### M13 — GitHub Actions + CI/CD + deployment
CI, test/build checks, deployment, environment configuration.

### M14 — Final polish
Responsiveness, accessibility, loading/error states, README, screenshots, demo data, architecture docs, interview preparation.

## 23. Scope Control

Out of scope unless ahead of schedule:
- full code execution environment
- video calls
- full social network
- complex messaging system
- payments
- enterprise billing
- microservices
- custom AI model training
- advanced vector database/RAG architecture
- elaborate notification platform

## 24. Definition of Done

Portfolio-ready means:
- anonymous users can try meaningful features
- authenticated users can persist progress
- PostgreSQL/Prisma works correctly
- Redis is used for real needs
- background jobs work
- AI features work
- Socket.io provides real-time value
- uploads work
- dashboard analytics work
- drag/drop works
- important behavior is tested
- Docker setup works
- Nginx is configured appropriately
- GitHub Actions runs CI
- application is deployed
- README explains architecture
- I can explain major technologies without relying on AI-generated explanations
- I can modify unfamiliar technologies myself

# Product/UI Quality

SkillForge must look and work like a **complete real product/web application**, not a tutorial project.

## Landing Page

Create a clean, polished, professional landing page that immediately communicates:

- what SkillForge is
- who it is for
- what users can do
- why the product is useful
- how users can start

The landing page should include, where appropriate:

- polished responsive navbar
- strong hero section
- primary CTA to start practicing
- secondary CTA for AI interview or exploration
- feature/product overview
- examples of the learning/interview experience
- dashboard/product preview visuals
- clear anonymous-vs-authenticated value proposition
- social-proof style section only if it can be handled honestly without inventing real testimonials
- polished footer

The visual design should feel like a **real launch-ready SaaS/web product**.

Do not make it look like:
- a tutorial project
- a basic CRUD dashboard
- a generic Tailwind template
- a collection of unrelated components

Use consistent typography, spacing, visual hierarchy, responsive behavior, loading/empty/error states, and accessible interactions.

The rest of the application should maintain the same product quality as the landing page.
