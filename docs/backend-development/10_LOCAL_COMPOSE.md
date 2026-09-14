# Step 10: Local Docker Compose

**Phase:** B — Foundation  
**Mode:** IMPLEMENT → VERIFY  
**Branch:** `backend/10-local-compose`

## Purpose
Make development reproducible.

## Prerequisites
- Step 09

## Actions
- Compose only API + PostgreSQL + Redis at this stage.
- Add health checks, named volumes and isolated network.
- Add `.env.example` with no secrets.
- Document bootstrap, migrations, reset and test commands.

## Required outputs
- Local Compose
- Backend Dockerfile
- `.env.example`
- Developer runbook

## Verification
- `rtk docker compose config`
- `rtk docker compose up -d`
- `rtk docker compose ps`
- Migrations/tests against Compose

## Acceptance criteria
- [ ] Clean checkout boots reproducibly
- [ ] Only needed dev ports are exposed
- [ ] No future services included

## Explicit non-goals
- No RabbitMQ/Celery/MinIO
- No production Nginx

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Step 11 begins Tier 1.
