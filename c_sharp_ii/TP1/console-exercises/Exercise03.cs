namespace TP1;

public class Exercise03 : IExercise
{
  public string Name => "Cálculo de Área Utilizando Func";

  private static readonly Func<double, double, double> CalculateRectangleArea =
    (baseValue, height) => baseValue * height;

  public void Run(string[] args)
  {
    var baseValue = Utils.ReadFloat("Digite a base do retângulo (em metros): ",
        "Valor inválido",
        value => (value > 0, "A base deve ser um número positivo."));

    var height = Utils.ReadFloat("Digite a altura do retângulo (em metros): ",
        "Valor inválido",
        value => (value > 0, "A altura deve ser um número positivo."));

    var area = CalculateRectangleArea(baseValue, height);
    Console.WriteLine($"A área do retângulo é: {area:F2} m²");
  }
}
