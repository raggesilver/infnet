list1 = [1, 2, 3, 4, 5, 6, 7, 8]
list2 = [10, 20, 30, 40, 50, 60, 70, 80]

result = [a + b for a, b in zip(list1, list2)]

print(result)
