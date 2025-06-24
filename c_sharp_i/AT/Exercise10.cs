namespace AT;

public class Exercise10 : IExercise
{
  public string Name => "Jogo de Adivinhação";

  public void Run(string[] args)
  {
    var random = new Random();
    var targetNumber = random.Next(1, 51);
    const int maxAttempts = 5;

    Console.WriteLine("=== Jogo de Adivinhação ===");
    Console.WriteLine("Tente adivinhar o número entre 1 e 50!");
    Console.WriteLine($"Você tem {maxAttempts} tentativas.\n");

    for (var attempt = 1; attempt <= maxAttempts; attempt++)
    {
      var guess = Utils.ReadInt(
        $"Tentativa {attempt}/{maxAttempts} - Digite seu palpite: ",
        "Número inválido",
        n => n is >= 1 and <= 50
          ? (true, null)
          : (false, "O número deve estar entre 1 e 50"));

      if (guess == targetNumber)
      {
        Console.WriteLine(
          $"\nParabéns! Você acertou o número {targetNumber} em {attempt} tentativa(s)!");
        return;
      }

      Console.WriteLine(guess < targetNumber
        ? "Muito baixo! Tente um número maior."
        : "Muito alto! Tente um número menor.");

      if (attempt < maxAttempts)
        Console.WriteLine(
          $"Você ainda tem {maxAttempts - attempt} tentativa(s).\n");
    }

    Console.WriteLine(
      $"\nVocê esgotou suas tentativas! O número era {targetNumber}.");
  }
}
