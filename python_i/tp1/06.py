from random import random
from math import floor

MIN = 1
MAX = 100


def gen_random() -> int:
    return floor(random() * MAX) + MIN


def get_number(msg="Digite um número: ") -> int:
    while True:
        try:
            return int(input(msg))
        except ValueError:
            print("Número inválido.")
            continue


def main():
    while True:
        num = gen_random()

        while True:
            guess = get_number(f"Digite um número entre {MIN} e {MAX}: ")
            if guess == num:
                print("Parabéns! Você acertou!")
                break
            elif guess < num:
                print("Tente mais alto.")
            else:
                print("Tente mais baixo.")

        if input("Jogar novamente? (s/n): ").lower() != "s":
            break


def intro():
    print(
        "Vamos jogar um jogo! Eu vou pensar em um número entre 1 e 100 e você vai tentar adivinhar.\n"
    )


intro()
main()
