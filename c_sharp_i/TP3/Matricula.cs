namespace TP3;

public class Matricula
{
  public string StudentName { get; set; }
  public string Course { get; set; }
  public int EnrollmentNumber { get; set; }
  public string Status { get; set; }
  public string StartDate { get; set; }

  // Exercise 8 methods
  public void Suspend()
  {
    Status = "Trancada";
  }

  public void Reactivate()
  {
    Status = "Ativa";
  }

  public void DisplayInfo()
  {
    Console.WriteLine($"Aluno: {StudentName}");
    Console.WriteLine($"Curso: {Course}");
    Console.WriteLine($"Situação: {Status}");
    Console.WriteLine($"Data Inicial: {StartDate}");
  }
}
