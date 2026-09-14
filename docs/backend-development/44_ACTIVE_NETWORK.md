# Step 44: Active Network Diagnostics

**Phase:** F — Post-v1  
**Mode:** PLAN → REVIEW → IMPLEMENT → VERIFY  
**Branch:** `backend/44-active-network`

## Purpose
Add ping/traceroute/controlled port checks only after abuse controls exist.

## Prerequisites
- Step 43 stable

## Actions
- Use isolated worker/possibly separate VPS
- Fixed egress identity
- Block private/internal destinations
- Bound targets/ports/hops/time
- Strict anonymous quotas

## Required outputs
- Active diagnostic runtime
- Abuse policy
- Tests

## Verification
- Command injection
- Internal target block
- Concurrency abuse

## Acceptance criteria
- [ ] No generic mass scanning
- [ ] Core data network inaccessible

## Explicit non-goals
- No unrestricted port ranges
- No arbitrary shell commands

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Operate and measure before broadening.
