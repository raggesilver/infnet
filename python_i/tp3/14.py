def main():
    s = input("Digite algo: ")

    first = s[:5]
    last = s[-5:]

    print(f"Cinco primeiros: {first}")
    print(f"Cinco últimos: {last}")


if __name__ == "__main__":
    main()
