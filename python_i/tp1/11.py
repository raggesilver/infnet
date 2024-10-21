from random import randrange
from common import get_int

count = get_int("Quantos dados você quer lançar? ")

for _ in range(count):
    print(randrange(1, 7), end=" ")
