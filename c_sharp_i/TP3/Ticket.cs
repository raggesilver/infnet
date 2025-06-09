namespace TP3;

public class Ticket
{
  // Importante para identificar o show para o qual esse ingresso foi emitido
  public string Name;

  // Serve para guardar o valor pago (ou de custo) do ingresso
  public double Price;

  // Esse campo é um erro do exercício. Em um cenário real, esse campo ficaria
  // em uma classe para o show.
  public int Quantity;

  public void ChangePrice(double newPrice)
  {
    Price = newPrice;
  }

  public void ChangeQuantity(int newQuantity)
  {
    Quantity = newQuantity;
  }

  public void DisplayInfo()
  {
    Console.WriteLine(
      $"Ingresso: {Name} - R$ {Price} - {Quantity} disponíveis");
  }

  public double GetPrice()
  {
    return Price;
  }

  public void SetPrice(double price)
  {
    Price = price;
  }

  public string GetName()
  {
    return Name;
  }

  public void SetName(string name)
  {
    Name = name;
  }

  public int GetQuantity()
  {
    return Quantity;
  }

  public void SetQuantity(int quantity)
  {
    Quantity = quantity;
  }
}
