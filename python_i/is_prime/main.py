from math import sqrt


def is_prime(n: int | float) -> bool:
    div = 2
    max = sqrt(n)
    while div <= max:
        if n % div == 0:
            return False
        div += 1
    return True


print(f"Is 1 prime? {is_prime(1)}")
print(f"Is 2 prime? {is_prime(2)}")
print(f"Is 10 prime? {is_prime(10)}")
print(f"Is 11 prime? {is_prime(11)}")
print(f"Is 12 prime? {is_prime(12)}")
print(f"Is 13 prime? {is_prime(13)}")
print(f"Is 15 prime? {is_prime(15)}")
