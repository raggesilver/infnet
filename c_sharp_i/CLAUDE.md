# c_sharp_i

.NET 9 (`net9.0`) console apps. Local SDK is 10.0, so `dotnet build` works. Assignments: `TP2`, `AT`, each with about 12 exercises. Directories use uppercase here, so keep that.

## Style

- 2-space indent, file-scoped namespaces (`namespace AT;`), nullable and implicit usings on.
- Braces on their own line (Allman), `_camelCase` private fields, `PascalCase` members.
- Expression-bodied members for trivial properties.

## Project shape

Menu-runner pattern:

- `IExercise` has `string Name { get; }` and `void Run(string[] args)`.
- `ExerciseNN : IExercise`, using two-digit numbering.
- `Program` holds a static `IExercise[]` (collection expression), prints the menu with aligned numbers, and loops until the user exits.
- `Utils` holds the console helpers (`ReadDate`, ...) with validator callbacks returning `(bool, string?)`. Copy the latest version forward.
- Theory-only exercises use `TheoreticalExercise`.
- Exercise output is pt-BR.
- Notes to the grader, when needed, go in a pt-BR comment above the relevant constant.

## Build hygiene

- `.gitignore` is the standard Visual Studio one (`bin/`, `obj/`). Never commit build output.
- Don't add CI for these unless asked.
