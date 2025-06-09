namespace TP3;

public class TheoreticalExercise(string name, string? message = null)
  : IExercise
{
  public string Name => name;

  public void Run(string[] args)
  {
    Console.WriteLine("Esse exercício é teórico e foi resolvido no código.");
    if (message != null) Console.WriteLine(message);
  }
}
