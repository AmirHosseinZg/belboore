# Belboore Backend Master Roadmap

## Release-1 objective

Release 1 is ready when:
- backend needs are verified against the real Astro frontend;
- the actual v1 scope is frozen;
- v1 Tier-1 integrations are provider-abstracted, cached and rate-limited;
- link shortener is stable;
- image compression, images-to-PDF and PDF merge use a secure asynchronous pipeline;
- OpenAPI contracts are handed to frontend;
- the backend is deployed on a hardened VPS behind ArvanCloud;
- monitoring, offsite backup/restore, smoke tests, rollback and pre-launch failure/security testing have passed.

## Runtime evolution

```text
Foundation:
ArvanCloud -> Nginx -> FastAPI -> PostgreSQL + Redis

When Tier 2 starts:
ArvanCloud -> Nginx -> FastAPI
                        |-> PostgreSQL
                        |-> Redis
                        |-> RabbitMQ -> Celery workers -> MinIO
```

## Phases
- A — Discovery & contract: 01–04
- B — Core foundation: 05–10
- C — Tier 1 + shortener: 11–16
- D — Tier 2 foundation + first processors: 17–24
- E — Production, handoff & launch: 25–36
- F — Post-v1 expansion: 40+

## Main architectural rule
Keep normal backend capabilities in one modular FastAPI application. Separate workloads when their security, resource or scaling characteristics demand it. Do not create one microservice per tool.

## Merge gate
A step is mergeable only if:
- its acceptance criteria pass;
- tests and contract checks pass;
- docs are updated;
- no future-step scope leaked into the diff;
- rollback/failure behavior is understood.
