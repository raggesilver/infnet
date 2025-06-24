namespace AT;

public record Product(string Name, int Quantity, decimal Price)
{
  public static Product FromString(string csvLine)
  {
    var parts = csvLine.Split(',', 3);
    if (parts.Length != 3)
      throw new ArgumentException("Formato de linha inválido no arquivo");

    if (string.IsNullOrWhiteSpace(parts[0]))
      throw new ArgumentException("Nome do produto não pode ser vazio");

    if (!int.TryParse(parts[1], out var quantity) || quantity < 0)
      throw new ArgumentException(
        "Quantidade deve ser um número inteiro não negativo");

    if (!decimal.TryParse(parts[2], out var price) || price < 0)
      throw new ArgumentException(
        "Preço deve ser um número decimal não negativo");

    return new Product(parts[0].Trim(), quantity, price);
  }

  public string Serialize()
  {
    return $"{Name},{Quantity},{Price:F2}";
  }
}

public class Exercise09 : IExercise
{
  private const string FileName = "estoque.txt";
  private const int MaxProducts = 5;
  private List<Product> _products = [];

  public string Name => "Controle de Estoque via Linha de Comando";

  public void Run(string[] args)
  {
    _products = ReadProductsFromFile();

    while (true)
    {
      Console.WriteLine("=== Sistema de Controle de Estoque ===");
      Console.WriteLine("1. Inserir Produto");
      Console.WriteLine("2. Listar Produtos");
      Console.WriteLine("3. Sair");

      var option = Utils.ReadInt("\nEscolha uma opção: ",
        "Opção inválida",
        i => (i is >= 1 and <= 3, "Digite um número entre 1 e 3"));

      switch (option)
      {
        case 1:
          InsertProduct();
          break;
        case 2:
          ListProducts();
          break;
        case 3:
          return;
      }

      Console.WriteLine();
    }
  }

  private void InsertProduct()
  {
    if (_products.Count >= MaxProducts)
    {
      Console.WriteLine("Limite de produtos atingido!");
      return;
    }

    var name = Utils.ReadNonEmptyString("Nome do produto: ",
      "Nome é obrigatório",
      str => str.Contains(',')
        ? (false, "Nome não pode conter ','")
        : (true, null));
    var quantity = Utils.ReadInt("Quantidade em estoque: ",
      "Quantidade inválida",
      q => (q >= 0, "Quantidade deve ser não negativa"));
    var price = Utils.ReadFloat("Preço unitário: ",
      "Preço inválido",
      p => (p >= 0, "Preço deve ser não negativo"));

    var product = new Product(name, quantity, (decimal)price);
    _products.Add(product);

    WriteProductsToFile();
    Console.WriteLine("Produto cadastrado com sucesso!");
  }

  private void ListProducts()
  {
    if (_products.Count == 0)
    {
      Console.WriteLine("Nenhum produto cadastrado.");
      return;
    }

    Console.WriteLine("Produtos cadastrados:");
    foreach (var product in _products)
      Console.WriteLine(
        $"Produto: {product.Name} | Quantidade: {product.Quantity} | Preço: R$ {product.Price:F2}");
  }

  private List<Product> ReadProductsFromFile()
  {
    var products = new List<Product>();

    if (!File.Exists(FileName))
      return products;

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
          products.Add(Product.FromString(line));
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

    return products;
  }

  private void WriteProductsToFile()
  {
    try
    {
      using var writer = new StreamWriter(FileName);
      foreach (var product in _products) writer.WriteLine(product.Serialize());
    }
    catch (IOException ex)
    {
      Console.WriteLine($"Erro ao salvar arquivo: {ex.Message}");
    }
  }
}
