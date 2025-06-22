namespace AT;

public class Exercise02 : IExercise
{
  public string Name => "Manipulação de Strings - Cifrador de Nome";

  public void Run(string[] args)
  {
    var name = Utils.ReadNonEmptyString("Digite seu nome: ");
    var letters = name.ToCharArray();

    for (var i = 0; i < letters.Length; i++)
      // Only convert a-z (and A-Z). Letters with accents remain unchanged.
      if (char.IsAsciiLetter(letters[i]))
      {
        var baseChar = char.IsUpper(letters[i]) ? 'A' : 'a';
        letters[i] = (char)(baseChar + (letters[i] - baseChar + 2) % 26);
      }

    var updatedName = new string(letters);
    Console.WriteLine(updatedName);
  }
}
