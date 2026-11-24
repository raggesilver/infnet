public class Main {
  public static void main(String[] args) {
    Pedido[] orders = {
      new Pedido("ABC1234", 12.5, "São Paulo"),
      new Pedido("DEF5678", 3.2),
      new Pedido("GHI9012", 40, "Curitiba"),
    };

    for (var order : orders) {
      System.out.printf("Código: %s | Peso: %.2f kg | Destino: %s%n",
        order.getCode(), order.getWeight(), order.getDestination());
    }
  }
}
