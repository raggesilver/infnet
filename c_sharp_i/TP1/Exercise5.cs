namespace TP1;

public class Exercise5 : IExercise
{
  public int Number => 5;
  public string Name => "Conversor de Temperatura";

  public void Run(string[] args)
  {
    // Request temperature in Celsius from the user
    var celsius = Utils.ReadFloat("Digite a temperatura em graus Celsius: ");

    // Convert Celsius to Fahrenheit using the formula: F = C * 9/5 + 32
    var fahrenheit = celsius * 9 / 5 + 32;

    // Convert Celsius to Kelvin using the formula: K = C + 273.15
    var kelvin = celsius + 273.15f;

    // Display the conversion results formatted with two decimal places
    Console.WriteLine($"\n{celsius:F2}°C corresponde a:");
    Console.WriteLine($"- {fahrenheit:F2}°F (Fahrenheit)");
    Console.WriteLine($"- {kelvin:F2}K (Kelvin)");
  }
}
