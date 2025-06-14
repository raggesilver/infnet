namespace TP3;

public class Exercise04 : IExercise
{
  public string Name => "Testando a Classe \"Ingresso\"";

  public void Run(string[] args)
  {
    var ticket = new Ticket
    {
      Price = 20f,
      Name = "Skillet",
      Quantity = 200
    };

    ticket.DisplayInfo();

    ticket.ChangePrice(39.99);
    ticket.ChangeQuantity(42);

    ticket.DisplayInfo();
  }
}
