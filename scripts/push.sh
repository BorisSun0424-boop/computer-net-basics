#!/usr/bin/env bash
# 发布到 GitHub Pages：本地构建检查 → API 推送 → 自动触发 Actions 部署
set -euo pipefail
cd "$(dirname "$0")/.."

if ! command -v python3 >/dev/null 2>&1; then
  echo "缺少 python3，无法发布"
  exit 1
fi

echo "== 1/2 本地构建检查 =="
if ! npm run build --silent; then
  echo "构建失败，已中止发布（线上不会变）"
  exit 1
fi
echo "构建通过"

echo "== 2/2 推送到 GitHub =="
python3 scripts/push.py
