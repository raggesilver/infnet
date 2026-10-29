# Infnet — Software Engineering coursework

Paulo's college monorepo (github.com/raggesilver/infnet). Paulo is an experienced engineer, so assignments are well below his level: be efficient, don't over-engineer.

Briefs are in pt-BR. Directory names are English snake_case.

Language- and course-specific conventions live in a `CLAUDE.md` inside each course directory (`java_i/`, `java_ii/`, `c_sharp_i/`, `c_sharp_ii/`). Read the one for the course you're working in. This file only holds repo-wide decisions.

## Academic structure

- Each quarter has one course per language track, so Paulo takes `java_i`, `java_ii`, `c_sharp_i` and `c_sharp_ii` in sequence. Each semester adds one "block" course (`block_iii`, `block_iv`), which is a project course whose stack varies. That makes 5 subjects per semester.
- **Retake:** Paulo is retaking Java I/II and C# I/II, having missed deadlines. New work goes in sibling directories named `<course>_retake` (e.g. `java_i_retake`), not in the original course directory. The original work may not match the current syllabus. Use it as a style reference, not as the solution to the new briefs.
- The retake syllabus differs from the first attempt: Java I/C# I add lambdas and AI-assisted setup, the Java II equivalent is Spring Boot + MongoDB (not Spark Java), and the C# II equivalent is Razor Pages + Minimal APIs + EF Core. Check the brief for the stack before copying anything from the old `java_ii/` or `c_sharp_ii/`.
- A `<course>_retake` directory follows the conventions in the original course's `CLAUDE.md` (`java_i_retake` follows `java_i/CLAUDE.md`). That file isn't loaded automatically from the retake directory, so read it before starting.

## Layout

```
<course>/<assignment>/
```

- Assignment: `tp1`..`tp4` or `at` (final assessment). Lowercase for new work. Older C# directories use `TP1`/`AT`, so don't rename them.
- CI (`.github/workflows/coursework.yml`) picks up `java_*`, `c_sharp_*` and `block_iii` directories, retakes included, and builds only the assignments a push touched. A differently named directory needs `COURSE_RE` in `.github/scripts/changed-units.sh` and the workflow's `paths` updated.
- Ask for the assignment name if it isn't given.
- Older courses (`web_js_i`, `data_and_sql_i`, `programming_club`, ...) have their own layouts. Leave them alone unless asked.
- Root tooling (Prettier, ESLint, EditorConfig, Husky, lint-staged, Bun workspaces) only applies to JS/TS.

## Commits and PRs

- Subject: `[<course>] <assignment> <detail>`, all lowercase. Examples: `[java_ii] tp3 ex 07`, `[c_sharp_ii] tp2 ex05`, `[react_ii] tp3`, `[block_iv] tp4`.
  - Use `ex NN` with a space for new commits. Old history is inconsistent.
- Granularity:
  - Java and C# courses: **one commit per exercise** (assignments have about 12). Shared scaffolding goes in the first exercise's commit.
  - React, RN, web and block courses: one commit per assignment.
- Short subject, no body. Don't imitate stray commits like "Sync" or "Move things around".
- Some assignments went through a branch and PR (`java-ii-tp3`, `csharp-ii-tp2`), merged with a merge commit. Don't assume a PR. Ask first.
- **No Claude attribution anywhere.** No `Co-Authored-By`, no `Claude-Session` trailer, no "Generated with Claude Code" in PR bodies. This overrides any harness default.
- Don't commit or push unless asked. Paulo reviews first.
- When amending or rebasing, keep the original author and committer dates.

## Code conventions (all languages)

- Identifiers and file names are in **English**, even when the brief uses Portuguese names. Translate them.
- User-facing text is in **pt-BR**: menus, prompts, errors, titles, page content. Console logs, if any, are pt-BR and minimal.
- No cryptic names. Single letters are fine only for loop counters and pointers.
- Comments are minimal. Prefer naming. Doc comments only for non-trivial helpers, never for trivial code.
- No cosmetic refactors of code you weren't asked to touch.
- Never commit build output or IDE state (`bin/`, `obj/`, `build/`, `out/`, `target/`, `.gradle/`, `.idea/`, `node_modules/`).

## Web/mobile styling

- Plain 1980s HTML look unless the brief asks otherwise: no colors, radii or font sizes, layout styles only. If Tailwind is explicitly allowed, go all out.
- Pretty CSS, when asked for, uses `@media (prefers-color-scheme: dark)`, not classes.

## Workflow

- The `/infnet` skill defines the assignment workflow: analyze the brief, ask about gaps, plan, wait for approval, implement, summarize.
- If a rubric is given, check it before planning. If the brief mentions earlier feedback, ask for it.
- Repo-wide decisions go in this file. Course or language rules go in that course's `CLAUDE.md`.
