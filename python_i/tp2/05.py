from common import read_int


# The exercise didn't specify how long the PA should be, so we'll use a constant
PA_LIMIT = 20


def main():
    a = read_int("Digite o primeiro número: ")
    b = read_int("Digite o segundo número: ")

    pa_constant = b - a

    last = a
    for _ in range(PA_LIMIT):
        print(last, end=" ")
        last += pa_constant

    print()


if __name__ == "__main__":
    main()
