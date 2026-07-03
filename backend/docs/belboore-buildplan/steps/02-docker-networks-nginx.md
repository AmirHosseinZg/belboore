# Step 02 — Docker Network Topology & Nginx Reverse Proxy

## Goal
Establish the isolation boundaries (Section "Isolation rules" in
AGENT_RULES.md) as real Docker networks, and stand up the single entry point
(Nginx) that ArvanCloud will forward traffic to. This is the step that makes
"Media and NetDiag are isolated services" actually true, not just aspirational.

## Context you need
`00-project-brief.md` + `AGENT_RULES.md`. Builds on step 01's directory layout.

## Tasks
1. **Define Docker networks** in `docker-compose.yml`:
   - `edge_net` — Nginx only, this is what (eventually) faces ArvanCloud.
   - `core_net` — Core API + its own dependencies.
   - `media_net` — Media API + Celery workers.
   - `netdiag_net` — NetDiag API only.
   - `data_net` — Postgres, Redis, object storage. Only services that need
     data access join this network. NetDiag joins `data_net` ONLY for the
     Redis rate-limit check — nothing else — document this exception
     explicitly in a comment in the compose file.
   - **Hard rule**: NetDiag container must NOT be on `core_net` or reachable
     from Core API's network directly. All calls from Core API to NetDiag (if
     any orchestration is needed) go through Nginx like an external call, not
     a direct Docker-network hop — this makes the isolation boundary provable,
     not just assumed.
2. **Nginx config** (`nginx/nginx.conf` + `nginx/conf.d/belboore.conf`):
   - Single `server` block on 443 (TLS terminated here or at ArvanCloud —
     decide in step 03; if ArvanCloud terminates TLS, Nginx listens on 80
     internally and trusts only ArvanCloud's IP ranges).
   - Path-based routing:
     - `/api/v1/media/*` → media-api container
     - `/api/v1/net/*` → netdiag-api container
     - `/api/v1/*` → core-api container
   - Request size limits (`client_max_body_size`) set per-location — large for
     `/api/v1/media/jobs` (file uploads), tiny everywhere else.
   - Timeouts tuned per-location: short for Tier 1/3 (fail fast), longer
     `proxy_read_timeout` only on Tier 2 job-status/streaming endpoints.
   - Basic security headers (`X-Content-Type-Options`, `X-Frame-Options`,
     `Referrer-Policy`) added here even though CSP itself is a frontend
     concern.
3. **Resource limits** on every service in compose (`mem_limit`, `cpus`) —
   pick conservative starting values; this is what prevents one Tier 2 video
   job from starving the whole VPS.
4. **Restart policies**: `restart: unless-stopped` on all long-running
   services.
5. **Placeholder containers**: at this step, `core-api`, `media-api`, and
   `netdiag-api` can be trivial "hello world" FastAPI apps (one `/healthz`
   route each) — the real logic comes in steps 05–08. The point of this step
   is proving the network topology and routing work end-to-end.

## Acceptance criteria
- [ ] `docker compose up` brings up nginx + 3 placeholder services + networks
- [ ] `curl http://<vps-ip>/api/v1/healthz` reaches core-api
- [ ] `curl http://<vps-ip>/api/v1/media/healthz` reaches media-api
- [ ] `curl http://<vps-ip>/api/v1/net/healthz` reaches netdiag-api
- [ ] `docker network inspect` confirms netdiag container is absent from
      `core_net`
- [ ] Attempting a direct container-to-container call from core-api to
      netdiag-api over the Docker network FAILS (proves isolation) — write
      this as an actual test/script, not just a manual check
- [ ] Update `PROGRESS.md`
