import re


def is_valid_date(day: int, month: int, year: int) -> bool:
    """
    Check if a date is valid.
    """
    match month:
        case 1 | 3 | 5 | 7 | 8 | 10 | 12:
            return 1 <= day <= 31
        case 4 | 6 | 9 | 11:
            return 1 <= day <= 30
        case 2:
            # Leap years have 29 days in February.
            if year % 4 == 0 and (year % 100 != 0 or year % 400 == 0):
                return 1 <= day <= 29
            return 1 <= day <= 28
        case _:
            return False


def prompt_date() -> str:
    """
    Prompt the user to input a well-formatted date. Keep prompting until a valid
    one is entered.
    """
    while date := input("Digite uma data (DD/MM/AAAA): "):
        reg = r"^\d{2}/\d{2}/\d{4}$"

        if re.match(reg, date):
            break

        print("Data inválida. Por favor, digite uma data no formato DD/MM/AAAA.")

    return date


def main():
    date = prompt_date()
    day, month, year = (int(x) for x in date.split("/"))
    print("Data válida." if is_valid_date(day, month, year) else "Data inválida.")


if __name__ == "__main__":
    main()
