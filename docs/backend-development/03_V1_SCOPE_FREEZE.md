# Step 03: Freeze Release-1 Backend Scope

**Phase:** A — Discovery  
**Mode:** PLAN → REVIEW  
**Branch:** `backend/03-v1-scope-freeze`

## Purpose
Create an unambiguous release backlog.

## Prerequisites
- Approved Step 02

## Actions
- Use verified matrix, not old plan estimates.
- Default target: genuinely server-required Tier-1 tools + shortener + image compression + images-to-PDF + PDF merge.
- Move unreliable/legal/high-risk features to `post-v1` or `deferred-risk`.
- Order backlog by dependency and frontend value.

## Required outputs
- `artifacts/V1_SCOPE.md`
- `artifacts/V1_BACKLOG.md`
- `artifacts/DEFERRED_BACKLOG.md`

## Verification
- Every v1 item maps to live frontend behavior
- Every item has sync/async/provider/storage classification

## Acceptance criteria
- [ ] V1 in/out list is explicit
- [ ] Downloaders excluded
- [ ] Active Tier-3 excluded
- [ ] No account dependency

## Explicit non-goals
- No code implementation
- No provider credentials

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## REVIEW GATE
Stop after the planning artifacts are produced. Do not implement until owner approval.

## Handoff
Step 04 sets common API rules.
