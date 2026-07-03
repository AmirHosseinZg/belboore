# 00-project-brief.md
Condensed context. Give this to the agent alongside every step file.

## Product
Belboore — ~150 bilingual (Persian/English) web tools across 10 categories.
Frontend = Astro static site, already built, deployed on a CDN, calling
`/api/v1/...` for anything that isn't pure client-side JS.

## Tool tiers (this determines backend shape)
- **Tier 0** — pure client-side JS, no backend involvement. Not our concern here.
- **Tier 1** — thin API proxy to external providers (FX rates, crypto prices,
  weather, Spotify preview, lyrics), cached in Redis.
- **Tier 2** — async compute jobs: image/video/audio conversion & compression,
  PDF merge/compress/OCR, content downloaders (yt-dlp). Runs in a job queue,
  writes to object storage, returns a signed download URL.
- **Tier 3** — network diagnostics: ping, traceroute, DNS lookup, WHOIS, port
  scan, SSL check, speed test. Highest abuse/legal risk — isolated egress,
  account-gated, hard rate limits.

## Infrastructure reality (this is NOT the earlier 100M-user document — scaled down)
- **One VPS.** No Kubernetes. Docker Compose is the orchestration layer.
- **ArvanCloud** sits in front as CDN + DNS + WAF/Anti-DDoS + (optionally)
  S3-compatible Object Storage. Origin = the VPS, reached only through ArvanCloud.
- Isolation is achieved via: separate Docker containers, separate Docker
  networks (`core_net`, `media_net`, `netdiag_net`, `data_net`), resource
  limits (`mem_limit`, `cpus`) per container, and Postgres schema-per-module —
  NOT via separate physical machines (we only have one).
- No multi-region, no service mesh, no Kubernetes-specific tooling anywhere in
  this build plan. If a step file from elsewhere mentions Kubernetes/Linkerd/
  Argo CD, ignore it — that was for a future, larger-scale phase, not this build.

## Core stack
- **API**: FastAPI (Python), one process = Core API (modular monolith: catalog,
  proxy/integrations, identity, shortlinks, usage, abuse-control modules).
- **Media service**: separate FastAPI app + Celery workers (FFmpeg, Tesseract
  OCR, yt-dlp), own container(s).
- **NetDiag service**: separate FastAPI app, own container, own restricted
  egress path.
- **DB**: PostgreSQL (single instance to start, schema-per-module).
- **Cache/queue**: Redis (single instance to start; separate logical DB index
  per concern: cache=0, ratelimit=1, celery-broker=2).
- **Object storage**: MinIO container OR ArvanCloud Object Storage (S3-
  compatible) — decided in step 03.
- **Reverse proxy**: Nginx container, only thing exposed to ArvanCloud.

## What the frontend already expects (do not break this contract)
- Base path: `/api/v1/`
- JSON error shape: `application/problem+json` — `{type, title, status, detail,
  instance, trace_id}`
- Auth: `Authorization: Bearer <JWT>` optional (most endpoints work anonymously)
- All list endpoints: cursor pagination
- Every write endpoint accepts optional `Idempotency-Key` header

If the frontend dev's existing mock responses differ from this, the API
contract step (step 11) is where that gets reconciled — flag it there, don't
guess.

## Build order (why)
Infrastructure and platform plumbing come first (steps 01–04) because every
module depends on: the VPS being hardened, ArvanCloud routing correctly,
Postgres/Redis/object storage existing, and the Core API skeleton (auth,
error handling, health checks) existing. Only after that do we build tool
modules (steps 05–07), because building modules against a moving
infrastructure target wastes agent time and produces inconsistent code.
