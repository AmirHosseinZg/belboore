# Step 02: Verified Backend Tool Matrix

**Phase:** A — Discovery  
**Mode:** PLAN → REVIEW  
**Branch:** `backend/02-backend-tool-matrix`

## Purpose
Turn the old tier list into an authoritative matrix verified against the actual frontend.

## Prerequisites
- Step 01 merged

## Actions
- Start from `docs/Tools_breakdown.md` and inspect every corresponding live tool.
- Create one row per live tool: slug, category, current implementation, proposed tier, backend reason, external provider, upload, async, abuse risk, legal risk, v1/later recommendation.
- Reclassify tools that can safely remain client-side; do not preserve old tiers just for historical consistency.
- Identify duplicate/renamed/missing tools.

## Required outputs
- `artifacts/BACKEND_TOOL_MATRIX.md`
- `artifacts/BACKEND_TOOL_MATRIX.csv`

## Verification
- Matrix row count vs live tool registry
- Manual check of every proposed v1 backend tool

## Acceptance criteria
- [ ] Every live tool has exactly one row
- [ ] Each server-side classification has a concrete reason
- [ ] Potentially unnecessary backend work is flagged

## Explicit non-goals
- No endpoints
- No dependencies
- No provider implementation

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## REVIEW GATE
Stop after the planning artifacts are produced. Do not implement until owner approval.

## Handoff
Owner approves the matrix, then Step 03 freezes scope.
