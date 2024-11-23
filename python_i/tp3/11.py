import re

CPF_REGEX = r"^(\d{3})(\d{3})(\d{3})(\d\d)$"


def prompt_cpf() -> str:
    """
    Prompt the user for a valid CPF.
    """
    while True:
        cpf = input("Digite o CPF: ")
        if re.match(CPF_REGEX, cpf):
            return cpf
        print("Digite um CPF válido.")


def format_cpf(cpf: str) -> str:
    """
    Format a CPF string.
    """
    return re.sub(CPF_REGEX, r"\1.\2.\3-\4", cpf)


def main():
    cpf = prompt_cpf()
    print(format_cpf(cpf))


if __name__ == "__main__":
    main()
