from math import sqrt
from common import read_int


def is_prime(n: int | float) -> bool:
    """
    Check if a number is prime.
    """
    div = 2
    max = sqrt(n)
    while div <= max:
        if n % div == 0:
            return False
        div += 1
    return True


def main():
    a = read_int("Digite o primeiro número: ")
    b = read_int("Digite o segundo número: ")

    primes: list[int] = []

    for n in range(a, b + 1):
        if is_prime(n):
            primes.append(n)

    print(*primes, sep=", ")
    print(f"{len(primes)} números primos encontrados entre {a} e {b}")


if __name__ == "__main__":
    main()
