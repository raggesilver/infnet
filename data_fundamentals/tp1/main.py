from task_manager import TaskManager
from task import Task
from constants import banners, menu_options


def prompt_valid_int(prompt: str) -> int:
    while True:
        try:
            return int(input(prompt))
        except ValueError:
            print("Invalid input. Please enter a number.")


def clear_terminal() -> None:
    print("\033[H\033[J", end="")


def print_menu() -> None:
    print(banners["task_manager"])
    for num, option in menu_options.items():
        print(f"{num}: {option}")
    print()


def list_tasks(manager: TaskManager) -> None:
    clear_terminal()
    print(banners["all_tasks"])

    tasks = manager.get_all_tasks()
    if len(tasks) == 0:
        print("\nNo tasks.\n")
    else:
        for task in tasks:
            print(task)


def add_task(manager: TaskManager) -> None:
    clear_terminal()
    print(banners["add_task"])

    name = input("Enter the task name: ")
    task = Task(name)
    manager.add_task(task)
    print(f"Task added. ID: {task.id}")


def remove_task(manager: TaskManager) -> None:
    clear_terminal()
    print(banners["remove_task"])

    for task in manager.get_all_tasks():
        print(task)

    print()

    task_id = prompt_valid_int("Which task would you like to delete? ")
    if manager.remove_task_by_id(task_id):
        print("Task removed.")
    else:
        print("Task not found.")


def mark_task_as_done(manager: TaskManager) -> None:
    clear_terminal()
    print(banners["mark_task"])

    tasks = manager.get_all_tasks()

    if len(tasks) == 0:
        print("No tasks.")
        return

    for task in tasks:
        print(task)

    print()

    task_id = prompt_valid_int("Which task would you like to mark as done? ")
    task = manager.get_task_by_id(task_id)

    if task is not None:
        task.mark_done(not task.done)
        print("Task marked as " + ("done." if task.done else "not done."))
    else:
        print("Task not found.")


def main() -> None:
    manager = TaskManager()

    clear_terminal()

    try:
        while True:
            print_menu()
            option = input()
            match option:
                case "1":
                    add_task(manager)
                case "2":
                    remove_task(manager)
                case "3":
                    mark_task_as_done(manager)
                case "4":
                    list_tasks(manager)
                case "q":
                    print("\nGoodbye!\n")
                    break
                case _:
                    print("Invalid option")

            print("\nPress Enter to continue...")
            input()
            clear_terminal()
    except EOFError:
        print("\nGoodbye! (Ctrl+D)\n")
    except KeyboardInterrupt:
        print("\nGoodbye! (Ctrl+C)\n")


if __name__ == "__main__":
    main()
