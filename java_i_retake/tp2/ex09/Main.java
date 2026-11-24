public class Main {
  public static void main(String[] args) {
    var order = new Pedido("ABC1234", 12.5, "São Paulo", Prioridade.URGENTE);
    System.out.println(order);
    System.out.println(new Pedido("DEF5678", 3.2));

    var dispatch = new DespachoPedido(order.getCode(), order.getPriority());
    System.out.println(dispatch);
  }
}
