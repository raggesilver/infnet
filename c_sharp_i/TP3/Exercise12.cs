namespace TP3;

public class Exercise12 : IExercise
{
  public string Name => "Testando as Classes de Figuras";

  public void Run(string[] args)
  {
    // Criando instâncias de Círculo e Esfera
    var circle = new Circle { Radius = 3.0 };
    var sphere = new Sphere { Radius = 5.0 };

    // Calculando área e volume
    var circleArea = circle.CalculateArea();
    var sphereVolume = sphere.CalculateVolume();

    // Exibindo os resultados
    Console.WriteLine($"Círculo com raio {circle.Radius}:");
    Console.WriteLine($"Área: {circleArea:F2} unidades quadradas");

    Console.WriteLine($"\nEsfera com raio {sphere.Radius}:");
    Console.WriteLine($"Volume: {sphereVolume:F2} unidades cúbicas");

    // Validando com fórmulas conhecidas
    Console.WriteLine("\nValidação:");
    Console.WriteLine($"Fórmula da área do círculo: π × r² = π × {circle.Radius}² = {Math.PI:F2} × {circle.Radius * circle.Radius:F2} = {circleArea:F2}");
    Console.WriteLine($"Fórmula do volume da esfera: (4/3) × π × r³ = (4/3) × {Math.PI:F2} × {sphere.Radius}³ = {(4.0/3.0):F2} × {Math.PI:F2} × {Math.Pow(sphere.Radius, 3):F2} = {sphereVolume:F2}");
  }
}
