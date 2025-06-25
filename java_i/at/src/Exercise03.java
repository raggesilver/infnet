public class Exercise03 implements IExercise {
  @Override
  public String getName() {
    return "Calculadora de Impostos";
  }

  @Override
  public void run() {
    System.out.println("=== Calculadora de Imposto de Renda ===\n");

    String name = Utils.readNonEmptyString("Digite seu nome: ");
    double monthlySalary = Utils.readDouble("Digite seu salário mensal (R$): ",
      value -> new Utils.ValidationResult(value > 0, "O salário deve ser positivo."));

    double annualSalary = monthlySalary * 12;
    double taxRate = calculateTaxRate(annualSalary);
    double taxAmount = annualSalary * taxRate;
    double netSalary = annualSalary - taxAmount;

    System.out.printf("%n=== Resultado para %s ===%n", name);
    System.out.printf("Salário anual bruto: R$ %.2f%n", annualSalary);
    System.out.printf("Alíquota aplicada: %.1f%%%n", taxRate * 100);
    System.out.printf("Valor do imposto: R$ %.2f%n", taxAmount);
    System.out.printf("Salário líquido anual: R$ %.2f%n", netSalary);
    System.out.printf("Salário líquido mensal: R$ %.2f%n", netSalary / 12);
  }

  private double calculateTaxRate(double annualSalary) {
    if (annualSalary <= 22847.76) {
      return 0.0; // Isento
    } else if (annualSalary <= 33919.80) {
      return 0.075; // 7,5%
    } else if (annualSalary <= 45012.60) {
      return 0.15; // 15%
    } else {
      return 0.275; // 27,5%
    }
  }
}
