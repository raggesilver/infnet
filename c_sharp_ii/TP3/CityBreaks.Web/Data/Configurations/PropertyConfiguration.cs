using CityBreaks.Web.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CityBreaks.Web.Data.Configurations;

public class PropertyConfiguration : IEntityTypeConfiguration<Property>
{
  public void Configure(EntityTypeBuilder<Property> builder)
  {
    // O EF core já gerou os nomes das colunas, portanto não há necessidade de
    // usar .HasColumnName().
    builder.Property(c => c.Name)
      .HasMaxLength(100);
  }
}
