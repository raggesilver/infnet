namespace AT;

public class Student(string name, string major, float average)
{
  public string Name { get; set; } = name;
  public Guid EnrollmentNumber { get; set; } = Guid.NewGuid();
  public string Major { get; set; } = major;
  public float Average { get; set; } = average;

  public void ShowInfo()
  {
    Console.WriteLine($"Nome: {Name}");
    Console.WriteLine($"Matrícula: {EnrollmentNumber}");
    Console.WriteLine($"Curso: {Major}");
    Console.WriteLine($"Média: {Average:F1}");
    Console.WriteLine($"Status: {CheckGrades()}");
  }

  public string CheckGrades()
  {
    return Average >= 6.0f ? "Aprovado" : "Reprovado";
  }
}

public class Exercise06 : IExercise
{
  public string Name => "Cadastro de Alunos";

  public void Run(string[] args)
  {
    var alunoAprovado =
      new Student("Paulo Queiroz", "Ciência da Computação", 8.5f);
    var alunoReprovado =
      new Student("Maria Silva", "Engenharia de Software", 4.2f);

    Console.WriteLine("=== ALUNO 1 ===");
    alunoAprovado.ShowInfo();

    Console.WriteLine("\n=== ALUNO 2 ===");
    alunoReprovado.ShowInfo();
  }
}
