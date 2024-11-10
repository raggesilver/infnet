def read_int(message: str = "Digite um número inteiro: ") -> int:
    """
    Read an integer from the user.

    This function will keep asking for input until a valid integer is entered.
    """
    while True:
        try:
            return int(input(message))
        except ValueError:
            print("Entrada inválida.")
