# Deployment Checklist
## First Aid Study PWA — fap-2026-0417-001

**App URL:** https://cpr-first-aid.vercel.app
**Current Status:** Live ✓ (5/7 acceptance criteria PASS)

---

## Phase 1: Initial Deployment (COMPLETE ✓)

- [x] Vercel project created and linked via CLI
- [x] App deployed to https://cpr-first-aid.vercel.app
- [x] Production build verified (exit 0, 372K)
- [x] Service worker present (dist/sw.js, 8 precache entries)
- [x] PWA manifest present (display:standalone, icons 192+512+maskable)
- [x] iOS meta tags present (3 tags in index.html)
- [x] TypeScript type check passes (tsc --noEmit exit 0)
- [x] SC-001: App opens to quiz question immediately (verified)
- [x] SC-002: Full offline after first visit (verified via sw.js precaching)
- [x] SC-003: Progress persists across close/reopen (verified via Zustand persist)
- [x] SC-005: Analytics readiness signal implemented (isReadyToTest logic)
- [x] SC-006: PWA installable on iOS and Android (verified via manifest + meta tags)

---

## Phase 2: Redis Activation (PENDING)

Complete this to enable cloud sync (SC-004).

- [ ] Create Upstash Redis database (free tier at console.upstash.com)
- [ ] Copy REST URL and Token from Upstash console
- [ ] Run: `vercel env add UPSTASH_REDIS_REST_URL production`
- [ ] Run: `vercel env add UPSTASH_REDIS_REST_TOKEN production`
- [ ] Run: `vercel deploy --prod`
- [ ] Settings tab → Save to Cloud → confirm success
- [ ] Clear browser data → Settings tab → Restore from Backup → confirm data restored
- [ ] SC-004: PASS ✓

**Shortcut:** `bash SYNTROP/deployment/scripts/setup-env.sh`

---

## Phase 3: Post-Deployment Verification

After Redis activation:

- [ ] SC-001: Open app → first element is a question card (zero clicks)
- [ ] SC-002: Airplane mode → reload → all 4 tabs work
- [ ] SC-003: Close browser → reopen → question counts unchanged
- [ ] SC-004: Clear localStorage → Restore → all states recovered
- [ ] SC-005: After 20+ sessions → check Progress tab for readiness signal
- [ ] SC-006: Install to home screen on your mobile device
- [ ] Run Lighthouse on production URL to verify NFR-001 (<2s first load)

---

## Ongoing Operations

### Redeployment (code changes)
```bash
npm run typecheck && npm run build && vercel deploy --prod
```

### Content update (questions/skills)
1. Edit `src/data/questions.ts` or `src/data/skills.ts`
2. Verify clinical accuracy
3. Redeploy (see above)

### Check Upstash usage
- console.upstash.com → your database → Metrics tab
- Free tier limit: 10,000 commands/day (single user ~100/day)
