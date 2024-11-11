from typing import Any
from common import read_int


def read_list() -> list[int]:
    numbers: list[int] = []
    while (num := read_int("Digite um número: ")) != 0:
        numbers.append(num)
    return numbers


def print_reverse_list(lst: list[Any]):
    print(lst[::-1])


def main():
    numbers = read_list()
    print_reverse_list(numbers)


if __name__ == "__main__":
    main()
