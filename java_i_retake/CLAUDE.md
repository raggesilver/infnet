# java_i_retake

Retake of `java_i` ("Fundamentos de Desenvolvimento com Java"). The conventions in `../java_i/CLAUDE.md` apply, so read it first, with the differences below.

## Differences from java_i

- Target is **JDK 21** (the brief says so). Check with `javac --release 21`, not just the local JDK, which is newer.
- Layout is one folder per exercise (`tp1/ex01`, `tp1/ex05`, ...), default package, each compiled on its own with plain `javac`/`java`. There is no menu-runner and no build tool.
- Code from earlier exercises is copied forward into later folders (e.g. `ClassificadorPedido` in `ex06`..`ex09`) so each folder stays self-contained.
- Written answers live in one `tpN/respostas.txt` (pt-BR, plain text), one section per exercise.
- Class names **keep the brief's Portuguese names** (`InfoAmbiente`, `ConversorUnidades`, `ClassificadorPedido`, `MenuLogistica`) in `tp1`, because the brief requires them and tells the grader which to run. Everything else, including methods, fields and enums, is English, and output stays pt-BR. For other assignments, check whether the brief requires the names again.
- Input is read with `Scanner` on `System.in`, one shared instance per program, parsing with `nextLine()`. Numbers accept both `,` and `.`.

## Written parts about AI

- Exercises that ask about Paulo's own AI usage (TP1 Ex 4 and Ex 9) are answered in Paulo's words. Prompt him for them, then transcribe without rewriting.
- Never write a first-person claim about how Paulo used AI on his behalf.
