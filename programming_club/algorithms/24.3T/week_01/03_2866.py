# https://judge.beecrowd.com/en/runs/code/41389606


def main():
    count = int(input())
    for _ in range(count):
        code = input()
        decoded = [char for char in list(code) if char.islower()]
        decoded.reverse()
        print("".join(decoded))
    pass


if __name__ == "__main__":
    main()
