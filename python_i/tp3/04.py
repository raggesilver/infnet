import re


def prompt_valid_date() -> str:
    """
    Prompt the user to input a valid date. Keep prompting until a valid one is
    entered.
    """
    while date := input("Digite uma data (DD/MM/AAAA): "):
        reg = r"^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/[0-9]{4}$"

        if re.match(reg, date):
            break

        print("Data inválida. Por favor, digite uma data no formato DD/MM/AAAA.")

    return date


def main():
    date = prompt_valid_date()
    day, month, year = (int(x) for x in date.split("/"))
    print(f"Dia: {day}\nMês: {month}\nAno: {year}")


if __name__ == "__main__":
    main()
