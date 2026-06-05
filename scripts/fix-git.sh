#!/usr/bin/env bash
# Repairs common local git lock / FETCH_HEAD timeout issues on macOS.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "→ Removing stale git lock files…"
rm -f .git/index.lock .git/shallow.lock .git/packed-refs.lock

if [[ -f .git/FETCH_HEAD ]]; then
  if ! timeout 3 cat .git/FETCH_HEAD >/dev/null 2>&1; then
    echo "→ FETCH_HEAD is unreadable (stuck). Removing and refreshing…"
    rm -f .git/FETCH_HEAD
    git fetch origin
  else
    echo "→ FETCH_HEAD is readable."
  fi
else
  echo "→ FETCH_HEAD missing. Refreshing from origin…"
  git fetch origin
fi

echo "→ Git status:"
git status

echo "Done. If errors persist, move the repo out of iCloud-synced folders (Desktop/Documents)."
