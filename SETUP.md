# Setup Guide

## PowerShell Execution Policy Fix

The `npm install` command failed due to PowerShell execution policy. To fix this:

**Option 1: Temporary (Current Session Only)**
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

**Option 2: Permanent (Recommended for Development)**
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Then run the installation steps below.

## Installation Steps

### 1. Install Dependencies

From the root directory:
```bash
npm install
```

### 2. Start Docker Services

```bash
docker-compose up -d
```

Verify services are running:
```bash
docker ps
```

You should see containers for:
- lorinyo-postgres
- lorinyo-redis  
- lorinyo-minio

### 3. Setup Backend Environment

```bash
cd apps/api
copy .env.example .env
```

### 4. Run Database Migrations

```bash
cd apps/api
npx prisma generate
npx prisma migrate dev --name init
```

### 5. (Optional) Seed Database

If needed, you can open Prisma Studio to manually add data:
```bash
cd apps/api
npx prisma studio
```

### 6. Start Development Servers

**Option A: All services together**
```bash
# From root
npm run dev
```

**Option B: Individual services**
```bash
# Terminal 1 - Backend
cd apps/api
npm run dev

# Terminal 2 - Frontend
cd apps/web
npm run dev
```

## Verification

- **Backend API:** http://localhost:3001/api
- **Frontend:** http://localhost:3000
- **MinIO Console:** http://localhost:9001 (login: `lorinyo_admin` / `lorinyo_minio_password`)
- **Prisma Studio:** http://localhost:5555 (when running)

## Next Steps

Once the infrastructure is running:
1. Authentication endpoints will be available at `/api/auth`
2. Frontend will connect to backend automatically
3. Check backend logs for any errors
4. Frontend should show the home page with admin/shop links

## Troubleshooting

**Database Connection Issues:**
- Ensure Docker containers are running: `docker ps`
- Check PostgreSQL logs: `docker logs lorinyo-postgres`
- Verify DATABASE_URL in `apps/api/.env`

**Redis Connection Issues:**
- Check Redis logs: `docker logs lorinyo-redis`
- Verify REDIS_HOST and REDIS_PORT in `apps/api/.env`

**Port Already in Use:**
- Backend: Change `PORT` in `apps/api/.env`
- Frontend: Use `npm run dev -- -p 3001` to use different port
- Database: Change port mapping in `docker-compose.yml`
