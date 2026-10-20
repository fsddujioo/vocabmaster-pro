#!/usr/bin/env sh
cd "$(dirname "$0")" || exit 1
if command -v node >/dev/null 2>&1; then
  echo "VocabMaster Pro: http://localhost:8080"
  node server.cjs
else
  echo "Install Node.js for the Ollama bridge, or open index.html for offline study."
fi
