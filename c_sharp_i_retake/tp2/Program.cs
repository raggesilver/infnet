using System.Globalization;
using Estacionamento.Models;

namespace Estacionamento;

internal static class Program
{
  private static void Main()
  {
    CultureInfo.CurrentCulture = CultureInfo.GetCultureInfo("pt-BR");

    Console.WriteLine("Exercícios 1 e 3 — Normalização e validação de placas");
    string[] plates = ["ABC1D23", "  DEF4G56  ", "hij7k89", "ABC1234", "ABC1D2"];

    foreach (string input in plates)
    {
      string placa = NormalizarPlaca(input);
      Console.WriteLine($"Placa normalizada: {placa}");
      Console.WriteLine(PlacaValida(placa) ? "Formato Mercosul válido." : "Formato Mercosul inválido.");
    }

    Console.WriteLine("\nExercício 2 — Resumo diário");
    PrintDailySummary(18, 1.5);
    PrintDailySummary(32, 2.346);

    Console.WriteLine("\nExercício 4 — Registro de veículos");
    var firstVehicle = new Veiculo("ABC1D23", new DateTime(2026, 11, 24, 8, 30, 0), "Carro");
    Veiculo[] vehicles =
    [
      firstVehicle,
      new Veiculo("DEF4G56", "Moto"),
      new Veiculo("HIJ7K89", "Utilitário")
    ];

    foreach (Veiculo vehicle in vehicles)
    {
      Console.WriteLine($"Placa: {vehicle.Placa} | Entrada: {vehicle.HorarioEntrada:dd/MM/yyyy HH:mm:ss} | Tipo: {vehicle.Tipo}");
    }

    Console.WriteLine("\nExercício 5 — Proteção do valor pago");
    firstVehicle.ValorPago = 25.50m;
    Console.WriteLine($"Valor original: {firstVehicle.ValorPago:C2}");
    decimal invalidPayment = -10m;
    firstVehicle.ValorPago = invalidPayment;
    Console.WriteLine($"Valor pago após tentar atribuir {invalidPayment:C2}: {firstVehicle.ValorPago:C2}");

    Console.WriteLine("\nExercício 6 — Recibo de saída");
    var receipt = new ReciboSaida(firstVehicle.Placa, firstVehicle.ValorPago);
    Console.WriteLine($"Placa: {receipt.Placa} | Valor final pago: {receipt.ValorFinalPago:C2}");
  }

  private static string NormalizarPlaca(string placa) => placa.Trim().ToUpper();

  private static bool PlacaValida(string placa) =>
    placa.Length == 7 &&
    placa.All(char.IsAscii) &&
    char.IsLetter(placa[0]) &&
    char.IsLetter(placa[1]) &&
    char.IsLetter(placa[2]) &&
    char.IsDigit(placa[3]) &&
    char.IsLetter(placa[4]) &&
    char.IsDigit(placa[5]) &&
    char.IsDigit(placa[6]);

  private static void PrintDailySummary(int totalTickets, double mediaHoras)
  {
    Console.WriteLine($"Tickets processados: {totalTickets} | Permanência média: {mediaHoras:F2} h");
  }
}
