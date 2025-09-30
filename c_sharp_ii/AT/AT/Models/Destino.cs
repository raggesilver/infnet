using System.ComponentModel.DataAnnotations;

namespace AT.Models;

public class Destino
{
  public int Id { get; set; }

  [Required]
  [MinLength(2, ErrorMessage = "Nome deve ter ao menos 2 caracteres")]
  [MaxLength(100)]
  public string Nome { get; set; }

  [Required]
  [MinLength(2, ErrorMessage = "País deve ter ao menos 2 caracteres")]
  [MaxLength(100)]
  public string Pais { get; set; }

  public List<PacoteDestino> PacoteDestinos { get; set; } = [];
}
