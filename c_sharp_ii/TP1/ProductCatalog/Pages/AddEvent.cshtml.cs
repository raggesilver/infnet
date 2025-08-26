using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using ProductCatalog.Models;

namespace ProductCatalog.Pages;

public class AddEventModel : PageModel
{
  [BindProperty] public string EventTitle { get; set; } = string.Empty;

  [BindProperty] public DateTime EventDate { get; set; } = DateTime.Now;

  [BindProperty] public string EventLocation { get; set; } = string.Empty;

  public string SuccessMessage { get; set; } = string.Empty;

  public List<Event> RegisteredEvents { get; set; } = new();

  public static Action<Event>? EventCreatedLogger { get; set; }

  static AddEventModel()
  {
    EventCreatedLogger = LogEventCreation;
  }

  public void OnGet()
  {
    LoadRegisteredEvents();
  }

  public IActionResult OnPost()
  {
    if (ModelState.IsValid)
    {
      var newEvent = new Event
      {
        Title = EventTitle,
        Date = EventDate,
        Location = EventLocation
      };

      SaveEvent(newEvent);

      EventCreatedLogger?.Invoke(newEvent);

      SuccessMessage = $"Evento '{EventTitle}' cadastrado com sucesso!";

      EventTitle = string.Empty;
      EventDate = DateTime.Now;
      EventLocation = string.Empty;
    }

    LoadRegisteredEvents();
    return Page();
  }

  private static void LogEventCreation(Event evt)
  {
    Console.WriteLine($"[{DateTime.Now:yyyy-MM-dd HH:mm:ss}] EVENTO CRIADO:");
    Console.WriteLine($"  Título: {evt.Title}");
    Console.WriteLine($"  Data: {evt.Date:dd/MM/yyyy HH:mm}");
    Console.WriteLine($"  Local: {evt.Location}");
    Console.WriteLine();
  }

  private void SaveEvent(Event evt)
  {
    var events = GetStoredEvents();
    events.Add(evt);

    HttpContext.Session.SetString("Events",
      System.Text.Json.JsonSerializer.Serialize(events));
  }

  private void LoadRegisteredEvents()
  {
    RegisteredEvents = GetStoredEvents();
  }

  private List<Event> GetStoredEvents()
  {
    var eventsJson = HttpContext.Session.GetString("Events");
    if (string.IsNullOrEmpty(eventsJson))
    {
      return new List<Event>();
    }

    try
    {
      return System.Text.Json.JsonSerializer.Deserialize<List<Event>>(
        eventsJson) ?? new List<Event>();
    }
    catch
    {
      return new List<Event>();
    }
  }
}
