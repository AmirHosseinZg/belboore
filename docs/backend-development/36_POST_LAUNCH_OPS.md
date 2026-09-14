# Step 36: Post-Launch Operations & Scaling Gates

**Phase:** E — Production  
**Mode:** PLAN → VERIFY  
**Branch:** `backend/36-post-launch-ops`

## Purpose
Make scaling evidence-driven.

## Prerequisites
- Step 35

## Actions
- Track traffic/RPS, cache hit ratio, provider failure, DB pool, queue delay, CPU seconds/job, bytes uploaded/downloaded, storage growth, backup success, incidents and cost.
- Define triggers for a second VPS, dedicated DB, external object storage, staging environment, HA, and Kubernetes.
- Review weekly initially.

## Required outputs
- `OPERATIONS_CADENCE.md`
- `SCALING_TRIGGERS.md`
- `COST_CAPACITY_SCORECARD.md`

## Verification
- Confirm required metrics actually exist

## Acceptance criteria
- [ ] Scaling actions have measurable triggers
- [ ] Kubernetes is not aspirational/default

## Explicit non-goals
- No post-v1 features in this step

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Choose Phase F based on product demand.
