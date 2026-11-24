import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Pedido {
  private static final String DEFAULT_DESTINATION = "Não informado";

  private final String code;
  private final double weight;
  private final String destination;
  private final LocalDateTime createdAt;

  public Pedido(String code, double weight, String destination) {
    this.code = code;
    this.weight = weight;
    this.destination = destination;
    this.createdAt = LocalDateTime.now();
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

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  @Override
  public String toString() {
    return String.format("Pedido %s | %.2f kg | destino: %s | criado em %s",
      code, weight, destination, createdAt.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss")));
  }
}
