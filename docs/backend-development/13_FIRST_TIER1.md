# Step 13: First Tier-1 End-to-End Vertical Slice

**Phase:** C — Tier 1  
**Mode:** IMPLEMENT → VERIFY  
**Branch:** `backend/13-first-tier1`

## Purpose
Prove router → service → provider → cache → normalized response before multiplying endpoints.

## Prerequisites
- Approved Step 12

## Actions
- Pick one representative low-risk approved tool (weather is a good default if approved).
- Implement endpoint, adapter, caching, rate limit and stable errors.
- Add OpenAPI examples and frontend handoff example.
- Handle provider timeout/429/5xx and stale cache if policy allows.

## Required outputs
- One complete Tier-1 endpoint
- OpenAPI contract
- Adapter
- Contract/integration tests

## Verification
- Happy path
- Cache hit/miss
- 429/timeout/5xx
- Rate-limit
- OpenAPI contract check

## Acceptance criteria
- [ ] Architecture works end-to-end
- [ ] Vendor schema does not leak
- [ ] Frontend can integrate from contract

## Explicit non-goals
- No unrelated Tier-1 tools
- No frontend rewrite

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Step 14 implements remaining approved families.
