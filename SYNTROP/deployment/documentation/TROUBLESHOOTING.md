# Troubleshooting Guide
## First Aid Study PWA

---

## Common Issues

### App shows a blank screen on load

**Symptoms:** White screen, no question appears.
**Cause:** JavaScript bundle failed to load (network error on first visit, or service worker not yet installed).
**Solution:**
1. Check internet connection.
2. Hard refresh: Ctrl+Shift+R (desktop) or Settings → Clear Site Data → reload.
3. If on first visit: ensure you have a working internet connection for the initial load.

---

### "Save to Cloud" / "Restore from Backup" shows an error

**Symptoms:** Sync buttons return an error message.
**Cause (most likely):** Upstash Redis environment variables are not set in Vercel, or the Vercel deployment is outdated.
**Solution:**
1. Follow "One-Time Setup (Upstash Redis)" in DEPLOYMENT-GUIDE.md.
2. After adding env vars, run: `vercel deploy --prod`
3. Wait 30 seconds, then retry.

**Cause (alternate):** Upstash free tier daily limit reached (10,000 commands/day).
**Solution:** Wait until the next UTC day for the limit to reset. Limit resets at midnight UTC.

---

### Progress disappeared after clearing browser data

**Symptoms:** Question counts are all reset to "New" after clearing browser storage.
**Solution:**
1. Go to Settings tab → tap "Restore from Backup".
2. Your last cloud backup will be restored (requires internet + Redis configured).
3. If no backup exists (Redis not configured): progress cannot be recovered from storage clearing.

**Prevention:** Set up Redis cloud backup per DEPLOYMENT-GUIDE.md before clearing browser data.

---

### Fast-tap answers not counting toward mastery

**Symptoms:** Questions not advancing despite correct answers.
**Cause:** Answers submitted in under 2 seconds are flagged as low-confidence and excluded from mastery streaks.
**Solution:** Read the question fully before tapping. If you knew the answer in under 2 seconds, wait briefly before tapping — or accept that the algorithm will confirm your mastery in the next attempt.

---

### App not working offline

**Symptoms:** App shows "No internet connection" or fails to load after enabling airplane mode.
**Cause:** Service worker not yet installed (requires at least one successful online visit to cache assets).
**Solution:**
1. Ensure you've visited the app at least once with a working internet connection.
2. Wait for the service worker to install (usually completes within seconds of first load).
3. Navigate all four tabs at least once while online to confirm full caching.
4. Then try offline mode.

---

### PWA not installable on iOS Safari

**Symptoms:** "Add to Home Screen" option missing, or app doesn't open in standalone mode after install.
**Cause:** Must use Safari on iOS; Chrome/Firefox on iOS cannot install PWAs.
**Solution:**
1. Open the URL specifically in iOS Safari (not Chrome).
2. Tap the Share button (box with arrow pointing up).
3. Scroll down to "Add to Home Screen".
4. The installed icon opens in standalone mode (no browser chrome).

---

### "Ready to test" banner not appearing

**Symptoms:** Studied extensively but banner doesn't appear.
**Cause:** One or more topics is below 75% mastery, and/or estimated score is below 80%.
**Solution:**
1. Check the Topic Grid on the Progress tab — any red or yellow topic needs more work.
2. The algorithm will prioritize your weaker topics. Continue studying.
3. The "Top 3 Weakest" section shows exactly where to focus.

---

### Vercel deployment failing

**Symptoms:** `vercel deploy --prod` exits with an error.
**Solutions:**
1. Run `npm run build` locally first — fix any TypeScript or build errors.
2. Run `npm run typecheck` — fix any type errors.
3. Check Vercel CLI is logged in: `vercel whoami`
4. Check project is linked: `vercel ls` should show the project.
5. Re-link if needed: `vercel link`

---

## Getting More Help

- Check build output: `npm run build 2>&1 | tail -30`
- Check Vercel function logs: `vercel logs --app cpr-first-aid`
- For Redis issues: check Upstash console data browser to verify keys exist
