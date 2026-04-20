# Infrastructure Notes
## First Aid Study PWA — fap-2026-0417-001

**Generated:** 2026-04-18

---

## Vercel Project

| Field | Value |
|-------|-------|
| Project name | cpr-first-aid |
| Org | risedials-projects |
| Project ID | prj_Ei8KlNboWKHU3O5VW03EFktgPVlV |
| Org ID | team_KGrCcm7WoWqIirJKpvxpybwU |
| Linked | Yes — .vercel/project.json created |
| Framework detection | Vite (auto-detected) |
| Build command | vite build |
| Output directory | dist |

---

## Redis / Upstash

**Status:** ⚠️ MANUAL STEP REQUIRED

**Why:** Upstash MCP was not available in this session, and Vercel KV has been deprecated in CLI v43+.

**One-time setup (5 minutes):**

1. Go to [https://console.upstash.com](https://console.upstash.com) → Create free account or log in
2. Click **Create Database** → Name: `fap-backup` → Region: `us-east-1` → Free tier → Create
3. On the database detail page, copy:
   - **REST URL** (starts with `https://...upstash.io`)
   - **REST Token** (long string starting with `AXxx...`)
4. Run these two commands in the project directory:

```bash
vercel env add UPSTASH_REDIS_REST_URL production
# (paste the REST URL when prompted, press Enter)

vercel env add UPSTASH_REDIS_REST_TOKEN production
# (paste the REST Token when prompted, press Enter)
```

5. Verify with:
```bash
vercel env ls
```

You should see both vars listed.

6. Test connectivity (replace placeholders with actual values):
```bash
curl -s "https://<YOUR_UPSTASH_REST_URL>/ping" \
  -H "Authorization: Bearer <YOUR_UPSTASH_REST_TOKEN>"
```
Expected response: `+PONG`

---

## Production URL

| Field | Value |
|-------|-------|
| Canonical URL | https://cpr-first-aid.vercel.app |
| Deployment ID | dpl_2utDmK9Z7BkNBGU9zaQ7MQXGdE1h |
| Deployment URL | https://cpr-first-imyqcmm3t-risedials-projects.vercel.app |
| Deployed at | 2026-04-18 |
| Status | ● Ready (Production) |

**Note:** App loads and works fully offline. `/api/sync` returns `{"error":"fetch_failed"}` until Upstash env vars are added. After adding env vars, run `vercel deploy --prod` again to activate sync.

**To activate sync after Upstash setup:**
```bash
vercel env add UPSTASH_REDIS_REST_URL production
vercel env add UPSTASH_REDIS_REST_TOKEN production
vercel deploy --prod
```

---

## Environment Variables Required

| Variable | Source | Set via |
|----------|--------|---------|
| `UPSTASH_REDIS_REST_URL` | Upstash console | `vercel env add` (see above) |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash console | `vercel env add` (see above) |

**No `.env` file is committed to the repo.** Variables injected via Vercel CLI only.

---

## Local Development

For `vercel dev` to have access to env vars, pull them after adding:
```bash
vercel env pull .env.local
```
`.env.local` is gitignored automatically by Vercel.
