iter = 0
while True:
    try:
        if iter > 0:
            input()
        puppies_count = int(input())
        suitable = 0

        for i in range(puppies_count):
            if i > 0:
                input()

            species = input()
            breed = input()
            name = input()

            if species != 'cachorro':
                continue

            if len(name.split()) <= 1:
                continue

            if any(parts[0] == breed[0] for parts in name.split()):
                suitable += 1

        print(suitable)
    except EOFError:
        break
    finally:
        iter += 1
