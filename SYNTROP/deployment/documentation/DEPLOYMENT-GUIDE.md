# Deployment Guide
## First Aid Study PWA

**Current production URL:** https://cpr-first-aid.vercel.app
**Status:** Live (deployed 2026-04-18)

---

## Prerequisites

- Node.js 18+
- Vercel CLI: `npm i -g vercel`
- Git repository linked to Vercel project (already done)
- Upstash account (free tier at console.upstash.com)

---

## Environment Variables

| Variable | Where to Get | Required |
|----------|-------------|----------|
| `UPSTASH_REDIS_REST_URL` | Upstash console → your database → REST API → Endpoint | Yes |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash console → your database → REST API → Token | Yes |

---

## One-Time Setup (Upstash Redis)

These steps only need to be done once. If Redis is already configured, skip to "Redeployment".

### Step 1: Create Upstash Redis Database

1. Go to https://console.upstash.com
2. Create account (free) or log in
3. Create a new Redis database:
   - Name: `fap-redis` (or any name)
   - Region: US-East-1 (or closest to your Vercel region)
   - Plan: Free
4. From the database overview page, copy:
   - **REST URL** (format: `https://xxx.upstash.io`)
   - **REST Token** (the long string)

### Step 2: Add Environment Variables to Vercel

```bash
cd /path/to/cpr-first-aid

vercel env add UPSTASH_REDIS_REST_URL production
# Paste the REST URL when prompted

vercel env add UPSTASH_REDIS_REST_TOKEN production
# Paste the REST Token when prompted
```

### Step 3: Redeploy

```bash
vercel deploy --prod
```

### Step 4: Validate SC-004

1. Open https://cpr-first-aid.vercel.app on your phone
2. Study a few questions (so there's progress to save)
3. Settings tab → tap "Save to Cloud" → confirm success message
4. Clear browser storage: Settings (browser, not app) → Clear Site Data
5. Reload the app → Settings tab → tap "Restore from Backup"
6. Verify question counts match your pre-clear state

---

## Redeployment (Code Updates)

To deploy code changes:

```bash
cd /path/to/cpr-first-aid
npm run build          # verify build succeeds locally
git push origin main   # if using GitHub integration
# OR
vercel deploy --prod   # direct CLI deploy
```

---

## Content Updates

Content (questions and skills) is compiled into the bundle at build time. To update content:

1. Edit `src/data/questions.ts` or `src/data/skills.ts`
2. Verify correctness of clinical content
3. Run `npm run build` to verify no TypeScript errors
4. Deploy: `vercel deploy --prod`

---

## Local Development

```bash
npm install
# Create .env.local with Redis credentials (see Environment Variables above)
npm run dev
# App available at http://localhost:5173
```

The `/api/sync` route runs locally via `vercel dev` (not `npm run dev`). For local sync testing:

```bash
vercel dev
# App + API available at http://localhost:3000
```

---

## Build Verification

Before any production deploy, verify:

```bash
npm run typecheck    # Must exit 0
npm run build        # Must exit 0; check dist/ size < 5MB
```

Expected output:
- `dist/` size: ~372K
- `dist/sw.js`: present
- `dist/manifest.webmanifest`: present

---

## Infrastructure Summary

| Service | Plan | Cost | Limits |
|---------|------|------|--------|
| Vercel | Hobby (free) | $0/month | 100GB bandwidth, 100 serverless invocations/day |
| Upstash Redis | Free | $0/month | 10,000 commands/day, 256MB storage |

Single-user study patterns: estimated <100 Redis commands/day (well within free tier).
