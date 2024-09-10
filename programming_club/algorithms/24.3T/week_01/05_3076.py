# https://judge.beecrowd.com/en/runs/code/41392760


def main():
    while True:
        try:
            year = int(input())
            century = year // 100 + (1 if year % 100 else 0)
            print(century)
        except EOFError:
            break


if __name__ == "__main__":
    main()
