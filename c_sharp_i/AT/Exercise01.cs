namespace AT;

public class Exercise01 : IExercise
{
  public string Name => "Criando e Executando seu Primeiro Programa";

  public void Run(string[] args)
  {
    Console.WriteLine("Olá, meu nome é Paulo!");
    Console.WriteLine("Nasci em 04/08/1999 e estou aprendendo C#!");
  }
}
