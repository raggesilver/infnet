namespace AT;

public class Exercise04 : IExercise
{
  public string Name => "Manipulação de Datas - Dias até o Próximo Aniversário";

  public void Run(string[] args)
  {
    // Get birthdate from user
    var birthDate = Utils.ReadDate("Digite sua data de nascimento (dd/MM/yyyy): ");

    // Get current date
    var today = DateTime.Today;

    // Calculate next birthday
    var nextBirthday = new DateTime(today.Year, birthDate.Month, birthDate.Day);

    // If the birthday has already occurred this year, move to next year
    if (nextBirthday < today)
    {
      nextBirthday = nextBirthday.AddYears(1);
    }

    // Handle leap year (February 29)
    if (birthDate.Month == 2 && birthDate.Day == 29 && !DateTime.IsLeapYear(nextBirthday.Year))
    {
      // Move to March 1st in non-leap years
      nextBirthday = new DateTime(nextBirthday.Year, 3, 1);
    }

    // Calculate days until next birthday
    var daysRemaining = (nextBirthday - today).Days;

    // Display result
    Console.WriteLine($"\nSua data de nascimento: {birthDate:dd/MM/yyyy}");
    Console.WriteLine($"Próximo aniversário: {nextBirthday:dd/MM/yyyy}");
    Console.WriteLine($"Faltam {daysRemaining} dias para o seu próximo aniversário.");

    // Display special message if birthday is less than 7 days away
    if (daysRemaining < 7)
    {
      Console.WriteLine("\nAniversário chegando! Prepare-se para a comemoração!");
    }
  }
}
