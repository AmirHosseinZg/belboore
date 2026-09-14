# Step 43: Safe Tier-3 Diagnostics

**Phase:** F — Post-v1  
**Mode:** PLAN → REVIEW → IMPLEMENT → VERIFY  
**Branch:** `backend/43-safe-diagnostics`

## Purpose
Introduce low-risk diagnostics before active probing.

## Prerequisites
- Release 1 stable

## Actions
- Separate runtime/security boundary
- What-is-my-IP, DNS, RDAP/WHOIS, SSL metadata only if approved
- Private/internal network blocks
- Strict timeouts

## Required outputs
- Diagnostic service/boundary
- Contracts
- Security tests

## Verification
- Loopback/private targets
- Timeouts
- DNS/redirect protections where applicable

## Acceptance criteria
- [ ] Diagnostic runtime cannot reach private data services

## Explicit non-goals
- No port scan
- No ping/traceroute yet

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Step 44 handles active probes.
