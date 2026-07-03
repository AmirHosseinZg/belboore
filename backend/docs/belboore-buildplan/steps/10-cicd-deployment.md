# Step 10 — CI/CD & Deployment Pipeline

## Goal
Go from "agent pushes code" to "running safely on the VPS" without manual
SSH-and-copy-files deploys, and without risking downtime on a single-box
deployment.

## Context you need
`00-project-brief.md`. No Kubernetes/Argo CD here — this is a single-VPS,
Docker Compose deployment pipeline.

## Tasks
1. **CI (on every PR)**:
   - Lint + type-check (per service)
   - Unit tests (per service)
   - Build each Docker image, run Trivy (or equivalent) container scan,
     fail the build on high/critical vulnerabilities
   - Validate OpenAPI spec didn't silently break existing contract (basic
     schema-diff check against the last-known-good spec)
2. **CD (on merge to main)**:
   - Build & tag images (`git-sha` tag, plus `latest`), push to a container
     registry (GitHub Container Registry is a reasonable free default).
   - SSH to the VPS (via a deploy key, not a shared password) and:
     1. Pull new images
     2. Run DB migrations (Alembic) — must be backward-compatible
        (expand/contract pattern, per `00-project-brief.md`); never a
        blocking/destructive migration in the same deploy as the code that
        needs it — split into two deploys if a column needs to be dropped.
     3. Recreate only the containers whose image changed
        (`docker compose up -d --no-deps <service>`), not the whole stack,
        to minimize blast radius of a bad deploy.
     4. Run a post-deploy smoke test (`/healthz`, `/readyz`, one real
        request per service) — automatic rollback (redeploy previous image
        tag) if the smoke test fails.
3. **Zero-downtime consideration on a single VPS**: true blue/green isn't
   free on one box. Pragmatic approach: run each service with `restart:
   unless-stopped` and rely on Docker's rolling container replacement
   (brief handoff gap is acceptable for this project's scale) — OR, if zero
   downtime is a hard requirement, run two instances of Core API behind
   Nginx `upstream` with a weighted/least-conn config and cycle them one at
   a time. Decide based on actual VPS resource headroom and document the
   choice.
4. **Rollback**: keep the previous 2–3 image tags available; a documented
   one-command rollback (`./infra/rollback.sh <service> <tag>`) that a human
   can run without needing the agent mid-incident.
5. **Environment secrets**: CI/CD pipeline secrets (deploy SSH key, registry
   token) stored in the CI platform's secret store, never in the repo;
   VPS-side `.env` stays VPS-side, never round-tripped through CI logs.
6. **Staging**: if VPS budget allows, a lightweight staging profile (same
   VPS, different Docker Compose project name + ports, smaller resource
   limits) for testing a deploy before it hits prod — if budget doesn't
   allow a second environment yet, document this as an accepted gap and rely
   more heavily on the CI test/scan gate + smoke test.

## Acceptance criteria
- [ ] A PR with a failing test is blocked from merge
- [ ] A PR with a high/critical container vulnerability is blocked
- [ ] Merging to main results in an automatic deploy to the VPS with no
      manual steps
- [ ] Deploying a deliberately broken change triggers the smoke-test
      failure path and auto-rollback (test this once, deliberately)
- [ ] `infra/rollback.sh` works and is documented
- [ ] Update `PROGRESS.md`
