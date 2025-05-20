namespace TP2;

public class Exercise2 : IExercise
{
  public int Number => 2;
  public string Name => "Dias até o Próximo Aniversário";

  public void Run(string[] args)
  {
    var today = DateTime.Today;
    var birthDate =
      Utils.ReadDate("Digite sua data de nascimento (dd/mm/aaaa): ");

    birthDate = new DateTime(today.Year, birthDate.Month, birthDate.Day);
    if (birthDate < today) birthDate = birthDate.AddYears(1);

    var diff = birthDate - today;

    if (diff.TotalDays < 1)
    {
      Console.WriteLine("Seu aniversário é hoje. Parabéns 🎉");
    }
    else
    {
      var days = (int)Math.Ceiling(diff.TotalDays);
      var word = days == 1 ? "dia" : "dias";
      Console.WriteLine(
        $"Seu aniversário é em {days} {word} 📅");
    }
  }
}
