# Step 04 — Data Layer: PostgreSQL, Redis, Backups

## Goal
Stand up the two stateful services the whole platform depends on, with
backups working from day one (not bolted on later).

## Context you need
`00-project-brief.md`. Single Postgres instance, single Redis instance, both
on `data_net` from step 02.

## Tasks
1. **PostgreSQL container**
   - Official `postgres:16` image, data directory bind-mounted to
     `/opt/belboore/data/postgres` (survives container recreation).
   - Create one database (`belboore`), with **one schema per module**:
     `catalog`, `identity`, `proxy`, `mediaproc`, `shortlink`, `usage`,
     `abuse`. Do not put everything in `public`.
   - Create least-privilege DB roles: a migration role (DDL rights) and a
     runtime app role (DML only, no DROP/ALTER) — Core API connects with the
     runtime role in production.
   - Set `shared_buffers`/`work_mem` etc. appropriately for the VPS's actual
     RAM (don't use defaults tuned for a much bigger box).
2. **Connection pooling**: add **PgBouncer** (transaction pooling mode) in
   front of Postgres from day one, even at small scale — FastAPI processes
   opening raw connections per request will exhaust `max_connections` faster
   than you'd expect, and retrofitting this later is painful.
3. **Redis container**
   - Single instance to start (Redis Cluster is overkill for one VPS and
     adds complexity without the availability benefit it's meant for on a
     single box — note this explicitly as a documented deviation from the
     "Cluster mode" recommendation in the earlier enterprise design, justified
     by single-VPS reality).
   - Configure logical separation by DB index: `0` = cache, `1` = rate-limit
     buckets, `2` = Celery broker/result backend, `3` = job-status pub/sub.
   - Set `maxmemory` + `maxmemory-policy allkeys-lru` for DB 0 only in
     concept — since Redis doesn't do per-DB eviction policy, in practice
     this means: keep rate-limit and broker data on a separate Redis
     **instance** (a second lightweight container) OR accept the trade-off
     and document it if using one instance — decide and document which.
   - Enable `appendonly yes` (AOF) for the broker/rate-limit data so a
     restart doesn't wipe active jobs/limits; cache DB can skip AOF.
4. **Migrations**: set up Alembic (or equivalent) for Postgres schema
   migrations, one migration chain per module schema, run automatically on
   deploy via an init/entrypoint step — never manual `psql` edits in
   production.
5. **Backups** (do this now, not later):
   - Nightly `pg_dump` (or WAL-based backup) written to object storage
     (from step 03), retained on a rotation (e.g., 7 daily + 4 weekly).
   - Cron job or systemd timer on the VPS, logged, alertable on failure.
   - Write and TEST a restore procedure in `infra/BACKUP_RESTORE.md` —
     an untested backup is not a backup.
6. **Health checks**: Docker Compose `healthcheck` blocks for both Postgres
   and Redis, used as dependency gates (`depends_on: condition:
   service_healthy`) for every service that needs them.

## Acceptance criteria
- [ ] `docker compose up` brings up Postgres + PgBouncer + Redis, all healthy
- [ ] Schemas created per module, runtime role cannot run DDL (verified)
- [ ] Alembic migration runs cleanly against a fresh database
- [ ] Redis reachable on all logical DB indices from an app container
- [ ] A manual nightly backup run completes and a file lands in object storage
- [ ] A restore drill has been performed at least once and documented
- [ ] Update `PROGRESS.md`, noting the Redis single-vs-dual-instance decision
