namespace TP3;

public class Exercise09 : IExercise
{
  public string Name => "Testando a Classe de Matrícula";

  public void Run(string[] args)
  {
    var enrollment = new Matricula
    {
      StudentName = "João Silva",
      Course = "Ciência da Computação",
      EnrollmentNumber = 20230001,
      Status = "Ativa",
      StartDate = "01/02/2023"
    };

    Console.WriteLine("Informações iniciais da matrícula:");
    enrollment.DisplayInfo();

    Console.WriteLine("\nTrancando a matrícula...");
    enrollment.Suspend();
    enrollment.DisplayInfo();

    Console.WriteLine("\nReativando a matrícula...");
    enrollment.Reactivate();
    enrollment.DisplayInfo();
  }
}
