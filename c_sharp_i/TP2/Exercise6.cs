namespace TP2;

public class Exercise6 : IExercise
{
  public int Number => 6;
  public string Name => "Cálculo de IMC";

  public void Run(string[] args)
  {
    var altura = Utils.ReadFloat("Digite sua altura em metros: ",
      "Altura inválida", h =>
        (h > 0, "A altura deve ser maior que zero"));
    var peso = Utils.ReadFloat("Digite seu peso em quilos: ", "Peso inválido",
      w =>
        (w > 0, "O peso deve ser maior que zero"));

    // Formula: weight / (height * height)
    var imc = peso / (altura * altura);

    Console.WriteLine($"\nSeu IMC é: {imc:F2}. Classificação: ");

    switch (imc)
    {
      case < 18.5f:
        Console.WriteLine("Abaixo do peso");
        break;
      case < 25:
        Console.WriteLine("Peso normal");
        break;
      case < 30:
        Console.WriteLine("Sobrepeso");
        break;
      case < 35:
        Console.WriteLine("Obesidade Grau I");
        break;
      case < 40:
        Console.WriteLine("Obesidade Grau II");
        break;
      default:
        Console.WriteLine("Obesidade Grau III");
        break;
    }
  }
}
