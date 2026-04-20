using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CityBreaks.Web.Models;

public class Country
{
  [Key]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public int Id { get; set; }

  [Required] public string CountryName { get; set; }

  [Required] public string CountryId { get; set; }

  public List<City> Cities { get; set; }
}
