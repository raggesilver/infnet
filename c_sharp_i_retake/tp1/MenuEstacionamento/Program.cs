// O menu reúne as operações em métodos compartilhados, sem duplicar cálculos.
// Frações de hora são cobradas como horas completas e comparadas ao teto diário.
// A classificação usa limites fixos e mantém contadores enquanto o programa roda.
// Entradas inválidas e negativas são rejeitadas antes das operações.

using System.Globalization;

const double HourlyRate = 10.0;
const double DailyCap = 50.0;
int shortCount = 0;
int standardCount = 0;
int dailyCount = 0;
string? option;

do
{
  Console.WriteLine("\n1 - Calcular tarifa");
  Console.WriteLine("2 - Converter duração");
  Console.WriteLine("3 - Classificar permanência");
  Console.WriteLine("4 - Sobre");
  Console.WriteLine("5 - Sair");
  Console.Write("Escolha uma opção: ");
  option = Console.ReadLine();

  switch (option)
  {
    case "1":
      if (ReadMinutes() is int tariffMinutes)
      {
        var (hours, minutes) = SplitDuration(tariffMinutes);
        double amount = (hours + (minutes > 0 ? 1 : 0)) * HourlyRate;
        Console.WriteLine($"Permanência: {hours}h {minutes}min");
        Console.WriteLine($"Valor calculado: R$ {amount.ToString("F2", CultureInfo.GetCultureInfo("pt-BR"))}");
        string comparison = amount > DailyCap ? "maior que" : amount < DailyCap ? "menor que" : "igual ao";
        Console.WriteLine($"O valor calculado é {comparison} teto diário.");
      }
      break;
    case "2":
      if (ReadMinutes() is int durationMinutes)
      {
        var (hours, minutes) = SplitDuration(durationMinutes);
        Console.WriteLine($"{hours}h {minutes}min");
      }
      break;
    case "3":
      if (ReadMinutes() is int classificationMinutes)
      {
        string category = Classify(classificationMinutes);
        Console.WriteLine($"Classificação: {category}");
        if (category == "rotativa curta") shortCount++;
        else if (category == "rotativa padrão") standardCount++;
        else dailyCount++;
      }
      break;
    case "4":
      Console.WriteLine($"Versão do .NET: {Environment.Version}");
      Console.WriteLine("Com um runtime .NET compatível, a IL do programa pode ser traduzida para o código de máquina de outro sistema operacional.");
      break;
    case "5":
    case null:
      Console.WriteLine($"Rotativa curta: {shortCount}");
      Console.WriteLine($"Rotativa padrão: {standardCount}");
      Console.WriteLine($"Diária: {dailyCount}");
      break;
    default:
      Console.WriteLine("Opção inválida.");
      break;
  }
} while (option is not null && option != "5");

static int? ReadMinutes()
{
  Console.Write("Minutos estacionados: ");
  string? input = Console.ReadLine();
  if (!int.TryParse(input, out int minutes) || minutes < 0)
  {
    Console.WriteLine("Erro: informe um número inteiro não negativo de minutos.");
    return null;
  }
  return minutes;
}

static (int Hours, int Minutes) SplitDuration(int totalMinutes)
{
  return (totalMinutes / 60, totalMinutes % 60);
}

static string Classify(int totalMinutes)
{
  // Até 2 horas atende visitas rápidas; até 6 horas, permanências intermediárias.
  if (totalMinutes <= 120) return "rotativa curta";
  if (totalMinutes <= 360) return "rotativa padrão";
  return "diária";
}
