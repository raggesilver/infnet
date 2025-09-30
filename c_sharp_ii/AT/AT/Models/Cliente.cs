using System.ComponentModel.DataAnnotations;

namespace AT.Models;

public class Cliente
{
  public int Id { get; set; }

  [Required(ErrorMessage = "Nome é obrigatório")]
  [MinLength(3, ErrorMessage = "Nome deve conter pelo menos 3 caracteres")]
  [MaxLength(150)]
  public string Nome { get; set; }

  [Required(ErrorMessage = "Email é obrigatório")]
  [EmailAddress(ErrorMessage = "Email inválido")]
  [MaxLength(200)]
  public string Email { get; set; }

  public Endereco? Endereco { get; set; }


  public List<Reserva> Reservas { get; set; } = [];
}
