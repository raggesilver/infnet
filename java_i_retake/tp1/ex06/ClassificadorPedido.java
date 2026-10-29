import java.util.OptionalDouble;
import java.util.Scanner;

public class ClassificadorPedido {
  // Abaixo de 10 kg o pedido cabe numa entrega comum de motoboy (leve).
  // Acima de 100 kg exige empilhadeira e doca reservada, então precisa ser
  // despachado primeiro (urgente).
  private static final double LIGHT_LIMIT_KG = 10;
  private static final double URGENT_LIMIT_KG = 100;

  public static void main(String[] args) {
    var scanner = new Scanner(System.in);

    System.out.print("Peso do pedido (kg): ");
    var weight = parseNumber(scanner.nextLine());

    if (weight.isEmpty()) {
      System.out.println("Erro: digite um número.");
    } else if (weight.getAsDouble() < 0) {
      System.out.println("Erro: o peso não pode ser negativo.");
    } else if (weight.getAsDouble() > URGENT_LIMIT_KG) {
      System.out.println("Prioridade: urgente");
    } else if (weight.getAsDouble() >= LIGHT_LIMIT_KG) {
      System.out.println("Prioridade: padrão");
    } else {
      System.out.println("Prioridade: leve");
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
