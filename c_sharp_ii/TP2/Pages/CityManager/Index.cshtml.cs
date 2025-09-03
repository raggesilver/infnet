using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace TP2.Pages.CityManager;

public class Index : PageModel
{
  // Property to display the submitted city name (not bound)
  public string? SubmittedCityName { get; set; }

  public void OnGet()
  {
    // Initialize page for GET request
    SubmittedCityName = null;
  }

  public IActionResult OnPost(string cityName)
  {
    // Basic validation
    if (string.IsNullOrWhiteSpace(cityName))
    {
      ModelState.AddModelError("cityName", "O nome da cidade é obrigatório");
      return Page();
    }

    if (cityName.Length is < 2 or > 100)
    {
      ModelState.AddModelError("cityName",
        "O nome da cidade deve ter entre 2 e 100 caracteres");
      return Page();
    }

    // Store the submitted city name to display in the success message
    SubmittedCityName = cityName;

    // Log or process the city registration
    Console.WriteLine($"Cidade turística recebida: {cityName}");

    return Page();
  }
}
