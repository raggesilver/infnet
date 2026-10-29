#!/usr/bin/env bash
# Prints a JSON array of buildable assignment units ("<course>/<assignment>")
# touched between $BASE and $HEAD_SHA, e.g.
#   [{"dir":"java_ii/tp3","kind":"gradle"}]
# Set ALL=1 to list every unit (used when the CI itself changes).
set -euo pipefail

# Course directories whose assignments are built, retakes included.
COURSE_RE='^((java|c_sharp)_(i|ii)|block_iii)(_retake)?$'

unit_kind() {
  local dir="$1"
  if [ -f "$dir/pom.xml" ]; then echo maven
  elif [ -f "$dir/gradlew" ]; then echo gradle
  elif [ -n "$(find "$dir" -maxdepth 3 \( -name '*.sln' -o -name '*.csproj' \) -print -quit)" ]; then echo dotnet
  elif [ -n "$("$(dirname "$0")/java-sources.sh" roots "$dir")" ]; then echo javac
  fi
}

if [ "${ALL:-0}" = "1" ]; then
  units=$(
    for course in $(ls -d -- */ | tr -d / | grep -E "$COURSE_RE"); do
      find "$course" -mindepth 1 -maxdepth 1 -type d
    done
  )
else
  base="${BASE:-}"
  if [ -z "$base" ] || [ "$base" = "0000000000000000000000000000000000000000" ]; then
    base="${HEAD_SHA:-HEAD}~1"
  fi
  units=$(
    git diff --name-only --diff-filter=d "$base" "${HEAD_SHA:-HEAD}" |
      awk -F/ 'NF >= 3 { print $1 "/" $2 }' |
      grep -E "${COURSE_RE%\$}/" | sort -u
  )
fi

for dir in $units; do
  [ -d "$dir" ] || continue
  kind=$(unit_kind "$dir")
  [ -n "$kind" ] || continue
  printf '%s %s\n' "$dir" "$kind"
done | jq -R -s -c 'split("\n") | map(select(length > 0) | split(" ") | {dir: .[0], kind: .[1]})'
