def is_palindrome(s: str) -> bool:
    """
    Check if the given word is a palindrome.
    """
    return s == s[::-1]


def main():
    word = input("Digite uma palavra: ").strip()
    print("É um palíndromo." if is_palindrome(word) else "Não é um palíndromo.")


if __name__ == "__main__":
    main()
