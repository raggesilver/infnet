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

// Precisei criar outra versão da classe Ticket, pois adicionar um construtor
// quebrava o código dos outros exercícios onde não passamos parâmetros para a
// inicialização da classe.
//
// Construtores são úteis para obrigar quem os chama a passar certos parâmetros
// para a inicialização da classe. O C# oferece também uma sintaxe de
// inicialização que, combinada com o atributo "required" pode ser usada para
// garantir que toda inicialização tenha que setar determinados campos.

public class TicketV2 : Ticket
{
  public TicketV2(string name, double price, int quantity)
  {
    Name = name;
    Price = price;
    Quantity = quantity;
  }
}
