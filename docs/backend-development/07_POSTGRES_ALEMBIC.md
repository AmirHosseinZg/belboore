# Step 07: PostgreSQL, SQLAlchemy & Alembic Foundation

**Phase:** B — Foundation  
**Mode:** PLAN → REVIEW → IMPLEMENT → VERIFY  
**Branch:** `backend/07-postgres-alembic`

## Purpose
Introduce transactional persistence without prematurely creating future domain tables.

## Prerequisites
- Step 06

## Actions
- Add async SQLAlchemy driver/session lifecycle.
- Add Alembic and migration conventions.
- Decide identifier convention via ADR.
- Define transaction-boundary pattern.
- Add readiness check separate from liveness.
- Define test DB strategy.

## Required outputs
- DB infrastructure
- Alembic config
- Identifier/transaction ADR
- Integration tests

## Verification
- Fresh DB -> `alembic upgrade head`
- Downgrade/upgrade migration test
- DB connection failure readiness test

## Acceptance criteria
- [ ] Fresh database reaches head deterministically
- [ ] Sessions/connections are bounded
- [ ] No future schemas invented

## Explicit non-goals
- No auth tables
- No job/short-link tables yet

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Step 08 adds Redis.
