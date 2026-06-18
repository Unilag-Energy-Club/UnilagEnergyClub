#!/bin/sh
set -e

echo "→ Starting Next.js (port 3001)..."
(cd energytransition.dp && node_modules/.bin/next start -p 3001) &

echo "→ Starting proxy server (port ${PORT:-3000})..."
node server.mjs
