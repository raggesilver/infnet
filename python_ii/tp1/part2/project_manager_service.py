class ProjectManagerService:
    def __init__(self):
        self.projects: dict[int, set[str]] = {
            1: {"f1", "f2", "f3", "f4"},
            2: {"f1", "f5", "f3", "f6"},
        }

    def add_employee_to_project(self, project_id: int, employee: int):
        if project_id not in self.projects:
            raise ValueError("Projeto não encontrado")

        employee_id = f"f{employee}"
        self.projects[project_id].add(employee_id)

    def remove_employee_from_project(self, project_id: int, employee: int):
        if project_id not in self.projects:
            raise ValueError("Projeto não encontrado")

        employee_id = f"f{employee}"

        if employee_id not in self.projects[project_id]:
            raise ValueError(
                f"Funcionário {employee} não encontrado no projeto {project_id}"
            )

        self.projects[project_id].remove(employee_id)

    def list_projects(self) -> list[int]:
        return list(self.projects.keys())

    def list_employees_in_project(self, project_id: int) -> list[str]:
        if project_id not in self.projects:
            raise ValueError("Projeto não encontrado")

        return list(self.projects[project_id])

    def list_employees_in_projects(self, project_a: int, project_b: int) -> list[str]:
        if project_a not in self.projects:
            raise ValueError(f"Projeto {project_a} não encontrado")

        if project_b not in self.projects:
            raise ValueError(f"Projeto {project_b} não encontrado")

        return list(self.projects[project_a].intersection(self.projects[project_b]))
