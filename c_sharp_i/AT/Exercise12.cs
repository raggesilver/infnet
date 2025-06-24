using System.Text.RegularExpressions;

namespace AT;

public abstract class ContactFormatter
{
  public abstract void DisplayContacts(List<Contact> contacts);
}

public class MarkdownFormatter : ContactFormatter
{
  public override void DisplayContacts(List<Contact> contacts)
  {
    Console.WriteLine("## Lista de Contatos\n");
    foreach (var contact in contacts)
    {
      Console.WriteLine($"- **Nome:** {contact.Name}");
      Console.WriteLine($"- Telefone: {contact.Phone}");
      Console.WriteLine($"- Email: {contact.Email}\n");
    }
  }
}

public class TableFormatter : ContactFormatter
{
  public override void DisplayContacts(List<Contact> contacts)
  {
    Console.WriteLine(
      "----------------------------------------------------------------------");
    Console.WriteLine(
      "| Nome                 | Telefone        | Email                     |");
    Console.WriteLine(
      "----------------------------------------------------------------------");
    foreach (var contact in contacts)
      Console.WriteLine(
        $"| {contact.Name,-20} | {contact.Phone,-15} | {contact.Email,-25} |");
    Console.WriteLine(
      "----------------------------------------------------------------------");
  }
}

public class RawTextFormatter : ContactFormatter
{
  public override void DisplayContacts(List<Contact> contacts)
  {
    foreach (var contact in contacts)
      Console.WriteLine(
        $"Nome: {contact.Name} | Telefone: {contact.Phone} | Email: {contact.Email}");
  }
}

public class Exercise12 : IExercise
{
  private const string FileName = "contatos.txt";

  private static readonly Regex PhoneRegex =
    new(@"^(\(\d\d\)|\d\d)\s?\d{5}(\s|-)\d{4}$");

  private static readonly Regex EmailRegex = new(@"[a-zA-Z0-9_-]+@\w+(\.\w+)+");
  private List<Contact> _contacts = [];

  public string Name =>
    "Manipulação de Arquivos com Herança e Polimorfismo - Formatos de Exibição";

  public void Run(string[] args)
  {
    _contacts = ReadContactsFromFile();

    while (true)
    {
      Console.WriteLine("=== Gerenciador de Contatos ===");
      Console.WriteLine("1 - Adicionar novo contato");
      Console.WriteLine("2 - Listar contatos cadastrados");
      Console.WriteLine("3 - Sair");

      var option = Utils.ReadInt("\nEscolha uma opção: ",
        "Opção inválida",
        i => i is >= 1 and <= 3
          ? (true, null)
          : (false, "Digite um número entre 1 e 3"));

      switch (option)
      {
        case 1:
          AddContact();
          break;
        case 2:
          ListContacts();
          break;
        case 3:
          return;
      }

      Console.WriteLine();
    }
  }

  private void AddContact()
  {
    var name = Utils.ReadNonEmptyString("Nome: ",
      "Nome é obrigatório",
      str => str.Contains(',')
        ? (false, "Nome não pode conter ','")
        : (true, null));

    var phone = Utils.ReadFormattedString("Telefone: ", PhoneRegex,
      "Formato de telefone inválido. Use: (21) 99999-9999 ou 21 99999-9999");

    var email = Utils.ReadFormattedString("Email: ", EmailRegex,
      "Formato de email inválido");

    var contact = new Contact(name, phone, email);
    _contacts.Add(contact);

    WriteContactsToFile();
    Console.WriteLine("Contato cadastrado com sucesso!");
  }

  private void ListContacts()
  {
    if (_contacts.Count == 0)
    {
      Console.WriteLine("Nenhum contato cadastrado.");
      return;
    }

    Console.WriteLine("Escolha o formato de exibição:");
    Console.WriteLine("1 - Markdown");
    Console.WriteLine("2 - Tabela");
    Console.WriteLine("3 - Texto Puro");

    var formatOption = Utils.ReadInt("\nFormato: ",
      "Formato inválido",
      i => i is >= 1 and <= 3
        ? (true, null)
        : (false, "Digite um número entre 1 e 3"));

    ContactFormatter formatter = formatOption switch
    {
      1 => new MarkdownFormatter(),
      2 => new TableFormatter(),
      3 => new RawTextFormatter(),
      _ => new RawTextFormatter()
    };

    Console.WriteLine("\nContatos cadastrados:");
    formatter.DisplayContacts(_contacts);
  }

  private List<Contact> ReadContactsFromFile()
  {
    var contacts = new List<Contact>();

    if (!File.Exists(FileName))
      return contacts;

    try
    {
      using var reader = new StreamReader(FileName);
      string? line;
      while ((line = reader.ReadLine()) != null)
      {
        if (string.IsNullOrWhiteSpace(line))
          continue;

        try
        {
          contacts.Add(Contact.FromString(line));
        }
        catch (ArgumentException ex)
        {
          Console.WriteLine($"Erro ao ler linha do arquivo: {ex.Message}");
        }
      }
    }
    catch (IOException ex)
    {
      Console.WriteLine($"Erro ao ler arquivo: {ex.Message}");
    }

    return contacts;
  }

  private void WriteContactsToFile()
  {
    try
    {
      using var writer = new StreamWriter(FileName);
      foreach (var contact in _contacts) writer.WriteLine(contact.Serialize());
    }
    catch (IOException ex)
    {
      Console.WriteLine($"Erro ao salvar arquivo: {ex.Message}");
    }
  }
}
