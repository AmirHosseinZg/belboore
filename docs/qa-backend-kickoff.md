# Belboore — Backend Kickoff Q&A

Answers verified against repository on 2026-09-13. Items marked **OPEN** need owner decision; recommendation given where safe.

---

## Repository & Code

### Q1. Repository structure — monorepo or split?
**A:** Single monorepo at `/home/amirhosseinzg/WorkSpace/Projects/belboore`:
```
belboore/
├── frontend/   # Astro 6 app (complete, ~150 tools, all client-side so far)
├── backend/    # EMPTY — placeholder directory, zero code
├── docs/       # planning: belboore tools.md, Tools_breakdown.md,
│               # project_execution_strategy.md, ux_audit.md
├── AGENTS.md / RTK.md / README.md
```
Git remote: `git@github.com:AmirHosseinZg/belboore.git`. Monorepo confirmed working — keep it.

### Q2. Backend initialized?
**A:** No. `backend/` is empty. No FastAPI project, no pyproject, no Docker, nothing. Backend starts from zero.

### Q3. Can agent inspect complete frontend source?
**A:** Yes. Full source in `frontend/src` (components, pages, data, i18n, layouts, lib). No separate repo/link needed — same monorepo. Frontend can serve as source of truth for required APIs.

### Q4. Existing API contracts (OpenAPI, MSW, mock server, TS interfaces, API clients, backend requirement docs)?
**A:** None. No `fetch` to any backend, no MSW, no OpenAPI, no API client files. Frontend is pure client-side today. Only planning docs exist:
- `docs/Tools_breakdown.md` — tool tier classification (see Q6)
- `docs/project_execution_strategy.md` — old plan (stale: says Next.js, real frontend is Astro)
- `docs/belboore tools.md` — 149-tool directory descriptions

So: Step 01 should have agent derive required API surface directly from frontend tool components + these docs.

### Q5. Authoritative tool list requiring backend?
**A:** Partially — `docs/Tools_breakdown.md` already classifies all ~150 tools:
| Tier | Meaning | Count |
|------|---------|:---:|
| Tier 0 | Pure client-side, no backend | ~88 |
| Tier 1 | Thin API proxy (weather, finance, lyrics, Spotify, short links) | ~18 |
| Tier 2 | Heavy server processing (FFmpeg, PDF, OCR, downloaders) | ~32 |
| Tier 3 | Network/diagnostic infrastructure (DNS, SSL, ping, port scan, speed test, VPN leak) | ~16 |

Classification exists and is usable; agent should verify per-tool against actual frontend components in Step 01 rather than re-invent.

## Scope & Product

### Q6. First release — every backend tool, or smaller production slice?
**A:** **OPEN — recommend smaller slice.** Tier 1 proxy endpoints + link shortener + a few high-value Tier 2 (image compression, image convert, images→PDF, merge PDFs) first. Downloaders (Tier 2) and diagnostics (Tier 3) later phases — they carry legal/abuse/operational risk disproportionate to a v1.

### Q7. Frontend contracts frozen or correctable?
**A:** Nothing to freeze — frontend has zero API contracts today (all tools run in browser). Backend defines contracts first; frontend adds integration afterward. **Recommendation: backend is contract author, frontend adapts.**

### Q8. Authentication needed?
**A:** Current product tagline: "No account required most tools." **Recommendation: anonymous-first.** No signup/login in v1. Optional later: rate-limit identity via anonymous session/API key. Server-side favorites/history, premium quotas — all deferred.

### Q9. Admin API/dashboard needed?
**A:** **Recommendation: no in v1.** Operational config via env vars + DB. Add admin surface when a second operator exists or feature flags become painful.

### Q10. Tier-1 providers selected?
**A:** No. No provider chosen for weather/currency/crypto/gold/oil/AQI/earthquakes/lyrics/Spotify. **Recommendation: provider-adapter architecture from day one** (one interface, swappable vendors, per-provider env keys) — Iranian market needs easy provider substitution (sanctions/latency). Provider choice = separate implementation task per provider.

