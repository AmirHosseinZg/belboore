# Step 33: Load, Security & Failure Testing

**Phase:** E — Production  
**Mode:** PLAN → REVIEW → VERIFY  
**Branch:** `backend/33-prelaunch-tests`

## Purpose
Measure actual capacity and failure behavior of the real v1 architecture.

## Prerequisites
- Step 32

## Actions
- API load/spike/soak tests.
- Cache stampede and DB pool pressure.
- Redis/provider/RabbitMQ/worker outage tests.
- Malformed/oversize uploads and concurrency.
- Disk-pressure scenario.
- OWASP-style API abuse checks.
- Adjust limits from measured results.

## Required outputs
- `PERFORMANCE_BASELINE.md`
- `FAILURE_TEST_RESULTS.md`
- `SECURITY_TEST_RESULTS.md`

## Verification
- Expected peak + safety multiple
- Soak
- Dependency failure injection
- Malformed-file corpus

## Acceptance criteria
- [ ] No unbounded queue/memory/disk behavior
- [ ] Measured limits reflected in config
- [ ] Critical/high findings fixed or launch-blocking

## Explicit non-goals
- Do not claim internet-scale capacity from one-VPS tests

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Step 34 is go/no-go.
