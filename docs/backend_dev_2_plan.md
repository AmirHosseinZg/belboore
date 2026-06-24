# Backend Developer 2 — Data & Infrastructure Services Plan

## Ownership Domain
**Backend Dev 2** owns all financial data, network diagnostics, security scanning, external API proxies, cache/infrastructure, API gateway, WebSocket server, admin panel backend, monitoring, and CI/CD.

---

## Service Map

```
BE Dev 2 Services
├── API Gateway & Routing
│   ├── Main FastAPI App (port 8000)
│   ├── OpenAPI Spec Management
│   └── Request/Response Middleware
├── Financial Data Service
│   ├── Currency Converter (live rates)
│   ├── Iran Rial Rates
│   ├── Crypto Prices (BTC, ETH, ...)
│   ├── Gold & Precious Metals
│   ├── Oil Prices
│   └── Stock Market Overview
├── Network Diagnostics Service
│   ├── What is My IP
│   ├── Speed Test (download/upload)
│   ├── Ping Test
│   ├── DNS Lookup
│   ├── Whois Lookup
│   ├── Traceroute
│   ├── IP Locator (geo-IP)
│   ├── IPv4 Subnet Calculator
│   ├── IPv4 Address Converter
│   ├── IPv4 Range Expander
│   ├── IPv6 ULA Generator
│   ├── MAC Address Lookup
│   ├── MAC Address Generator
│   ├── Site Status Checker
│   └── Port Check + Port Scan
├── Security Scanning Service
│   ├── SSL Certificate Checker
│   ├── VPN Leak Check
│   ├── Blacklist Check (DNSBL)
│   ├── APK Virus Scanner
│   └── Email Security Check (SPF/DKIM/DMARC)
├── Weather & Geo Service
│   ├── Local Weather (current + forecast)
│   ├── Air Quality Check (AQI)
│   └── Earthquake Map Data
├── Audio Proxy Service
│   ├── Spotify Preview (search + 30s preview)
│   └── Music & Lyrics Database
├── Real-Time Infrastructure
│   ├── WebSocket Server (progress events)
│   ├── Real-Time Data Polling
│   └── Server-Sent Events (where appropriate)
├── Admin & Management
│   ├── Admin Dashboard API
│   ├── User Management
│   ├── Usage Analytics
│   └── API Key Management
├── Content Services
│   ├── Link Shortener (r2u.ir)
│   ├── Telegram News Feed
│   ├── OTP Code Generator/Validator
│   └── Benchmark Builder API helper
└── Infrastructure
    ├── Redis Caching Layer
    ├── Rate Limiter (token bucket)
    ├── CI/CD Pipeline (GitHub Actions)
    ├── Docker Compose Orchestration
    ├── Monitoring (Prometheus + Grafana)
    ├── Error Tracking (Sentry)
    └── Logging Infrastructure
```

---

## Sprint 0: Architecture & Setup (2 weeks)

### Objectives
- API Gateway scaffolded and running
- CI/CD pipeline green
- Docker Compose dev environment ready
- OpenAPI spec foundation
- Shared types package ready for FE

### Tasks & Assignments

#### Day 1-2: Project Infrastructure
| Task | Effort | Dependencies |
|------|:---:|-------------|
| Create main FastAPI project (`main_api/`) | 0.5d | None |
| Set up project structure: routers, services, schemas, middleware | 0.5d | None |
| Docker Compose: all services (Postgres, Redis, MinIO, BE1, BE2, FE) | 2d | Docker |
| Dockerfile for main API service | 0.5d | Docker |
| Environment variable management (`.env` + pydantic-settings) | 0.5d | Docker |

#### Day 3-4: API Gateway Foundation
| Task | Effort | Dependencies |
|------|:---:|-------------|
| API Gateway routing setup (sub-app mounting for BE1 services) | 1d | FastAPI |
| OpenAPI spec auto-generation + custom metadata | 0.5d | FastAPI |
| Request ID middleware (tracing) | 0.5d | FastAPI |
| CORS middleware configuration | 0.5d | FastAPI |
| Logging setup (structlog, request/response logging) | 0.5d | FastAPI |
| Error handler middleware (consistent JSON error responses) | 0.5d | FastAPI |

