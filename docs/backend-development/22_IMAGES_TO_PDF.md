# Step 22: Images-to-PDF Processor

**Phase:** D — Tier 2  
**Mode:** IMPLEMENT → VERIFY  
**Branch:** `backend/22-images-to-pdf`

## Purpose
Reuse the shared pipeline for ordered multi-file PDF generation.

## Prerequisites
- Step 21

## Actions
- Accept bounded ordered validated image references.
- Enforce file count, aggregate bytes and aggregate pixel limits.
- Generate in worker without unbounded in-memory buffering.
- Store temporary PDF output and metadata.

## Required outputs
- Processor/task
- Multi-file input contract
- Limits/tests

## Verification
- Order preservation
- Mixed allowed types
- Too many files
- Aggregate limit
- Corrupt referenced object
- Duplicate task

## Acceptance criteria
- [ ] Uses existing upload/job/storage abstractions
- [ ] No second ad-hoc upload path

## Explicit non-goals
- No remote image URLs
- No PDF compression

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Step 23 adds PDF merge.
