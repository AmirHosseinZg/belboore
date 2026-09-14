# Step 19: RabbitMQ + Celery Worker Foundation

**Phase:** D — Tier 2  
**Mode:** PLAN → REVIEW → IMPLEMENT → VERIFY  
**Branch:** `backend/19-rabbitmq-celery`

## Purpose
Add durable asynchronous execution now that jobs exist.

## Prerequisites
- Step 18

## Actions
- Add RabbitMQ to Compose.
- Configure Celery worker with durable queues/retries/prefetch/concurrency.
- Correlate tasks to DB jobs.
- Implement one no-op/test task through full lifecycle.
- Design duplicate-delivery idempotency and graceful shutdown.

## Required outputs
- RabbitMQ service
- Worker runtime
- Test task
- Retry/DLQ documentation

## Verification
- API -> DB -> queue -> worker -> DB integration
- Worker crash/retry
- Duplicate delivery
- Graceful shutdown

## Acceptance criteria
- [ ] At-least-once delivery cannot corrupt state
- [ ] Queue outage cannot mark job done
- [ ] Job state survives Redis restart

## Explicit non-goals
- Do not use Redis as Celery broker
- No media transformations

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Step 20 secures ingestion.
