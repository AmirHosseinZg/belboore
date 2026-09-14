# Step 12: Tier-1 Provider Selection

**Phase:** C — Tier 1  
**Mode:** PLAN → REVIEW  
**Branch:** `backend/12-provider-selection`

## Purpose
Choose current providers using product, Iran-access, licensing and reliability constraints.

## Prerequisites
- Step 11

## Actions
- For each v1 Tier-1 tool evaluate primary/fallback/provider-free options.
- Record authentication, quotas, cost, Iran availability, latency expectations, attribution, ToS/license and cacheability.
- Remove/defer tools that do not have a safe/reliable source.

## Required outputs
- `providers/PROVIDER_MATRIX.md`
- Provider ADR(s)
- Required-secret inventory (names only)

## Verification
- Verify against current official provider documentation
- Record tested/known accessibility constraints where possible

## Acceptance criteria
- [ ] Every Tier-1 v1 tool has a viable source or is explicitly deferred
- [ ] No credential values stored
- [ ] Licensing/attribution recorded

## Explicit non-goals
- No scraping without explicit approval
- No production implementation

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## REVIEW GATE
Stop after the planning artifacts are produced. Do not implement until owner approval.

## Handoff
Owner approves choices; Step 13 proves one vertical.
