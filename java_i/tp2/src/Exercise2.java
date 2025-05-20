public class Exercise2 implements IExercise {
  @Override
  public String getName() {
    return "Calculadora de Média de Notas";
  }

  @Override
  public void run() {
    System.out.println("===== Calculadora de Média =====");

    Utils.Validator<Double> gradeValidator = value -> new Utils.ValidationResult(value >= 0 && value <= 10, "Nota deve estar entre 0 e 10");

    double nota1 = Utils.readDouble("Digite a nota do primeiro bimestre: ", gradeValidator);
    double nota2 = Utils.readDouble("Digite a nota do segundo bimestre: ", gradeValidator);
    double nota3 = Utils.readDouble("Digite a nota do terceiro bimestre: ", gradeValidator);
    double nota4 = Utils.readDouble("Digite a nota do quarto bimestre: ", gradeValidator);

    double media = (nota1 + nota2 + nota3 + nota4) / 4;

    System.out.println("\nMédia: " + String.format("%.2f", media));

    if (media >= 7) {
      System.out.println("Situação: Aprovado");
    } else if (media >= 5) {
      System.out.println("Situação: Em recuperação");
    } else {
      System.out.println("Situação: Reprovado");
    }
  }
}
