namespace TP1;

public class Exercise11 : IExercise
{
  public int Number => 11;
  public string Name => "Tabuada Interativa";

  public void Run(string[] args)
  {
    var numero = Utils.ReadInt("Digite um número para ver sua tabuada: ");

    Console.WriteLine($"\nTabuada do {numero}:");

    for (var i = 1; i <= 10; i++)
      Console.WriteLine($"{numero} x {i} = {numero * i}");
  }
}
