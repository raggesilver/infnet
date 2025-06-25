public class Exercise08 implements IExercise {
  @Override
  public String getName() {
    return "Sistema de Funcionários";
  }

  @Override
  public void run() {
    System.out.println("=== Sistema de Cálculo de Salários ===\n");

    // Create a manager, regular employee, and an intern with sample data
    Manager manager = new Manager("Ana Silva", 8000.0);
    Employee employee = new Employee("Carlos Pereira", 4500.0);
    Intern intern = new Intern("João Santos", 2000.0);

    System.out.println("=== Funcionários Cadastrados ===\n");

    System.out.println("--- GERENTE ---");
    manager.displayInfo();

    System.out.println("\n--- FUNCIONÁRIO ---");
    employee.displayInfo();

    System.out.println("\n--- ESTAGIÁRIO ---");
    intern.displayInfo();

    System.out.println("\n=== Resumo dos Pagamentos ===");
    System.out.printf("Total a pagar para gerentes: %s%n", Utils.formatMoney(manager.calculateFinalSalary()));
    System.out.printf("Total a pagar para funcionários: %s%n", Utils.formatMoney(employee.calculateFinalSalary()));
    System.out.printf("Total a pagar para estagiários: %s%n", Utils.formatMoney(intern.calculateFinalSalary()));
    System.out.printf("Total geral: %s%n", Utils.formatMoney(manager.calculateFinalSalary() + employee.calculateFinalSalary() + intern.calculateFinalSalary()));
  }
}

class Employee {
  protected String name;
  protected double baseSalary;

  public Employee(String name, double baseSalary) {
    this.name = name;
    this.baseSalary = baseSalary;
  }

  public double calculateFinalSalary() {
    return baseSalary;
  }

  public void displayInfo() {
    System.out.printf("Nome: %s%n", name);
    System.out.printf("Salário base: %s%n", Utils.formatMoney(baseSalary));
    System.out.printf("Ajuste: %s%n", getAdjustmentDescription());
    System.out.printf("Salário final: %s%n", Utils.formatMoney(calculateFinalSalary()));
  }

  protected String getAdjustmentDescription() {
    return "Nenhum";
  }

  public String getName() {
    return name;
  }

  public double getBaseSalary() {
    return baseSalary;
  }
}

class Manager extends Employee {
  public Manager(String name, double baseSalary) {
    super(name, baseSalary);
  }

  @Override
  public double calculateFinalSalary() {
    return baseSalary * 1.20; // 20% bonus
  }

  @Override
  protected String getAdjustmentDescription() {
    return "Bônus: 20%";
  }
}

class Intern extends Employee {
  public Intern(String name, double baseSalary) {
    super(name, baseSalary);
  }

  @Override
  public double calculateFinalSalary() {
    return baseSalary * 0.90; // 10% discount
  }

  @Override
  protected String getAdjustmentDescription() {
    return "Desconto: 10%";
  }
}
