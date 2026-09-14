# Step 08: Redis Cache & Anonymous Rate Limiting

**Phase:** B — Foundation  
**Mode:** PLAN → REVIEW → IMPLEMENT → VERIFY  
**Branch:** `backend/08-redis-rate-limit`

## Purpose
Add Redis only for ephemeral capabilities needed by Tier 1.

## Prerequisites
- Step 07

## Actions
- Create cache port/adapter with TTL, jitter and namespaced/versioned keys.
- Create atomic distributed rate limiter.
- Derive anonymous principal from trusted proxy chain + privacy-preserving hash, not permanent raw-IP identity.
- Define Redis-down behavior.

## Required outputs
- Redis adapter
- Cache service
- Rate-limit service
- Key/TTL docs

## Verification
- Hit/miss/expiry tests
- Concurrent limiter test
- Redis-down test
- Forwarded-IP spoofing tests

## Acceptance criteria
- [ ] Redis is never authoritative business state
- [ ] Rate limits work across replicas
- [ ] Untrusted headers cannot spoof client identity

## Explicit non-goals
- No Celery broker
- No sessions/auth

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Step 09 establishes security primitives.
