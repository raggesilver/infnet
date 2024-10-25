from math import factorial

height, width = map(int, input().split())

grid = [list(map(lambda x: x == "#", input())) for _ in range(height)]

while True:
    try:
        sy, sx, ey, ex = map(lambda x: int(x) - 1, input().split())

        walls = 0
        for y in range(sy, ey + 1):
            for x in range(sx, ex + 1):
                if grid[y][x]:
                    walls += 1

        selected_width = ex - sx + 1
        selected_height = ey - sy + 1

        positions = selected_width * selected_height
        wall_permutations = factorial(positions) // (
            factorial(positions - walls) * factorial(walls)
        )

        res = wall_permutations % (10**9 + 7) - 1
        print(res)

        pass
    except EOFError:
        break
