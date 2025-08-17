using CsvHelper.Configuration.Attributes;

namespace TP3.Models
{
  public class Product
  {
    [Name("id")]
    public int Id { get; set; }

    [Name("name")]
    public string Name { get; set; } = string.Empty;

    [Name("description")]
    public string Description { get; set; } = string.Empty;

    [Name("price")]
    public decimal Price { get; set; }

    [Name("stock_quantity")]
    public int StockQuantity { get; set; }

    [Name("created_at")]
    public DateTime CreatedAt { get; set; }

    [Name("updated_at")]
    public DateTime UpdatedAt { get; set; }
  }
}
