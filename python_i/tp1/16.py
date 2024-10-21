from common import get_int

num = get_int("Digite um número: ")

print(f"{num} é {num % 2 == 0 and 'par' or 'ímpar'}")
