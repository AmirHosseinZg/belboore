# Step 15: Anonymous Link Shortener

**Phase:** C — Tier 1  
**Mode:** PLAN → REVIEW → IMPLEMENT → VERIFY  
**Branch:** `backend/15-link-shortener`

## Purpose
Implement the first DB-backed product feature with abuse/privacy constraints.

## Prerequisites
- Step 14

## Actions
- Define short-code generation and collision behavior.
- Define allowed URL schemes and validation.
- Define optional expiration, disabled/not-found behavior and redirect status.
- Add anonymous creation quotas.
- Store minimum metadata; avoid long-term raw IP logs.

## Required outputs
- Short-link schema + migration
- Create endpoint
- Redirect endpoint
- Tests/docs

## Verification
- Collision/concurrency
- Bad URL
- Expiration
- Redirect
- Rate-limit
- Migration

## Acceptance criteria
- [ ] Redirect lookup is indexed/efficient
- [ ] Creation is bounded
- [ ] Privacy model documented

## Explicit non-goals
- No invasive click analytics
- No accounts/admin

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Step 16 freezes the first frontend contract.
