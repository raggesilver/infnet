// Esboço standalone do VidaPet: menu em console, sem classes e sem coleções.
// Cada cadastro guarda só um contador e o último valor informado.
// Só RN01 e RN03 são validadas. RN02, RN04 e RN05 exigem listas de consultas (etapa 4).

using System.Globalization;

const int ConsultationMinutes = 30;
const int OpeningHour = 8;
const int ClosingHour = 18;

int animalCount = 0;
string lastAnimalName = "";
int veterinarianCount = 0;
string lastVeterinarianName = "";
int consultationCount = 0;
DateTime? lastConsultationStart = null;
int option;

do
{
  Console.WriteLine("\nVidaPet - Agendamento de consultas");
  Console.WriteLine("1 - Cadastrar animal");
  Console.WriteLine("2 - Cadastrar veterinário");
  Console.WriteLine("3 - Agendar consulta");
  Console.WriteLine("4 - Resumo");
  Console.WriteLine("0 - Sair");
  Console.Write("Escolha uma opção: ");

  var input = Console.ReadLine();
  option = input is null ? 0 : int.TryParse(input, out var parsed) ? parsed : -1;

  switch (option)
  {
    case 1:
    {
      string name = ReadNonEmpty("Nome do animal: ");
      string species = ReadSpecies();
      int age = ReadInt("Idade (anos): ", value => value >= 0);
      string tutor = ReadNonEmpty("Nome do tutor: ");
      string phone = ReadNonEmpty("Telefone do tutor: ");
      animalCount++;
      lastAnimalName = name;
      Console.WriteLine($"Animal cadastrado: {name} ({species}, {age} anos), tutor {tutor}, telefone {phone}.");
      break;
    }
    case 2:
    {
      string name = ReadNonEmpty("Nome do veterinário: ");
      string crmv = ReadNonEmpty("CRMV: ");
      veterinarianCount++;
      lastVeterinarianName = name;
      Console.WriteLine($"Veterinário cadastrado: {name}, CRMV {crmv}.");
      break;
    }
    case 3:
    {
      if (animalCount == 0 || veterinarianCount == 0)
      {
        Console.WriteLine("Cadastre ao menos um animal e um veterinário antes de agendar.");
        break;
      }
      Console.WriteLine($"Consulta de {lastAnimalName} com {lastVeterinarianName}.");
      DateTime date = ReadDate("Data (dd/mm/aaaa): ");
      TimeSpan time = ReadTime("Horário (hh:mm): ");
      DateTime start = date + time;
      string? refusal = GetRefusalReason(start, DateTime.Now);
      if (refusal is not null)
      {
        Console.WriteLine($"Consulta recusada: {refusal}");
        break;
      }
      consultationCount++;
      lastConsultationStart = start;
      Console.WriteLine($"Consulta agendada: {start:dd/MM/yyyy HH:mm} às {start.AddMinutes(ConsultationMinutes):HH:mm}.");
      break;
    }
    case 4:
      Console.WriteLine($"Animais cadastrados: {animalCount}");
      Console.WriteLine($"Último animal: {(animalCount == 0 ? "nenhum" : lastAnimalName)}");
      Console.WriteLine($"Veterinários cadastrados: {veterinarianCount}");
      Console.WriteLine($"Último veterinário: {(veterinarianCount == 0 ? "nenhum" : lastVeterinarianName)}");
      Console.WriteLine($"Consultas agendadas: {consultationCount}");
      Console.WriteLine($"Última consulta: {(lastConsultationStart is DateTime last ? last.ToString("dd/MM/yyyy HH:mm") : "nenhuma")}");
      break;
    case 0:
      Console.WriteLine("Até logo.");
      break;
    default:
      Console.WriteLine("Opção inválida.");
      break;
  }
} while (option != 0);

static string? GetRefusalReason(DateTime start, DateTime now)
{
  if (start < now) return "a data e o horário já passaram (RN03).";
  if (start.DayOfWeek is DayOfWeek.Saturday or DayOfWeek.Sunday)
  {
    return "o atendimento é de segunda a sexta (RN01).";
  }
  TimeSpan end = start.TimeOfDay + TimeSpan.FromMinutes(ConsultationMinutes);
  if (start.TimeOfDay < TimeSpan.FromHours(OpeningHour) || end > TimeSpan.FromHours(ClosingHour))
  {
    return $"a consulta deve acontecer entre {OpeningHour}h e {ClosingHour}h (RN01).";
  }
  if (start.Minute % ConsultationMinutes != 0)
  {
    return "os horários começam em :00 ou :30 (A01).";
  }
  return null;
}

static string ReadNonEmpty(string message)
{
  while (true)
  {
    Console.Write(message);
    string input = (Console.ReadLine() ?? "").Trim();
    if (input.Length > 0) return input;
    Console.WriteLine("O campo não pode ficar vazio.");
  }
}

static int ReadInt(string message, Func<int, bool> isValid)
{
  while (true)
  {
    Console.Write(message);
    if (int.TryParse(Console.ReadLine(), out int result) && isValid(result)) return result;
    Console.WriteLine("Número inválido.");
  }
}

static string ReadSpecies()
{
  while (true)
  {
    Console.Write("Espécie (C = cão, G = gato): ");
    string input = (Console.ReadLine() ?? "").Trim().ToUpper();
    if (input == "C") return "cão";
    if (input == "G") return "gato";
    Console.WriteLine("Espécie inválida. Informe C ou G.");
  }
}

static DateTime ReadDate(string message)
{
  while (true)
  {
    Console.Write(message);
    if (DateTime.TryParseExact(Console.ReadLine(), "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime result))
    {
      return result;
    }
    Console.WriteLine("Data inválida. Use o formato dd/mm/aaaa.");
  }
}

static TimeSpan ReadTime(string message)
{
  while (true)
  {
    Console.Write(message);
    if (TimeSpan.TryParseExact(Console.ReadLine(), @"hh\:mm", CultureInfo.InvariantCulture, out TimeSpan result))
    {
      return result;
    }
    Console.WriteLine("Horário inválido. Use o formato hh:mm.");
  }
}
