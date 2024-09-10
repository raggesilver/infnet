# https://judge.beecrowd.com/en/runs/code/41390489


def main():
    while True:
        try:
            count = int(input())
            high_avg = 0
            for i in range(count):
                time, distance = map(int, input().split())
                current_avg = distance / time
                if current_avg > high_avg:
                    high_avg = current_avg
                    print(i + 1)
        except EOFError:
            break


if __name__ == "__main__":
    main()
