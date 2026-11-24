public class Pedido {
  private static final String DEFAULT_DESTINATION = "Não informado";

  private final String code;
  private final double weight;
  private final String destination;

  public Pedido(String code, double weight, String destination) {
    this.code = code;
    this.weight = weight;
    this.destination = destination;
  }

  public Pedido(String code, double weight) {
    this(code, weight, DEFAULT_DESTINATION);
  }

  public String getCode() {
    return code;
  }

  public double getWeight() {
    return weight;
  }

  public String getDestination() {
    return destination;
  }
}
