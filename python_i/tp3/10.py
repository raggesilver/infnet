from common import read_int


def is_valid_weekday(n: int):
    if 1 <= n <= 7:
        return (True, None)
    return (False, "Dia da semana inválido.")


WEEKDAYS = (
    "Domingo",
    "Segunda feira",
    "Terça feira",
    "Quarta feira",
    "Quinta feira",
    "Sexta feira",
    "Sábado",
)


def main():
    n = read_int("Digite um dia da semana (1-7): ", is_valid_weekday)

    print(WEEKDAYS[n - 1])


if __name__ == "__main__":
    main()
