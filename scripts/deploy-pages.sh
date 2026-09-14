#!/usr/bin/env bash
# Builds and publishes dist/ to the gh-pages branch.
# GitHub Pages serves that branch at https://kyaraslav-cell.github.io/portfolio/
#
# This exists instead of a GitHub Actions workflow because the gh token here
# lacks the `workflow` scope. To switch to CI instead:
#   gh auth refresh -s workflow
#   mkdir -p .github/workflows && cp docs/ci/github-pages.yml .github/workflows/
#   then set Pages source to "GitHub Actions" in the repo settings.
set -euo pipefail
cd "$(dirname "$0")/.."

WORKTREE=$(mktemp -d)
cleanup() {
  git worktree remove --force "$WORKTREE" 2>/dev/null || true
  [ -n "${BUILD_BRANCH:-}" ] && git branch -D "$BUILD_BRANCH" -q 2>/dev/null || true
}
trap cleanup EXIT

npm run build
touch dist/.nojekyll

git worktree add --detach "$WORKTREE" >/dev/null
# A throwaway orphan per run, pushed onto gh-pages. Naming it gh-pages locally
# fails on the second run, because the first run leaves that branch behind.
BUILD_BRANCH="pages-build-$(date +%s)"
git -C "$WORKTREE" checkout --orphan "$BUILD_BRANCH" -q
git -C "$WORKTREE" rm -rq --cached .
find "$WORKTREE" -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
cp -r dist/. "$WORKTREE"/

git -C "$WORKTREE" add -A
git -C "$WORKTREE" commit -q -m "Build $(git rev-parse --short HEAD)"
git -C "$WORKTREE" push -q -f origin "$BUILD_BRANCH:gh-pages"

echo "Deployed https://kyaraslav-cell.github.io/portfolio/"