### Q11. Media scope — which server-side tools planned?
**A:** From `docs/Tools_breakdown.md`, full planned set:
- Images: Image Compressor, OCR (Extract Text), Image Converter (already client-side)
- Video: Compressor, Converter, Optimizer (FFmpeg)
- Audio: Audio Converter, Camera Recorder processing
- PDF: Images→PDF, Merge, Compress, PDF→Markdown, Signature Checker
- Files: Cloud Storage Uploader, Local File Share (Mizban), Instant URL
**OPEN: exact v1 subset — recommend images + PDF batch first** (lowest risk, highest demand).

### Q12. File constraints (max size, timeouts, retention)?
**A:** Not defined anywhere. **Recommendation: defaults defined in architecture step** — e.g. 25 MB image / 50 MB PDF / 100 MB audio-video upload cap, 60–300 s processing timeout by job type, generated files kept 1–24 h with one re-download, disk quota per anonymous session.

### Q13. Downloaders in scope now?
**A:** **Recommendation: isolated later phase.** yt-dlp-based tools (YouTube, Instagram, TikTok, X, SoundCloud, playlist) must not share security/operational boundary with media processing — separate worker pool, separate egress IP if ever, strict abuse controls. Not in first backend release.

### Q14. Tier-3 diagnostics — which first?
**A:** Docs list 16. **Recommendation: defer whole tier.** If forced to pick first: DNS Lookup, Whois/RDAP, SSL check, What-is-My-IP — all cheap HTTP-level queries. Never first: port scan, speed test, VPN leak (abuse magnets, bandwidth-heavy).

## Infrastructure

### Q15. VPS topology?
**A:** **OPEN — unknown.** Needs owner answer: how many VPS, CPU/RAM/disk, OS/version. One 4 vCPU / 8 GB VPS is enough for v1 (FE+API+Postgres+Redis on one box behind Arvan).

### Q16. Dev/staging/prod separation?
**A:** **Recommendation: yes, minimal** — local dev (docker compose) + production. Add staging only when a second environment's cost is justified; initially staging = prod with careful deploy gates.

### Q17. Domains?
**A:** **OPEN.** Assume `belboore.ir` primary. Proposed: `belboore.ir` (frontend/CDN), `api.belboore.ir` (backend origin), `files.belboore.ir` (processed file downloads) if object storage served directly. Owner must confirm what's already registered/DNS-controlled.

### Q18. ArvanCloud scope?
**A:** **OPEN — recommend at minimum:** CDN + WAF + reverse proxy with real-client-IP. API gateway/WebSocket/SSE depends on which Tier tools ship (downloader progress = polling or SSE → Arvan support must be checked for SSE before Tier 2 downloaders).

### Q19. Origin protection (firewall so only Arvan reaches origin)?
**A:** **Recommendation: yes, day one.** Origin accepts 80/443 only from Arvan IP ranges; SSH on non-standard port, key-only, restricted source IPs.

### Q20. Object storage — MinIO self-hosted, Arvan S3, or recommendation?
**A:** **OPEN — recommendation: self-hosted MinIO first.** Same VPS disk, no egress cost, full control; S3-compatible API means switching to Arvan S3 later is config-only, not code.

