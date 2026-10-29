# java_i

Java 24 (`openjdk 24` installed). Assignments: `tp2`, `tp3`, `at`, each with 12 exercises as console programs.

## Style

- 2-space indent, K&R braces, `var` for locals, `@Override` on interface methods.
- Early-return one-liners are fine (`if (i == 0) break;`).
- Javadoc only on non-trivial `Utils` helpers.

## Project shape

Plain IntelliJ projects (`src/`, `<name>.iml`) with no build tool. `.gitignore` excludes `out/` and `.idea`.

Menu-runner pattern:

- `IExercise` has `String getName()` and `void run()`.
- Each exercise is `ExerciseNN implements IExercise`.
- `Main` holds an `IExercise[]`. It prints `"<AT|TP> — Paulo Queiroz"`, lists the exercises, reads the choice via `Utils.readInt` with a validator, and runs it. It then waits for ENTER and loops until `0` ("Sair").
- `Utils` is copied forward between assignments. Copy the latest version (`readInt`, `readDouble`, `readNonEmptyString`, `formatMoney` in BRL, `formatNumber`, `Validator<T>`, `ValidationResult`) and extend it.
- Exercise output is pt-BR and usually starts with a `=== Title ===` header.
- Exercise numbering: `Exercise01` (two digits) in `tp3` and `at`, `Exercise1` in `tp2`. For new work, use two digits.

Larger exercises can add sub-packages (`bank/`, `market/` in `tp3`).
