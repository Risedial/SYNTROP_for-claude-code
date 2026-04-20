#!/bin/bash
# First Aid Study PWA — Production Deployment Script
# Usage: bash deploy.sh
# Deploys the app to Vercel production

set -e

echo "=== First Aid Study PWA — Deploy to Production ==="
echo ""

# Step 1: Verify prerequisites
echo "[1/5] Checking prerequisites..."
command -v node >/dev/null 2>&1 || { echo "ERROR: Node.js is required but not installed."; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "ERROR: npm is required but not installed."; exit 1; }
command -v vercel >/dev/null 2>&1 || { echo "ERROR: Vercel CLI not found. Install: npm i -g vercel"; exit 1; }
echo "OK: All prerequisites found."

# Step 2: Install dependencies
echo ""
echo "[2/5] Installing dependencies..."
npm install
echo "OK: Dependencies installed."

# Step 3: Type check
echo ""
echo "[3/5] Running TypeScript type check..."
npm run typecheck
echo "OK: No type errors."

# Step 4: Build
echo ""
echo "[4/5] Building production bundle..."
npm run build
BUNDLE_SIZE=$(du -sh dist/ | cut -f1)
echo "OK: Build successful. Bundle size: $BUNDLE_SIZE"

# Verify critical build artifacts
if [ ! -f "dist/sw.js" ]; then
  echo "ERROR: Service worker (dist/sw.js) not found in build output."
  exit 1
fi
if [ ! -f "dist/manifest.webmanifest" ]; then
  echo "ERROR: PWA manifest not found in build output."
  exit 1
fi
echo "OK: Service worker and manifest verified."

# Step 5: Deploy to Vercel
echo ""
echo "[5/5] Deploying to Vercel production..."
vercel deploy --prod
echo ""
echo "=== Deployment Complete ==="
echo ""
echo "Next steps:"
echo "  1. Open the production URL shown above"
echo "  2. Verify the app opens to a quiz question immediately"
echo "  3. Settings tab → Save to Cloud (verify Redis sync works)"
echo "  4. Test offline: enable airplane mode, reload, verify all tabs work"
echo ""
echo "If Redis sync fails, complete Upstash setup per DEPLOYMENT-GUIDE.md"
