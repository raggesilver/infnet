from random import choice

CHARACTERS = [
    "Goku",
    "Harry Potter",
    "Sherlock Holmes",
    "Capitão Nascimento",
]

ACTIONS = [
    "comprou pão",
    "tomou café",
    "fez um bolo",
    "derrotou um vilão",
    "fez um churrasco",
]

PLACES = [
    "no açougue",
    "na padaria",
    "na casa do vizinho",
    "no torneio pelo universo 7",
    "no churrasco do Zé",
    "na casa da mãe Joana",
    "no shopping",
]

print(f"{choice(CHARACTERS)} {choice(ACTIONS)} {choice(PLACES)}")
