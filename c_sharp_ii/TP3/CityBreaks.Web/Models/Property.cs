using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CityBreaks.Web.Models;

public class Property
{
  [Key]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public int Id { get; set; }

  [Required] public required string Name { get; set; }

  [Required] public decimal PricePerNight { get; set; }

  [Required] public int CityId { get; set; }

  public City City { get; set; }
}
