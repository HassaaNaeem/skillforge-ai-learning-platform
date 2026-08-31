# SkillForge — Initial Cursor Prompt

You are working with me on SkillForge, an AI-powered developer learning and interview platform.

Before doing anything, read:
1. `AGENTS.md`
2. `docs/SkillForge_Project_Spec.md`

Treat `AGENTS.md` as the rules for how you collaborate with me.
Treat `docs/SkillForge_Project_Spec.md` as the source of truth for the product.

## Important learning constraint

I am using Cursor to reduce development time, but I am intentionally learning the technologies I currently do not know well.

For unfamiliar technologies, do NOT write the core implementation for me immediately.

Instead:
- explain the concept
- explain why the project needs it
- explain the data flow
- show the important APIs/syntax
- give me a small challenge
- let me implement it
- review my implementation
- help me fix it

The technologies I especially need to learn hands-on are:
- Prisma
- PostgreSQL
- Redis
- Socket.io / WebSockets
- background jobs / BullMQ
- Docker
- Docker Compose
- Nginx
- GitHub Actions / CI/CD
- Vitest/Jest
- React Testing Library
- DnD Kit
- Recharts
- Multer
- Cloudinary
- AI API integration
- OAuth/Auth0
- advanced TanStack Query
- advanced Redux Toolkit
- Axios interceptors

Do not silently generate these implementations just to finish faster.

## What you can generate freely

You may handle:
- UI boilerplate
- Tailwind
- repetitive JSX
- basic components
- basic types
- configuration
- setup boilerplate
- documentation
- repetitive code after I understand the pattern

## What to do now

We are starting with Milestone 0: Architecture and tooling.

Do NOT build application features yet.

First:
1. Read the project specification.
2. Propose the final high-level architecture.
3. Propose the frontend/backend folder structure.
4. Explain how the major technologies will fit into the system.
5. Give me the development milestones in order.
6. Identify which milestones are primarily:
   - AI/boilerplate work
   - learning + hands-on coding
   - mixed
7. Identify scope risks and suggest small adjustments if necessary.

After that, wait for my approval.

Do not create the application implementation yet.

## Product Quality Requirement

A major goal of SkillForge is that it should look and work like a complete, polished product/web application.

The landing page is important and should be designed as a real product landing page, not a basic project homepage.

When planning the architecture and milestones, account for:
- a professional responsive landing page
- clear product positioning
- strong CTA flow
- polished navigation/footer
- product feature sections
- realistic dashboard/product previews where useful
- consistent design system
- high-quality responsive UX

AI may handle the landing-page/UI implementation and styling, but the final result should be reviewed for product quality, usability, responsiveness, and accessibility.

Avoid generic template-like UI.
