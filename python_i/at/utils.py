from typing import Callable, Literal, Tuple


type ValidationFunction = Callable[
    [int], Tuple[Literal[True], None] | Tuple[Literal[False], str]
]


def read_int(
    message: str = "Digite um número inteiro: ",
    validation_fn: ValidationFunction | None = None,
) -> int:
    """
    Read an integer from the user.

    This function will keep asking for input until a valid integer is entered.
    If you provide a validation function, it will be used to check if the
    integer is valid. The validation function should return a tuple with a
    boolean indicating if the integer is valid and an error message if it is
    not.

    Args:

    - message (str): The message to display to the user.
    - validation_fn (callable): A function that receives the integer and returns
      a tuple with a boolean indicating if the integer is valid and an error
      message if it is not.
    """
    while True:
        try:
            n = int(input(message))

            if validation_fn is not None:
                valid, error_message = validation_fn(n)
                if not valid:
                    print(error_message)
                    continue

            return n

        except ValueError:
            print("Entrada inválida.")
