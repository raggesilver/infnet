namespace TP3;

public class Exercise06 : IExercise
{
  public string Name => "Adicionando Construtores à Classe \"Ingresso\"";

  public void Run(string[] args)
  {
    // Parte teórica comentada acima da classe TicketV2
    var ticket = new TicketV2("Skillet", 20f, 200);
    ticket.DisplayInfo();
  }
}
