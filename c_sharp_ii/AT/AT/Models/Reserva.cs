using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using AT.Events;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.EntityFrameworkCore;

namespace AT.Models;

public class Reserva
{
  public int Id { get; set; }

  [Required(ErrorMessage = "Cliente é obrigatório")]
  public int ClienteId { get; set; }

  [Required(ErrorMessage = "Pacote é obrigatório")]
  public int PacoteTuristicoId { get; set; }

  public DateTime DataReserva { get; set; }

  [Column(TypeName = "decimal(18,2)")] public decimal Total { get; set; }

  public bool IsDeleted { get; set; } = false;

  [Column(TypeName = "datetime2")] public DateTime? DeletedAt { get; set; }

  [ValidateNever]
  [DeleteBehavior(DeleteBehavior.Restrict)]
  public Cliente Cliente { get; set; }

  [ValidateNever]
  [DeleteBehavior(DeleteBehavior.Restrict)]
  public PacoteTuristico PacoteTuristico { get; set; }

  public static event EventHandler<CapacidadeMaximaAlcancada>? CapacityReached;

  public static void OnCapacityReached(int pacoteId, int capacidadeMaxima,
    int totalReservas)
  {
    CapacityReached?.Invoke(null,
      new CapacidadeMaximaAlcancada(pacoteId, capacidadeMaxima, totalReservas));
  }
}
