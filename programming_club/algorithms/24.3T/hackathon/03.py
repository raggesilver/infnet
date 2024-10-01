import re

text = input()

pattern = r'(?:10)|(?:\d)'

result = re.findall(pattern, text)

mean = sum(map(int, result)) / len(result)

print(f"{mean:.2f}")
