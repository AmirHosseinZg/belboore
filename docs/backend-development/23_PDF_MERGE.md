# Step 23: PDF Merge Processor

**Phase:** D — Tier 2  
**Mode:** IMPLEMENT → VERIFY  
**Branch:** `backend/23-pdf-merge`

## Purpose
Merge PDFs safely under explicit resource limits.

## Prerequisites
- Step 22

## Actions
- Validate PDF structure before worker processing.
- Set file-count, total-size and page-count limits.
- Define encrypted/password-protected input policy explicitly.
- Merge in worker and store short-lived output.

## Required outputs
- Processor/task
- PDF validation
- Limits/errors
- Tests

## Verification
- Valid merge
- Malformed PDF
- Encrypted policy
- Page/size/count limit
- Duplicate delivery

## Acceptance criteria
- [ ] Malformed PDFs cannot crash API process
- [ ] Memory/disk use is bounded

## Explicit non-goals
- No compression
- No PDF-to-Markdown
- No signature verification

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Step 24 hardens lifecycle.
