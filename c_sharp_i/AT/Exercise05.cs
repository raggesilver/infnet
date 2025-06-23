namespace AT;

public class Exercise05 : IExercise
{
  // Nota ao corretor: para testar os casos de "graduando em 6 meses" ou "Você
  // já deveria ter graduado" altere a constante abaixo para uma data mais
  // próxima à data atual ou aguarde alguns anos para corrigir esse exercício
  // (por favor altere a constante).
  private readonly DateTime _graduationDate = new(2028, 4, 12);

  public string Name =>
    "Tempo Restante para Conclusão do Curso - Diferença Entre Datas";

  public void Run(string[] args)
  {
    Console.WriteLine(
      $"Data prevista de formatura: {_graduationDate:dd/MM/yyyy}\n");

    var currentDate =
      Utils.ReadDate("Digite a data atual (dd/MM/yyyy): ",
        "A data atual é obrigatória",
        date => date > DateTime.Today
          ? (false, "Erro: A data informada não pode ser no futuro!")
          : (true, null));

    // Check if graduation date has already passed
    if (currentDate > _graduationDate)
    {
      Console.WriteLine("\nParabéns! Você já deveria estar formado!");
      return;
    }


    var difference = _graduationDate - currentDate;
    var years = difference.Days / 365;
    var months = difference.Days % 365 / 30;
    var days = difference.Days % 365 % 30;

    Console.WriteLine(
      $"\nFaltam {years} {(years == 1 ? "ano" : "anos")}, {months} {(months == 1 ? "mês" : "meses")} e {days} {(days == 1 ? "dia" : "dias")} para sua formatura!");


    if (years == 0 && months < 6)
      Console.WriteLine("\nA reta final chegou! Prepare-se para a formatura!");
  }
}
