# This function is extremely simple. A much more complex approach could be taken
# by dabbind into platform-specific APIs and reading the input directly from the
# terminal (no new line required). Since this is a simple exercise I will not
# implement that.
def read_char() -> str:
    """
    Read a single character from the user.
    """
    return input("Entre com um caractere: ")[0]


def main():
    vowels = 0
    while (char := read_char()) != ".":
        if char in "aeiou":
            vowels += 1
    print(f"Número de vogais: {vowels}")


if __name__ == "__main__":
    main()
