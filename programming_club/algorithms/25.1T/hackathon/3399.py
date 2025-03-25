try:
    while True:
        a, b, c, d = [int(x) for x in input().split(" ")]

        # a, b and c are a sequence. get the diff
        diff = b - a
        diff2 = c - b

        if diff == diff2:
            # easy, get d-th element
            print(a + (d - 1) * diff)
        else:
            # geometric progression
            ratio = b // a
            print(a * ratio ** (d - 1))
except EOFError:
    pass
