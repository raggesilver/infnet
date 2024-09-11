from typing import Generic, List, TypeVar

T = TypeVar("T")


class Qeueue(Generic[T]):
    """
    A simple, generic queue implementation using a list.
    """

    def __init__(self):
        self.__items: List[T] = []

    def enqueue(self, item: T) -> None:
        """
        Add an item to the end of the queue
        """
        self.__items.append(item)

    def dequeue(self) -> T | None:
        """
        Remove an item from the front of the queue and return it. If the queue
        is empty, return None
        """
        if not self.is_empty():
            return self.__items.pop(0)
        else:
            return None

    def is_empty(self) -> bool:
        """
        Return True if the queue is empty, False otherwise
        """
        return len(self.__items) == 0


q = Qeueue[str]()

q.enqueue("Anna")
q.enqueue("Bob")

print(q.dequeue())  # Anna
print(q.dequeue())  # Bob
print(q.dequeue())  # None
