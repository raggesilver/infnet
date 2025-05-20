namespace TP2;

public class Exercise10 : IExercise
{
  public int Number => 10;
  public string Name => "Contagem Regressiva";

  public void Run(string[] args)
  {
    var numeroInicial = Utils.ReadInt(
      "Digite um número para iniciar a contagem regressiva: ",
      "Número inválido", n =>
        (n >= 0, "O número deve ser maior ou igual a zero"));

    Console.Write("Contagem regressiva: ");

    for (var i = 0; i <= numeroInicial; i++)
    {
      if (i > 0) Console.Write(", ");
      Console.Write(numeroInicial - i);
    }

    Console.WriteLine();
  }
}
