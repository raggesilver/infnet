using CityBreaks.Web.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CityBreaks.Web.Data.Configurations;

public class CityConfiguration : IEntityTypeConfiguration<City>
{
  public void Configure(EntityTypeBuilder<City> builder)
  {
    // O EF core já gerou os nomes das colunas, portanto não há necessidade de
    // usar .HasColumnName().

    // O exercício não pediu para que setassemos um tamanho máximo para o nome
    // de cidades, mas achei cabível de fazer.
    builder.Property(c => c.Name)
      .HasMaxLength(100);
  }
}
