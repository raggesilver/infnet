namespace TP1;

public interface IExercise
{
  public int Number { get; }
  public string Name { get; }

  public void Run(string[] args);
}
