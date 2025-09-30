using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace AT.Models;

[Owned]
public class Endereco
{
  [Required(ErrorMessage = "Logradouro é obrigatório")]
  [MinLength(3, ErrorMessage = "Logradouro deve ter ao menos 3 caracteres")]
  [MaxLength(200)]
  public string Logradouro { get; set; }

  [Required(ErrorMessage = "Cidade é obrigatória")]
  [MinLength(2, ErrorMessage = "Cidade deve ter ao menos 2 caracteres")]
  [MaxLength(100)]
  public string Cidade { get; set; }

  [Required(ErrorMessage = "Estado é obrigatório")]
  [StringLength(2, MinimumLength = 2,
    ErrorMessage = "Informe a sigla do estado (2 caracteres)")]
  public string Estado { get; set; }

  [Required(ErrorMessage = "CEP é obrigatório")]
  [MinLength(8, ErrorMessage = "CEP inválido")]
  [MaxLength(20)]
  public string Cep { get; set; }
}
