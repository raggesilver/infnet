def is_even(n: int | float) -> bool:
    return n % 2 == 0


lst = [10, 2, 30, 4, 50, 6, 70, 8, 9, 1]

even_lst = [i for i in lst if is_even(i)]
odd_lst = [i for i in lst if not is_even(i)]

print(even_lst)
print(odd_lst)
