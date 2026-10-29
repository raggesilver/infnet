#!/usr/bin/env bash
# Finds plain-javac sources in an assignment unit, skipping any directory that
# is a Maven or Gradle project (those are built by their own tool).
#
#   java-sources.sh roots <unit>  directories to compile, one batch each
#   java-sources.sh files <root>  .java files under <root> outside projects
#
# A unit with a src/ folder is a single batch (packages need each other).
# Otherwise every direct subfolder is its own batch (one folder per exercise).
set -euo pipefail

java_files() {
  local root="$1" project
  local prune=()
  while IFS= read -r project; do
    prune+=(-path "$project" -prune -o)
  done < <(
    find "$root" \( -name pom.xml -o -name 'build.gradle*' -o -name 'settings.gradle*' -o -name gradlew \) -exec dirname {} \; | sort -u
  )
  find "$root" ${prune[@]+"${prune[@]}"} -name '*.java' -print
}

case "${1:-}" in
  roots)
    unit="$2"
    if [ -n "$(find "$unit" -maxdepth 1 \( -name pom.xml -o -name 'build.gradle*' -o -name 'settings.gradle*' -o -name gradlew \) -print -quit)" ]; then
      exit 0
    fi
    if [ -d "$unit/src" ]; then
      candidates="$unit/src"
    else
      candidates=$(find "$unit" -mindepth 1 -maxdepth 1 -type d | sort)
    fi
    while IFS= read -r candidate; do
      [ -n "$candidate" ] || continue
      if [ -n "$(java_files "$candidate" | head -n 1)" ]; then
        echo "$candidate"
      fi
    done <<< "$candidates"
    ;;
  files)
    java_files "$2"
    ;;
  *)
    echo "usage: $0 roots <unit> | files <root>" >&2
    exit 2
    ;;
esac
