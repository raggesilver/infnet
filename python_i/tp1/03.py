def suggest_new_username(first: str, second: str) -> str:
    """
    Combine two usernames to form a new one. This implementation simply
    concatenates the two strings, alternating characters from each one. If one
    string is longer than the other, the remaining characters are appended to
    the end of the new string.
    """
    suggestion = ""
    for i in range(max(len(first), len(second))):
        if i < len(first):
            suggestion += first[i]
        if i < len(second):
            suggestion += second[i]
    return suggestion


first = input("Digite o primeiro nome de usuário: ")
second = input("Digite o segundo nome de usuário: ")

print(f"Nome sugerido: {suggest_new_username(first, second)}")
