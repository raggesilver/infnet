no_cards = int(input())

piles = list(map(lambda x: [x], map(int, input().split())))

i = len(piles) - 2
while i >= 0:
    if len(piles[i]) != 1:
        i -= 1
        continue

    if piles[i][0] >= piles[i + 1][0]:
        piles[i + 1].insert(0, piles[i][0])
        del piles[i]

    i -= 1

print(len(piles))
