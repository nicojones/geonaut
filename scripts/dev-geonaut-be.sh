#!/usr/bin/env bash
# Start only the geonaut-web PHP container (not MySQL). Use with MySQL on the host, or
# run `npm run dev:db` separately if you use the `db` service (set Database HOST=db in config).
# Use from travel/: npm run dev:be
set -euo pipefail
GEONAUT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/../geonaut-web"
if [ ! -d "$GEONAUT" ]; then
  echo "dev-geonaut-be: expected geonaut-web at: $GEONAUT" >&2
  exit 1
fi
cd "$GEONAUT"

WEB_ID=$(docker compose ps -q web 2>/dev/null || true)
if [ -n "$WEB_ID" ] && [ "$(docker inspect -f '{{.State.Running}}' "$WEB_ID" 2>/dev/null)" = "true" ]; then
  echo "[geonaut-be] web already up — following logs (Ctrl+C stops the tail; container keeps running)"
  exec docker compose logs -f --tail=30 web
else
  echo "[geonaut-be] starting: docker compose up web"
  exec docker compose up web
fi
