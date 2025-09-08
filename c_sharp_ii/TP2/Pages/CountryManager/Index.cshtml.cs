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
    // If validation from data annotations failed, don't even try checking
    // country code rules.
    if (!ModelState.IsValid) return Page();

    for (var i = 0; i < Input.Count; i++)
    {
      if (Input[i].CountryName.ToLower()[0] !=
          Input[i].CountryCode.ToLower()[0])
      {
        ModelState.AddModelError($"Input[{i}].CountryCode",
          "O código do país deve começar com a mesma inicial do nome do país");
      }
    }

    if (!ModelState.IsValid) return Page();

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
