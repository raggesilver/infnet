import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Pedido {
  private static final Endereco DEFAULT_ADDRESS = new Endereco("Não informado", "Não informada");

  private static int totalCreated = 0;

  private final String code;
  private double weight;
  private final Endereco address;
  private final LocalDateTime createdAt;
  private final Prioridade priority;

  public Pedido(String code, double weight, Endereco address, Prioridade priority) {
    if (weight <= 0) throw new IllegalArgumentException("O peso deve ser maior que zero.");
    this.code = code;
    this.weight = weight;
    this.address = address;
    this.createdAt = LocalDateTime.now();
    this.priority = priority;
    totalCreated++;
  }

  public Pedido(String code, double weight, Endereco address) {
    this(code, weight, address, Prioridade.PADRAO);
  }

  public Pedido(String code, double weight) {
    this(code, weight, DEFAULT_ADDRESS);
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

  public Endereco getAddress() {
    return address;
  }

  public static int getTotalCreated() {
    return totalCreated;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  @Override
  public String toString() {
    return String.format("Pedido %s | %.2f kg | endereço: %s | prioridade: %s | criado em %s",
      code, weight, address, priority, createdAt.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss")));
  }
}
