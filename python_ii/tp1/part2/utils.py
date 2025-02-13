from typing import Callable, Literal, Tuple

from colors import TerminalTextStyle
from tabulate import tabulate

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


def clear_terminal():
    """
    Clear the terminal screen.
    """
    import os

    if os.name == "nt":
        os.system("cls")
    else:
        print("\033[H\033[J", end="")


def present_menu(menu: dict[int, str], clear=False) -> int:
    """
    Present a menu to the user and return the selected option.

    Args:

    - menu (dict): A dictionary with the options of the menu. The keys should
      be the options and the values should be the descriptions.
    """

    while True:
        if clear:
            clear_terminal()

        print("Escolha uma opção:\n")
        for option, description in menu.items():
            print(f"{option}: {description}")

        try:
            option = int(input("\nOpção: "))
            return next(k for k, _ in menu.items() if k == option)
        except StopIteration:
            print("Opção inválida.")
        except ValueError:
            print("Entrada inválida.")

        if clear:
            input("Pressione enter para continuar...")


def format_error(e: Exception):
    return f"{TerminalTextStyle.BOLD_RED.value}{e}{TerminalTextStyle.RESET.value}"
