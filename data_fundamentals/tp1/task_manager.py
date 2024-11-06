from task import Task


class TaskManager:
    """
    A class representing a task manager. This is used to manage an internal
    list of tasks.
    """

    __tasks: list[Task] = []

    def __init__(self) -> None:
        pass

    def add_task(self, task: Task) -> None:
        """
        Add a task to the task manager.

        :param task: The task to add.
        """

        self.__tasks.append(task)

    def get_task_by_id(self, id: int) -> Task | None:
        """
        Get a task by its ID.

        :param id: The ID of the task to get.
        :return: The task with the given ID, or None if it does not exist.
        """

        for task in self.__tasks:
            if task.id == id:
                return task
        return None

    def get_all_tasks(self) -> list[Task]:
        """
        Get all tasks in the task manager.

        :return: A list of all tasks.
        """

        return self.__tasks[:]  # Return a copy of the list

    def remove_task_by_id(self, task_id: int) -> bool:
        """
        Remove a task by its ID.

        :param task_id: The ID of the task to remove.
        :return: True if the task was removed, False otherwise
        """

        for task in self.__tasks:
            if task.id == task_id:
                self.__tasks.remove(task)
                return True
        return False
