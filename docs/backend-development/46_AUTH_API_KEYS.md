# Step 46: Optional Identity & API Keys

**Phase:** F — Post-v1  
**Mode:** PLAN → REVIEW → IMPLEMENT → VERIFY  
**Branch:** `backend/46-auth-api-keys`

## Purpose
Add identity only when a real feature requires it.

## Prerequisites
- Concrete product/monetization need

## Actions
- Prefer established OIDC provider/integration
- Keep anonymous core tools
- Hash/scoped API keys if programmatic API exists
- Add authorization/object-ownership tests

## Required outputs
- Identity ADR
- Auth integration
- API-key model if justified

## Verification
- Revocation
- Authorization
- object isolation
- quota identity

## Acceptance criteria
- [ ] Anonymous-first promise remains intact

## Explicit non-goals
- Do not build custom OAuth/OIDC cryptography

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Future features may depend on identity after approval.
