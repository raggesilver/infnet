using CityBreaks.Web.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CityBreaks.Web.Data.Configurations;

public class CountryConfiguration : IEntityTypeConfiguration<Country>
{
  public void Configure(EntityTypeBuilder<Country> builder)
  {
    // O EF core já gerou os nomes das colunas, portanto não há necessidade de
    // usar .HasColumnName().
    builder.Property(c => c.CountryName)
      .HasMaxLength(100);
  }
}
