namespace TP1;

public class Exercise05 : IExercise
{
  public string Name => "Notificação de Conclusão de Download com Eventos";

  public void Run(string[] args)
  {
    var downloadManager = new DownloadManager();

    // Subscribe to the event
    downloadManager.DownloadCompleted += OnDownloadCompleted;

    Console.WriteLine("Sistema de Gerenciamento de Downloads");
    Console.WriteLine("Digite o nome do arquivo para simular o download.");
    Console.WriteLine("Digite 'sair' para encerrar.\n");

    while (true)
    {
      var fileName = Utils.ReadNonEmptyString("Digite o nome do arquivo: ",
        "Nome do arquivo não pode ser vazio");

      if (fileName.ToLower() == "sair")
        break;

      Console.WriteLine($"Iniciando download de '{fileName}'...");
      downloadManager.StartDownload(fileName);
    }

    Console.WriteLine("Gerenciador de downloads encerrado.");
  }

  private static void OnDownloadCompleted(string fileName)
  {
    Console.WriteLine("✅ Download concluído com sucesso!");
    Console.WriteLine($"   Arquivo: {fileName}");
    Console.WriteLine("   Status: Pronto para uso");
    Console.WriteLine($"   Localização: ~/Downloads/{fileName}\n");
  }
}

public class DownloadManager
{
  public event Action<string>? DownloadCompleted;

  public void StartDownload(string fileName)
  {
    // Simulate download progress
    Console.WriteLine("Conectando ao servidor...");
    Thread.Sleep(500);

    Console.WriteLine("Baixando arquivo...");
    Thread.Sleep(2000); // Simulate 2 seconds download time

    Console.WriteLine("Verificando integridade...");
    Thread.Sleep(300);

    // Trigger the completion event
    DownloadCompleted?.Invoke(fileName);
  }
}
