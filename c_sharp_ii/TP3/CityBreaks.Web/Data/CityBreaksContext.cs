using CityBreaks.Web.Models;
using Microsoft.EntityFrameworkCore;

namespace CityBreaks.Web.Data;

public class CityBreaksContext : DbContext
{
  public CityBreaksContext(DbContextOptions<CityBreaksContext> options) :
    base(options)
  {
  }

  public DbSet<Country> Countries { get; set; }
}
