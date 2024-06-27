# read a number from input
n = int(input())

# read a list of n numbers from input
numbers = list(map(int, input().split()))

# each number in the list represents the height of a building in the same street
# we want to find the longest distance between two buildings, including the
# distance it takes from a person to get down from one building and go up to the
# other building as well as the distance between the two buildings

max_distance = 0

# iterate over all combinations of two buildings
for i in range(n):
    for j in range(i + 1, n):
        # calculate the distance between the two buildings
        distance = numbers[i] + numbers[j] + abs(i - j)
        # if the distance is greater than the current max_distance, update it
        if distance > max_distance:
            max_distance = distance

print(max_distance)