### Q21. Stateful infra self-hosted?
**A:** Assumed yes — PostgreSQL, Redis, MinIO all self-hosted (matches docs' existing plan). RabbitMQ only when first feature actually needs a queue (see Q28).

### Q22. Docker Compose acceptable?
**A:** Yes — docs already plan Docker Compose. **Recommendation: Compose for v1, K8s-ready images (no host-path state, config via env), no Kubernetes now.**

### Q23. Reverse proxy preference — Traefik/Nginx/Caddy?
**A:** **OPEN.** Few services, static topology → Nginx fine and most universally known. Choose Traefik only if dynamic service discovery desired. Backend's own recommendation welcome.

### Q24. Repository/CI platform?
**A:** GitHub, confirmed (`github.com:AmirHosseinZg/belboore.git`, existing Actions workflows in `frontend/.github/workflows`, PR-based flow, already open source).

### Q25. Container registry?
**A:** **Recommendation: GitHub Container Registry (ghcr.io)** — free for public repos, zero extra accounts, Actions-native.

### Q26. Secrets management — Infisical or simpler?
**A:** **Recommendation: real secrets external to repo from day one.** Simplest v1: GitHub Actions encrypted secrets → deploy-time env injection. Infisical only if manual ops on VPS becomes painful. No secrets committed, ever.

### Q27. Backups — second/offsite location?
**A:** **OPEN.** At minimum: nightly `pg_dump` + MinIO data snapshot to a second disk or Arvan object storage; restore procedure tested once. Same-VPS-only backups don't count.

### Q28. Async worker — Celery now?
**A:** Docs plan Celery + Redis. **Recommendation: defer.** Add Celery+RabbitMQ only when first long-running job (media processing) ships — not in foundation step. Foundation = FastAPI + Postgres + Redis (cache/rate-limit only).

## Ops & Process

### Q29. Emails/notifications required?
**A:** No — none in v1. No OTP, no alerts infrastructure. Webhook/notification features are client-side tools, not backend email.

### Q30. Expected launch traffic?
**A:** **OPEN.** Realistic assumption: hundreds → low thousands monthly at launch, media tools dominant share of requests. Architecture sized for vertical scale on one VPS + stateless API containers.

### Q31. Budget — optimize for lowest self-hosted cost?
**A:** **OPEN.** Default assumption: minimal cost, self-hosted, scale only on evidence.

### Q32. Which coding agent?
**A:** **OPEN.** Repo already carries `AGENTS.md` + `RTK.md` (rtk shell-wrapper convention) — agnostic setup. Currently used agent: opencode. Answer determines exact handoff-file format only.

### Q33. Agent autonomy — plan-first or implement-directly?
**A:** **Recommendation: two-level.** Risky/irreversible phases (infra, security, schema, provider integration): PLAN → review → IMPLEMENT → VERIFY. Mechanical steps (CRUD endpoint, tests, docs): implement directly.

### Q34. Git isolation per step?
**A:** Yes — branch per step (`backend/01-foundation`, `backend/02-database`, ...), one atomic commit per finished step. Matches existing repo PR convention.

### Q35. Testing standard — mandatory per step?
**A:** **Recommendation: tiered, mandatory:** unit + integration tests + migration test for every step; API contract tests from first endpoint; Docker health checks in compose; security check for each new attack surface (upload, proxy, diagnostics); load tests deferred until pre-launch.

## Tech Stack

### Q36. Python + FastAPI + SQLAlchemy Async + Alembic + PostgreSQL + Redis?
**A:** Confirmed — matches existing docs plan. Accept.

### Q37. `uv` for Python dependency management?
**A:** **Recommendation: yes** — uv for new 2026 project. No Poetry/pip-tools reason.

### Q38. Celery now or after workload inspection?
**A:** After — see Q28. RabbitMQ+Celery when first async job exists.

### Q39. Documentation language — pick for me?
**A:** **Chosen: English** for all agent Markdown files, code comments, commits, API docs, ADRs. Reason: agent collaboration + open-source contribution norms. User-facing product copy stays bilingual (en/fa) as frontend already is.

---

## Summary of OPEN decisions blocking Step 01

| # | Decision | Default if unanswered |
|---|----------|----------------------|
| 1 | VPS count/specs | 1 × 4 vCPU / 8 GB assumed |
| 2 | Domains confirmed | belboore.ir + api.belboore.ir |
| 3 | Arvan services scope | CDN + WAF + real-IP |
| 4 | v1 tool slice | Tier 1 + shortener + images/PDF |
| 5 | Reverse proxy | Nginx |
| 6 | Registry | ghcr.io |
| 7 | Backup target | Arvan object storage |
| 8 | Agent used | opencode (current) |
