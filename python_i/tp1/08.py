def get_number(msg="Digite um número: ") -> float:
    while True:
        try:
            return float(input(msg))
        except ValueError:
            print("Número inválido.")
            continue


age = get_number("Digite a sua idade: ")

print("Você é maior de idade." if age >= 18 else "Você é menor de idade.")
