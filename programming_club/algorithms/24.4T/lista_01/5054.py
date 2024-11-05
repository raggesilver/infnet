count = int(input())

for _ in range(count):
    word = input()
    size = len(word)

    if size > 10:
        word = word[0] + str(size - 2) + word[-1]

    print(word)
