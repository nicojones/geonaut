#!/usr/bin/env bash
# Start web + db in one `docker compose` run (avoids a name conflict when two terminals
# both run `compose up` for the same project at the same time).
# Use from travel/: npm run dev:stack, or `npm run dev:all` (with Next).
set -euo pipefail
GEONAUT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/../geonaut-web"
if [ ! -d "$GEONAUT" ]; then
  echo "dev-geonaut-stack: expected geonaut-web at: $GEONAUT" >&2
  exit 1
fi
cd "$GEONAUT"

web_running() {
  local id
  id=$(docker compose ps -q web 2>/dev/null || true)
  [ -n "$id" ] && [ "$(docker inspect -f '{{.State.Running}}' "$id" 2>/dev/null)" = "true" ]
}
db_running() {
  local id
  id=$(docker compose ps -q db 2>/dev/null || true)
  [ -n "$id" ] && [ "$(docker inspect -f '{{.State.Running}}' "$id" 2>/dev/null)" = "true" ]
}

if web_running && db_running; then
  echo "[geonaut-stack] web + db already up — following logs (Ctrl+C stops the tail; containers keep running)"
  exec docker compose logs -f --tail=30 web db
else
  echo "[geonaut-stack] starting: docker compose up web db"
  exec docker compose up web db
fi
