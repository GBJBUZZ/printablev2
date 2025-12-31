# printablev2
Printable Version 2

# Printable – Global Technology Blueprint

Printable is a **high-scale, modular, cloud-native ecosystem** built to power **on-demand printing, document utilities, and offline OOH (Out-Of-Home) campaign execution** across India and global markets.

This repository documents the **complete system architecture, technology stack, and backend/frontend strategy** used to build a resilient, future-ready platform.

---

## 🚀 Executive Vision

Printable is designed as an **infrastructure-first platform**, not just a print app.

It enables:
- Real-time document processing
- Vendor-driven printing automation
- Offline OOH campaign execution
- Multilingual, multi-region scalability
- AI-powered document utilities

---

## 🧱 Technology Stack Overview

### Frontend
- **Web:** Next.js (SSR-enabled)
- **Mobile:** React Native + Expo
- **Styling:** Tailwind CSS, shadcn/ui, Radix UI
- **State Management:** Zustand
- **Data Fetching:** React Query
- **Realtime:** WebSocket
- **Internationalization:** i18next

### Backend
- **Runtime:** Node.js (LTS)
- **Language:** TypeScript
- **Framework:** Fastify (preferred for performance)
- **API Layer:** REST + GraphQL Gateway (future)
- **Authentication:** JWT + Refresh Tokens
- **Background Jobs:** BullMQ
- **Realtime:** Socket.IO / WebSocket

### Database & Storage
- **Primary DB:** PostgreSQL
- **Cache & Queue:** Redis
- **File Storage:** MinIO (S3-compatible)
- **CDN:** Cloudflare

### DevOps & Infrastructure
- **OS:** Ubuntu 22.04 LTS
- **Containerization:** Docker + Docker Compose
- **CI/CD:** GitHub Actions
- **Reverse Proxy:** NGINX
- **Monitoring:** Prometheus + Grafana
- **Logging:** Loki + Fluentd

---

## 🏗️ Infrastructure Strategy (Self-Managed VPS)

### Server Architecture
- **Load Balancer Node**
  - NGINX (SSL termination, reverse proxy)
- **Application Nodes**
  - Dockerized Node.js microservices
- **Database Node**
  - PostgreSQL with read replication
- **Storage Node**
  - MinIO (S3-compatible object storage)

### Security Layer
- Fail2Ban
- UFW Firewall
- NGINX rate limiting
- Certbot SSL certificates

---

## 🎨 Frontend & Client Layer

### Web Platform
- Built using **Next.js** for SEO and performance
- Server-side rendering (SSR)
- Component-driven UI with shadcn/ui
- Realtime notifications using WebSockets

### Mobile Application
- React Native with Expo
- Offline support using SQLite
- Device integrations:
  - Camera (document scanning)
  - GPS (vendor detection)

### Multilingual Support
- i18next for translations
- Auto locale detection
- User-preference-based rendering

---

## 🧩 Backend & Microservices Architecture

### Core Services

| Service | Responsibilities |
|-------|------------------|
| Auth Service | OTP, Email, Google login, JWT, refresh tokens |
| User Service | Profiles, document vault, order history |
| Vendor Service | Onboarding, KYC, inventory, earnings |
| File Service | Upload, preview, watermark, convert |
| Order Service | Print lifecycle, scheduling, tracking |
| Campaign Service | OOH planning, targeting, proofs |
| Notification Service | SMS, Email, Push, WhatsApp |
| AI Service | Resume builder, PPT generator |
| E-Signature Service | Aadhaar (India), DocuSign (Global) |
| Billing Service | Razorpay, Stripe, payouts |
| Admin Service | Platform config, disputes, analytics |

### Communication Layer
- RESTful APIs
- GraphQL Gateway (planned)
- Event-driven architecture:
  - Redis Pub/Sub
  - Kafka (future)

---

## 🗄️ Data & Storage Architecture

### Database
- PostgreSQL with horizontal scalability
- Indexed for:
  - Location queries
  - File metadata
  - Order lifecycle states

### Caching
- Redis for:
  - Sessions
  - Pricing rules
  - Socket channels

### File Storage
- MinIO (VPS-hosted, S3-compatible)
- Cloudflare CDN
- Signed URLs for secure access

---

## ⚡ Realtime File & Order System

### File Processing Pipeline
1. Upload using pre-signed S3 URLs
2. Convert DOCX / PPTX → PDF (LibreOffice in Docker)
3. Generate thumbnails (ImageMagick)
4. Apply watermark for vendor preview
5. Extract metadata & version files asynchronously

### Order Lifecycle
**New → Processing → Printed → Out for Delivery → Completed**

- Live status updates via WebSocket
- Synced across user & vendor dashboards

---

## 🌍 Global Scale & Resilience

### Load Balancing
- NGINX reverse proxy
- SSL termination
- GeoDNS via Route53

### Scaling Strategy
- Stateless Node.js APIs
- Docker Compose scaling
- Kubernetes + HPA (future)

### Backup & Recovery
- Daily PostgreSQL backups
- Weekly full-volume snapshots
- External offsite storage

