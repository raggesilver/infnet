public class Exercise3 implements IExercise {
  // Exchange rates
  private static final double USD_RATE = 5.65;
  private static final double EUR_RATE = 6.30; // Using a common EUR rate
  private static final double GBP_RATE = 7.75;

  @Override
  public String getName() {
    return "Conversor de Moedas";
  }

  @Override
  public void run() {
    System.out.println("===== Conversor de Moedas =====");

    double amountInReais = Utils.readDouble("Digite o valor em reais: ",
      value -> new Utils.ValidationResult(value > 0, "O valor deve ser maior que zero"));

    System.out.println("\nEscolha a moeda de destino:");
    System.out.println("1. Dólar (USD)");
    System.out.println("2. Euro (EUR)");
    System.out.println("3. Libra (GBP)");

    int option = Utils.readInt("Digite o número da moeda desejada: ",
      value -> new Utils.ValidationResult(value >= 1 && value <= 3, "Opção inválida"));

    double convertedAmount = 0;
    var currency = switch (option) {
      case 1 -> {
        convertedAmount = amountInReais / USD_RATE;
        yield "dólares (USD)";
      }
      case 2 -> {
        convertedAmount = amountInReais / EUR_RATE;
        yield "euros (EUR)";
      }
      case 3 -> {
        convertedAmount = amountInReais / GBP_RATE;
        yield "libras (GBP)";
      }
      default -> "";
    };

    System.out.println("\nResultado da conversão:");
    System.out.println("R$ " + String.format("%.2f", amountInReais) + " = " +
      String.format("%.2f", convertedAmount) + " " + currency);
  }
}
