# Step 42: Audio & Video Processing

**Phase:** F — Post-v1  
**Mode:** PLAN → REVIEW → IMPLEMENT → VERIFY  
**Branch:** `backend/42-audio-video`

## Purpose
Introduce FFmpeg workloads with separate resource classes.

## Prerequisites
- Release 1 stable

## Actions
- Safe non-shell FFmpeg invocation
- Probe input
- Duration/resolution/bitrate limits
- Separate queues/workers for video/audio
- Benchmark CPU/memory

## Required outputs
- FFmpeg worker image
- Contracts
- Resource profiles

## Verification
- Malformed media
- Timeout
- large resolution/duration
- worker crash

## Acceptance criteria
- [ ] No user value becomes raw shell syntax
- [ ] Measured limits exist

## Explicit non-goals
- No downloader in same worker pool

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Scale from measured queue/resource behavior.
