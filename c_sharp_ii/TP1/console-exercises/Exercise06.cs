namespace TP1;

public class Exercise06 : IExercise
{
  public string Name => "Sistema de Registro com Multicast Delegate";

  public void Run(string[] args)
  {
    // Create multicast delegate combining all logging methods
    var multicastLogger = Logger.LogToConsole;
    multicastLogger += Logger.LogToFile;
    multicastLogger += Logger.LogToDatabase;

    Console.WriteLine("Sistema de Log Multicast");
    Console.WriteLine("Digite mensagens para registrar em todos os destinos.");
    Console.WriteLine("Digite 'sair' para encerrar.\n");

    while (true)
    {
      var message = Utils.ReadNonEmptyString("Digite a mensagem de log: ",
        "Mensagem não pode ser vazia");

      if (message.ToLower() == "sair")
        break;

      Console.WriteLine("\n--- Executando log multicast ---");
      multicastLogger(message);
      Console.WriteLine("--- Log multicast concluído ---\n");
    }

    Console.WriteLine("Sistema de log encerrado.");
  }
}

public static class Logger
{
  public static void LogToConsole(string message)
  {
    Console.WriteLine($"[CONSOLE] {DateTime.Now:HH:mm:ss} - {message}");
  }

  public static void LogToFile(string message)
  {
    Console.WriteLine(
      $"[ARQUIVO] {DateTime.Now:HH:mm:ss} - Salvando no arquivo: log.txt");
    Console.WriteLine($"          Conteúdo: {message}");
  }

  public static void LogToDatabase(string message)
  {
    Console.WriteLine(
      $"[DATABASE] {DateTime.Now:HH:mm:ss} - Inserindo no banco de dados");
    Console.WriteLine(
      $"           Query: INSERT INTO Logs (message, timestamp) VALUES ('{message}', NOW())");
  }
}
