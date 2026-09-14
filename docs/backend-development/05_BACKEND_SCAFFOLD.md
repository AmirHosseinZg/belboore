# Step 05: FastAPI Project Scaffold

**Phase:** B — Foundation  
**Mode:** IMPLEMENT → VERIFY  
**Branch:** `backend/05-backend-scaffold`

## Purpose
Create the smallest production-quality backend skeleton.

## Prerequisites
- Step 04

## Actions
- Initialize `backend/` with `uv`.
- Use src layout and modular-monolith boundaries (api/application/domain/infrastructure or equivalent).
- Add FastAPI, Pydantic settings, pytest, Ruff and type checking.
- Add `/health/live` that does not depend on DB/Redis.
- Document local commands.

## Required outputs
- `backend/pyproject.toml` + lockfile
- Application skeleton
- Tests
- Backend README

## Verification
- `rtk uv sync`
- `rtk uv run ruff check .`
- `rtk uv run pytest -q`
- Type-check command
- Run and curl liveness

## Acceptance criteria
- [ ] Clean checkout starts successfully
- [ ] No DB/Redis required for liveness
- [ ] Quality gates pass

## Explicit non-goals
- No PostgreSQL/Redis/RabbitMQ/MinIO
- No auth

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Step 06 adds cross-cutting behavior.
