# Step 27: Production Compose + Nginx Origin

**Phase:** E — Production  
**Mode:** PLAN → REVIEW → IMPLEMENT → VERIFY  
**Branch:** `backend/27-production-compose`

## Purpose
Create a practical single-VPS production topology.

## Prerequisites
- Step 26

## Actions
- Compose Nginx, API, PostgreSQL, PgBouncer, Redis, RabbitMQ, worker, MinIO and selected monitoring components.
- Use internal networks, named volumes, health checks, restart policies and explicit resource budgets.
- Only Nginx publishes public HTTP/S.
- Configure request/body limits appropriate to API/upload design.

## Required outputs
- Production Compose
- Nginx config
- Resource budget table
- Prod env template

## Verification
- `rtk docker compose -f <prod> config`
- Production-like boot
- Restart tests
- Readiness checks

## Acceptance criteria
- [ ] DB/Redis/RabbitMQ/MinIO admin ports are private
- [ ] API/worker restart does not lose persistent state
- [ ] No unnecessary public ports

## Explicit non-goals
- No Kubernetes

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Step 28 hardens host.
