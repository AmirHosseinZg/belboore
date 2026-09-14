# Step 30: GitHub Actions, GHCR & Controlled Deployment

**Phase:** E — Production  
**Mode:** PLAN → REVIEW → IMPLEMENT → VERIFY  
**Branch:** `backend/30-ci-cd`

## Purpose
Build immutable artifacts and deploy predictably.

## Prerequisites
- Step 29

## Actions
- PR CI: lint, type, unit/integration, migrations, OpenAPI/contract, dependency/secret checks.
- Build image tagged by immutable commit SHA and push to GHCR.
- Deploy over restricted SSH using deploy user.
- Pull exact approved image, run safe migrations, restart, smoke test.
- Define rollback to prior image/release.
- Use protected/manual production approval if available.

## Required outputs
- GitHub Actions workflows
- Image/version policy
- Deploy script
- Rollback procedure
- Secret inventory

## Verification
- PR CI green
- Image builds cleanly
- Deployment dry-run/test where possible
- Health-check failure path

## Acceptance criteria
- [ ] No plaintext production secrets
- [ ] Release maps to commit SHA
- [ ] Previous release is rollbackable

## Explicit non-goals
- Do not rely only on `latest`
- No unrestricted sudo for deploy user

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Step 31 creates offsite backup.
