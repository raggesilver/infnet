namespace TP1;

public class Exercise8 : IExercise
{
  public int Number => 8;
  public string Name => "Classificação de Nota Escolar";

  public void Run(string[] args)
  {
    var grade = Utils.ReadFloat("Digite uma nota entre 0 e 10: ",
      "Nota inválida", n =>
        (n is >= 0 and <= 10, "A nota deve estar entre 0 e 10"));

    var classification = grade switch
    {
      >= 0 and < 5 => "Insuficiente",
      >= 5 and < 7 => "Regular",
      >= 7 and < 9 => "Bom",
      >= 9 and <= 10 => "Excelente",
      _ => throw new Exception("Nota fora de escala")
    };

    Console.WriteLine($"Nota: {grade:F1} - Classificação: {classification}");
  }
}
