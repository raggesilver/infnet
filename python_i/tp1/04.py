from typing import Literal, Callable

ValidOpr = Literal["+", "-", "*", "/"]


def get_opr() -> ValidOpr:
    while True:
        opr = input("Digite o operador (+, -, *, /): ")
        # opr in "+-*/" doesn't work with the return type
        if opr == "+" or opr == "-" or opr == "*" or opr == "/":
            return opr
        print("Operador inválido.")


def get_number(msg="Digite um número: ") -> int:
    while True:
        try:
            return int(input(msg))
        except ValueError:
            print("Número inválido.")
            continue


OPERATION: dict[ValidOpr, Callable[[int, int], float]] = {
    "*": lambda x, y: x * y,
    "/": lambda x, y: x / y,
    "+": lambda x, y: x + y,
    "-": lambda x, y: x - y,
}

opr = get_opr()
a = get_number()
b = get_number()

if b == 0 and opr == "/":
    print("Divisão por zero.")
else:
    print(f"{a} {opr} {b} = {OPERATION[opr](a, b)}")
