def is_possible_to_adopt_same_set_of_animals(count: int, animals: list[str]) -> bool:
    if count % 2 != 0:
        return False

    animals_dict = {}

    for animal in animals:
        if animal in animals_dict:
            animals_dict[animal] += 1
        else:
            animals_dict[animal] = 1

    for key in animals_dict:
        if animals_dict[key] % 2 != 0:
            return False

    return True


count = int(input())
animals = input().split(" ")

print("YES" if is_possible_to_adopt_same_set_of_animals(count, animals) else "NO")
