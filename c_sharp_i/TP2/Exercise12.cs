namespace TP2;

public class Exercise12 : IExercise
{
  public int Number => 12;
  public string Name => "Jogo de Adivinhação";

  public void Run(string[] args)
  {
    var random = new Random();
    var numeroSecreto = random.Next(1, 101);
    var tentativas = 0;
    var palpite = 0;

    Console.WriteLine("Bem-vindo ao Jogo de Adivinhação!");
    Console.WriteLine("Estou pensando em um número entre 1 e 100.");

    while (palpite != numeroSecreto)
    {
      palpite = Utils.ReadInt("Qual é o seu palpite? ",
        "Por favor, digite um número válido.",
        n => (n >= 1 && n <= 100,
          "O palpite deve ser um número entre 1 e 100."));

      tentativas++;

      if (palpite < numeroSecreto)
        Console.WriteLine("Muito baixo! Tente um número maior.");
      else if (palpite > numeroSecreto)
        Console.WriteLine("Muito alto! Tente um número menor.");
      else
        Console.WriteLine(
          $"Parabéns! Você acertou o número {numeroSecreto} em {tentativas} tentativas!");
    }
  }
}
