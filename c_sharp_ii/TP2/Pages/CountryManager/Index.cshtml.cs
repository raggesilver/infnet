using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace TP2.Pages.CountryManager;

public class Index : PageModel
{
  [BindProperty] public List<InputModel> Input { get; set; } = [];

  public string? SuccessMessage { get; set; }

  public void OnGet()
  {
    // Always initialize with 5 empty InputModels
    Input = CreateEmptyInputList();
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

    var countries = Input.Select(input => new Country
        { CountryCode = input.CountryCode, CountryName = input.CountryName })
      .ToList();

    var countryNames =
      countries.Select(country => country.CountryName).ToList();

    SuccessMessage = $"Países cadastrados: {string.Join(", ", countryNames)}";

    Console.WriteLine(countries);

    // Reset form
    ModelState.Clear();
    Input = CreateEmptyInputList();
    return Page();
  }

  private static List<InputModel> CreateEmptyInputList()
  {
    return Enumerable.Range(0, 5).Select(_ => new InputModel()).ToList();
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
  [Required(ErrorMessage = "O nome do país é obrigatório")]
  public string CountryName { get; set; } = string.Empty;

  [Required(ErrorMessage = "O código do país é obrigatório")]
  [StringLength(2, MinimumLength = 2,
    ErrorMessage = "O código do país deve ter 2 caracteres")]
  public string CountryCode { get; set; } = string.Empty;
}