#### Day 5-6: CI/CD & Shared Types
| Task | Effort | Dependencies |
|------|:---:|-------------|
| GitHub Actions: lint workflow (ruff, mypy) | 1d | GitHub |
| GitHub Actions: test workflow (pytest) | 0.5d | CI |
| GitHub Actions: Docker build + push to registry | 0.5d | CI |
| GitHub Actions: deploy to staging (SSH or webhook) | 0.5d | CI |
| Shared Pydantic schemas package (`/shared/`) | 1d | None |
| TypeScript type generation from OpenAPI spec (openapi-typescript) | 1d | OpenAPI spec |
| CI step: auto-generate FE types on spec change | 0.5d | CI |

#### Day 7-8: Redis + Rate Limiter
| Task | Effort | Dependencies |
|------|:---:|-------------|
| Redis client setup (redis-py) | 0.5d | Redis container |
| Cache service class: `get(key)`, `set(key, value, ttl)`, `invalidate(pattern)` | 1d | Redis |
| Rate limiter middleware (token bucket algorithm in Redis) | 1.5d | Redis |
| Rate limit tiers: anonymous (10/min), authenticated (100/min), premium (1000/min) | 0.5d | Rate limiter |
| Rate limit headers in responses (`X-RateLimit-*`) | 0.5d | Rate limiter |

#### Day 9-10: Monitoring + Integration
| Task | Effort | Dependencies |
|------|:---:|-------------|
| Prometheus metrics endpoint (`/metrics`) | 1d | FastAPI |
| Grafana dashboard: request rate, latency, error rate, cache hits | 1d | Prometheus |
| Sentry SDK integration | 0.5d | Sentry |
| Health check endpoint with dependency status (DB, Redis, MinIO) | 0.5d | All services |
| Coordinate API contracts with BE1 (review service boundaries) | 1d | BE1 |
| API documentation page customization (Swagger UI + Redoc) | 0.5d | OpenAPI |

### Deliverables
- [x] API Gateway running with all middleware
- [x] CI/CD: lint, test, build, deploy all green
- [x] OpenAPI spec at `/docs` and `/redoc`
- [x] TypeScript types auto-generated for FE
- [x] Redis caching operational
- [x] Rate limiter active
- [x] Monitoring dashboards active

---

## Sprint 1: Core Foundation (3 weeks)

### Objectives
- All financial data APIs operational
- Weather/Geo APIs operational
- Spotify/Music proxy APIs operational
- OTP generator operational
- Weather Data API for external developers

### Tasks & Assignments

#### Week 1: Financial Data Service
| Task | Effort | Dependencies |
|------|:---:|-------------|
| Financial data provider integration layer (abstract base + providers) | 1d | None |
| Exchange rate provider 1: ExchangeRate-API (free tier) | 1d | API key |
| Currency Converter: `/finance/convert?from=USD&to=EUR&amount=100` | 1d | Exchange rates |
| Iran Rial Rates: scrape or API (bonbast.com / tetherland) | 2d | None |
| Crypto prices: CoinGecko free API | 1d | API |
| Gold & Precious Metals: Metals-API or GoldAPI | 1d | API key |
| Oil Prices: EIA or commodity API | 1d | API key |
| Stock Market Overview: Alpha Vantage or Yahoo Finance proxy | 1d | API key |
| Redis caching layer: 30s for crypto, 5min for exchange rates, 1h for markets | 1d | Redis |
| Fallback provider logic (if primary fails, try secondary) | 0.5d | All finance APIs |

#### Week 2: Weather, Geo & Audio Proxy
| Task | Effort | Dependencies |
|------|:---:|-------------|
| Weather service: OpenWeatherMap API proxy | 1.5d | API key |
| Weather: current conditions + 7-day forecast | 0.5d | OpenWeatherMap |
| Air Quality Check: AQI from OpenWeatherMap or WAQI | 1d | API key |
| Earthquake Map: USGS Earthquake API proxy | 1d | USGS API (free) |
| Spotify Preview: search tracks + get 30s preview URL | 2d | Spotify API (client credentials) |
| Music & Lyrics Database: search artist/album (Spotify/MusicBrainz) + lyrics (Lyrics.ovh) | 2d | Multiple APIs |
| Redis caching: weather 10min, earthquakes 5min, Spotify 1h | 0.5d | Redis |
| GeoJSON helper: validate + serve earthquake/weather coordinates | 0.5d | Geo data |

