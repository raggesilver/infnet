using Microsoft.AspNetCore.Mvc.RazorPages;
using static TP2.Constants;

namespace TP2.Pages;

public class Notes(IWebHostEnvironment webHostEnvironment) : PageModel
{
  public List<string> NotesList { get; set; } = [];

  public void OnGet()
  {
    var wwwRootPath = webHostEnvironment.WebRootPath;
    var notesPath = Path.Combine(wwwRootPath, NotesDirectory);
    var notes =
      Directory.GetFiles(notesPath, "*.txt", SearchOption.TopDirectoryOnly);

    var prefix = notesPath + "/";
    NotesList = notes.Select(note => note.Replace(prefix, string.Empty))
      .ToList();
  }
}
