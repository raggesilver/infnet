public class ConversorUnidades {
  private static final double FAHRENHEIT_REFERENCE = 98.6;
  private static final double MILES_PER_KILOMETER = 0.621371;

  public static void main(String[] args) {
    double celsius = 37.5;
    int kilometers = 42;

    double fahrenheit = celsius * 9 / 5 + 32;
    double miles = kilometers * MILES_PER_KILOMETER;

    System.out.printf("%.1f °C = %.1f °F%n", celsius, fahrenheit);
    System.out.printf("%d km = %.2f milhas%n", kilometers, miles);

    if (fahrenheit > FAHRENHEIT_REFERENCE) {
      System.out.printf("%.1f °F é maior que a referência (%.1f °F).%n", fahrenheit, FAHRENHEIT_REFERENCE);
    } else if (fahrenheit < FAHRENHEIT_REFERENCE) {
      System.out.printf("%.1f °F é menor que a referência (%.1f °F).%n", fahrenheit, FAHRENHEIT_REFERENCE);
    } else {
      System.out.printf("%.1f °F é igual à referência (%.1f °F).%n", fahrenheit, FAHRENHEIT_REFERENCE);
    }
  }
}
