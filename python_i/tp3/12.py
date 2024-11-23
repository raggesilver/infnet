def reverse_str(s: str) -> str:
    """
    Reverse a string using a for loop.
    """
    res = [*s]
    strlen = len(res)

    for i in range(strlen // 2):
        res[i], res[strlen - i - 1] = res[strlen - i - 1], res[i]

    return str.join("", res)


def main():
    s = input("Digite algo: ")

    print(reverse_str(s))


if __name__ == "__main__":
    main()
