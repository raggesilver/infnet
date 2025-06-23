namespace AT;

public class Employee(string name, string position, decimal baseSalary)
{
  public string Name { get; set; } = name;
  public string Position { get; set; } = position;
  public decimal BaseSalary { get; set; } = baseSalary;

  public virtual decimal GetSalary()
  {
    return BaseSalary;
  }

  public virtual void DisplayInfo()
  {
    Console.WriteLine($"Nome: {Name}");
    Console.WriteLine($"Cargo: {Position}");
    Console.WriteLine($"Salário: R$ {GetSalary():F2}");
  }
}

public class Manager(string name, decimal baseSalary)
  : Employee(name, "Gerente", baseSalary)
{
  public override decimal GetSalary()
  {
    return BaseSalary * 1.20m;
  }
}

public class Exercise08 : IExercise
{
  public string Name => "Cadastro de Funcionários (Herança)";

  public void Run(string[] args)
  {
    var employee = new Employee("Maria Santos", "Analista", 5000.00m);
    var manager = new Manager("João Silva", 5000.00m);

    Console.WriteLine("=== FUNCIONÁRIO ===");
    employee.DisplayInfo();

    Console.WriteLine("\n=== GERENTE ===");
    manager.DisplayInfo();
  }
}
