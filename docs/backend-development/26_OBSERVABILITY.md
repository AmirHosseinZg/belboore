# Step 26: Observability Baseline

**Phase:** E — Production  
**Mode:** PLAN → REVIEW → IMPLEMENT → VERIFY  
**Branch:** `backend/26-observability`

## Purpose
Make the service operable before deployment.

## Prerequisites
- Step 24

## Actions
- Add Prometheus metrics for API RED metrics, provider latency/errors/cache, DB pool, Redis, queue depth, worker jobs and processing durations.
- Add Prometheus/Grafana Compose profile if VPS budget allows; otherwise preserve compatible metrics and a lighter deployment.
- Keep logs JSON and privacy-safe.
- Define actionable health/alert thresholds.

## Required outputs
- Metrics
- Prometheus config
- Grafana baseline if enabled
- Operational dashboard/runbook notes

## Verification
- Metric endpoint
- No user payload/high-cardinality secrets in labels
- Restart/config validation

## Acceptance criteria
- [ ] API/provider/job signals are observable
- [ ] Sensitive inputs are absent from logs/metrics

## Explicit non-goals
- No third-party product tracking
- No invasive analytics

## Isolation / rollback
This step must be independently revertible with its atomic commit. Do not combine unrelated frontend, schema, provider, infrastructure, or future-roadmap changes into this branch.

## Handoff
Step 27 creates production topology.
