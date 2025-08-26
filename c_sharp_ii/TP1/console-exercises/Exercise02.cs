namespace TP1;

public class Exercise02 : IExercise
{
  private static readonly Action<string> ShowWelcomeInPortuguese = name =>
    Console.WriteLine(
      $"Bem-vindo(a), {name}! Obrigado por usar nossa aplicação.");

  private static readonly Action<string> ShowWelcomeInEnglish = name =>
    Console.WriteLine($"Welcome, {name}! Thank you for using our application.");

  private static readonly Action<string> ShowWelcomeInSpanish = name =>
    Console.WriteLine(
      $"¡Bienvenido(a), {name}! Gracias por usar nuestra aplicación.");

  public string Name => "Ações Multilíngues com Action<string>";

  public void Run(string[] args)
  {
    Console.WriteLine(
      "Escolha um idioma / Choose a language / Elige un idioma:");
    Console.WriteLine("1. Português ");
    Console.WriteLine("2. English");
    Console.WriteLine("3. Español");

    var language = Utils.ReadInt("Digite sua opção: ",
      "Opção inválida",
      option => (option is >= 1 and <= 3,
        "Por favor, escolha entre 1, 2 ou 3."));

    var userName = Utils.ReadNonEmptyString("Digite seu nome: ",
      "Nome não pode ser vazio");

    var welcomeAction = language switch
    {
      1 => ShowWelcomeInPortuguese,
      2 => ShowWelcomeInEnglish,
      3 => ShowWelcomeInSpanish,
      _ => ShowWelcomeInPortuguese // fallback
    };

    Console.WriteLine();
    welcomeAction(userName);
  }
}
