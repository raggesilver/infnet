namespace TP3;

public class Exercise05 : IExercise
{
  public string Name => "Criando Métodos de Propriedade (Getters e Setters)";

  public void Run(string[] args)
  {
    var ticket = new Ticket
    {
      Price = 20f,
      Name = "Guns'n'Roses",
      Quantity = 100
    };

    var price = ticket.GetPrice();
    Console.WriteLine($"Preço do ingresso: {price}");

    ticket.SetPrice(39.99);

    price = ticket.GetPrice();
    Console.WriteLine($"Preço atualizado do ingresso: {price}");
  }
}
