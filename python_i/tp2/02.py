from common import read_int


def main():
    a = read_int("Digite o primeiro número: ")
    b = read_int("Digite o segundo número: ")

    mean = (a + b) / 2

    print(f"A média entre {a} e {b} é {mean}")


if __name__ == "__main__":
    main()
