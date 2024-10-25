case_count = 1
while True:
    try:
        looking_for = int(input())
        pairs = input().split()

        found_count = 0
        found_m = 0
        found_f = 0

        for i in range(0, len(pairs), 2):
            size = int(pairs[i])
            sex = pairs[i + 1]

            if size == looking_for:
                found_count += 1
                if sex == "M":
                    found_m += 1
                else:
                    found_f += 1

        if case_count > 1:
            print()
        print("Caso {}:".format(case_count))
        print(f"Pares Iguais: {found_count}")
        print(f"F: {found_f}")
        print(f"M: {found_m}")
        case_count += 1
    except EOFError:
        break
