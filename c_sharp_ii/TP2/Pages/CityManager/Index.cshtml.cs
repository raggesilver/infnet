using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace TP2.Pages.CityManager;

public class Index : PageModel
{
  [BindProperty] public InputModel Input { get; set; } = new();

  // Property to track if the form was successfully submitted
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

    // If validation passes, process the city registration
    SuccessMessage = $"Cidade \"{Input.CityName}\" foi cadastrada com sucesso!";

    Console.WriteLine($"Cidade turística cadastrada: {Input.CityName}");

    // Reset the form after successful submission
    Input = new InputModel();

    return Page();
  }

  // Nested InputModel class with Data Annotations
  public class InputModel
  {
    [Required(ErrorMessage = "O nome da cidade é obrigatório")]
    [MinLength(3,
      ErrorMessage = "O nome da cidade deve ter no mínimo 3 caracteres")]
    [StringLength(100,
      ErrorMessage = "O nome da cidade deve ter no máximo 100 caracteres")]
    public string CityName { get; set; } = string.Empty;
  }
}
