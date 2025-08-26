using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace ProductCatalog.Pages;

public class AddProductModel : PageModel
{
    [BindProperty]
    public string ProductName { get; set; } = string.Empty;

    [BindProperty]
    public decimal ProductPrice { get; set; }

    public string SubmittedName { get; set; } = string.Empty;
    public decimal SubmittedPrice { get; set; }

    public void OnGet()
    {
    }

    public IActionResult OnPost()
    {
        if (ModelState.IsValid)
        {
            SubmittedName = ProductName;
            SubmittedPrice = ProductPrice;
            
            ProductName = string.Empty;
            ProductPrice = 0;
            
            return Page();
        }

        return Page();
    }
}