#### Week 3: Developer APIs & API Key Management
| Task | Effort | Dependencies |
|------|:---:|-------------|
| OTP Generator/Validator: TOTP + HOTP implementation (pyotp) | 1d | None |
| OTP QR code URI generation (otpauth://) | 0.5d | pyotp |
| Weather Data API: public endpoint for developers to consume | 1d | Weather service |
| API key generation + management dashboard API (create/list/revoke) | 1.5d | Auth (BE1) |
| API usage tracking per key (request count, data volume) | 1d | Redis + DB |
| Rate limit per API key (configurable tiers) | 0.5d | Rate limiter |
| Developer documentation for Weather Data API | 0.5d | Weather API |

### Deliverables
- [x] 6 financial data endpoints with live data + caching
- [x] 3 weather/geo endpoints operational
- [x] Spotify + lyrics search operational
- [x] OTP generator/validator operational
- [x] Weather Data API for external developers

---

## Sprint 2: Major Features (4 weeks)

### Objectives
- Complete network diagnostics suite (16 tools)
- Complete security scanning suite (5 tools)
- WebSocket server for real-time events
- Admin dashboard API
- Link shortener
- Telegram News

### Tasks & Assignments

#### Week 1: Network Diagnostics — Core
| Task | Effort | Dependencies |
|------|:---:|-------------|
| What is My IP: endpoint returning client IP + geo-location | 1d | None |
| IP Locator: geolocate any IP (ip-api.com free) | 1d | External API |
| Ping Test: execute ping command in sandbox, return latency | 2d | Subprocess + security |
| Site Status Checker: HTTP HEAD/GET, return status + response time | 1d | None |
| DNS Lookup: resolve A, AAAA, MX, NS, TXT records (dnspython) | 1.5d | dnspython |
| Whois Lookup: query whois servers (python-whois) | 1d | python-whois |
| Traceroute: execute traceroute, parse + return hop data | 2d | Subprocess + security |
| HTTP Headers Inspector: fetch + display response headers | 0.5d | requests |

#### Week 2: Network Diagnostics — Advanced
| Task | Effort | Dependencies |
|------|:---:|-------------|
| Port Check: test if specific port is open on a host | 1d | Subprocess |
| Port Scan: scan common ports (1-1024) with concurrency limit | 2d | Subprocess |
| IPv4 Subnet Calculator: CIDR → network, broadcast, range, count | 1d | ipaddress (stdlib) |
| IPv4 Address Converter: decimal → dotted → hex → binary | 0.5d | ipaddress |
| IPv4 Range Expander: CIDR/range → full IP list | 1d | ipaddress |
| IPv6 ULA Generator: random ULA prefix generation | 0.5d | ipaddress |
| MAC Address Lookup: OUI database lookup (maclookup.app API) | 1d | External API |
| MAC Address Generator: random MAC + OUI-specific MAC | 0.5d | None |
| Sandbox security: prevent command injection in all net tools | 1d | All net tools |

#### Week 3: Security Scanning + WebSocket + Speed Test
| Task | Effort | Dependencies |
|------|:---:|-------------|
| SSL Certificate Checker: fetch + validate SSL cert chain | 2d | ssl/cryptography |
| SSL: expiry date, issuer, subject, SANs, chain validity | 1d | SSL checker |
| VPN Leak Check: compare claimed IP vs actual IP + DNS detection | 1d | IP service |
| Blacklist Check: DNSBL lookup (Spamhaus, Barracuda, etc.) | 1d | dns.resolver |
| APK Virus Scanner: VirusTotal API upload + scan | 2d | VirusTotal API |
| APK Scanner: fallback — ClamAV in Docker container | 2d | Docker |
| Email Security Check: parse headers, check SPF/DKIM/DMARC | 2d | dns.resolver + email lib |
| WebSocket server: FastAPI WebSocket endpoint for real-time events | 2d | FastAPI |
| WebSocket: authentication + channel subscriptions | 1d | Auth (BE1) |
| Speed Test: download/upload speed measurement endpoint | 3d | Network infrastructure |

#### Week 4: Admin, Link Shortener, Telegram
| Task | Effort | Dependencies |
|------|:---:|-------------|
| Admin dashboard API: user list, counts, management endpoints | 2d | Auth + DB |
| Admin: usage statistics (downloads, processes, API calls per day) | 2d | DB queries |
| Link Shortener service (r2u.ir): create short URL from long URL | 2d | DB |
| Link Shortener: click tracking + analytics dashboard API | 2d | DB |
| Link Shortener: custom slug support + expiry date | 0.5d | DB |
| Telegram News: bot integration to read channel posts | 3d | Telegram Bot API |
| Telegram News: RSS-like feed transformation for web display | 1d | Telegram API |

### Deliverables
- [x] 16 network diagnostics tools operational
- [x] 5 security scanning tools operational
- [x] WebSocket server pushing real-time events
- [x] Admin dashboard API operational
- [x] Link shortener with analytics
- [x] Telegram News feed operational

---

## Sprint 3: Integrations & Stabilization (3 weeks)

### Objectives
- Real-time data infrastructure
- Admin dashboard polish
- Performance optimization
- Security hardening

### Tasks & Assignments

#### Week 1: Realtime Infrastructure
| Task | Effort | Dependencies |
|------|:---:|-------------|
| Real-time financial ticker WebSocket (price updates every 30s) | 2d | Finance + WS |
| Real-time weather updates (SSE for weather widgets) | 1d | Weather + WS |
| Download progress WebSocket relay (bridge BE1 Celery → WS) | 2d | BE1 + WS |
| File processing progress WebSocket relay | 1d | BE1 + WS |
| Server-Sent Events (SSE) for simpler real-time needs | 1d | FastAPI SSE |
| WebSocket connection pool management + auto-reconnect | 1d | WS server |

#### Week 2: Admin Dashboard & Misc
| Task | Effort | Dependencies |
|------|:---:|-------------|
| Admin: user CRUD endpoints | 1d | Auth |
| Admin: tool usage heatmap (which tools are most used) | 2d | DB analytics |
| Admin: rate limit override per user | 1d | Rate limiter |
| Admin: system health dashboard API | 1d | Health checks |
| Admin: audit log (who did what, when) | 1d | DB |
| Internal API documentation for admin endpoints | 0.5d | OpenAPI |
| Benchmark Builder: integration with BE1 sandbox execution | 1d | BE1 |

#### Week 3: Performance & Security
| Task | Effort | Dependencies |
|------|:---:|-------------|
| Database query optimization: add missing indexes, explain analyze | 2d | PostgreSQL |
| Redis pipeline optimization: batch operations where possible | 1d | Redis |
| N+1 query audit across all services | 1d | SQLAlchemy |
| API response compression (gzip/brotli middleware) | 0.5d | FastAPI |
| SQL injection audit on all dynamic queries | 0.5d | All endpoints |
| XSS prevention: sanitize all user inputs reflected in responses | 0.5d | FastAPI |
| CSRF protection for state-changing endpoints | 0.5d | FastAPI |
| Content Security Policy headers | 0.5d | Nginx/FastAPI |
| Input validation hardening (max lengths, format checks) | 1d | Pydantic |
| Dependency vulnerability audit (`pip-audit`) | 0.5d | Python deps |

### Deliverables
- [x] Real-time WebSocket infrastructure for all live data
- [x] Admin dashboard API complete
- [x] Security audit passed (OWASP Top 10)
- [x] Performance benchmarks: < 200ms p95 API latency

---

## Sprint 4: QA, Bug Fixes & Release (2 weeks)

### Tasks & Assignments

| Task | Effort | Dependencies |
|------|:---:|-------------|
| Write unit tests for all service modules (pytest) | 3d | All services |
| Mock external APIs for reliable testing (responses + httpretty) | 1d | External APIs |
| Integration tests: API gateway routing + middleware chain | 1d | All endpoints |
| Contract tests: validate against OpenAPI spec (schemathesis) | 1d | OpenAPI |
| Load testing: 500 concurrent users (k6 scripts) | 2d | All endpoints |
| Load test analysis: identify bottlenecks, optimize | 1d | Load test results |
| Cross-service integration tests (BE1 ↔ BE2 ↔ DB ↔ Redis) | 1d | Both BE services |
| API documentation review: all endpoints documented with examples | 1d | OpenAPI |
| Production Docker Compose file with proper resource limits | 1d | Docker |
| Kubernetes deployment guide (optional, stretch goal) | 1.5d | Docker |
| Grafana dashboard finalization: production-ready panels | 1d | Prometheus |
| Alerting rules: high error rate, high latency, service down | 0.5d | Prometheus |
| Release checklist creation | 0.5d | None |

### Deliverables
- [x] 80%+ test coverage on all services
- [x] Contract tests passing against OpenAPI spec
- [x] Load test results: < 500ms p99 under 500 concurrent users
- [x] Production deployment ready
- [x] Full monitoring + alerting operational

---

## Integration Points with Backend Dev 1

| Integration | Owner | Description |
|-------------|:---:|-------------|
| Auth middleware | BE1 | BE2 consumes: `from auth import get_current_user` |
| WebSocket server | BE2 (primary) | BE1 workers push events via Redis pub/sub → WS |
| Redis pub/sub | BE2 | BE1 publishes task status updates, BE2 subscribes + fans out to WebSocket |
| PostgreSQL | Shared | Both read/write. BE1 owns schema. Coordinate migrations. |
| MinIO | BE1 | BE2 may need signed URLs for admin file inspection |
| Rate limiter | BE2 (primary) | BE1 imports: `from middleware import rate_limit` |
| Health check | BE2 aggregates | BE2's `/health` calls BE1's `/ready` endpoint |
| API Gateway | BE2 (primary) | BE2 mounts BE1 as sub-application or routes via Nginx |
| Celery | BE1 | BE2 may enqueue tasks (e.g., admin triggers reprocessing) |

---

## API Endpoints Owned by BE2

```
GET    /api/finance/currencies
GET    /api/finance/convert
GET    /api/finance/rial-rates
GET    /api/finance/crypto
GET    /api/finance/gold
GET    /api/finance/oil
GET    /api/finance/stocks

GET    /api/weather/current
GET    /api/weather/forecast
GET    /api/weather/aqi
GET    /api/geo/earthquakes

GET    /api/spotify/search
GET    /api/spotify/preview
GET    /api/music/search
GET    /api/music/lyrics

GET    /api/network/my-ip
GET    /api/network/speed-test
POST   /api/network/ping
GET    /api/network/site-status
GET    /api/network/ip-locate
POST   /api/network/dns-lookup
POST   /api/network/whois
POST   /api/network/traceroute
GET    /api/network/http-headers
POST   /api/network/port-check
POST   /api/network/port-scan

GET    /api/network/ipv4/subnet-calc
GET    /api/network/ipv4/convert
GET    /api/network/ipv4/expand
GET    /api/network/ipv6/ula
GET    /api/network/mac/lookup
GET    /api/network/mac/generate

GET    /api/security/ssl-check
GET    /api/security/vpn-leak
GET    /api/security/blacklist
POST   /api/security/apk-scan
POST   /api/security/email-check

POST   /api/otp/generate
POST   /api/otp/validate

POST   /api/shorten
GET    /api/shorten/{slug}
GET    /api/shorten/{slug}/stats

GET    /api/telegram/channels
GET    /api/telegram/channel/{id}/posts

GET    /api/admin/users
GET    /api/admin/stats
GET    /api/admin/health
GET    /api/admin/audit-log

GET    /api/developer/weather
POST   /api/developer/api-keys
DELETE /api/developer/api-keys/{id}

WS     /ws/events

GET    /api/health
GET    /api/metrics
```

---

## Technology Dependencies (BE2)

| Dependency | Purpose | Version |
|-----------|---------|---------|
| FastAPI | Web framework | 0.111+ |
| Redis (redis-py) | Cache + pub/sub + rate limiter | 5.0+ |
| SQLAlchemy + Alembic | ORM + migrations | 2.0+ |
| dnspython | DNS lookups | 2.6+ |
| python-whois | Whois queries | 0.9+ |
| ipaddress (stdlib) | IPv4/IPv6 calculations | — |
| pyotp | OTP TOTP/HOTP | 2.9+ |
| PyJWT | JWT handling (shared) | 2.8+ |
| passlib (shared) | Password hashing | 1.7+ |
| structlog | Structured logging | 24.x+ |
| sentry-sdk | Error tracking | 1.45+ |
| prometheus-client | Metrics export | 0.19+ |
| requests + httpx | HTTP clients | latest |
| aiohttp | Async HTTP client | 3.9+ |
| websockets | WebSocket server | 12.x+ |
| pydantic-settings | Config management | 2.2+ |
| pytest + pytest-asyncio | Testing | 8.x+ |
| schemathesis | API contract testing | 3.x+ |
| k6 (external) | Load testing | latest |
| cryptography (shared) | Crypto operations | 42.x+ |
