import market.Product;

public class Exercise05 implements IExercise {
  @Override
  public String getName() {
    return "Criando Métodos de Propriedade (Getters e Setters)";
  }

  @Override
  public void run() {
    var pepsiCan = new Product("Pepsi Black Lata", 2.77, 23);

    System.out.println("Nome do produto: " + pepsiCan.getName());
    System.out.println("Valor do produto: R$ " + pepsiCan.getPrice());

    pepsiCan.setPrice(2.50);
    System.out.println("Novo valor do produto: R$ " + pepsiCan.getPrice());
  }
}
