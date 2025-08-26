namespace TP1;

// Internal functions outside the class
internal static class DelegateHelper
{
  public static Action<string>? RemoveFirst(Action<string>? action)
  {
    if (action == null) return null;

    var invocationList = action.GetInvocationList();
    if (invocationList.Length <= 1) return null;

    // Create a new delegate without the first method
    Action<string>? result = null;
    for (var i = 1; i < invocationList.Length; i++)
      result += (Action<string>)invocationList[i];
    return result;
  }
}

public class Exercise07 : IExercise
{
  public string Name => "Garantia de Robustez em Invocação de Delegates";

  public void Run(string[] args)
  {
    Console.WriteLine("Sistema de Log com Invocação Robusta");
    Console.WriteLine(
      "Demonstrando o uso de ?.Invoke() para evitar exceções.\n");

    // Base multicast delegate
    var multicastLogger = Logger.LogToConsole;
    multicastLogger += Logger.LogToFile;
    multicastLogger += Logger.LogToDatabase;

    // Interactive section

    while (true)
    {
      Console.WriteLine("=== Seção Interativa ===");
      Console.WriteLine(
        "1. Testar com delegate completo (esvaziar + adicionar dois logs)");
      Console.WriteLine("2. Testar removendo primeiro método do delegate");
      Console.WriteLine("3. Testar com delegate vazio");

      var option = Utils.ReadInt("Escolha uma opção (1-3) ou 0 para sair: ",
        "Opção inválida",
        opt => (opt is >= 0 and <= 3, "Digite um número entre 0 e 3."));

      if (option == 0) break;

      var message = Utils.ReadNonEmptyString("Digite a mensagem de log: ",
        "Mensagem não pode ser vazia");

      Console.WriteLine();
      switch (option)
      {
        case 1:
          Console.WriteLine(
            "--- Delegate completo (esvaziar + adicionar dois logs) ---");
          multicastLogger = Logger.LogToConsole;
          multicastLogger += Logger.LogToFile;
          multicastLogger?.Invoke(message);
          break;
        case 2:
          Console.WriteLine("--- Removendo primeiro método do delegate ---");
          multicastLogger = DelegateHelper.RemoveFirst(multicastLogger);
          if (multicastLogger == null)
            Console.WriteLine("Delegate ficou vazio após remoção.");
          multicastLogger?.Invoke(message);
          break;
        case 3:
          Console.WriteLine("--- Delegate vazio ---");
          multicastLogger = null;
          multicastLogger?.Invoke(message);
          Console.WriteLine("Delegate vazio - nenhuma ação executada.");
          break;
      }

      Console.WriteLine();
    }

    Console.WriteLine("Teste de robustez concluído.");
  }
}
