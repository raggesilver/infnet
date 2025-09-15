using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CityBreaks.Web.Models;

public class City
{
  [Key]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public int Id { get; set; }

  [Required]
  public required string Name { get; set; }

  public int CountryId { get; set; }

  public Country Country { get; set; }
}
