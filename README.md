# Lorinyo - Omni-Channel E-Commerce Integration Platform

A comprehensive, production-ready e-commerce platform integrating marketplaces (Trendyol, Hepsiburada, N11) with centralized product, order, and cargo management.

## 🏗️ Architecture

- **Monorepo:** Turborepo with `apps/` and `libs/` structure
- **Backend:** NestJS (Modular Monolith)
- **Frontend:** Next.js (App Router)
- **Database:** PostgreSQL with Prisma ORM
- **Queue:** Redis + BullMQ
- **Storage:** MinIO (S3-compatible) for development, AWS S3 for production
- **Real-time:** Socket.io for bulk operation progress

## 📁 Project Structure

```
lorinyo/
├── apps/
│   ├── api/          # NestJS Backend
│   └── web/          # Next.js Frontend
├── libs/
│   └── shared-types/ # Shared TypeScript DTOs and interfaces
└── docker-compose.yml
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- Docker & Docker Compose
- npm >= 9

### 1. Start Infrastructure Services

```bash
docker-compose up -d
```

This starts:
- PostgreSQL (port 5432)
- Redis (port 6379)
- MinIO (port 9000 for API, 9001 for console)

### 2. Install Dependencies

```bash
npm install
```

This installs dependencies for all workspaces.

### 3. Configure Environment

Backend:
```bash
cd apps/api
cp .env.example .env
# Edit .env with your configuration
```

Frontend (optional):
```bash
cd apps/web
# Create .env.local if needed for custom API URLs
```

### 4. Database Setup

```bash
cd apps/api
npm run prisma:migrate
npm run prisma:generate
```

### 5. Run Development Servers

From the root directory:

```bash
npm run dev
```

This starts:
- Backend API: http://localhost:3001/api
- Frontend: http://localhost:3000

Or run individually:

```bash
# Backend only
cd apps/api
npm run dev

# Frontend only
cd apps/web
npm run dev
```

## 📦 Available Scripts

### Root (all workspaces)
- `npm run dev` - Start all apps in development mode
- `npm run build` - Build all apps
- `npm run test` - Run tests in all apps
- `npm run lint` - Lint all apps

### Backend (`apps/api`)
- `npm run dev` - Start backend with hot reload
- `npm run build` - Build production bundle
- `npm run start:prod` - Start production server
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run E2E tests

### Frontend (`apps/web`)
- `npm run dev` - Start Next.js dev server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Lint code

## 🔌 Service Endpoints

- **Backend API:** http://localhost:3001/api
- **Frontend:** http://localhost:3000
- **PostgreSQL:** localhost:5432
- **Redis:** localhost:6379
- **MinIO API:** http://localhost:9000
- **MinIO Console:** http://localhost:9001 (admin/lorinyo_minio_password)

## 🏢 Key Features

### Product Management (PIM)
- Master product data with dynamic variants
- Bulk Excel upload with real-time progress
- Dynamic attributes (color, size, custom)
- Image management

### Marketplace Integration
- **Adapter Pattern** for extensible marketplace support
- Trendyol, Hepsiburada, N11, Amazon
- Category mapping system
- Product sync, stock/price updates
- Order fetching with cron jobs
- Mock services for development

### Order Management (OMS)
- Unified orders from all platforms
- Source tracking (LOCAL, TRENDYOL, etc.)
- Status workflow management

### Cargo Integration
- **Adapter Pattern** for cargo providers
- Yurtiçi Kargo, Aras Kargo
- Automatic shipment creation
- Barcode generation (ZPL/PDF)
- Tracking with webhooks

### Auth & Security
- JWT authentication
- RBAC (Admin, Vendor, Customer)
- Encrypted API key storage
- Complete audit logging

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests (backend)
cd apps/api
npm run test:e2e

# Coverage
cd apps/api
npm run test:cov
```

## 🔧 Technology Stack

**Backend:**
- NestJS
- Prisma ORM
- PostgreSQL
- Redis
- BullMQ
- Socket.io
- JWT/Passport
- Bcrypt

**Frontend:**
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Shadcn/UI
- Zustand / React Query
- Socket.io Client
- React Hook Form + Zod

**Shared:**
- TypeScript (Strict Mode)
- Turborepo
- ESLint
- Prettier

## 📄 License

Private - All Rights Reserved

## 🤝 Contact

For questions or support, contact the development team.
