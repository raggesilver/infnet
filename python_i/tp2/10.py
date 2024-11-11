from common import read_int


def read_list() -> list[int]:
    numbers: list[int] = []
    while (num := read_int("Digite um número: ")) != 0:
        numbers.append(num)
    return numbers


def filter_at_or_above_average(lst: list[int]) -> list[int]:
    length = len(lst)
    if length == 0:
        return []
    avg = sum(lst) / length
    return [n for n in lst if n >= avg]


def print_list(lst: list[int]) -> None:
    print(lst)


def main():
    numbers = read_list()
    filtered = filter_at_or_above_average(numbers)
    print_list(filtered)


if __name__ == "__main__":
    main()
