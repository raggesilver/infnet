namespace TP1;

public class Exercise04 : IExercise
{
  public string Name => "Monitoramento de Temperatura com Evento Personalizado";

  public void Run(string[] args)
  {
    var sensor = new TemperatureSensor();

    // Subscribe to the event
    sensor.TemperatureExceeded += OnTemperatureExceeded;

    Console.WriteLine("Sistema de Monitoramento de Temperatura");
    Console.WriteLine("Digite temperaturas para simular leituras do sensor.");
    Console.WriteLine("Digite um valor negativo para sair.\n");

    while (true)
    {
      var temperature = Utils.ReadFloat("Digite a temperatura (°C): ",
        "Temperatura inválida");

      if (temperature < 0)
        break;

      sensor.SimulateReading(temperature);
    }

    Console.WriteLine("Monitoramento encerrado.");
  }

  private static void OnTemperatureExceeded(double temperature)
  {
    Console.WriteLine("⚠️ ALERTA: Temperatura crítica detectada!");
    Console.WriteLine($"   Valor atual: {temperature:F1}°C");
    Console.WriteLine("   Limite seguro: 100.0°C");
    Console.WriteLine($"   Diferença: +{temperature - 100:F1}°C\n");
  }
}

public class TemperatureSensor
{
  public event Action<double>? TemperatureExceeded;

  public void SimulateReading(double temperature)
  {
    Console.WriteLine($"Leitura do sensor: {temperature:F1}°C");

    if (temperature > 100.0)
      TemperatureExceeded?.Invoke(temperature);
    else
      Console.WriteLine("Temperatura dentro do limite seguro.\n");
  }
}
