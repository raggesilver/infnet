while True:
    try:
        a, b = map(int, input().split())
        if a > b:
            print("Decrescente")
        elif a < b:
            print("Crescente")
    except EOFError:
        break
