# Step 14: Remaining V1 Tier-1 APIs

**Phase:** C — Tier 1  
**Mode:** IMPLEMENT → VERIFY by domain family  
**Branch:** `backend/14-tier1-remaining`

## Purpose
Finish the approved synchronous provider-backed release scope.

## Prerequisites
- Step 13

## Actions
- Implement small domain families only from V1_SCOPE.
- Assign explicit cache TTL/jitter and upstream timeout per endpoint.
- Use fallback only where provider matrix approved it.
- Add provider/cache metrics hooks and OpenAPI examples.

## Required outputs
- All approved v1 Tier-1 endpoints
- Tests
- OpenAPI updates

## Verification
- Per-family unit + mocked upstream tests
- Cache/rate/failure tests
- Regression suite

## Acceptance criteria
- [ ] Each scoped Tier-1 item is implemented or explicitly deferred
- [ ] All upstream failures map predictably
- [ ] No auth required

## Explicit non-goals
- No WebSockets
- No Tier 2
- No speculative real-time feeds

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Step 15 adds short links.
