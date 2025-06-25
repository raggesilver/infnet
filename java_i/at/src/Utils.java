import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Currency;
import java.util.Scanner;

public class Utils {
  /**
   * Formats a double value as currency using the system default locale.
   *
   * @param amount the monetary amount to format
   * @return formatted string in system default currency format
   */
  public static String formatMoney(double amount) {
    var currencyFormat = NumberFormat.getCurrencyInstance();
    currencyFormat.setCurrency(Currency.getInstance("BRL"));
    return currencyFormat.format(amount);
  }

  /**
   * Formats a number using the system default locale formatting.
   *
   * @param number the number to format
   * @return formatted string in system default number format
   */
  public static String formatNumber(double number) {
    var numberFormat = NumberFormat.getNumberInstance();
    return numberFormat.format(number);
  }

  /**
   * Reads a non-empty string from the user. Prompts the user with the provided message
   * and ensures the input is not empty before returning it.
   *
   * @param message the message to display as a prompt to the user
   * @return the non-empty string entered by the user
   */
  public static String readNonEmptyString(String message) {
    var scanner = new Scanner(System.in);
    while (true) {
      System.out.print(message);
      var input = scanner.nextLine();
      if (!input.isEmpty()) return input;
      System.out.println("Input inválida.");
    }
  }

  /**
   * Prompts the user to input an integer value, validates the input, and returns a valid integer.
   * Continues to prompt until the user provides valid input. Supports custom validation logic
   * through a provided validator and displays custom or default error messages for invalid input.
   *
   * @param message   the message to display when prompting the user for input
   * @param validator an optional custom validator for additional validation logic; may be null
   * @return a valid integer provided by the user
   */
  public static int readInt(String message, Validator<Integer> validator) {
    Scanner scanner = new Scanner(System.in);
    while (true) {
      System.out.print(message);
      String input = scanner.nextLine();
      try {
        int result = Integer.parseInt(input);

        if (validator == null) return result;

        ValidationResult validationResult = validator.validate(result);
        if (validationResult.isValid()) return result;

        // Show the custom error message if provided, otherwise use default error
        System.out.println(validationResult.errorMessage() != null ?
          validationResult.errorMessage() : "Número inválido");
      } catch (NumberFormatException e) {
        System.out.println("Número inválido");
      }
    }
  }

  /**
   * Prompts the user to input a double value, validates the input, and returns a valid double.
   * Continues to prompt until the user provides valid input. Supports custom validation logic
   * through a provided validator and displays custom or default error messages for invalid input.
   *
   * @param message   the message to display when prompting the user for input
   * @param validator an optional custom validator for additional validation logic; may be null
   * @return a valid double provided by the user
   */
  public static double readDouble(String message, Validator<Double> validator) {
    Scanner scanner = new Scanner(System.in);
    while (true) {
      System.out.print(message);
      String input = scanner.nextLine();
      try {
        double result = Double.parseDouble(input);

        if (validator == null) return result;

        ValidationResult validationResult = validator.validate(result);
        if (validationResult.isValid()) return result;

        // Show the custom error message if provided, otherwise use default error
        System.out.println(validationResult.errorMessage() != null ?
          validationResult.errorMessage() : "Número inválido");
      } catch (NumberFormatException e) {
        System.out.println("Número inválido");
      }
    }
  }

  /**
   * Reads a date from the user in the format dd/MM/yyyy.
   * Validates the input to ensure it forms a valid date.
   *
   * @param message the message to display when prompting for the date
   * @return a valid LocalDate provided by the user
   */
  public static LocalDate readDate(String message) {
    var scanner = new Scanner(System.in);
    var formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    while (true) {
      System.out.print(message);
      String input = scanner.nextLine();

      try {
        return LocalDate.parse(input, formatter);
      } catch (DateTimeParseException e) {
        System.out.println("Formato de data inválido. Use o formato dd/mm/aaaa.");
      }
    }
  }

  public record ValidationResult(boolean isValid, String errorMessage) {
  }

  @FunctionalInterface
  public interface Validator<T> {
    ValidationResult validate(T value);
  }
}
