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
    new Exercise04(),
    new Exercise05(),
    new Exercise06(),
    new TheoreticalExercise("Modelando uma Matrícula",
      "Dê uma olhada no arquivo Matricula.cs"),
    new TheoreticalExercise("Criando Métodos na Classe de Matrícula",
      "Dê uma olhada no arquivo Matricula.cs"),
    new Exercise09(),
    new TheoreticalExercise("Definindo Classes de Formas Geométricas",
      "Dê uma olhada nos arquivos Circle.cs e Sphere.cs"),
    new TheoreticalExercise("Criando Métodos de Cálculo",
      "Dê uma olhada nos métodos para calcular área e volume nos arquivos Circle.cs e Sphere.cs"),
    new Exercise12()
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
