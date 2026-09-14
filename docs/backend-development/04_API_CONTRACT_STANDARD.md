# Step 04: API Contract & Governance Standard

**Phase:** A — Contract  
**Mode:** PLAN → REVIEW  
**Branch:** `backend/04-api-contract-standard`

## Purpose
Define stable API conventions before writing endpoints.

## Prerequisites
- Approved Step 03

## Actions
- Define `/api/v1` routing/naming.
- Define problem/error response schema and stable error codes.
- Define request IDs, rate-limit headers, timeouts, idempotency, cache semantics and pagination.
- Define async job API pattern: 202 + job ID + polling for v1.
- Define upload/presigned-download principles.
- Define OpenAPI ownership and breaking-change policy.

## Required outputs
- `architecture/API_STANDARD.md`
- `architecture/ERROR_CATALOG.md`
- `backend/openapi/README.md` policy

## Verification
- Validate all JSON examples
- Review against FastAPI/OpenAPI behavior

## Acceptance criteria
- [ ] Later endpoints can conform without ad-hoc formats
- [ ] Async contract is decided before Tier 2
- [ ] Breaking changes require explicit review

## Explicit non-goals
- No endpoint implementations
- No frontend edits
- No infra

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## REVIEW GATE
Stop after the planning artifacts are produced. Do not implement until owner approval.

## Handoff
Step 05 scaffolds FastAPI.
