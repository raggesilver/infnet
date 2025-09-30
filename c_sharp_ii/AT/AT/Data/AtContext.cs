using AT.Models;
using Microsoft.EntityFrameworkCore;

namespace AT.Data;

public class AtContext(DbContextOptions<AtContext> options)
  : DbContext(options)
{
  public DbSet<Cliente> Clients { get; set; }
  public DbSet<Destino> Destinos { get; set; }
  public DbSet<PacoteTuristico> PacotesTuristicos { get; set; }
  public DbSet<Reserva> Reservas { get; set; }
  public DbSet<PacoteDestino> PacoteDestinos { get; set; }

  protected override void OnModelCreating(ModelBuilder builder)
  {
    base.OnModelCreating(builder);

    // Não dá para fazer com Data Annotations
    builder.Entity<Reserva>()
      .HasQueryFilter(r => !r.IsDeleted);
  }
}
