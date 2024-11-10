def fact(n: int) -> int:
    """
    Calculate the factorial of n.
    """
    if n < 2:
        return 1
    acc = n
    for num in range(n - 1, 1, -1):
        acc *= num
    return acc


def main():
    try:
        nums = map(
            int,
            input(
                "Entre com uma sequência de inteiros positivos separados por espaço: "
            ).split(),
        )
        # Keep only zero and positive numbers
        nums = [n for n in nums if n >= 0]

        for n in nums:
            print(f"Fatorial de {n} é {fact(n)}")
    except Exception as _:
        print("Entrada inválida.")


if __name__ == "__main__":
    main()
