# Locked Decisions

## Product
- Anonymous-first v1; no signup/login.
- No admin API/dashboard in v1.
- Backend authors initial server contracts; frontend adapts.
- Frontend-only tools stay frontend-only.
- Initial target slice: verified Tier-1 APIs + link shortener + image compression + images-to-PDF + PDF merge.
- Downloaders and active Tier-3 diagnostics are deferred.

## Backend
- Python, FastAPI, Pydantic, SQLAlchemy Async, Alembic.
- `uv` for dependencies/tooling.
- PostgreSQL for persistent state.
- Redis only for cache/rate limit/ephemeral coordination.
- RabbitMQ + Celery only when first asynchronous Tier-2 job is introduced.
- S3-compatible object storage; MinIO for self-hosted v1 processing storage.
- Nginx origin reverse proxy.
- Docker Compose for v1.
- No Kubernetes in v1.

## Infrastructure
- Self-hosted VPS.
- Default sizing assumption until actual VPS is known: 4 vCPU / 8 GiB RAM.
- ArvanCloud in front of public frontend/API.
- Origin HTTP/S should be reachable only from trusted Arvan edge networks.
- Real visitor IP is accepted only through the trusted Arvan proxy chain.
- GitHub Actions + GHCR.
- Real secrets stay outside Git.
- Default offsite backup target: Arvan S3-compatible object storage.
- Same-VPS MinIO is not a disaster-recovery backup.

## Process
- Agent: OpenCode-compatible.
- English engineering documentation.
- Branch per step; one atomic completed-step commit.
- Risky steps: PLAN → REVIEW → IMPLEMENT → VERIFY.
- Mechanical steps: IMPLEMENT → VERIFY.
- Unit/integration/contract tests required where relevant.
- Security tests required for every new attack surface.
