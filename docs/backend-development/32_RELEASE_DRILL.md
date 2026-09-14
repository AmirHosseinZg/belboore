# Step 32: Smoke Tests & Rollback Drill

**Phase:** E — Production  
**Mode:** PLAN → REVIEW → VERIFY  
**Branch:** `backend/32-release-drill`

## Purpose
Prove production release and reversal.

## Prerequisites
- Steps 29–31

## Actions
- Automate smoke tests for live/readiness, Tier-1, short link, upload, each Tier-2 v1 processor and download.
- Perform controlled deploy of known version, next version and rollback.
- Define rollback thresholds.

## Required outputs
- `SMOKE_TESTS.md`
- Smoke script
- `ROLLBACK_RUNBOOK.md`
- Release checklist

## Verification
- Execute deploy/upgrade/rollback/smoke sequence

## Acceptance criteria
- [ ] Rollback is tested, not theoretical
- [ ] Migrations remain backward-compatible enough for rollback strategy

## Explicit non-goals
- No sensitive real-user data in smoke tests

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Step 33 performs pre-launch destructive/failure testing.
