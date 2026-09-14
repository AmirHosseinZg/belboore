# Step 40: OCR Expansion

**Phase:** F — Post-v1  
**Mode:** PLAN → REVIEW → IMPLEMENT → VERIFY  
**Branch:** `backend/40-ocr`

## Purpose
Add Persian/English OCR using the established job/storage model.

## Prerequisites
- Release 1 stable

## Actions
- Benchmark candidate engine accuracy/resource use
- Define language/result schema
- Sandbox OCR worker
- Set page/pixel/time limits

## Required outputs
- OCR contract/processor
- Accuracy fixtures
- Resource profile

## Verification
- Persian + English fixtures
- Corrupt/large images
- Timeout

## Acceptance criteria
- [ ] Shared pipeline reused
- [ ] Accuracy baseline documented

## Explicit non-goals
- No permanent document retention
- No GPU unless measurements justify it

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Next expansion chosen from demand.
