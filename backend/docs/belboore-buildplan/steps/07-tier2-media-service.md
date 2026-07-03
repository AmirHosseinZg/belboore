# Step 07 — Tier 2: Media Processing Service

## Goal
Build the **separate** Media API + Celery worker service (its own container,
its own `media_net`) that handles image/video/audio compression &
conversion, PDF merge/compress/OCR, and content downloaders (yt-dlp).

## Context you need
`00-project-brief.md` + step 03's object-storage decision + step 04's Redis
DB-index layout (broker = DB 2). This is a SEPARATE deployable from Core API
— do not merge it in, even though it'd be "faster" short-term. See
`AGENT_RULES.md` isolation rules.

## Tasks
1. **Project structure**:
   ```
   media-service/
     app/
       main.py            (FastAPI: job submission + status endpoints only)
       jobs/
         image.py video.py audio.py pdf.py ocr.py downloader.py
       worker.py           (Celery app definition)
       validation.py       (upload validation — see security section)
     Dockerfile
     Dockerfile.worker      (separate image if worker needs different deps,
                             e.g. FFmpeg/Tesseract, than the API process)
   ```
2. **Upload validation (do this before anything touches the file)**:
   - Enforce size limits (per tool type — image vs video).
   - **Magic-byte / content-type verification**, not filename extension.
   - Run ClamAV (or equivalent) scan on every upload before it's queued.
   - Reject on any failure with a clear problem+json error — never pass an
     unvalidated file to FFmpeg/Tesseract/yt-dlp.
3. **Job submission endpoint**: `POST /api/v1/media/jobs` — accepts file or
   source URL + `tool_slug` + `params`, validates, writes job row (Postgres
   `mediaproc.jobs`, `status=queued`), enqueues Celery task, returns `202` +
   `job_id` + `status_url` (matches the contract example in the master
   architecture doc). Supports `Idempotency-Key` (reuse the decorator from
   step 05).
4. **Celery worker**:
   - Separate queues per job type (`image`, `video`, `audio`, `pdf`, `ocr`,
     `download`) so a backlog of video jobs never starves fast image jobs —
     run separate worker processes/concurrency settings per queue.
   - `acks_late=True`, sane `visibility_timeout`, max 3 retries on transient
     failure, then mark `status=failed` + emit failure detail.
   - Resource limits: constrain worker container CPU/memory via Docker
     compose; on a single VPS, explicitly cap concurrent video-transcode
     jobs (e.g., `--concurrency=2` for the video queue) so FFmpeg can't
     starve the whole box — document the chosen number and why.
   - **Sandboxing**: research and document what's feasible on this specific
     VPS/provider — ideally run the actual FFmpeg/Tesseract/yt-dlp execution
     inside a further-restricted container profile (seccomp profile,
     read-only root filesystem except a scratch dir, no network access for
     image/PDF/OCR jobs, network access only for the downloader job type).
     If gVisor/Kata aren't available on this VPS/kernel, document that
     explicitly as an accepted risk with mitigations (seccomp + no-network +
     non-root user + resource limits as the fallback layers).
5. **Object storage integration**: write job output to the bucket decided in
   step 03, under a per-job unique key; generate a **short-TTL signed URL**
   (default 1 hour, configurable per tool, hard max 24h) for download.
6. **TTL sweep**: scheduled job (Celery beat) that deletes expired job
   outputs from object storage AND marks the Postgres row `status=expired` —
   two independent deletion paths (bucket lifecycle rule as a backstop, plus
   this app-level sweep) so a privacy commitment doesn't depend on one
   mechanism.
7. **Status endpoint + WebSocket**: `GET
   /api/v1/media/jobs/{job_id}/status` (poll) and `wss://.../stream` (push)
   — both read from the same Postgres row / Redis pub/sub channel, so they
   never disagree.
8. **Downloader tool caveat**: yt-dlp-based tools touch the highest legal
   ambiguity named in the project brief. Add a feature flag
   (`DOWNLOADER_TOOLS_ENABLED` per-platform, e.g. per site) in `.env` so any
   single downloader can be killed instantly without a redeploy if a takedown
   notice arrives. Document this in `media-service/README.md`.

## Acceptance criteria
- [ ] Media service runs as its own container(s), on `media_net` only, no
      direct network path to Core API's Postgres role
- [ ] Malicious/oversized/mislabeled file upload is rejected before reaching
      any processing code (tested with a deliberately mislabeled file)
- [ ] End-to-end test: submit a small real image compress job → poll status
      → status reaches `completed` → signed URL downloads the correct file
- [ ] A forced worker crash mid-job results in automatic retry, not a lost job
- [ ] TTL sweep deletes an artificially-expired job's object and updates its
      status
- [ ] Per-queue concurrency limits verified (submit more video jobs than the
      concurrency cap, confirm they queue rather than all running at once)
- [ ] Downloader feature flags work (disabling one blocks only that tool)
- [ ] Update `PROGRESS.md`
