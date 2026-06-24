# Backend Developer 1 — Media & Content Services Plan

## Ownership Domain
**Backend Dev 1** owns all media processing, content downloading, file storage, and heavy computation services.

---

## Service Map

```
BE Dev 1 Services
├── Media Processing Engine (FFmpeg)
│   ├── Video Compressor
│   ├── Video Converter
│   ├── Video Optimizer
│   ├── Audio Converter
│   └── Image Compressor
├── PDF Processing Engine (PyMuPDF + Poppler)
│   ├── Images to PDF
│   ├── Merge PDFs
│   ├── PDF Compressor
│   ├── PDF to Markdown
│   └── PDF Signature Checker
├── Downloader Engine (yt-dlp)
│   ├── YouTube Video Downloader
│   ├── YouTube to MP3
│   ├── Instagram Downloader
│   ├── TikTok Downloader
│   ├── X/Twitter Downloader
│   ├── SoundCloud Downloader
│   ├── Playlist Downloader
│   ├── Movie Database (TMDB proxy)
│   └── GitHub Downloader
├── OCR Service (Tesseract)
│   └── Extract Text from Images
├── Storage Service (MinIO)
│   ├── File Upload/Download
│   ├── Signed URL Generation
│   ├── Cloud Storage Uploader
│   └── File/Audio to QR Code (hosted URL)
├── Real-Time Services
│   ├── Local File Share — Mizban (WebRTC signaling)
│   └── Instant URL (temporary text hosting)
├── Auth Service (shared, primary owner)
│   ├── User Registration/Login
│   ├── JWT Token Management
│   └── Session Management
└── Infrastructure
    ├── Celery Task Queue
    ├── Database Models & Migrations
    └── Docker Media Worker Service
```

---

## Sprint 0: Architecture & Setup (2 weeks)

### Objectives
- Working dev environment with Docker
- Auth service operational
- Database schema defined
- FFmpeg and yt-dlp installed and tested
- Celery worker infrastructure ready

### Tasks & Assignments

#### Day 1-2: Environment & Infrastructure
| Task | Effort | Dependencies |
|------|:---:|-------------|
| Set up local dev environment (Python 3.12, venv, Docker) | 0.5d | None |
| Create FastAPI project structure (`media_service/`) | 0.5d | Dev env |
| Set up PostgreSQL + Alembic for migrations | 1d | Docker |
| Define core database models (User, File, Task, Download) | 1d | PostgreSQL |
| Create first Alembic migration | 0.5d | DB models |
| Set up MinIO container + Python client (boto3) | 0.5d | Docker |

#### Day 3-5: Auth & Shared Infrastructure
| Task | Effort | Dependencies |
|------|:---:|-------------|
| Auth service: `/auth/register`, `/auth/login`, `/auth/refresh` | 2d | DB models |
| JWT access + refresh token generation and validation | 1d | Auth endpoints |
| Password hashing (bcrypt via passlib) | 0.5d | Auth endpoints |
| Auth middleware (FastAPI dependency injection) | 0.5d | JWT tokens |
| API key generation endpoint for developer access | 1d | Auth service |
| Session management (Redis-backed) | 1d | Redis |

#### Day 6-8: Processing Infrastructure
| Task | Effort | Dependencies |
|------|:---:|-------------|
| Dockerfile for media worker (FFmpeg + yt-dlp pre-installed) | 1d | None |
| Celery app configuration + task definitions | 1d | Docker |
| FFmpeg integration test: convert MP4 → WebM sample | 1d | Docker |
| yt-dlp integration test: download sample YouTube video | 1d | Docker |
| Job status tracking (pending → processing → done/failed) in Redis | 1d | Celery |
| Webhook/callback for frontend job completion notification | 1d | Celery |

#### Day 9-10: Integration Points
| Task | Effort | Dependencies |
|------|:---:|-------------|
| Coordinate API contract with BE2 (OpenAPI spec section) | 1d | None |
| Write shared response schemas (`/schemas/`) | 0.5d | API contract |
| Hook up CI pipeline for media service | 0.5d | Docker |
| Integration test: auth → upload → process → download flow | 1d | All |

