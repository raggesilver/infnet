def get_float(msg="Digite um número: ") -> float:
    while True:
        try:
            return float(input(msg))
        except ValueError:
            print("Número inválido.")
            continue


def get_int(msg="Digite um número: ") -> int:
    while True:
        try:
            return int(input(msg))
        except ValueError:
            print("Número inválido.")
            continue
