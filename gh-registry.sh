#!/usr/bin/env bash
set -e

for package in "$@"; do
  file="$(npm --registry=https://registry.npmjs.org pack "$package")"
  if [ -f "$file" ]; then
    npm publish "$file"
  else
    echo "Failed to download $package" 1>&2
  fi
done
