# Step 11: Tier-1 Provider Adapter Framework

**Phase:** C — Tier 1  
**Mode:** PLAN → REVIEW → IMPLEMENT → VERIFY  
**Branch:** `backend/11-provider-framework`

## Purpose
Prevent vendor lock-in and normalize provider failures.

## Prerequisites
- Step 10
- Approved V1 scope

## Actions
- Define provider ports/interfaces and normalized domain models.
- Define provider error taxonomy (timeout/rate-limit/unavailable/bad-response).
- Define cache/fallback hooks and provider observability.
- Implement fake provider(s) for contract tests only.

## Required outputs
- Provider interfaces
- Normalized errors
- Fake provider
- Provider contract tests

## Verification
- Fallback tests
- Cache tests
- Timeout tests
- Secret-redaction tests

## Acceptance criteria
- [ ] Public schemas contain no vendor-specific response types
- [ ] Second provider can be added without public contract change

## Explicit non-goals
- Do not integrate every real vendor
- Do not hard-code vendor names into public contracts

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Step 12 selects real providers.
