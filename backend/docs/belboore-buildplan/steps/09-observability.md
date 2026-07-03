# Step 09 — Observability (Logs, Metrics, Alerts)

## Goal
A single-VPS-appropriate observability stack — lightweight, self-hosted,
no SaaS bill, but still gives real visibility into all three services.

## Context you need
`00-project-brief.md`. On one VPS, running the full enterprise
Prometheus+Grafana+Jaeger+OpenSearch stack alongside the app is heavy —
scale it down explicitly:

## Tasks
1. **Structured logging**: every service (Core API, Media, NetDiag) logs
   JSON to stdout (never to a file the container owns) with at minimum:
   `timestamp, level, service, trace_id, message`, and NEVER logs PII (raw
   IPs beyond the rate-limit window, emails, file contents, diagnostic
   targets beyond what's needed for abuse review).
2. **Log shipping**: use Docker's `json-file` driver with rotation (already
   set in step 01) as the baseline; add a lightweight log shipper (e.g.
   Vector or Promtail) → a single-node **Grafana Loki** instance (much
   lighter than OpenSearch for one VPS) if centralized log search is wanted;
   otherwise `docker compose logs` + rotation is an acceptable MVP — decide
   based on actual VPS RAM headroom and note the decision.
3. **Metrics**: single-node **Prometheus** container scraping:
   - Each FastAPI app via a `/metrics` endpoint (request rate, latency
     histogram, error rate — RED method).
   - `postgres_exporter`, `redis_exporter`, `node_exporter` (host-level
     CPU/mem/disk).
   - Celery queue depth (custom metric — this is the leading indicator for
     Media service scaling decisions later).
4. **Dashboards**: single **Grafana** container, provisioned dashboards
   (checked into repo as JSON, not clicked together manually and lost):
   - Platform overview (RED per service)
   - Tier 1 cache hit ratio + circuit breaker state
   - Tier 2 queue depth per job type + job success/failure rate
   - Tier 3 request volume + abuse-score/throttle events
   - Host resources (CPU/mem/disk — critical on a single box, this is your
     early warning for "the VPS is out of headroom")
5. **Alerting**: Prometheus Alertmanager, routed to at minimum a Telegram
   bot or email (pick whatever's operationally realistic for a small/solo
   team — do not over-engineer a PagerDuty-style setup for one person).
   Minimum alert set:
   - Any service `/readyz` failing for >2 min
   - Disk usage >85%
   - Postgres replication/backup job failure
   - Celery queue depth above threshold for >10 min (jobs backing up)
   - NetDiag abuse-throttle rate spike
6. **Synthetic check**: a simple external cron (can run from a different
   free service, e.g. a scheduled GitHub Action, or a cheap uptime-monitor
   SaaS) hitting `/healthz` from OUTSIDE the VPS every few minutes — internal
   monitoring can't see ArvanCloud/DNS-layer failures.

## Explicit scale-down from the enterprise design
No Jaeger/distributed tracing cluster at this stage — `trace_id` in
structured logs (already built in step 05) is sufficient for a single-VPS
deployment where "distributed" mostly means "3 containers on one box." Add
real tracing only if/when a second VPS is introduced.

## Acceptance criteria
- [ ] All 3 services emit structured JSON logs with `trace_id`
- [ ] Prometheus is scraping all exporters + app `/metrics` successfully
- [ ] Grafana dashboards load and show real data (not empty panels)
- [ ] At least one alert has been manually triggered and confirmed to fire
      (e.g., stop a container, confirm the readyz alert arrives)
- [ ] External synthetic check configured and confirmed working
- [ ] Update `PROGRESS.md`
