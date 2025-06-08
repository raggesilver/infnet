// Classe Circulo: figura geométrica 2D
class Circulo {
  // O raio é fundamental para calcular a área e o perímetro do círculo.
  // A partir dele aplicamos as fórmulas: área = π * raio² e perímetro = 2 * π * raio
  public double raio;

  public Circulo(double raio) {
    this.raio = raio;
  }

  // Método para calcular a área do círculo
  public double calcularArea() {
    return Math.PI * raio * raio;
  }
}

// Classe Esfera: figura geométrica 3D
class Esfera {
  // O raio é fundamental para calcular o volume e a área superficial da esfera.
  // A partir dele aplicamos as fórmulas: volume = (4/3) * π * raio³ e área = 4 * π * raio²
  public double raio;

  public Esfera(double raio) {
    this.raio = raio;
  }

  // Método para calcular o volume da esfera
  public double calcularVolume() {
    return (4.0 / 3.0) * Math.PI * raio * raio * raio;
  }
}

public class Exercise12 implements IExercise {
  @Override
  public String getName() {
    return "Testando as Classes de Figuras";
  }

  @Override
  public void run() {
    // Instanciando um Círculo com raio 3.0
    Circulo circulo = new Circulo(3.0);

    // Instanciando uma Esfera com raio 5.0
    Esfera esfera = new Esfera(5.0);

    // Calculando e exibindo a área do círculo
    double areaCirculo = circulo.calcularArea();
    System.out.printf("Círculo com raio %.1f:\n", circulo.raio);
    System.out.printf("Área: %.2f unidades quadradas\n\n", areaCirculo);

    // Calculando e exibindo o volume da esfera
    double volumeEsfera = esfera.calcularVolume();
    System.out.printf("Esfera com raio %.1f:\n", esfera.raio);
    System.out.printf("Volume: %.2f unidades cúbicas\n", volumeEsfera);
  }
}
