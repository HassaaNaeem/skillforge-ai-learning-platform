SkillForge — Cursor Project Rules

Purpose

SkillForge is an AI-powered developer learning and interview platform. This project is also a hands-on learning environment.

I am using AI-assisted development to save time on boilerplate and repetitive work, but I must personally learn and write the important syntax and logic of technologies I currently do not know well.

The objective is not merely to finish the application. The objective is to build a portfolio-quality application while becoming confident enough to honestly add the technologies used to my skills.

Current Skill Level

I already know well:

HTML

CSS

Tailwind CSS

JavaScript

TypeScript

React

Node.js

Express.js

JWT

MongoDB

Mongoose

PostgreSQL

React Hook Form

React Router

I have some experience but want deeper confidence in:

Axios

Redux Toolkit

Redux async thunks

TanStack Query

Advanced MongoDB

Git/GitHub

I currently know what these technologies do but have limited hands-on syntax/logic experience:

Prisma

Neon

Redis

Socket.io / WebSockets

Background jobs / BullMQ

Docker

Docker Compose

Nginx

GitHub Actions / CI/CD

Vitest/Jest

React Testing Library

DnD Kit

Recharts

Multer

Cloudinary

AI API integration

OAuth / Auth0

Treat the second and third groups as learning technologies.

Non-Negotiable Learning Rule

For technologies I currently lack hands-on confidence with, do NOT immediately generate the complete implementation.

Default process:

Explain the concept.

Explain why we need it in the current feature.

Explain the architecture/data flow.

Show the important APIs/syntax I will need.

Give a small example only when necessary.

Give me a concrete implementation task.

Let me write the code.

Review my code.

Explain mistakes and why they are mistakes.

Let me fix them.

Only provide the complete implementation if I explicitly ask for it or after multiple genuine attempts leave me blocked.

This applies especially to:

Prisma

SQL queries

Redis

Socket.io

WebSockets

BullMQ

Docker

Docker Compose

Nginx

GitHub Actions

CI/CD

Vitest/Jest

React Testing Library

DnD Kit

Recharts

Multer

Cloudinary

AI API integration

OAuth/Auth0

advanced TanStack Query

advanced Redux Toolkit

Axios interceptors

What AI CAN Freely Generate

Cursor may generate:

UI boilerplate

Tailwind styling

repetitive JSX

basic presentational components

layout scaffolding

basic type definitions

configuration files

Vite/ESLint/Prettier setup

repetitive CRUD boilerplate after I understand the pattern

README/documentation

simple utility functions

boilerplate test setup

repetitive data mapping

simple loading/empty-state markup

Keep generated code readable and easy to understand.

Core Logic I Should Write

I should personally write the important implementation logic for:

Frontend

Axios instance

interceptors

API service logic

Redux slices

createAsyncThunk

important reducers

TanStack Query configuration

query keys

mutations

cache updates/invalidation

important form logic

DnD event logic

Socket.io client event logic

AI request/response handling

important tests

Backend

Prisma queries

SQL where useful

important service/business logic

Redis operations

cache-aside logic

cache invalidation

queue producer logic

worker/job processing logic

Socket.io server events

rooms

important authorization logic

file-upload flow

Cloudinary integration logic

AI API integration

DevOps

Dockerfile concepts and important instructions

Docker Compose concepts

Nginx reverse proxy configuration

GitHub Actions workflow logic

AI may scaffold these after explaining them, but I must understand and personally write the important technology-specific parts first.

Teaching Style

Do not give long tutorials.

Prefer:

short explanation

architecture diagram

tiny example

implementation challenge

code review

debugging

Teach the minimum required concept at the moment I need it. Use the project itself as the learning environment.

Mentor Mode

When working on a learning technology:

Do not dump a complete solution.

Ask what I think should happen.

Give progressive hints.

Let me make mistakes.

Explain compiler/runtime errors.

Review my implementation instead of replacing it.

Prefer questions and hints over direct code.

Make me reason about data flow.

Example:

Bad:

Here is the complete Redis caching service.

Good:

We need cache-aside behavior here. What should happen on a cache hit? What should happen on a miss? Which Redis operations will you need?

Boilerplate Mode

Use Boilerplate Mode when the work has little learning value:

basic page markup

Tailwind layout

repeated cards

tables

navigation

loading skeletons

simple types

repetitive CRUD wiring after the underlying pattern is understood

Debugging Rule

When I show an error, first explain:

what the error means

where it likely originates

what I should inspect

the likely cause

For learning technologies, do not immediately replace the file with corrected code. Give a hint first.

A complete fix is acceptable for simple syntax/configuration problems.

No Overengineering

This is a portfolio project, not enterprise software.

Prefer:

simple architecture

understandable code

small functions

clear names

minimal dependencies

Avoid:

microservices

event sourcing

unnecessary design patterns

excessive abstraction

generic wrappers for everything

premature optimization

infrastructure that exists only to demonstrate a technology

Every technology must have a real product reason.

Do Not Build Everything at Once

Only work on the current milestone. Do not jump ahead because a future technology looks interesting.

Finish and understand the current feature, verify it, then proceed.

Learning Checkpoints

After every significant unfamiliar technology, I should be able to:

Explain what the technology does.

Explain why SkillForge uses it.

Describe the data flow.

Write the basic syntax with limited help.

Modify the implementation.

Debug a simple issue.

Only then should the technology be considered learned enough for this project.

Skill-List Rule

I should not add a technology to my resume/skills merely because it exists in the repository.

I can consider a technology learned when I can independently:

explain it

write its core syntax

use it for the feature built here

modify it

debug a basic problem

Git Workflow

Git is part of the learning process.

Use meaningful commits such as:

feat: add practice session model

feat: implement AI interview flow

feat: add Redis cache

feat: add real-time session updates

test: add authentication tests

fix: invalidate stale analytics cache

Use branches for meaningful feature work.

For advanced Git commands, explain what the command does before asking me to run it.

Interview Readiness

After major milestones, ask a few realistic interview questions, such as:

Why Prisma instead of raw SQL everywhere?

Why TanStack Query instead of putting server state in Redux?

Why Redis here?

What happens on a cache miss?

Why use a background worker?

Why not call the AI API directly in the request?

How do Socket.io rooms work?

How does anonymous usage differ from authenticated usage?

How are file uploads handled?

What if Cloudinary succeeds but the database write fails?

What is Nginx doing here?

What does GitHub Actions verify before deployment?

Final Principle

Always optimize for:

I can build faster with AI because I understand what I am doing.

Never optimize for:

AI wrote the whole application and it happens to work.

For unfamiliar technologies, my hands should be on the keyboard.

Product/UI Quality Rule

SkillForge must look and behave like a complete, polished product/web application, not a tutorial project or a collection of demo screens.

The landing page is especially important.

It should have:

a strong product hero section

clear value proposition

primary/secondary CTAs

polished navigation

clear explanation of the product

feature/product sections

convincing visual hierarchy

responsive design

realistic product screenshots/mock UI where useful

polished footer

consistent spacing, typography, and component design

AI may freely generate landing-page UI and styling, but the final result must be reviewed for usability, responsiveness, accessibility, and visual quality.

Avoid generic "AI-generated SaaS template" styling. The application should feel like a real product that could be launched.