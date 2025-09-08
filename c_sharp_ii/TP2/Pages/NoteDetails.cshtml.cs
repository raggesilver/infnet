using Microsoft.AspNetCore.Mvc.RazorPages;
using static TP2.Constants;

namespace TP2.Pages;

public class NoteDetails(IWebHostEnvironment webHostEnvironment) : PageModel
{
  public string? Note { get; set; }

  public void OnGet()
  {
    var wwwRootPath = webHostEnvironment.WebRootPath;
    var notesPath = Path.Combine(wwwRootPath, NotesDirectory);
    var note = Path.Combine(notesPath, RouteData.Values["noteId"]?.ToString()!);

    try
    {
      var content = System.IO.File.ReadAllText(note);
      Note = content;
    }
    catch (FileNotFoundException)
    {
    }
  }
}
