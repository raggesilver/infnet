namespace TP3;

public class Ticket
{
  // Importante para identificar o show para o qual esse ingresso foi emitido
  private string name;

  // Serve para guardar o valor pago (ou de custo) do ingresso
  private double price;

  // Esse campo é um erro do exercício. Em um cenário real, esse campo ficaria
  // em uma classe para o show.
  private int quantity;

  public void ChangePrice(double newPrice)
  {
    price = newPrice;
  }

  public void ChangeQuantity(int newQuantity)
  {
    quantity = newQuantity;
  }

  public void DisplayInfo()
  {
    Console.WriteLine(
      $"Ingresso: {name} - R$ {price} - {quantity} disponíveis");
  }
}
