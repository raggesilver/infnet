no_cards = int(input())

piles = list(map(lambda x: [x], map(int, input().split())))

while True:
    changed_something = False

    for i in range(1, len(piles)):
        print(piles)
        if len(piles[i - 1]) != 1:
            continue
        if piles[i - 1][0] == piles[i][0]:
            piles[i].insert(0, piles[i - 1][0])
            del piles[i - 1]
            changed_something = True
            break
        pass

    if not changed_something:
        break

while True:
    changed_something = False

    for i in range(1, len(piles)):
        print(piles)
        if len(piles[i - 1]) != 1:
            continue
        if piles[i - 1][0] > piles[i][0]:
            piles[i].insert(0, piles[i - 1][0])
            del piles[i - 1]
            changed_something = True
            break
        pass

    if not changed_something:
        break

print(len(piles))
print(piles)
