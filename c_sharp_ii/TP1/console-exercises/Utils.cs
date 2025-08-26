namespace TP1;

public static class Utils
{
  /// <summary>
  ///   Reads an integer input from the console, with optional validation and custom
  ///   error messages.
  /// </summary>
  /// <param name="message">The message displayed to prompt the user for input.</param>
  /// <param name="error">
  ///   The default error message displayed when the input is invalid or fails
  ///   validation. Defaults to "Número inválido".
  /// </param>
  /// <param name="validator">
  ///   An optional function used to validate the input integer. The function takes
  ///   the input integer and returns a tuple
  ///   where the first value indicates if the input is valid, and the second value
  ///   is an optional custom error message.
  /// </param>
  /// <returns>
  ///   The validated integer entered by the user.
  /// </returns>
  public static int ReadInt(string message, string error = "Número inválido",
    Func<int, (bool isValid, string? errorMessage)>? validator = null)
  {
    while (true)
    {
      Console.Write(message);
      var input = Console.ReadLine();
      if (int.TryParse(input, out var result))
      {
        // If no validator provided or validation passes
        if (validator == null) return result;

        var (isValid, customError) = validator(result);
        if (isValid) return result;

        // Show the custom error message if provided, otherwise use default error
        Console.WriteLine(customError ?? error);
      }
      else
      {
        Console.WriteLine(error);
      }
    }
  }

  /// <summary>
  ///   Reads a date input from the console, with an optional custom error message
  ///   for invalid input.
  /// </summary>
  /// <param name="message">The message displayed to prompt the user for input.</param>
  /// <param name="error">
  ///   The default error message displayed when the input is invalid. Defaults to
  ///   "Data inválida".
  /// </param>
  /// <returns>
  ///   The valid DateTime value entered by the user.
  /// </returns>
  public static DateTime ReadDate(string message,
    string error = "Data inválida")
  {
    while (true)
    {
      Console.Write(message);
      var input = Console.ReadLine();
      if (DateTime.TryParse(input, out var result)) return result;
      Console.WriteLine(error);
    }
  }

  /// <summary>
  ///   Reads a non-empty string input from the console, with an optional custom
  ///   error message
  ///   for invalid input.
  /// </summary>
  /// <param name="message">The message displayed to prompt the user for input.</param>
  /// <param name="error">
  ///   The default error message displayed when the input is empty. Defaults to
  ///   "Campo não pode ser vazio".
  /// </param>
  /// <param name="validator">
  ///   An optional function used to validate the input string. The function takes
  ///   the input string and returns a tuple
  ///   where the first value indicates if the input is valid, and the second value
  ///   is an optional custom error message.
  /// </param>
  /// <returns>
  ///   The validated non-empty string entered by the user.
  /// </returns>
  public static string ReadNonEmptyString(string message,
    string error = "Campo não pode ser vazio",
    Func<string, (bool isValid, string? errorMessage)>? validator = null)
  {
    while (true)
    {
      Console.Write(message);
      var input = Console.ReadLine() ?? string.Empty;

      if (string.IsNullOrWhiteSpace(input))
      {
        Console.WriteLine(error);
        continue;
      }

      // If no validator provided or validation passes
      if (validator == null) return input;

      var (isValid, customError) = validator(input);
      if (isValid) return input;

      // Show the custom error message if provided, otherwise use default error
      Console.WriteLine(customError ?? error);
    }
  }

  /// <summary>
  ///   Reads a float input from the console, with optional validation and custom
  ///   error messages.
  /// </summary>
  /// <param name="message">The message displayed to prompt the user for input.</param>
  /// <param name="error">
  ///   The default error message displayed when the input is invalid or fails
  ///   validation. Defaults to "Número inválido".
  /// </param>
  /// <param name="validator">
  ///   An optional function used to validate the input float. The function takes
  ///   the input float and returns a tuple
  ///   where the first value indicates if the input is valid, and the second value
  ///   is an optional custom error message.
  /// </param>
  /// <returns>
  ///   The validated float entered by the user.
  /// </returns>
  public static float ReadFloat(string message,
    string error = "Número inválido",
    Func<float, (bool isValid, string? errorMessage)>? validator = null)
  {
    while (true)
    {
      Console.Write(message);
      var input = Console.ReadLine();
      if (float.TryParse(input, out var result))
      {
        // If no validator provided or validation passes
        if (validator == null) return result;

        var (isValid, customError) = validator(result);
        if (isValid) return result;

        // Show the custom error message if provided, otherwise use default error
        Console.WriteLine(customError ?? error);
      }
      else
      {
        Console.WriteLine(error);
      }
    }
  }
}
