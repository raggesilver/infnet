// See https://aka.ms/new-console-template for more information

namespace TP3;

internal static class Program
{
  private static readonly IExercise[] Exercises =
  [
    new Exercise01(),
    new TheoreticalExercise("Criando a Classe \"Ingresso\"",
      "Dê uma olhada no arquivo Ticket.cs"),
    new TheoreticalExercise("Métodos Básicos da Classe \"Ingresso\"",
      "Dê uma olhada no arquivo Ticket.cs"),
    new Exercise04()
  ];

  private static void Main(string[] args)
  {
    var alignWidth = Exercises.Length.ToString().Length;

    while (true)
    {
      Console.WriteLine("TP 3 — Paulo Queiroz\n");

      for (var i = 0; i < Exercises.Length; i++)
        Console.WriteLine(
          $"{(i + 1).ToString().PadLeft(alignWidth)}. {Exercises[i].Name}");
      Console.WriteLine($"{"0".PadLeft(alignWidth)}. Sair");

      var option = Utils.ReadInt(
        "\nDigite o número do exercício que deseja executar: ",
        $"Exercícios válidos de 1 à {Exercises.Length}", i =>
          (i >= 0 && i <= Exercises.Length, null));

      if (option == 0) break;

      Exercises[option - 1].Run(args);

      Console.WriteLine("\nPressione ENTER para continuar...");
      Console.ReadLine();
      Console.WriteLine("\n");
    }
  }
}
