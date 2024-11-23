from common import read_int


def main():
    a = read_int("Digite um número inteiro: ")
    b = read_int("Digite outro número inteiro: ")

    res = (a + b) / 2
    print(f"A média entre {a} e {b} é {res}")


if __name__ == "__main__":
    main()