---

## 🖨️ Vendor & OOH Campaign Engine

### Vendor Workflow
- Signup & KYC upload
- Store setup & auto-print
- Raspberry Pi + CUPS integration
- Vendor dashboard:
  - Order queue
  - Document preview
  - Status updates

### OOH Campaign Engine
- Campaign creation & targeting
- Smart vendor matching
- Proof uploads with timestamps
- Client portal for tracking installs & impressions

---

## 🔄 CI/CD, Monitoring & Observability

### Deployment Pipeline
- GitHub Actions:
  - Lint
  - Test
  - Docker build
  - SSH-based deployment
- Zero-downtime releases:
  - Blue/Green
  - Rolling updates

### Observability
- Prometheus + Grafana (metrics)
- Loki + Fluentd (logs)
- AlertManager (Slack, Email)

### Security
- Role-based access control (Admin, Vendor, User)
- JWT refresh & revocation
- File-level permissions

---

## 🔮 Future-Proofing & Growth

### AI Roadmap
- Document classification
- Grammar & tone correction
- Smart ad copy generation

### Network Expansion
- Pan-India hoarding directory
- Vendor bidding system
- Real-time availability tracking

### Sustainability Modules
- Book reuse programs
- CO₂ footprint tracking
- Green vendor certification

### Partner APIs
- Public Printable APIs
- Webhooks for:
  - Delivery status
  - Invoice synchronization

---

## 📌 Summary

Printable is a **full-stack document and offline campaign infrastructure platform**, not just a printing app.

✔ Scalable  
✔ Secure  
✔ Real-time  
✔ Multilingual  
✔ Global-ready  

Designed to empower **millions of users and vendors**, from Tier-2 India to global urban markets.

---


printable-platform/
│
├── README.md
├── package.json                 # Root scripts (lint, format, turbo, etc.)
├── tsconfig.base.json            # Shared TS config
├── .gitignore
│
├── docs/                         # Architecture & system documentation
│   ├── architecture.md
│   ├── infrastructure.md
│   ├── api-guidelines.md
│   ├── security.md
│   └── roadmap.md
│
├── frontend/                     # Web application (Next.js)
│   ├── web/
│   │   ├── app/                  # Next.js App Router
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── services/             # API clients
│   │   ├── store/                # Zustand stores
│   │   ├── styles/
│   │   ├── public/
│   │   ├── middleware.ts
│   │   ├── next.config.js
│   │   ├── tailwind.config.js
│   │   ├── postcss.config.js
│   │   └── package.json
│   │
│   └── admin/                    # Admin dashboard (Next.js)
│       ├── app/
│       ├── components/
│       ├── services/
│       ├── store/
│       └── package.json
│
├── mobile/                       # React Native (Expo)
│   └── app/
│       ├── src/
│       │   ├── screens/
│       │   ├── components/
│       │   ├── services/
│       │   ├── store/
│       │   ├── utils/
│       │   └── i18n/
│       ├── assets/
│       ├── app.json
│       └── package.json
│
├── backend/                      # Node.js Microservices
│   ├── gateway/                  # API Gateway (REST / GraphQL)
│   │   ├── src/
│   │   │   ├── plugins/
│   │   │   ├── routes/
│   │   │   ├── graphql/
│   │   │   └── index.ts
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   ├── services/
│   │   ├── auth-service/
│   │   │   ├── src/
│   │   │   │   ├── modules/
│   │   │   │   │   └── auth/
│   │   │   │   ├── routes/
│   │   │   │   ├── plugins/
│   │   │   │   ├── utils/
│   │   │   │   └── server.ts
│   │   │   ├── prisma/
│   │   │   │   └── schema.prisma
│   │   │   ├── Dockerfile
│   │   │   └── package.json
│   │   │
│   │   ├── user-service/
│   │   ├── vendor-service/
│   │   ├── file-service/
│   │   ├── order-service/
│   │   ├── campaign-service/
│   │   ├── notification-service/
│   │   ├── billing-service/
│   │   ├── ai-service/
│   │   └── admin-service/
│   │
│   ├── shared/                   # Shared backend utilities
│   │   ├── logger/
│   │   ├── auth/
│   │   ├── constants/
│   │   └── types/
│   │
│   └── docker-compose.yml         # Local backend orchestration
│
├── infra/                        # Infrastructure as Code & configs
│   ├── nginx/
│   │   └── nginx.conf
│   ├── docker/
│   │   ├── postgres/
│   │   ├── redis/
│   │   └── minio/
│   ├── monitoring/
│   │   ├── prometheus.yml
│   │   └── grafana/
│   └── scripts/
│       ├── backup.sh
│       └── deploy.sh
│
├── .github/                      # CI/CD
│   └── workflows/
│       ├── backend.yml
│       ├── frontend.yml
│       └── deploy.yml
│
└── tools/                        # Dev tools & scripts
    ├── db-migrate/
    ├── seed/
    └── mock-data/


**Printable — Build Once. Scale Everywhere.**
