# Step 41: Advanced PDF Features

**Phase:** F — Post-v1  
**Mode:** PLAN → REVIEW → IMPLEMENT → VERIFY  
**Branch:** `backend/41-advanced-pdf`

## Purpose
Add PDF compression, PDF-to-Markdown and signature inspection as separate reviewed features.

## Prerequisites
- Release 1 stable

## Actions
- Design each contract separately
- Review parser/security model
- Treat cryptographic signature verification as a correctness-sensitive feature

## Required outputs
- Processors/contracts/tests
- Per-feature threat notes

## Verification
- Malformed/encrypted/signed fixture suites
- Limits/timeouts

## Acceptance criteria
- [ ] No false claims about signature trust/validity
- [ ] Each feature bounded

## Explicit non-goals
- Do not bundle unrelated PDF semantics

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Proceed one feature at a time.
