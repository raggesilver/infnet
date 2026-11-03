int shortCount = 0;
int standardCount = 0;
int dailyCount = 0;

while (true)
{
  Console.Write("Minutos estacionados (-1 para sair): ");
  string? input = Console.ReadLine();
  if (input is null)
  {
    break;
  }

  if (!int.TryParse(input, out int totalMinutes))
  {
    Console.WriteLine("Erro: informe um número inteiro de minutos.");
    continue;
  }

  if (totalMinutes == -1)
  {
    break;
  }

  if (totalMinutes < 0)
  {
    Console.WriteLine("Erro: o tempo de permanência não pode ser negativo.");
    continue;
  }

  // Até 2 horas atende visitas rápidas; até 6 horas, permanências intermediárias.
  if (totalMinutes <= 120)
  {
    Console.WriteLine("Classificação: rotativa curta");
    shortCount++;
  }
  else if (totalMinutes <= 360)
  {
    Console.WriteLine("Classificação: rotativa padrão");
    standardCount++;
  }
  else
  {
    Console.WriteLine("Classificação: diária");
    dailyCount++;
  }
}

Console.WriteLine($"Rotativa curta: {shortCount}");
Console.WriteLine($"Rotativa padrão: {standardCount}");
Console.WriteLine($"Diária: {dailyCount}");
