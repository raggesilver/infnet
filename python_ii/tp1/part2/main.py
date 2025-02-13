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


def list_employees(project_manager_service: ProjectManagerService):
    EXIT_OPTION = 6
    options = {
        1: "Listar funcionários do projeto 1",
        2: "Listar funcionários do projeto 2",
        3: "Listar funcionários em ambos os projetos",
        4: "Listar funcionários em apenas um projeto",
        5: "Listar todos os funcionários",
        EXIT_OPTION: "Voltar",
    }

    while (option := present_menu(options, True)) != EXIT_OPTION:
        employees = []
        match option:
            case 1:
                employees = project_manager_service.list_employees_in_project(1)
            case 2:
                employees = project_manager_service.list_employees_in_project(2)
            case 3:
                employees = project_manager_service.list_employees_in_both(1, 2)
            case 4:
                employees = project_manager_service.list_employees_in_only_one_project()
            case 5:
                employees = project_manager_service.list_all_employees()

        print(f"\nFuncionários:\n\n{'\n'.join(employees)}")

        input("\nPressione Enter para continuar...")


def menu(project_manager_service: ProjectManagerService):
    EXIT_OPTION = 5
    options = {
        1: "Adicionar funcionário a um projeto",
        2: "Remover funcionário de um projeto",
        3: "Listar projetos",
        4: "Listar funcionários",
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
                list_employees(project_manager_service)

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
