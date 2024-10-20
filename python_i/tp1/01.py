def get_number(msg="Digite um número: ") -> int:
    while True:
        try:
            return int(input(msg))
        except ValueError:
            print("Número inválido.")
            continue


a = get_number()
b = get_number()

print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} * {b} = {a * b}")
print("Divisão por zero." if b == 0 else f"{a} / {b} = {a / b}")
print("Divisão por zero." if b == 0 else f"{a} / {b} = {a // b} (divisão inteira)")
