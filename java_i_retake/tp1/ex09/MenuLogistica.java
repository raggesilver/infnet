// Uso de IA: já cursei um semestre inteiro de Java no Infnet e já escrevi alguns
// mods de Minecraft, então optei por deixar o Claude escrever o código deste
// trabalho. Revisei o código manualmente e escrevi à mão os exercícios 4 e 9,
// como pedido. Também dediquei bastante tempo a instruções sobre como escrevo e
// estruturo meus projetos, para que o código gerado siga o meu padrão.
import java.util.OptionalDouble;
import java.util.Scanner;

public class MenuLogistica {
  public static void main(String[] args) {
    var scanner = new Scanner(System.in);
    var classifier = new ClassificadorPedido();
    int option;

    do {
      printMenu();
      option = readOption(scanner);

      switch (option) {
        case 1 -> convertTemperature(scanner);
        case 2 -> convertDistance(scanner);
        case 3 -> classifyOrder(scanner, classifier);
        case 4 -> classifier.printTotals();
        case 5 -> showAbout();
        case 0 -> {
          classifier.printTotals();
          System.out.println("Até logo!");
        }
        default -> System.out.println("Opção inválida.");
      }
    } while (option != 0);
  }

  private static void printMenu() {
    System.out.println("\n=== Menu de Logística ===");
    System.out.println("1. Converter temperatura (°C para °F)");
    System.out.println("2. Converter distância (km para milhas)");
    System.out.println("3. Classificar pedido");
    System.out.println("4. Ver totais por prioridade");
    System.out.println("5. Sobre");
    System.out.println("0. Sair");
  }

  private static int readOption(Scanner scanner) {
    System.out.print("Escolha uma opção: ");
    try {
      return Integer.parseInt(scanner.nextLine().trim());
    } catch (NumberFormatException e) {
      return -1;
    }
  }

  private static void showAbout() {
    System.out.println("Versão do Java: " + System.getProperty("java.version"));
    System.out.println(
        "Este programa roda sem alterações em outro sistema operacional porque o "
            + "javac gera bytecode, e cada sistema tem uma JVM que o executa.");
  }

  private static void convertTemperature(Scanner scanner) {
    var celsius = readNumber(scanner, "Temperatura em °C: ");
    var fahrenheit = ConversorUnidades.celsiusToFahrenheit(celsius);
    System.out.printf("%.1f °C = %.1f °F%n", celsius, fahrenheit);
  }

  private static void convertDistance(Scanner scanner) {
    var kilometers = readNumber(scanner, "Distância em km: ");
    if (kilometers < 0) {
      System.out.println("Erro: a distância não pode ser negativa.");
      return;
    }
    var miles = ConversorUnidades.kilometersToMiles(kilometers);
    System.out.printf("%.1f km = %.2f milhas%n", kilometers, miles);
  }

  private static void classifyOrder(Scanner scanner, ClassificadorPedido classifier) {
    var weight = readNumber(scanner, "Peso do pedido em kg: ");
    if (weight < 0) {
      System.out.println("Erro: o peso não pode ser negativo.");
      return;
    }
    var priority = classifier.register(weight);
    System.out.println("Prioridade: " + priority.label());
  }

  private static double readNumber(Scanner scanner, String prompt) {
    while (true) {
      System.out.print(prompt);
      var number = parseNumber(scanner.nextLine());
      if (number.isPresent()) return number.getAsDouble();
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
