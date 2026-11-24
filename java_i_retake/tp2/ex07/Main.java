public class Main {
  public static void main(String[] args) {
    Pedido[] orders = {
      new Pedido("ABC1234", 12.5, "São Paulo"),
      new Pedido("DEF5678", 3.2),
      new Pedido("GHI9012", 40, "Curitiba"),
      new Pedido("JKL3456", 8, "Recife"),
      new Pedido("MNO7890", 0.9),
    };

    for (var order : orders) {
      System.out.println(order);
    }
  }
}
