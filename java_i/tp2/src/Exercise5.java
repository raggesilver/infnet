public class Exercise5 implements IExercise {
  @Override
  public String getName() {
    return "Calculadora de Descontos Progressivos";
  }

  @Override
  public void run() {
    System.out.println("===== Calculadora de Descontos Progressivos =====");

    double purchaseValue = Utils.readDouble("Digite o valor da compra: R$ ",
        value -> new Utils.ValidationResult(value > 0, "O valor deve ser maior que zero"));

    double discountRate = 0;

    if (purchaseValue > 1000) {
      discountRate = 0.10; // 10% discount
    } else if (purchaseValue >= 500) {
      discountRate = 0.05; // 5% discount
    }

    double discountAmount = purchaseValue * discountRate;
    double finalValue = purchaseValue - discountAmount;

    System.out.println("\nResumo da compra:");
    System.out.println("Valor original: R$ " + String.format("%.2f", purchaseValue));
    System.out.println("Desconto aplicado: " + String.format("%.1f", discountRate * 100) + "% (R$ " +
                       String.format("%.2f", discountAmount) + ")");
    System.out.println("Valor final: R$ " + String.format("%.2f", finalValue));
  }
}
