import market.Product;

public class Exercise04 implements IExercise {
  @Override
  public String getName() {
    return "Testando a Classe “Produto”";
  }

  @Override
  public void run() {
    var pizza = new Product("Pizza Pepperoni", 49.90, 8);

    pizza.displayInfo();

    pizza.setPrice(47.99);
    pizza.setQuantityInStock(6);

    pizza.displayInfo();
  }
}
