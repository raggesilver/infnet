# c_sharp_ii

.NET 9 (`net9.0`). Local SDK is 10.0. Assignments: `TP1`, `TP2`, `TP3`, `AT`. Directories use uppercase here, so keep that.

## Style

- 2-space indent, file-scoped namespaces, nullable and implicit usings on.
- Allman braces, `_camelCase` private fields, `PascalCase` members.

## Assignments

- `TP1`: console exercises (`console-exercises/`, menu-runner pattern as in `c_sharp_i`) plus an ASP.NET `ProductCatalog` app.
- `TP2`, `CityBreaks.Web`: ASP.NET Core Razor Pages.
- `AT`: ASP.NET Core MVC with EF Core (SQLite and SQL Server packages, migrations in `Migrations/`), plus an events/services layer (`Events/`, `Services/MulticastLogger`).
- EF Core packages are pinned to `9.0.x`. Keep them in step with the target framework.
- Don't hand-edit or delete generated migrations. Add new ones with `dotnet ef migrations add`.
- Don't commit `wwwroot/lib` changes beyond what scaffolding generates.

## Language

- The `AT` domain models are in Portuguese (`Cliente`, `Reserva`, `PacoteTuristico`) because the brief asked for it. That predates the English-names rule. For new work, name types and members in English and keep UI text in pt-BR.
- Scaffolded controllers carry `// GET: Reserva` comments. Keep them if scaffolding produced them, and don't add more.

## Build hygiene

- `.gitignore` excludes `bin/` and `obj/`.
- CI: `.github/workflows/c-sharp-ii-dotnet-build.yml` builds changed assignments by path filter on `c_sharp_ii/TP1|TP2|TP3|AT`.
- A new assignment directory must be added to that filter, or it won't be built in CI.
