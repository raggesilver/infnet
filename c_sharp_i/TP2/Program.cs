// See https://aka.ms/new-console-template for more information


namespace TP2;

internal static class Program
{
  private static readonly IExercise[] Exercises =
  [
    new Exercise1(),
    new Exercise2(),
    new Exercise3(),
    new Exercise4(),
    new Exercise5(),
    new Exercise6(),
    new Exercise7(),
    new Exercise8(),
    new Exercise9(),
    new Exercise10(),
    new Exercise11(),
    new Exercise12()
  ];

  private static void Main(string[] args)
  {
    while (true)
    {
      Console.WriteLine("TP1 — Paulo Queiroz\n\nEscolha algum dos exercícios:");

      var width = Exercises.Length.ToString().Length;
      for (var i = 0; i < Exercises.Length; i++)
        Console.WriteLine(
          $"{(i + 1).ToString().PadLeft(width)}) {Exercises[i].Name}");
      Console.WriteLine($"{"0".PadLeft(width)}) Sair");

      var exerciseNumber =
        Utils.ReadInt("\nDigite o número do exercício que deseja executar: ",
          $"Exercícios válidos de 1 à {Exercises.Length}", i =>
            (i >= 0 && i <= Exercises.Length, null));

      if (exerciseNumber == 0) break;

      Exercises[exerciseNumber - 1].Run(args);

      Console.WriteLine("\nPressione ENTER para continuar...");
      Console.ReadLine();
      Console.WriteLine("\n");
    }
  }
}
