namespace AT;

public interface IExercise
{
  public string Name { get; }

  public void Run(string[] args);
}
