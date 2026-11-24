import java.util.Locale;

public class ResumoDiario {
  static void imprimirResumo(int totalOrders, double averageWeight) {
    System.out.printf(Locale.of("pt", "BR"),
      "Pedidos processados: [%5d] | Peso médio: %.2f kg%n", totalOrders, averageWeight);
  }

  public static void main(String[] args) {
    imprimirResumo(7, 12.5);
    imprimirResumo(12345, 1048.3779);
  }
}
