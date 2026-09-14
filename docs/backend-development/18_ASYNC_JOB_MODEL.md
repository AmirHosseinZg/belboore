# Step 18: Asynchronous Job Model & Contract

**Phase:** D — Tier 2  
**Mode:** PLAN → REVIEW → IMPLEMENT → VERIFY  
**Branch:** `backend/18-async-job-model`

## Purpose
Make PostgreSQL authoritative for processing jobs before adding Celery.

## Prerequisites
- Step 17

## Actions
- Define ProcessingJob/JobAttempt/FileReference and state machine.
- Define 202 create response, job status polling and result/error model.
- Define idempotent job creation and expiration.
- Decide cancellation semantics for v1.

## Required outputs
- Job schema + migration
- Domain state machine
- Create/status contracts
- Tests

## Verification
- State-transition tests
- Concurrent idempotency
- Invalid transitions
- Migration tests

## Acceptance criteria
- [ ] PostgreSQL is authoritative
- [ ] Redis is not job truth
- [ ] Polling is sufficient for v1

## Explicit non-goals
- No Celery task implementation
- No SSE/WebSocket

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Step 19 adds queue/worker transport.
