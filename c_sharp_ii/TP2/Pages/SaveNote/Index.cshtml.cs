using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using static TP2.Constants;

namespace TP2.Pages.SaveNote;

public class Index(IWebHostEnvironment webHostEnvironment) : PageModel
{
  [BindProperty] public InputModel Input { get; set; } = new();
  public string? DownloadLink { get; set; }

  public void OnGet()
  {
  }

  public async Task<IActionResult> OnPost()
  {
    if (!ModelState.IsValid) return Page();

    // Get the wwwroot path
    var wwwRootPath = webHostEnvironment.WebRootPath;
    var now = DateTimeOffset.Now.ToUnixTimeSeconds();
    var filePath = Path.Combine(wwwRootPath, NotesDirectory, $"note-{now}.txt");

    Directory.CreateDirectory(Path.GetDirectoryName(filePath)!);

    try
    {
      await System.IO.File.WriteAllTextAsync(filePath, Input.Content);

      // Direct download link
      var fileName = Path.GetFileName(filePath);
      var downloadLink = $"/{NotesDirectory}/{fileName}";
      DownloadLink = downloadLink;
      return Page();
    }
    catch (Exception e)
    {
      Console.WriteLine(e);
      ModelState.AddModelError(string.Empty, "Erro ao salvar a nota.");
      return Page();
    }
  }
}

public class InputModel
{
  [Required]
  [StringLength(50 * 1024 * 1024, MinimumLength = 10,
    ErrorMessage =
      "Notas não podem estar vazias. Devem conter no mínimo 10 caracteres e no máximo 50 MB.")]
  public string Content { get; set; } = string.Empty;
}
