using CityBreaks.Web.Data;
using CityBreaks.Web.Models;
using Microsoft.EntityFrameworkCore;

namespace CityBreaks.Web.Services;

public class CityService(CityBreaksContext context) : ICityService
{
  public async Task<List<City>> GetAllAsync()
  {
    return await context.Cities
      .Include(c => c.Country)
      .Include(c => c.Properties)
      .ToListAsync();
  }

  public async Task<City?> GetByNameAsync(string name)
  {
    return await context.Cities
      .Include(c => c.Country)
      .Include(c => c.Properties)
      .FirstOrDefaultAsync(c => EF.Functions.Collate(c.Name, "NOCASE") == EF.Functions.Collate(name, "NOCASE"));
  }
}
