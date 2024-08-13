from datetime import datetime


def read_date():
    day, month = map(int, input("").split())
    year = 2023
    return datetime(year, month, day)


date1 = read_date()
date2 = read_date()

difference = (date2 - date1).days

print(abs(difference))
