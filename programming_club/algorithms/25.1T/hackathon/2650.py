n, w = [int(x) for x in input().split(" ")]

titans = []
for _ in range(n):
    name, height = input().rsplit(" ", 1)
    height = int(height)

    if height > w:
        titans.append(name)


if len(titans) > 0:
    print(*titans, sep="\n")
