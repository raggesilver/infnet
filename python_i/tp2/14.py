from common import read_int


def is_valid_number(n: int):
    return (False, "O número deve ser maior ou igual a 0.") if n < 0 else (True, None)


def main():
    n = read_int(
        "Digite um número inteiro maior ou igual a 0: ",
        validation_fn=is_valid_number,
    )

    print(f"Você digitou o número {n}.")


if __name__ == "__main__":
    main()
