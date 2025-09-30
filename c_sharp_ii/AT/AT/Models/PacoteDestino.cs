using Microsoft.EntityFrameworkCore;

namespace AT.Models;

[PrimaryKey(nameof(PacoteTuristicoId), nameof(DestinoId))]
public class PacoteDestino
{
  public int PacoteTuristicoId { get; set; }

  public int DestinoId { get; set; }

  public PacoteTuristico PacoteTuristico { get; set; } = default!;
  public Destino Destino { get; set; } = default!;
}
