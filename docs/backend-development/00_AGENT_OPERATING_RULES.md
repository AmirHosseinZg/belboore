# Agent Operating Rules

## Source-of-truth precedence
1. Accepted OpenAPI contract under `backend/openapi/`.
2. Current implemented frontend behavior and explicit integration requirements.
3. `00_LOCKED_DECISIONS.md`.
4. Current step document.
5. Current backend code + accepted ADRs.
6. `docs/Tools_breakdown.md` and `docs/belboore tools.md`.
7. Older planning documents.

## Isolation rules
- Implement only the current step.
- No unrelated refactors.
- No future dependencies/services early.
- Do not edit frontend unless the step explicitly permits it.
- Do not silently change an accepted API contract.
- Do not add auth/admin in v1.
- Do not add Kubernetes in v1.
- Do not add RabbitMQ/Celery before its dedicated step.
- Do not add MinIO before its dedicated step.
- Do not implement downloaders/Tier-3 during v1.
- Never log user payloads, uploaded contents, credentials, access tokens or provider secrets.

## Repository shell rule
`AGENTS.md` delegates to `RTK.md`, therefore prefix shell commands with `rtk`.

Examples:
```bash
rtk git status --short
rtk uv run pytest -q
rtk docker compose ps
rtk alembic upgrade head
```

## Required completion report
At the end of each step report:
1. Changes made.
2. Files added/modified.
3. Architectural decisions.
4. Migrations.
5. API paths/contracts.
6. Tests added.
7. Verification commands and actual results.
8. Security implications.
9. Known limitations.
10. Git diff/stat.
11. Acceptance criteria status.
12. Handoff notes.
Then STOP.
