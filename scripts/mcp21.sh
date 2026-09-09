#!/usr/bin/env bash
# Calls one tool on the 21st.dev HTTP MCP endpoint.
# Usage: scripts/mcp21.sh <tool> '<json args>'
set -euo pipefail
cd "$(dirname "$0")/.."
set -a; . ./.env; set +a
curl -sS -X POST https://21st.dev/api/mcp \
  -H "x-api-key: $API_KEY_21ST" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"tools/call\",\"params\":{\"name\":\"$1\",\"arguments\":${2:-\{\}}}}"
