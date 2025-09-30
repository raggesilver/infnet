using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AT.Models;

public class PacoteTuristico
{
  public delegate decimal CalculateDelegate(decimal price);

  public int Id { get; set; }

  [Required(ErrorMessage = "Título é obrigatório")]
  [MinLength(3, ErrorMessage = "Título deve ter pelo menos 3 caracteres")]
  [MaxLength(200)]
  public string Titulo { get; set; }

  public DateTime DataInicio { get; set; }

  [Range(1, int.MaxValue, ErrorMessage = "Capacidade deve ser ao menos 1")]
  public int CapacidadeMaxima { get; set; }

  [Range(0, double.MaxValue, ErrorMessage = "Preço deve ser não-negativo")]
  [Column(TypeName = "decimal(18,2)")]
  public decimal Preco { get; set; }

  public List<PacoteDestino> PacoteDestinos { get; set; } = [];

  public void AplicarDesconto(CalculateDelegate calculator)
  {
    Preco = calculator(Preco);
  }

  // FIXME: use lambda instead
  public static decimal DescontoDezPorCento(decimal price)
  {
    return price * 0.90m;
  }
}
