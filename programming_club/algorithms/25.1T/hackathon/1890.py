t = int(input())
for _ in range(t):
    line = input()
    [consonants, nums] = [int(x) for x in line.split(" ")]

    possibilities = (26**consonants) * (10**nums)

    print(possibilities if consonants + nums > 0 else 0)
