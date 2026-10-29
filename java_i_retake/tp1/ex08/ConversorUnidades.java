public class ConversorUnidades {
  private static final double MILES_PER_KILOMETER = 0.621371;

  public static double celsiusToFahrenheit(double celsius) {
    return celsius * 9 / 5 + 32;
  }

  public static double kilometersToMiles(double kilometers) {
    return kilometers * MILES_PER_KILOMETER;
  }
}
