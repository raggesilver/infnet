public class Main {
  public static void main(String[] args) {
    Pedido[] orders = {
      new Pedido("ABC1234", 12.5, new Endereco("Av. Paulista, 1000", "São Paulo"), Prioridade.URGENTE),
      new Pedido("DEF5678", 3.2, new Endereco("Rua das Flores, 45", "Curitiba")),
      new Pedido("GHI9012", 40, new Endereco("Rua da Aurora, 300", "Recife"), Prioridade.LEVE),
      new Pedido("JKL3456", 8, new Endereco("Av. Atlântica, 20", "Rio de Janeiro")),
    };

    for (var order : orders) {
      System.out.println(order);
    }

    System.out.println("Total de pedidos criados: " + Pedido.getTotalCreated());
  }
}
