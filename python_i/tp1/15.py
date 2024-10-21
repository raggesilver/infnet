from common import get_yes_or_no

total = 0


if get_yes_or_no("Chá ou café?", default="cafe", yes="cafe", no="cha"):
    total += 2
    print("Café ☕️")
else:
    total += 2
    print("Errou. Café ☕️")

if get_yes_or_no("Frango ou carne?", default="frango", yes="frango", no="carne"):
    total += 5
    print("Frango 🍗")
else:
    total += 8
    print("Carne 🥩")

print(f"Total: R${total:.2f}")

if total >= 10:
    print("Você ganhou um chocolate de sobremesa 🍫")
