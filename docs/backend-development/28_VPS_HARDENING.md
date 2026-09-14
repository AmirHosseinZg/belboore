# Step 28: VPS Provisioning & Host Hardening

**Phase:** E — Production  
**Mode:** PLAN → REVIEW → IMPLEMENT → VERIFY  
**Branch:** `backend/28-vps-hardening`

## Purpose
Make the origin safe and reproducible.

## Prerequisites
- Step 27
- Actual VPS/OS identified before execution

## Actions
- Use idempotent Ansible or equivalent scripts.
- Create restricted deploy user.
- SSH key-only; disable root/password login after validating replacement access.
- Host firewall, updates, Docker install/pinning, time sync, log rotation and disk monitoring.
- Define persistent data directories/permissions.

## Required outputs
- Provisioning automation
- `VPS_RUNBOOK.md`
- Firewall policy
- Data-directory map

## Verification
- Second idempotent run
- New SSH session validation
- External port scan

## Acceptance criteria
- [ ] SSH recovery path documented
- [ ] Only intended ports reachable
- [ ] Stateful directories explicit

## Explicit non-goals
- Do not lock yourself out
- Do not expose DB/cache/broker

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Step 29 puts Arvan in front.
