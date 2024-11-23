def is_valid_full_name(name: str) -> bool:
    """
    Check if the given full name has two parts (first and last name) and each
    part has at least two characters.
    """
    names = name.split()

    return len(names) == 2 and all(len(name) >= 2 for name in names)


def prompt_valid_full_name() -> str:
    """
    Prompt the user to input a valid full name. Keep prompting until a valid
    full name is entered.
    """
    while name := input("Digite seu nome e sobrenome: "):
        is_valid = is_valid_full_name(name)
        if is_valid:
            break

        print(
            "Nome inválido. Digite somente o primeiro e último nome. Cada nome deve ter pelo menos 2 caracteres."
        )

    return name


def main():
    name = prompt_valid_full_name()
    first, last = name.split()
    print(f"{last.upper()}, {first.capitalize()}")


if __name__ == "__main__":
    main()
