# Step 35: Release-1 Launch Runbook

**Phase:** E — Production  
**Mode:** PLAN → VERIFY  
**Branch:** `backend/35-launch-runbook`

## Purpose
Make public launch reproducible by another operator.

## Prerequisites
- Approved Step 34

## Actions
- Pre-launch backup.
- Verify DNS/CDN/origin firewall.
- Deploy approved image and migrations.
- Run smoke tests.
- Enable/confirm public traffic.
- Watch logs/metrics against numeric rollback triggers.
- Document incident ownership and rollback action.

## Required outputs
- `LAUNCH_RUNBOOK.md`
- `INCIDENT_QUICK_REFERENCE.md`
- Launch record template

## Verification
- Dry-run every command/path/domain in runbook

## Acceptance criteria
- [ ] Another competent operator can execute it
- [ ] Rollback triggers are observable

## Explicit non-goals
- No architecture changes during launch

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Step 36 defines ongoing operations.
