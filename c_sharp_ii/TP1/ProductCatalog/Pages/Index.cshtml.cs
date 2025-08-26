using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace ProductCatalog.Pages;

public class Product
{
  public string Name { get; set; } = string.Empty;
  public decimal Price { get; set; }
}

public class IndexModel : PageModel
{
  private readonly ILogger<IndexModel> _logger;

  public IndexModel(ILogger<IndexModel> logger)
  {
    _logger = logger;
  }

  public List<Product> Products { get; set; } = new();

  public void OnGet()
  {
    Products = new List<Product>
    {
      new Product { Name = "Smartphone Samsung Galaxy S24", Price = 2999.99m },
      new Product { Name = "Notebook Dell Inspiron 15", Price = 3499.99m },
      new Product { Name = "Fone de Ouvido JBL Tune 510BT", Price = 199.99m }
    };
  }
}
