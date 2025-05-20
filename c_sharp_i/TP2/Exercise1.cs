namespace TP2;

public class Exercise1 : IExercise
{
  public int Number => 1;
  public string Name => "Cálculo de Idade Precisa";

  public void Run(string[] args)
  {
    var today = DateTime.Now;
    var birthDate = Utils.ReadDate("Digite sua data de nascimento: ");

    var age = int.Max(today.Year - birthDate.Year - 1, 0);
    if (birthDate.Month >= today.Month && birthDate.Day >= today.Day) age += 1;

    Console.WriteLine($"Você tem {age} anos de idade.");
  }
}
