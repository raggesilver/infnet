using CityBreaks.Web.Data.Configurations;
using CityBreaks.Web.Models;
using Microsoft.EntityFrameworkCore;

namespace CityBreaks.Web.Data;

public class CityBreaksContext(DbContextOptions<CityBreaksContext> options)
  : DbContext(options)
{
  public DbSet<Country> Countries { get; set; }
  public DbSet<City> Cities { get; set; }
  public DbSet<Property> Properties { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.ApplyConfiguration(new CountryConfiguration());
    modelBuilder.ApplyConfiguration(new CityConfiguration());
    modelBuilder.ApplyConfiguration(new PropertyConfiguration());

    base.OnModelCreating(modelBuilder);
  }
}
