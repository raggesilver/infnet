from functools import cmp_to_key


def compare(a: str, b: str):
    if a.lower() == b.lower():
        return 1 if a > b else -1

    return 1 if a.lower() > b.lower() else -1


n = int(input())

words = []
for _ in range(n):
    words.append(input())

words.sort(key=cmp_to_key(compare))

for word in words:
    print(word)
