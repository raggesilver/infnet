import re


def get_formatted_phone_number() -> str:
    """
    Get a phone number from the user and return it in the format
    '(XX) XXXXX-XXXX'.
    """
    pattern = r"^(\d\d)(\d{5})(\d{4})$"
    while True:
        s = input("Digite o número de telefone: ")

        if _match := re.match(pattern, s):
            ddd, first, second = _match.groups()
            return f"({ddd}) {first}-{second}"

        print("Número de telefone inválido.")


def main():
    phone_number = get_formatted_phone_number()
    print(phone_number)


if __name__ == "__main__":
    main()
