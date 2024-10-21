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


def get_yes_or_no(msg: str, default=None, yes: str = "s", no: str = "n") -> bool:
    while True:
        options = f"({yes.upper() if default == yes else yes}/{no.upper() if default == no else no})"
        answer = input(f"{msg} {options}: ").strip().lower()
        if not answer:
            answer = default
        if answer == yes:
            return True
        elif answer == no:
            return False
        else:
            print("Resposta inválida.")
            continue
