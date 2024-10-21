text = input("Digite uma palavra ou frase: ")

print(f"'{text}' {text[::-1] == text and 'é' or 'não é'} um palíndromo.")
