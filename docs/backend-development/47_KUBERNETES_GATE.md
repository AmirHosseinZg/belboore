# Step 47: Kubernetes Adoption Gate

**Phase:** F — Evolution  
**Mode:** PLAN → REVIEW  
**Branch:** `backend/47-kubernetes-gate`

## Purpose
Prevent premature platform migration.

## Prerequisites
- Production metrics show real operational pain

## Actions
- Evaluate triggers: multiple worker/app hosts, scheduling pain, availability, autoscaling need, deployment complexity, operator maturity
- Compare second-VPS/Compose alternatives
- Estimate migration/ops cost

## Required outputs
- Kubernetes ADR
- Migration plan only if approved
- Cost/ops comparison

## Verification
- Decision evidence review

## Acceptance criteria
- [ ] Decision is requirements-driven, not aspirational

## Explicit non-goals
- Do not migrate in this decision step

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## REVIEW GATE
Stop after the planning artifacts are produced. Do not implement until owner approval.

## Handoff
Create separate implementation roadmap only if approved.
