# Step 17: S3-Compatible Object Storage

**Phase:** D — Tier 2  
**Mode:** PLAN → REVIEW → IMPLEMENT → VERIFY  
**Branch:** `backend/17-object-storage`

## Purpose
Introduce object storage only when file-processing work begins.

## Prerequisites
- Step 16

## Actions
- Add storage port and S3-compatible adapter.
- Add MinIO to local Compose.
- Define random object-key/prefix strategy and metadata policy.
- Implement presigned upload/download primitives.
- Define temporary lifecycle/retention.

## Required outputs
- Storage abstraction
- MinIO Compose service
- Lifecycle docs
- Integration tests

## Verification
- Upload/get/delete
- Object-key traversal/collision
- Presigned access

## Acceptance criteria
- [ ] Application is S3-compatible/provider-neutral
- [ ] Original filename never controls physical object key
- [ ] Retention is documented

## Explicit non-goals
- No permanent cloud-drive feature
- No queue yet

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Step 18 defines jobs.
