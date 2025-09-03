using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace TP2.Pages.CityManager;

public class Index : PageModel
{
  [BindProperty]
  [Required(ErrorMessage = "O nome da cidade é obrigatório")]
  [StringLength(100, MinimumLength = 2, ErrorMessage = "O nome da cidade deve ter entre 2 e 100 caracteres")]
  public string CityName { get; set; } = string.Empty;

  public void OnGet()
  {
    CityName = string.Empty;
  }

  public IActionResult OnPost()
  {
    if (!ModelState.IsValid)
    {
      return Page();
    }

    // Log or process the city registration
    Console.WriteLine($"Cidade submetida: {CityName}");

    return Page();
  }
}
