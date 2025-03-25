CHARS = "ABCDEF"

while (n := int(input())) > 0:
    for i in range(n):
        line = input()
        nums = [int(x) for x in line.split(" ")]
        answer = None

        for i, a in enumerate(nums):
            if a <= 127:
                if answer is None:
                    answer = i
                else:
                    answer = None
                    break

        print(CHARS[answer] if answer is not None else "*")
