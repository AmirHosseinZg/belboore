# Step 45: Downloader Legal & Security Phase

**Phase:** F — Post-v1  
**Mode:** PLAN → REVIEW → IMPLEMENT → VERIFY  
**Branch:** `backend/45-downloaders`

## Purpose
Treat downloaders as a separate product/security program.

## Prerequisites
- Release 1 stable
- Explicit owner/legal approval

## Actions
- Review every target platform separately
- Ship only explicitly approved platforms
- Dedicated workers/egress
- URL SSRF defense
- Size/duration/concurrency limits
- Short retention
- Safe yt-dlp invocation

## Required outputs
- Per-platform decision matrix
- Dedicated runtime
- Approved contracts

## Verification
- Private/internal URL defense
- blocked/private content
- resource limits
- worker failure

## Acceptance criteria
- [ ] Only approved platforms ship
- [ ] Core data services inaccessible from downloader workers

## Explicit non-goals
- No DRM/access-control bypass
- No default collection of user passwords/cookies

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Review abuse/cost after each platform.
