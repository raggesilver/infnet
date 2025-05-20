namespace TP1;

public class Exercise7 : IExercise
{
  public int Number => 7;
  public string Name => "Verificador de Número Par ou Ímpar";

  public void Run(string[] args)
  {
    var numero = Utils.ReadInt("Digite um número inteiro: ");

    if (numero % 2 == 0)
      Console.WriteLine($"O número {numero} é par.");
    else
      Console.WriteLine($"O número {numero} é ímpar.");
  }
}
