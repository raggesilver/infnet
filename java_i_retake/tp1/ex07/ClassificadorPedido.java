import java.util.OptionalDouble;
import java.util.Scanner;

public class ClassificadorPedido {
  private static final double SENTINEL = -1;

  // Abaixo de 10 kg o pedido cabe numa entrega comum de motoboy (leve).
  // Acima de 100 kg exige empilhadeira e doca reservada, então precisa ser
  // despachado primeiro (urgente).
  private static final double LIGHT_LIMIT_KG = 10;
  private static final double URGENT_LIMIT_KG = 100;

  public static void main(String[] args) {
    var scanner = new Scanner(System.in);
    int lightCount = 0;
    int standardCount = 0;
    int urgentCount = 0;

    var weight = readWeight(scanner);
    while (weight != SENTINEL) {
      if (weight < 0) {
        System.out.println("Erro: o peso não pode ser negativo.");
      } else if (weight > URGENT_LIMIT_KG) {
        System.out.println("Prioridade: urgente");
        urgentCount++;
      } else if (weight >= LIGHT_LIMIT_KG) {
        System.out.println("Prioridade: padrão");
        standardCount++;
      } else {
        System.out.println("Prioridade: leve");
        lightCount++;
      }
      weight = readWeight(scanner);
    }

    System.out.println("\nPedidos processados:");
    System.out.println("  leve: " + lightCount);
    System.out.println("  padrão: " + standardCount);
    System.out.println("  urgente: " + urgentCount);
  }

  private static double readWeight(Scanner scanner) {
    while (true) {
      System.out.print("Peso do pedido em kg (-1 para encerrar): ");
      var weight = parseNumber(scanner.nextLine());
      if (weight.isPresent()) return weight.getAsDouble();
      System.out.println("Erro: digite um número.");
    }
  }

  private static OptionalDouble parseNumber(String text) {
    try {
      return OptionalDouble.of(Double.parseDouble(text.trim().replace(',', '.')));
    } catch (NumberFormatException e) {
      return OptionalDouble.empty();
    }
  }
}
