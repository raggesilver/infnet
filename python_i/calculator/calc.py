def get_number(prompt: str = "Enter a number") -> int:
    try:
        return int(input(prompt))
    except ValueError:
        print("Invalid number")
        return get_number(prompt)


a = get_number("Enter first number: ")
opr = input("Enter operator (+, -, *, /): ")
b = get_number("Enter second number: ")

match opr:
    case "+":
        print(f"{a} + {b} = {a + b}")
    case "-":
        print(f"{a} - {b} = {a - b}")
    case "*":
        print(f"{a} * {b} = {a * b}")
    case "/":
        if b == 0:
            print("Division by zero")
        else:
            print(f"{a} / {b} = {a / b}")
    case _:
        print("Invalid operator")
