# Step 09: Backend Security Baseline

**Phase:** B — Foundation  
**Mode:** PLAN → REVIEW → IMPLEMENT → VERIFY  
**Branch:** `backend/09-security-baseline`

## Purpose
Build secure defaults before connecting to external providers.

## Prerequisites
- Step 08

## Actions
- Create bounded outbound HTTP client with explicit connect/read/total timeouts.
- Create URL/host validation primitives for future server-side fetches.
- Document SSRF/private-range protections.
- Set dependency pinning/scanning and secret-scanning commands.
- Create reusable threat-model template.

## Required outputs
- `security/BASELINE_THREAT_MODEL.md`
- Safe outbound client
- Security verification commands/tests

## Verification
- Timeout tests
- Malformed URL tests
- Private/loopback rejection tests where relevant
- Dependency/secret scan

## Acceptance criteria
- [ ] Every outbound request has explicit timeout
- [ ] Reusable SSRF-safe foundation exists
- [ ] No secrets committed

## Explicit non-goals
- No Tier-3 probes
- No uploads
- No auth

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Step 10 creates local Compose.
