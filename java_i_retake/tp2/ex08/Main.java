public class Main {
  public static void main(String[] args) {
    var order = new Pedido("ABC1234", 12.5, "São Paulo");
    System.out.println("Peso original: " + order.getWeight());

    var accepted = order.setWeight(-5);
    System.out.println("Alterar para -5 aceito? " + accepted);
    System.out.println("Peso depois da tentativa: " + order.getWeight());
    System.out.println("Valor original preservado? " + (order.getWeight() == 12.5));

    accepted = order.setWeight(20);
    System.out.println("Alterar para 20 aceito? " + accepted + " | peso: " + order.getWeight());
  }
}
