#!/usr/bin/env bash
set -euo pipefail

echo "🏷️  Bumping version..."
npm run version

echo "✅ Version bumped."
