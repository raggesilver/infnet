def is_valid_full_name(name: str) -> bool:
    """
    Check if the given full name has two parts (first and last name) and each
    part has at least two characters.
    """
    names = name.split()

    return len(names) == 2 and all(len(name) >= 2 for name in names)


def main():
    while name := input("Digite seu nome e sobrenome: "):
        is_valid = is_valid_full_name(name)
        if is_valid:
            print(f"Nome válido: {name}")
            break

        print(
            "Nome inválido. Digite somente o primeiro e último nome. Cada nome deve ter pelo menos 2 caracteres."
        )


if __name__ == "__main__":
    main()
