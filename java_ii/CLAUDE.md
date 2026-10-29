# java_ii

Java 24 (`openjdk 24` installed). `gradle` is installed; `mvn` is not (check before promising an `at` build).

## Style

- 2-space indent, K&R braces, `var` for locals, `@Override` on interface methods.
- Javadoc only on non-trivial helpers.

## Assignments

- `tp1`, `tp2`: Gradle `app` module with package `com.raggesilver.<tpN>`, JUnit 5, and Mockito in `tp2`. The wrapper is checked in, so run `./gradlew test` and `./gradlew run`.
- `tp3`: single-module Gradle, default package, `src/main/java`, JUnit 5 BOM, 12 exercises in the menu-runner pattern below. HTTP goes through `services.HttpService`.
- `at`: Maven multi-module (`common`, `server`, `client`) with Javalin, Jackson and Hibernate Validator. It has `requests.http` for manual testing and `.run/` IntelliJ configs.

Menu-runner pattern (`tp3`):

- `IExercise` has `getName()` and `run()`.
- `Exercise1`..`Exercise12`, listed in an array in `App`.
- `App` prints `"TP3 — Paulo Queiroz"`, reads the choice via `Utils.readInt` with a validator, waits for ENTER, and loops until `0` ("Sair").
- `Utils` is the same helper set as in `java_i`.
- For new work, use two-digit numbering (`Exercise01`).

## Tests

- JUnit 5, named `shouldDoXWhenY`.
- Hand-written test doubles (`SpyAudit`, `StubHealthPlan`, `FakeConsultationHistory`) sit alongside Mockito mocks. Shared fixtures go in `TestUtils`.
- Keep the stub/spy/mock/fake distinction explicit when the brief asks for it, since the rubric usually grades it.

## Build hygiene

- Commit the Gradle wrapper (`gradlew`, `gradle/wrapper/*`). Don't commit `build/`, `.gradle/`, `target/` or `.idea/` (except `.run/`).
- Check that the assignment's `.gitignore` covers them.
