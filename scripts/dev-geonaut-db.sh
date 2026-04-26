#!/usr/bin/env bash
# Start only the MySQL service for geonaut-web (e.g. when not using a host MySQL on 3307).
# Stops/avoid host MySQL on 3307 or change the port mapping in geonaut-web/docker-compose.yml.
# Use from travel/: npm run dev:db
set -euo pipefail
GEONAUT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/../geonaut-web"
if [ ! -d "$GEONAUT" ]; then
  echo "dev-geonaut-db: expected geonaut-web at: $GEONAUT" >&2
  exit 1
fi
cd "$GEONAUT"

DB_ID=$(docker compose ps -q db 2>/dev/null || true)
if [ -n "$DB_ID" ] && [ "$(docker inspect -f '{{.State.Running}}' "$DB_ID" 2>/dev/null)" = "true" ]; then
  echo "[geonaut-db] db already up — following logs (Ctrl+C stops the tail; container keeps running)"
  exec docker compose logs -f --tail=30 db
else
  echo "[geonaut-db] starting: docker compose up db"
  exec docker compose up db
fi
