from common import read_int


def find_index(lst: list[int], elem: int) -> int:
    # Not allowed to use the built-in function
    # return lst.index(elem)

    for i, n in enumerate(lst):
        if n == elem:
            return i
    return -1


def main():
    lst = [20, 10, 30, 40, 60, 50, 70, 90, 80, 100]
    num = read_int("Digite um número: ")

    print(find_index(lst, num))


if __name__ == "__main__":
    main()
