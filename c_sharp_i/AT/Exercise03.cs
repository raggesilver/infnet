namespace AT;

public class Exercise03 : IExercise
{
  public string Name => "Calculadora de Operações Matemáticas";

  public void Run(string[] args)
  {
    // Get first number
    var num1 = Utils.ReadFloat("Digite o primeiro número: ");

    // Get second number
    var num2 = Utils.ReadFloat("Digite o segundo número: ");

    // Display operations menu
    Console.WriteLine("\nEscolha a operação:");
    Console.WriteLine("1. Soma");
    Console.WriteLine("2. Subtração");
    Console.WriteLine("3. Multiplicação");
    Console.WriteLine("4. Divisão");

    // Get operation choice with validation for 1-4
    var operation = Utils.ReadInt("Digite o número da operação (1-4): ",
      "Operação inválida. Digite um número entre 1 e 4.",
      i => (i >= 1 && i <= 4, "Operação inválida. Digite um número entre 1 e 4."));

    // Perform selected operation
    switch (operation)
    {
      case 1: // Addition
        Console.WriteLine($"\nResultado: {num1} + {num2} = {num1 + num2}");
        break;

      case 2: // Subtraction
        Console.WriteLine($"\nResultado: {num1} - {num2} = {num1 - num2}");
        break;

      case 3: // Multiplication
        Console.WriteLine($"\nResultado: {num1} × {num2} = {num1 * num2}");
        break;

      case 4: // Division
        if (num2 == 0)
        {
          Console.WriteLine("\nErro: Divisão por zero não é permitida!");
        }
        else
        {
          Console.WriteLine($"\nResultado: {num1} ÷ {num2} = {num1 / num2}");
        }
        break;
    }
  }
}
