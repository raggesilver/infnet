class Task:
    """
    A class representing a task.

    Attributes:
    - name: The name of the task.
    - done: A boolean indicating whether the task is done or not.
    """

    __id = 0

    def __init__(self, name: str):
        self.name = name
        self.done = False
        Task.__id += 1
        self.id = Task.__id

    def __str__(self):
        return f"{self.id}: {self.name}{' - ✅' if self.done else ''}"

    def mark_done(self, is_done=True):
        """
        Mark the task as done or not done.

        :param is_done: True if the task is done, False otherwise. Defaults to
        True.
        """
        self.done = is_done
