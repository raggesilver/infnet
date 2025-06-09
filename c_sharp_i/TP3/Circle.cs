namespace TP3;

public class Circle
{
  // O raio é fundamental para um círculo, pois define seu tamanho e é essencial
  // para calcular sua área. Todos os pontos em um círculo estão equidistantes do centro,
  // e essa distância é o raio.
  public double Radius { get; set; }

  // Exercício 11: Método para calcular a área do círculo
  public double CalculateArea()
  {
    return Math.PI * (Radius * Radius);
  }
}
