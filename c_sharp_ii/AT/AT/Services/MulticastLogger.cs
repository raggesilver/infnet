using System.Collections.Concurrent;
using System.Text;

namespace AT.Services;

public class MulticastLogger
{
  private readonly ConcurrentQueue<string> _memoryLogs = new();
  private Action<string>? _logHandlers;

  public MulticastLogger(string? logFilePath = null)
  {
    LogFilePath =
      logFilePath ?? Path.Combine(AppContext.BaseDirectory, "at.log");
    AddHandler(LogToConsole);
    AddHandler(LogToFile);
    AddHandler(LogToMemory);
  }

  private string LogFilePath { get; }

  private void AddHandler(Action<string> handler)
  {
    _logHandlers += handler;
  }

  public void RemoveHandler(Action<string> handler)
  {
    _logHandlers -= handler;
  }

  private void LogToConsole(string message)
  {
    Console.WriteLine($"{DateTime.Now:yyyy-MM-dd HH:mm:ss} - {message}");
  }

  private void LogToFile(string message)
  {
    try
    {
      var line =
        $"{DateTime.Now:yyyy-MM-dd HH:mm:ss} - {message}{Environment.NewLine}";
      File.AppendAllText(LogFilePath, line, Encoding.UTF8);
    }
    catch (Exception ex)
    {
      _memoryLogs.Enqueue(
        $"{DateTime.Now:yyyy-MM-dd HH:mm:ss} - ERROR writing log: {ex.Message}");
    }
  }

  private void LogToMemory(string message)
  {
    _memoryLogs.Enqueue($"{DateTime.Now:yyyy-MM-dd HH:mm:ss} - {message}");
  }

  public void Log(string message)
  {
    var snapshot = _logHandlers;
    snapshot?.Invoke(message);
  }

  public List<string> GetMemoryLogs()
  {
    return [.._memoryLogs];
  }
}
