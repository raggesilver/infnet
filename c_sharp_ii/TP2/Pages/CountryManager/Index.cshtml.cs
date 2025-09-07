using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace TP2.Pages.CountryManager;

public class Index : PageModel
{
  [BindProperty] public InputModel Input { get; set; } = new();

  public string? SuccessMessage { get; set; }

  public void OnGet()
  {
    // Initialize page for GET request
    Input = new InputModel();
    SuccessMessage = null;
  }

  public IActionResult OnPost()
  {
    // Check if the model state is valid based on Data Annotations
    if (!ModelState.IsValid)
    {
      // Return the page with validation errors
      return Page();
    }

    var country = new Country
      { CountryCode = Input.CountryCode, CountryName = Input.CountryName };

    SuccessMessage =
      $"{country.CountryName} ({country.CountryCode}) foi cadastrado com sucesso!";

    Console.WriteLine(country);

    // Reset form
    ModelState.Clear();
    Input = new InputModel();
    return Page();
  }
}

public class Country
{
  public required string CountryName { get; set; }
  public required string CountryCode { get; set; }

  public override string ToString()
  {
    return $"Country <{CountryName} ({CountryCode})>";
  }
}

public class InputModel
{
  public string CountryName { get; set; } = string.Empty;
  public string CountryCode { get; set; } = string.Empty;
}