### Deliverables
- [x] Auth service: register, login, token refresh operational
- [x] Celery workers processing jobs
- [x] MinIO accepting uploads
- [x] FFmpeg + yt-dlp tested and working
- [x] Database schema migrated and versioned
- [x] CI pipeline green

---

## Sprint 1: Core Foundation (3 weeks)

### Objectives
- Storage service fully operational
- Image processing live
- PDF processing live
- Audio converter live
- File QR code generation live

### Tasks & Assignments

#### Week 1: Storage + Image Processing
| Task | Effort | Dependencies |
|------|:---:|-------------|
| MinIO service class: `upload_file()`, `get_file()`, `delete_file()` | 1d | MinIO container |
| Signed URL generator (time-limited download links) | 1d | MinIO |
| File metadata storage (size, type, uploader, expiry) | 1d | DB + MinIO |
| Image compression endpoint: `/image/compress` | 2d | MinIO |
| Image compression using Pillow (JPEG/PNG/WebP with quality params) | 1d | Pillow |
| Split-screen comparison image generator (original vs compressed) | 1d | Pillow |
| Error handling: unsupported formats, oversized files, corrupt uploads | 0.5d | All |

#### Week 2: PDF Processing
| Task | Effort | Dependencies |
|------|:---:|-------------|
| Images to PDF: accept multiple images, generate combined PDF | 2d | MinIO + Pillow |
| PDF Merge: combine multiple PDFs into one (PyMuPDF) | 2d | MinIO |
| PDF Compressor: reduce PDF size (image downsampling, font subset) | 2d | PyMuPDF |
| PDF to Markdown: extract text + structure (PyMuPDF + markdownify) | 2d | PyMuPDF |
| PDF Signature Checker: verify digital signatures in PDF | 2d | PyMuPDF + cryptography |
| Page preview generation (thumbnail images from PDF pages) | 1d | PyMuPDF |

#### Week 3: Audio + QR Code + OCR Foundation
| Task | Effort | Dependencies |
|------|:---:|-------------|
| Audio converter: WAV↔MP3↔OGG↔FLAC via FFmpeg | 2d | Celery + FFmpeg |
| Audio format validation + metadata preservation | 1d | FFmpeg |
| File to QR Code — hosted mode: upload file → permanent URL → QR image | 2d | MinIO + qrcode |
| QR code self-contained mode: encode small data directly in QR | 1d | qrcode |
| OCR: Tesseract setup in Docker | 1d | Docker |
| OCR endpoint: `/image/extract-text` — upload image → text output | 2d | Tesseract + Celery |
| OCR bounding box detection + annotation on returned image | 1d | Tesseract + Pillow |
| Background task monitoring endpoint: `GET /tasks/{task_id}/status` | 1d | Celery + Redis |

### Deliverables
- [x] 4 PDF tools operational
- [x] 2 image processing tools operational
- [x] Audio converter operational
- [x] OCR text extraction operational
- [x] QR code hosted service operational
- [x] Background task status API

---

## Sprint 2: Major Features (4 weeks)

### Objectives
- Complete downloader ecosystem (all 9)
- Video processing suite operational
- OCR polished

### Tasks & Assignments

#### Week 1-2: Downloader Ecosystem (Part 1)
| Task | Effort | Dependencies |
|------|:---:|-------------|
| YouTube downloader service: search + info + download | 3d | yt-dlp + Celery |
| YouTube format selection: 360p to 4K, audio-only | 1d | yt-dlp |
| YouTube to MP3: video → audio extraction pipeline | 1d | yt-dlp + FFmpeg |
| Progress tracking WebSocket: real-time download % → frontend | 2d | WebSocket (BE2) |
| Instagram downloader: Reels, Stories, posts | 2d | yt-dlp |
| TikTok downloader: watermark-free extraction | 2d | yt-dlp |
| Error handling: geo-restricted content, private videos, rate limits | 1d | All downloaders |

