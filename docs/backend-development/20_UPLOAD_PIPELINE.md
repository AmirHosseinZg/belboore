# Step 20: Secure Upload & Validation Pipeline

**Phase:** D — Tier 2  
**Mode:** PLAN → REVIEW → IMPLEMENT → VERIFY  
**Branch:** `backend/20-upload-pipeline`

## Purpose
Create a single hardened ingestion path for all v1 processors.

## Prerequisites
- Step 19

## Actions
- Implement upload-session creation and presigned upload.
- Finalize upload only after verifying object existence/size/type.
- Use magic bytes/parser validation; do not trust extension or Content-Type alone.
- Set v1 per-file/aggregate limits.
- Bind validated inputs to jobs using anonymous capability/job semantics.
- Delete/reject invalid/quarantined inputs.

## Required outputs
- Upload-session contract
- File metadata if needed
- Validation module
- Configured limits

## Verification
- MIME mismatch
- Oversize
- Zero-byte/corrupt
- Traversal filename
- Duplicate finalize
- Expired upload

## Acceptance criteria
- [ ] Only validated files enter processing
- [ ] Untrusted filenames never control paths
- [ ] Limits are config-driven

## Explicit non-goals
- No transformations yet
- No arbitrary remote URL ingestion

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Steps 21–23 implement processors.
