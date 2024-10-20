def get_number(msg="Digite um número: ") -> int:
    while True:
        try:
            return int(input(msg))
        except ValueError:
            print("Número inválido.")
            continue


def mins_to_hours_and_mins(mins: int) -> tuple[int, int]:
    return mins // 60, mins % 60


def hours_and_mins_to_mins(hours: int, mins: int) -> int:
    return hours * 60 + mins


mins = get_number("Digite a quantidade de minutos: ")
hours, remaining_mins = mins_to_hours_and_mins(mins)
print(f"{mins} minutos são {hours} horas e {remaining_mins} minutos.")

hours = get_number("Digite a quantidade de horas: ")
mins = get_number("Digite a quantidade de minutos: ")

print(
    f"{hours} horas e {mins} minutos são {hours_and_mins_to_mins(hours, mins)} minutos."
)
