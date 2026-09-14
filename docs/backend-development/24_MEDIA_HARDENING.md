# Step 24: Tier-2 Security, Isolation & Cleanup

**Phase:** D — Tier 2  
**Mode:** PLAN → REVIEW → IMPLEMENT → VERIFY  
**Branch:** `backend/24-media-hardening`

## Purpose
Close the security/privacy gaps introduced by untrusted file processing.

## Prerequisites
- Steps 20–23

## Actions
- Run worker non-root; drop capabilities; use read-only root FS where feasible.
- Set CPU/memory/PID/time/temp-disk constraints.
- Disable worker outbound network by default where the runtime permits.
- Implement stale job/object/temp cleanup and reconciliation.
- Document parser/library attack surface.

## Required outputs
- Hardened worker container/Compose
- Cleanup job/command
- `security/MEDIA_THREAT_MODEL.md`
- Retention implementation

## Verification
- Timeout
- Worker crash cleanup
- Expired object cleanup
- Resource exhaustion scenarios

## Acceptance criteria
- [ ] Worker blast radius is smaller than API
- [ ] Temporary content is automatically removed
- [ ] No indefinite retention

## Explicit non-goals
- No Tier-3 network privileges
- No downloaders

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Step 25 packages frontend integration.
