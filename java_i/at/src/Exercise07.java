public class Exercise07 implements IExercise {
  @Override
  public String getName() {
    return "Gerenciador de Alunos";
  }

  @Override
  public void run() {
    System.out.println("=== Sistema Acadêmico - Gerenciador de Alunos ===\n");

    String name = Utils.readNonEmptyString("Digite o nome do aluno: ");
    String enrollmentId = Utils.readNonEmptyString("Digite a matrícula do aluno: ");

    double grade1 = Utils.readDouble("Digite a primeira nota (0-10): ",
      value -> new Utils.ValidationResult(value >= 0 && value <= 10, "A nota deve estar entre 0 e 10."));

    double grade2 = Utils.readDouble("Digite a segunda nota (0-10): ",
      value -> new Utils.ValidationResult(value >= 0 && value <= 10, "A nota deve estar entre 0 e 10."));

    double grade3 = Utils.readDouble("Digite a terceira nota (0-10): ",
      value -> new Utils.ValidationResult(value >= 0 && value <= 10, "A nota deve estar entre 0 e 10."));

    Student student = new Student(name, enrollmentId, grade1, grade2, grade3);

    System.out.printf("%n=== Dados do Aluno ===%n");
    System.out.printf("Nome: %s%n", student.getName());
    System.out.printf("Matrícula: %s%n", student.getEnrollmentId());
    System.out.printf("Nota 1: %s%n", Utils.formatNumber(student.getGrade1()));
    System.out.printf("Nota 2: %s%n", Utils.formatNumber(student.getGrade2()));
    System.out.printf("Nota 3: %s%n", Utils.formatNumber(student.getGrade3()));
    System.out.printf("Média: %s%n", Utils.formatNumber(student.calculateAverage()));

    System.out.printf("%n=== Situação Final ===%n");
    student.checkApproval();
  }
}

class Student {
  private String name;
  private String enrollmentId;
  private double grade1;
  private double grade2;
  private double grade3;

  public Student(String name, String enrollmentId, double grade1, double grade2, double grade3) {
    this.name = name;
    this.enrollmentId = enrollmentId;
    this.grade1 = grade1;
    this.grade2 = grade2;
    this.grade3 = grade3;
  }

  public double calculateAverage() {
    return (grade1 + grade2 + grade3) / 3.0;
  }

  public void checkApproval() {
    double average = calculateAverage();
    if (average >= 7.0) {
      System.out.printf("✅ %s foi APROVADO(A) com média %s!%n", name, Utils.formatNumber(average));
    } else {
      System.out.printf("❌ %s foi REPROVADO(A) com média %s.%n", name, Utils.formatNumber(average));
    }
  }

  public String getName() {
    return name;
  }

  public String getEnrollmentId() {
    return enrollmentId;
  }

  public double getGrade1() {
    return grade1;
  }

  public double getGrade2() {
    return grade2;
  }

  public double getGrade3() {
    return grade3;
  }
}
