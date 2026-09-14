# Step 16: Tier-1 + Short-Link OpenAPI Freeze

**Phase:** C — Tier 1  
**Mode:** PLAN → REVIEW → VERIFY  
**Branch:** `backend/16-openapi-handoff`

## Purpose
Give frontend a stable first integration target while Tier 2 continues.

## Prerequisites
- Step 15

## Actions
- Review all synchronous v1 paths/errors/examples/rate limits.
- Export deterministic OpenAPI v1 artifact.
- Document TypeScript type/client generation strategy.
- Map endpoint -> frontend tool slug.

## Required outputs
- `backend/openapi/v1.json` or approved deterministic artifact
- `contracts/FRONTEND_HANDOFF_TIER1.md`
- Tool-endpoint map

## Verification
- OpenAPI schema validation
- Contract tests against running app
- Generated artifact diff check

## Acceptance criteria
- [ ] Frontend can integrate without reading backend internals
- [ ] Breaking changes after this require explicit review

## Explicit non-goals
- Do not edit frontend in this backend step
- Do not mark unfinished Tier-2 endpoints stable

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Step 17 starts file infrastructure.
