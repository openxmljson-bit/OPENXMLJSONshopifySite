#!/usr/bin/env bash
# Package the theme for Shopify upload, stamped with the build time.
# Usage: ./build-theme-zip.sh
set -euo pipefail
cd "$(dirname "$0")"

STAMP="$(date +%Y%m%d-%H%M)"
OUT="openxmljson-shopify-theme-${STAMP}.zip"

rm -f "$OUT"
# -X drops macOS extra attributes; junk files make Shopify reject an upload
zip -r -X -q "$OUT" \
  layout templates config locales assets sections snippets \
  -x '*.DS_Store' -x '__MACOSX/*' -x '*/._*'

unzip -tq "$OUT" >/dev/null
echo "$OUT  ($(du -h "$OUT" | cut -f1))"
