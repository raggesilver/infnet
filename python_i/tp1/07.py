def get_number(msg="Digite um número: ") -> float:
    while True:
        try:
            return float(input(msg))
        except ValueError:
            print("Número inválido.")
            continue


def get_bmi_category(bmi: float) -> str:
    if bmi < 18.5:
        return "Abaixo do peso"
    elif bmi < 24.9:
        return "Peso normal"
    elif bmi < 29.9:
        return "Sobrepeso"
    elif bmi < 34.9:
        return "Obesidade grau 1"
    elif bmi < 39.9:
        return "Obesidade grau 2"
    return "Obesidade grau 3"


weight = get_number("Digite o seu peso (kg): ")
height = get_number("Digite a sua altura (m): ")

bmi = weight / height**2

print(f"Seu IMC é {bmi:.2f}. Sua categoria é: {get_bmi_category(bmi)}")
