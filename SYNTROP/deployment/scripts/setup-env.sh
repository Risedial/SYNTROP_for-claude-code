#!/bin/bash
# First Aid Study PWA — Environment Setup Script
# Usage: bash setup-env.sh
# Guides through Upstash Redis setup and Vercel env var injection

set -e

echo "=== First Aid Study PWA — Environment Setup ==="
echo ""
echo "This script will:"
echo "  1. Verify Vercel CLI is installed and logged in"
echo "  2. Prompt for Upstash Redis credentials"
echo "  3. Inject credentials into Vercel production environment"
echo "  4. Trigger a production redeployment"
echo ""

# Check prerequisites
command -v vercel >/dev/null 2>&1 || { echo "ERROR: Vercel CLI not found. Install: npm i -g vercel"; exit 1; }

# Check Vercel login
echo "[1/4] Checking Vercel authentication..."
VERCEL_USER=$(vercel whoami 2>/dev/null || echo "")
if [ -z "$VERCEL_USER" ]; then
  echo "Not logged in. Running: vercel login"
  vercel login
fi
echo "OK: Logged in as $VERCEL_USER"

# Prompt for Upstash credentials
echo ""
echo "[2/4] Upstash Redis credentials"
echo ""
echo "Get these from https://console.upstash.com:"
echo "  Your database → REST API section → Endpoint and Token"
echo ""
read -r -p "UPSTASH_REDIS_REST_URL (https://...upstash.io): " REDIS_URL
read -r -p "UPSTASH_REDIS_REST_TOKEN: " REDIS_TOKEN

if [ -z "$REDIS_URL" ] || [ -z "$REDIS_TOKEN" ]; then
  echo "ERROR: Both credentials are required."
  exit 1
fi

# Inject into Vercel
echo ""
echo "[3/4] Setting Vercel environment variables..."
echo "$REDIS_URL" | vercel env add UPSTASH_REDIS_REST_URL production
echo "$REDIS_TOKEN" | vercel env add UPSTASH_REDIS_REST_TOKEN production
echo "OK: Environment variables set."

# Redeploy
echo ""
echo "[4/4] Redeploying to apply new environment variables..."
vercel deploy --prod
echo ""
echo "=== Setup Complete ==="
echo ""
echo "Test Redis sync:"
echo "  1. Open the app → Settings tab → tap 'Save to Cloud'"
echo "  2. You should see a success confirmation"
echo "  3. Clear browser data → Settings tab → tap 'Restore from Backup'"
echo "  4. All your study progress should be restored"
