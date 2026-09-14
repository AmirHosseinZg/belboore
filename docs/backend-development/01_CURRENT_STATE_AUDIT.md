# Step 01: Current-State Repository Audit

**Phase:** A — Discovery  
**Mode:** PLAN → VERIFY  
**Branch:** `backend/01-current-state-audit`

## Purpose
Create a factual baseline before backend code exists.

## Prerequisites
- None

## Actions
- Inspect root agent files, `frontend/`, `docs/`, existing Actions and the empty `backend/`.
- Map tool registry/pages/components and shared tool abstractions.
- Search for backend calls (`fetch`, axios, API clients, mock handlers, OpenAPI).
- Mark stale assumptions in old plans, especially Next.js/auth/Celery/downloaders/network-scanning assumptions.

## Required outputs
- `artifacts/CURRENT_STATE.md`
- `artifacts/REPOSITORY_MAP.md`
- `artifacts/STALE_DOCS.md`

## Verification
- `rtk git status --short` before/after
- Repository-wide search proving current API-call state
- Confirm backend implementation is absent at start

## Acceptance criteria
- [ ] Repository map reflects actual code
- [ ] Stale docs are identified
- [ ] No backend implementation is added

## Explicit non-goals
- No FastAPI initialization
- No frontend behavior changes
- No provider selection

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Step 02 uses this audit.
