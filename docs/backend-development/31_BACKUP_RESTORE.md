# Step 31: Offsite Backup & Restore

**Phase:** E — Production  
**Mode:** PLAN → REVIEW → IMPLEMENT → VERIFY  
**Branch:** `backend/31-backup-restore`

## Purpose
Survive loss of the single production VPS.

## Prerequisites
- Step 30

## Actions
- Automate PostgreSQL backup to Arvan S3-compatible storage or approved second site.
- Define retention/encryption.
- Back up only durable MinIO/config data that actually needs DR; transient processed outputs do not.
- Define encrypted secret/config recovery process.
- Perform a real restore test into a clean disposable environment.

## Required outputs
- Backup job/scripts
- Retention policy
- `RESTORE_RUNBOOK.md`
- Restore-test record

## Verification
- Restore DB into clean instance
- Validate offsite objects
- Simulate missing production data volume

## Acceptance criteria
- [ ] At least one successful restore before launch
- [ ] Backup failure is detectable
- [ ] Same-VPS copy is not called backup

## Explicit non-goals
- Do not extend user-file retention just for backups

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Step 32 drills release/rollback.