#### Week 2-3: Downloader Ecosystem (Part 2)
| Task | Effort | Dependencies |
|------|:---:|-------------|
| X/Twitter downloader: extract video/GIF from tweet URL | 2d | yt-dlp |
| SoundCloud downloader: track download | 1d | yt-dlp |
| Playlist Downloader: batch enqueue, skip list, progress per item | 3d | Celery + WebSocket |
| Movie Database: TMDB API integration (search, info, ratings, poster) | 2d | TMDB API key |
| GitHub Downloader: clone specific file/folder (no full repo clone) | 2d | GitPython |
| Download manager service: queue, throttle, resume logic | 2d | Celery + Redis |
| Download history tracking per user | 1d | DB |

#### Week 3-4: Video Processing Suite
| Task | Effort | Dependencies |
|------|:---:|-------------|
| Video Compressor: reduce file size (FFmpeg with CRF/bitrate) | 2d | Celery + FFmpeg |
| Video Converter: MP4↔AVI↔WebM↔MKV↔MOV | 2d | Celery + FFmpeg |
| Video Optimizer: preset profiles (Instagram 1080x1080, TikTok 9:16, YouTube 16:9, WhatsApp) | 3d | FFmpeg |
| Resolution scaling + aspect ratio handling | 1d | FFmpeg |
| Video thumbnail generator (snapshot at N seconds) | 1d | FFmpeg |
| Thumbnail/preview generation for video uploads | 1d | FFmpeg |

### Deliverables
- [x] 9 downloaders operational
- [x] 3 video processing tools operational
- [x] Real-time download progress working
- [x] Playlist batch processing working

---

## Sprint 3: Integrations & Stabilization (3 weeks)

### Objectives
- Real-time file sharing (Mizban)
- Instant URL service
- Cloud storage features
- Performance optimization
- Remaining tools

### Tasks & Assignments

#### Week 1: Real-Time Services
| Task | Effort | Dependencies |
|------|:---:|-------------|
| WebRTC signaling server for Mizban (Socket.IO/WebSocket) | 3d | WebSocket infra (BE2) |
| Room management: create, join, leave, transfer | 1d | WebRTC signaling |
| File transfer progress tracking over WebRTC data channel | 1d | WebRTC |
| Instant URL: create temporary URL with text content | 2d | Redis (TTL) |
| Instant URL: auto-expiry cron job (cleanup expired URLs) | 1d | Celery Beat |
| URL access tracking (view count, IP log, timestamp) | 1d | DB |

#### Week 2: Cloud Storage & Remaining Features
| Task | Effort | Dependencies |
|------|:---:|-------------|
| Cloud Storage Uploader: user file browser (list, delete, rename) | 2d | MinIO + Auth |
| Folder organization in cloud storage | 1d | MinIO |
| Drag-and-drop multi-file upload with progress | 1d | MinIO |
| File sharing: generate shareable link (signed URL with expiry) | 1d | MinIO |
| Benchmark Builder: generate ab/siege/wrk command templates | 1d | None |
| Benchmark Builder: optional test execution in sandbox | 2d | Docker sandbox |

