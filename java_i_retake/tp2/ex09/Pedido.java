import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Pedido {
  private static final String DEFAULT_DESTINATION = "Não informado";

  private final String code;
  private double weight;
  private final String destination;
  private final LocalDateTime createdAt;
  private final Prioridade priority;

  public Pedido(String code, double weight, String destination, Prioridade priority) {
    if (weight <= 0) throw new IllegalArgumentException("O peso deve ser maior que zero.");
    this.code = code;
    this.weight = weight;
    this.destination = destination;
    this.createdAt = LocalDateTime.now();
    this.priority = priority;
  }

  public Pedido(String code, double weight, String destination) {
    this(code, weight, destination, Prioridade.PADRAO);
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

  public boolean setWeight(double weight) {
    if (weight <= 0) return false;
    this.weight = weight;
    return true;
  }

  public Prioridade getPriority() {
    return priority;
  }

  public String getDestination() {
    return destination;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  @Override
  public String toString() {
    return String.format("Pedido %s | %.2f kg | destino: %s | prioridade: %s | criado em %s",
      code, weight, destination, priority, createdAt.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss")));
  }
}
