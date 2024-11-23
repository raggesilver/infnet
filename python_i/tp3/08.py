def count_vowels(s: str) -> int:
    return sum(1 for c in s.lower() if c in "aeiou")


def main():
    s = input()
    vowels = count_vowels(s)
    print(f"{vowels} vogais")


if __name__ == "__main__":
    main()