#### Week 3: Performance & Hardening
| Task | Effort | Dependencies |
|------|:---:|-------------|
| Media processing queue optimization (priority, concurrency limits) | 1d | Celery |
| Large file handling: chunked upload, resumable transfers | 2d | MinIO |
| Memory optimization for FFmpeg pipelines (stream, don't buffer) | 1d | FFmpeg |
| Error handling: comprehensive error codes + user-facing messages | 1d | All services |
| Retry logic for transient failures (network, external APIs) | 1d | All services |
| Download cache: avoid re-downloading same URL within cooldown | 1d | Redis |
| Service health check endpoints (`/health`, `/ready`) | 0.5d | All services |
| Rate limit: per-user limits for processing/download endpoints | 0.5d | Redis |

### Deliverables
- [x] Mizban (local file share) operational
- [x] Instant URL service operational
- [x] Cloud storage fully featured
- [x] Performance optimization complete

---

## Sprint 4: QA, Bug Fixes & Release (2 weeks)

### Tasks & Assignments

| Task | Effort | Dependencies |
|------|:---:|-------------|
| Write unit tests for all service modules (pytest) | 3d | All services |
| Integration tests: upload → process → download → verify | 2d | All services |
| Media processing pipeline edge cases (0-byte files, corrupt, huge) | 1d | Media services |
| Download failure scenarios (blocked, geo-restricted, deleted) | 1d | Downloaders |
| Performance benchmarks (100 concurrent downloads, 50 encodes) | 1d | All processing |
| End-to-end: user registers → uploads file → processes → downloads | 1d | Auth + Storage + Processing |
| Database query optimization (explain analyze, add indexes) | 1d | DB |
| API documentation (OpenAPI descriptions, examples, error codes) | 2d | All endpoints |
| Security audit: file upload validation, path traversal, MIME checking | 1d | All upload endpoints |
| Dependency update: `pip-audit`, `safety check` | 0.5d | Python deps |
| Production deployment: Docker Compose → production config | 1d | Docker |
| Monitoring setup: Sentry integration, health check alerts | 1d | Sentry |

### Deliverables
- [x] 80%+ test coverage on all service modules
- [x] Zero critical/security vulnerabilities
- [x] Production deployment guide
- [x] All API docs complete with examples

---

## Integration Points with Backend Dev 2

| Integration | Owner | Description |
|-------------|:---:|-------------|
| Auth middleware | BE1 (primary) | BE2 imports auth dependency for protected endpoints |
| WebSocket server | BE2 | BE1 connects workers to push download/process progress |
| Redis | BE2 (primary) | BE1 uses Redis for Celery broker + task status |
| PostgreSQL | BE1 (primary schema) | BE2 uses shared DB for user-related queries |
| MinIO | BE1 (primary) | Shared signed URL generation |
| Rate limiter | BE2 | BE1 decorates endpoints with rate limit |
| Health check dashboard | BE2 | BE1 exposes `/health` for monitoring |

---

## Technology Dependencies (BE1)

| Dependency | Purpose | Version |
|-----------|---------|---------|
| FastAPI | Web framework | 0.111+ |
| Celery | Task queue | 5.3+ |
| Redis | Broker + cache | 7.x |
| SQLAlchemy + Alembic | ORM + migrations | 2.0+ |
| PyMuPDF (fitz) | PDF processing | 1.24+ |
| Pillow | Image processing | 10.x+ |
| FFmpeg (system) | Video/Audio processing | 6.x+ |
| yt-dlp | Download engine | latest |
| Tesseract (system) | OCR | 5.x+ |
| pytesseract | Tesseract Python binding | 0.3+ |
| cryptography | Encryption + PDF signatures | 42.x+ |
| boto3 | MinIO S3 client | 1.34+ |
| python-jose | JWT tokens | 3.3+ |
| passlib + bcrypt | Password hashing | 1.7+ |
| GitPython | GitHub downloader | 3.1+ |
| requests + httpx | HTTP clients | latest |
| qrcode + Pillow | QR code generation | 7.4+ |
| pytest + pytest-asyncio | Testing | 8.x+ |

---

## API Endpoints Owned by BE1

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/api-keys
GET    /api/auth/me

POST   /api/image/compress
POST   /api/image/extract-text

POST   /api/pdf/images-to-pdf
POST   /api/pdf/merge
POST   /api/pdf/compress
POST   /api/pdf/to-markdown
POST   /api/pdf/check-signature

POST   /api/audio/convert

POST   /api/video/compress
POST   /api/video/convert
POST   /api/video/optimize

POST   /api/download/youtube
POST   /api/download/youtube-mp3
POST   /api/download/instagram
POST   /api/download/tiktok
POST   /api/download/twitter
POST   /api/download/soundcloud
POST   /api/download/playlist
GET    /api/download/playlist/{id}/status

GET    /api/download/{task_id}/status
GET    /api/download/{task_id}/result

POST   /api/qrcode/file-to-qr
POST   /api/qrcode/self-contained

POST   /api/storage/upload
GET    /api/storage/files
DELETE /api/storage/files/{id}
GET    /api/storage/share/{id}

POST   /api/share/mizban/room
POST   /api/share/mizban/join
POST   /api/share/mizban/signal

POST   /api/instant-url
GET    /api/instant-url/{slug}
DELETE /api/instant-url/{slug}

POST   /api/benchmark/generate
POST   /api/benchmark/execute

GET    /api/tasks/{task_id}/status
GET    /api/health
GET    /api/ready
```
