def simultaneous_guests(checkins: list[int], checkouts: list[int]) -> int:
    stays = {}

    for i in range(len(checkins)):
        checkin = checkins[i]
        checkout = checkouts[i]

        for hour in range(checkin, checkout):
            if hour in stays:
                stays[hour] += 1
            else:
                stays[hour] = 1

    return max(stays.values())


input()

checkins = list(map(int, input().split(" ")))
checkouts = list(map(int, input().split(" ")))

print(simultaneous_guests(checkins, checkouts))
