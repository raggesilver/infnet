namespace TP3;

public class Sphere
{
  // O raio é fundamental para uma esfera, pois define seu tamanho e é essencial
  // para calcular seu volume. Todos os pontos em uma esfera estão equidistantes do centro,
  // e essa distância é o raio.
  public double Radius { get; set; }

  // Exercício 11: Método para calcular o volume da esfera
  public double CalculateVolume()
  {
    return (4.0 / 3.0) * Math.PI * (Radius * Radius * Radius);
  }
}
