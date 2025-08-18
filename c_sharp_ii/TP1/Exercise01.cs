
namespace TP1;

delegate double CalculateDiscount(double originalPrice);

public class Exercise01 : IExercise
{
  public string Name => "Implementação de Delegate Personalizado para Descontos";

  private static readonly CalculateDiscount DiscountCalculator = originalPrice =>
  {
    return originalPrice * 0.9;
  };

  public void Run(string[] args)
  {
    var originalPrice = Utils.ReadFloat("Digite o preço original do produto: ",
        "Preço inválido",
        price => (price >= 0, "O preço deve ser um número positivo."));

    var discountedPrice = DiscountCalculator(originalPrice);
    Console.WriteLine($"O preço com desconto é: {discountedPrice:C2}");
  }
}
