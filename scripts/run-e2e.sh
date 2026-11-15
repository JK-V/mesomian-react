#!/usr/bin/env bash
set -euo pipefail

echo "🎭 Running Playwright E2E tests..."
npm run e2e

echo "✅ E2E tests passed."
