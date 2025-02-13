from project_manager_service import ProjectManagerService
from utils import format_error, present_menu, read_int


def add_employee_to_project(project_manager_service: ProjectManagerService):
    project_id = read_int("Digite o ID do projeto: ")
    employee_id = read_int("Digite o ID do funcionário: ")

    try:
        project_manager_service.add_employee_to_project(project_id, employee_id)
        print(f"Funcionário {employee_id} adicionado ao projeto {project_id}")
    except ValueError as e:
        print(f"Falha ao adicionar funcionário ao projeto: {format_error(e)}")


def remove_employee_from_project(project_manager_service: ProjectManagerService):
    project_id = read_int("Digite o ID do projeto: ")
    employee_id = read_int("Digite o ID do funcionário: ")

    try:
        project_manager_service.remove_employee_from_project(project_id, employee_id)
        print(f"Funcionário {employee_id} removido do projeto {project_id}")
    except ValueError as e:
        print(f"Falha ao remover funcionário do projeto: {format_error(e)}")


def list_projects(project_manager_service: ProjectManagerService):
    projects = project_manager_service.list_projects()

    print()
    for project in projects:
        print(f"Projeto {project}")


def list_employees_from_project(project_manager_service: ProjectManagerService):
    project_id = read_int("Digite o ID do projeto: ")

    try:
        employees = project_manager_service.list_employees_in_project(project_id)
        print(f"Funcionários do projeto {project_id}:\n\n{'\n'.join(employees)}")
    except ValueError as e:
        print(f"Falha ao listar funcionários do projeto: {format_error(e)}")


def list_employee_from_both_projects(project_manager_service: ProjectManagerService):
    employees = project_manager_service.list_employees_in_projects(1, 2)
    print(f"\nFuncionários em ambos os projetos:\n\n{'\n'.join(employees)}")


def menu(project_manager_service: ProjectManagerService):
    EXIT_OPTION = 6
    options = {
        1: "Adicionar funcionário a um projeto",
        2: "Remover funcionário de um projeto",
        3: "Listar projetos",
        4: "Listar funcionários de um projeto",
        5: "Listar funcionários de ambos os projetos",
        EXIT_OPTION: "Sair",
    }

    while (option := present_menu(options, True)) != EXIT_OPTION:
        match option:
            case 1:
                add_employee_to_project(project_manager_service)
            case 2:
                remove_employee_from_project(project_manager_service)
            case 3:
                list_projects(project_manager_service)
            case 4:
                list_employees_from_project(project_manager_service)
            case 5:
                list_employee_from_both_projects(project_manager_service)

        input("\nPressione Enter para continuar...")
    pass


def main():
    try:
        project_manager_service = ProjectManagerService()
        menu(project_manager_service)
    except KeyboardInterrupt:
        print("\n\nSaindo...")


if __name__ == "__main__":
    main()
