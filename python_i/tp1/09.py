from common import get_float


def get_discount(amount: float) -> float:
    if amount < 100:
        return 0
    elif amount < 200:
        return amount * 0.1
    elif amount < 300:
        return amount * 0.15
    elif amount < 400:
        return amount * 0.2
    return amount * 0.25


amount = get_float("Digite o valor da compra: ")

print(f"O desconto é de R$ {get_discount(amount):.2f}")
