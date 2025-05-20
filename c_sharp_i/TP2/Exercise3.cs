namespace TP2;

public class Exercise3 : IExercise
{
  public int Number => 3;
  public string Name => "Diferença Entre Duas Datas";

  public void Run(string[] args)
  {
    var date1 = Utils.ReadDate("Digite a primeira data (dd/mm/aaaa): ");
    var date2 = Utils.ReadDate("Digite a segunda data (dd/mm/aaaa): ");


    var diff = date2 - date1;

    var years = diff.Days / 365;
    var remainingDays = diff.Days % 365;
    var months = remainingDays / 30;
    var days = remainingDays % 30;

    Console.WriteLine(
      $"Entre {date1} e {date2} tem aproximadamente {years} ano(s), {months} mes(es) e {days} dia(s).");
  }
}
