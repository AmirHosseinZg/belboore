# Step 21: Image Compression Processor

**Phase:** D — Tier 2  
**Mode:** IMPLEMENT → VERIFY  
**Branch:** `backend/21-image-compression`

## Purpose
Ship the first real Tier-2 processor.

## Prerequisites
- Step 20

## Actions
- Support only approved image formats.
- Enforce dimensions/pixel count, input size, execution time and output size policy.
- Normalize orientation and metadata according to documented policy.
- Process in worker; write output to object storage; update job atomically/idempotently.

## Required outputs
- Processor/task
- Job/API schema
- Output metadata
- Security fixtures/tests

## Verification
- Valid formats
- Corrupt input
- Huge dimensions
- Timeout
- Duplicate task delivery

## Acceptance criteria
- [ ] CPU-heavy work never runs in API process
- [ ] Decompression-bomb style inputs are bounded
- [ ] Output expires automatically

## Explicit non-goals
- No OCR
- No unrelated image converter unless scope explicitly approved

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Step 22 adds images-to-PDF.
