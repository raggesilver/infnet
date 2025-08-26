namespace TP1;

public class Exercise11 : IExercise
{
  public string Name => "11 - Manipulação de Strings com Delegates Encadeados";

  public void Run(string[] args)
  {
    Console.WriteLine(
      "=== Manipulação de Strings com Delegates Encadeados ===");
    Console.WriteLine();

    Console.Write("Digite o primeiro nome: ");
    var firstName = Console.ReadLine() ?? "";

    Console.Write("Digite o sobrenome: ");
    var lastName = Console.ReadLine() ?? "";

    Func<string, string, string> concatenateNames =
      (first, last) => $"{first} {last}";

    Func<string, string> toUpperCase = text => text.ToUpper();

    Func<string, string> trimWhiteSpace = text => text.Trim();

    var concatenatedResult = concatenateNames(firstName, lastName);
    Console.WriteLine($"Após concatenação: '{concatenatedResult}'");

    var upperResult = toUpperCase(concatenatedResult);
    Console.WriteLine($"Após conversão para maiúsculas: '{upperResult}'");

    var finalResult = trimWhiteSpace(upperResult);
    Console.WriteLine($"Após remoção de espaços: '{finalResult}'");

    Console.WriteLine();
    Console.WriteLine("=== Análise do Comportamento ===");
    Console.WriteLine("Observações:");
    Console.WriteLine(
      "1. O Func<string, string, string> recebe dois parâmetros e retorna uma string");
    Console.WriteLine(
      "2. Os métodos são executados sequencialmente, não em multicast");
    Console.WriteLine("3. Cada operação transforma o resultado da anterior");
    Console.WriteLine(
      "4. O resultado final é a composição de todas as transformações");

    Console.WriteLine();
    Console.WriteLine("=== Demonstração com Multicast Delegate ===");

    Func<string, string>? processText = null;
    processText += text =>
    {
      Console.WriteLine($"  Processando: {text}");
      return text.ToUpper();
    };
    processText += text =>
    {
      Console.WriteLine($"  Processando: {text}");
      return text.Trim();
    };

    Console.WriteLine("Executando delegate multicast:");
    var multicastResult =
      processText?.Invoke($"  {firstName} {lastName}  ") ?? "";
    Console.WriteLine($"Resultado do multicast: '{multicastResult}'");
    Console.WriteLine(
      "Nota: Em delegates multicast com retorno, apenas o último resultado é mantido!");
  }
}
