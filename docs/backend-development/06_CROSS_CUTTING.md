# Step 06: Configuration, Logging, Request IDs & Errors

**Phase:** B — Foundation  
**Mode:** IMPLEMENT → VERIFY  
**Branch:** `backend/06-cross-cutting`

## Purpose
Make all future modules inherit consistent production behavior.

## Prerequisites
- Step 05

## Actions
- Add explicit dev/test/prod settings.
- Structured JSON logs with privacy redaction.
- Request/correlation ID middleware.
- Standard validation/domain/unhandled error translation.
- Safe CORS configuration.
- Shared outbound timeout constants/policy.

## Required outputs
- Settings module
- Logging middleware/config
- Error handlers
- Request-ID tests

## Verification
- Validation-error contract test
- Request-ID propagation test
- Ensure normal logs contain no request body/secrets
- Full quality suite

## Acceptance criteria
- [ ] Errors match API standard
- [ ] Production config fails closed
- [ ] Logs are structured/privacy-safe

## Explicit non-goals
- No DB/Redis
- No request-body logging

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Step 07 adds persistent DB.
