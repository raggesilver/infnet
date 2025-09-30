using AT.Data;
using AT.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace AT.Controllers;

public class ReservaController : Controller
{
  private readonly AtContext _context;

  public ReservaController(AtContext context)
  {
    _context = context;
  }

  // GET: Reserva
  public async Task<IActionResult> Index()
  {
    var atContext = _context.Reservas.Include(r => r.Cliente)
      .Include(r => r.PacoteTuristico);
    return View(await atContext.ToListAsync());
  }

  // GET: Reserva/Details/5
  public async Task<IActionResult> Details(int? id)
  {
    if (id == null)
    {
      return NotFound();
    }

    var reserva = await _context.Reservas
      .Include(r => r.Cliente)
      .Include(r => r.PacoteTuristico)
      .FirstOrDefaultAsync(m => m.Id == id);
    if (reserva == null)
    {
      return NotFound();
    }

    return View(reserva);
  }

  // GET: Reserva/Create
  public IActionResult Create()
  {
    ViewData["ClienteId"] = new SelectList(
      _context.Clients.Select(c => new
      {
        c.Id,
        Display = $"{c.Nome} ({c.Id})"
      }),
      "Id",
      "Display");

    ViewData["PacoteTuristicoId"] =
      new SelectList(_context.PacotesTuristicos, "Id", "Titulo");
    return View();
  }

  // POST: Reserva/Create
  // To protect from overposting attacks, enable the specific properties you want to bind to.
  // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
  [HttpPost]
  [ValidateAntiForgeryToken]
  public async Task<IActionResult> Create(
    [Bind(
      "Id,ClienteId,PacoteTuristicoId,DataReserva,Total,IsDeleted,DeletedAt")]
    Reserva reserva)
  {
    if (ModelState.IsValid)
    {
      var pacote =
        await _context.PacotesTuristicos.FindAsync(reserva.PacoteTuristicoId);
      var totalReservas = _context.Reservas
        .Count(r => r.PacoteTuristicoId == reserva.PacoteTuristicoId &&
                    !r.IsDeleted);

      if (totalReservas + 1 > pacote?.CapacidadeMaxima)
      {
        Reserva.OnCapacityReached(pacote.Id, pacote.CapacidadeMaxima,
          totalReservas);

        ModelState.AddModelError(string.Empty,
          $"Capacidade máxima de {pacote.CapacidadeMaxima} excedida para este pacote. Total atual: {totalReservas}");

        ViewData["ClienteId"] = new SelectList(_context.Clients, "Id", "Email",
          reserva.ClienteId);
        ViewData["PacoteTuristicoId"] = new SelectList(
          _context.PacotesTuristicos, "Id", "Titulo",
          reserva.PacoteTuristicoId);
        return View(reserva);
      }

      _context.Add(reserva);
      await _context.SaveChangesAsync();
      return RedirectToAction(nameof(Index));
    }

    ViewData["ClienteId"] = new SelectList(_context.Clients, "Id", "Email",
      reserva.ClienteId);
    ViewData["PacoteTuristicoId"] = new SelectList(_context.PacotesTuristicos,
      "Id", "Titulo", reserva.PacoteTuristicoId);
    return View(reserva);
  }

  // GET: Reserva/Edit/5
  public async Task<IActionResult> Edit(int? id)
  {
    if (id == null)
    {
      return NotFound();
    }

    var reserva = await _context.Reservas.FindAsync(id);
    if (reserva == null)
    {
      return NotFound();
    }

    ViewData["ClienteId"] = new SelectList(_context.Clients, "Id", "Email",
      reserva.ClienteId);
    ViewData["PacoteTuristicoId"] = new SelectList(_context.PacotesTuristicos,
      "Id", "Titulo", reserva.PacoteTuristicoId);
    return View(reserva);
  }

  // POST: Reserva/Edit/5
  // To protect from overposting attacks, enable the specific properties you want to bind to.
  // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
  [HttpPost]
  [ValidateAntiForgeryToken]
  public async Task<IActionResult> Edit(int id,
    [Bind(
      "Id,ClienteId,PacoteTuristicoId,DataReserva,Total,IsDeleted,DeletedAt")]
    Reserva reserva)
  {
    if (id != reserva.Id)
    {
      return NotFound();
    }

    if (ModelState.IsValid)
    {
      try
      {
        _context.Update(reserva);
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!ReservaExists(reserva.Id))
        {
          return NotFound();
        }

        throw;
      }

      return RedirectToAction(nameof(Index));
    }

    ViewData["ClienteId"] = new SelectList(_context.Clients, "Id", "Email",
      reserva.ClienteId);
    ViewData["PacoteTuristicoId"] = new SelectList(_context.PacotesTuristicos,
      "Id", "Titulo", reserva.PacoteTuristicoId);
    return View(reserva);
  }

  // GET: Reserva/Delete/5
  public async Task<IActionResult> Delete(int? id)
  {
    if (id == null)
    {
      return NotFound();
    }

    var reserva = await _context.Reservas
      .Include(r => r.Cliente)
      .Include(r => r.PacoteTuristico)
      .FirstOrDefaultAsync(m => m.Id == id);
    if (reserva == null)
    {
      return NotFound();
    }

    return View(reserva);
  }

  // POST: Reserva/Delete/5
  [HttpPost]
  [ActionName("Delete")]
  [ValidateAntiForgeryToken]
  public async Task<IActionResult> DeleteConfirmed(int id)
  {
    var reserva = await _context.Reservas.FindAsync(id);
    if (reserva != null)
    {
      // _soft delete_
      reserva.IsDeleted = true;
      reserva.DeletedAt = DateTime.Now;
      _context.Update(reserva);
    }

    await _context.SaveChangesAsync();
    return RedirectToAction(nameof(Index));
  }

  private bool ReservaExists(int id)
  {
    return _context.Reservas.Any(e => e.Id == id);
  }
}
