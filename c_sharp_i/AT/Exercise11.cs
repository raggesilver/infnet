using System.Text.RegularExpressions;

namespace AT;

public record Contact(string Name, string Phone, string Email)
{
  public static Contact FromString(string csvLine)
  {
    var parts = csvLine.Split(',', 3);
    if (parts.Length != 3)
      throw new ArgumentException("Formato de linha inválido no arquivo");

    if (string.IsNullOrWhiteSpace(parts[0]))
      throw new ArgumentException("Nome do contato não pode ser vazio");

    if (string.IsNullOrWhiteSpace(parts[1]))
      throw new ArgumentException("Telefone do contato não pode ser vazio");

    if (string.IsNullOrWhiteSpace(parts[2]))
      throw new ArgumentException("Email do contato não pode ser vazio");

    return new Contact(parts[0].Trim(), parts[1].Trim(), parts[2].Trim());
  }

  public string Serialize()
  {
    return $"{Name},{Phone},{Email}";
  }
}

public class Exercise11 : IExercise
{
  private const string FileName = "contatos.txt";

  private static readonly Regex PhoneRegex =
    new(@"^(\(\d\d\)|\d\d)\s?\d{5}(\s|-)?\d{4}$");

  private static readonly Regex EmailRegex = new(@"[a-zA-Z0-9_-]+@\w+(\.\w+)+");
  private List<Contact> _contacts = [];

  public string Name =>
    "Manipulação de Arquivos - Cadastro e Listagem de Contatos";

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

    Console.WriteLine("Contatos cadastrados:");
    foreach (var contact in _contacts)
      Console.WriteLine(
        $"Nome: {contact.Name} | Telefone: {contact.Phone} | Email: {contact.Email}");
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
