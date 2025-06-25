public class Exercise04 implements IExercise {
  @Override
  public String getName() {
    return "Simulador de Empréstimo Bancário";
  }

  @Override
  public void run() {
    System.out.println("=== Simulador de Empréstimo Bancário ===\n");

    String clientName = Utils.readNonEmptyString("Digite o nome do cliente: ");
    double loanAmount = Utils.readDouble("Digite o valor do empréstimo: R$ ",
      value -> new Utils.ValidationResult(value > 0, "O valor do empréstimo deve ser positivo."));

    int installments = Utils.readInt("Digite o número de parcelas (6 a 48): ",
      value -> new Utils.ValidationResult(value >= 6 && value <= 48, "O número de parcelas deve estar entre 6 e 48."));

    double monthlyRate = 0.03; // 3% ao mês
    double totalAmount = loanAmount * Math.pow(1 + monthlyRate, installments);
    double monthlyPayment = totalAmount / installments;

    System.out.printf("%n=== Simulação para %s ===%n", clientName);
    System.out.printf("Valor do empréstimo: %s%n", Utils.formatMoney(loanAmount));
    System.out.printf("Número de parcelas: %d%n", installments);
    System.out.printf("Taxa de juros mensal: %.1f%%%n", monthlyRate * 100);
    System.out.printf("Valor total a pagar: %s%n", Utils.formatMoney(totalAmount));
    System.out.printf("Valor da parcela mensal: %s%n", Utils.formatMoney(monthlyPayment));
    System.out.printf("Total de juros pagos: %s%n", Utils.formatMoney(totalAmount - loanAmount));
  }
}
