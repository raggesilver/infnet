import java.util.EnumMap;

public class ClassificadorPedido {
  public enum Priority {
    LIGHT("leve"),
    STANDARD("padrão"),
    URGENT("urgente");

    private final String label;

    Priority(String label) {
      this.label = label;
    }

    public String label() {
      return label;
    }
  }

  // Abaixo de 10 kg o pedido cabe numa entrega comum de motoboy (leve).
  // Acima de 100 kg exige empilhadeira e doca reservada, então precisa ser
  // despachado primeiro (urgente).
  private static final double LIGHT_LIMIT_KG = 10;
  private static final double URGENT_LIMIT_KG = 100;

  private final EnumMap<Priority, Integer> totals = new EnumMap<>(Priority.class);

  public ClassificadorPedido() {
    for (var priority : Priority.values()) {
      totals.put(priority, 0);
    }
  }

  public static Priority classify(double weightKg) {
    if (weightKg < 0) {
      throw new IllegalArgumentException("O peso não pode ser negativo.");
    }
    if (weightKg > URGENT_LIMIT_KG) return Priority.URGENT;
    if (weightKg >= LIGHT_LIMIT_KG) return Priority.STANDARD;
    return Priority.LIGHT;
  }

  public Priority register(double weightKg) {
    var priority = classify(weightKg);
    totals.merge(priority, 1, Integer::sum);
    return priority;
  }

  public void printTotals() {
    System.out.println("Pedidos processados:");
    for (var priority : Priority.values()) {
      System.out.println("  " + priority.label() + ": " + totals.get(priority));
    }
  }
}
