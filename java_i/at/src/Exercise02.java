public class Exercise02 implements IExercise {
  @Override
  public String getName() {
    return "Validação de Senha Segura";
  }

  @Override
  public void run() {
    System.out.println("=== Sistema de Validação de Senha Segura ===\n");

    String name = Utils.readNonEmptyString("Digite seu nome: ");
    System.out.printf("Olá, %s!%n", name);

    String password;
    while (true) {
      password = Utils.readNonEmptyString("\nDigite uma senha segura: ");

      String validationError = validatePassword(password);
      if (validationError == null) {
        System.out.println("✅ Senha válida! Cadastro realizado com sucesso.");
        break;
      } else {
        System.out.printf("❌ Senha inválida: %s%n", validationError);
        System.out.println("Tente novamente.");
      }
    }
  }

  private String validatePassword(String password) {
    if (password.length() < 8) {
      return "A senha deve ter no mínimo 8 caracteres.";
    }

    if (!hasUppercaseLetter(password)) {
      return "A senha deve conter pelo menos uma letra maiúscula.";
    }

    if (!hasNumber(password)) {
      return "A senha deve conter pelo menos um número.";
    }

    if (!hasSpecialCharacter(password)) {
      return "A senha deve conter pelo menos um caractere especial (@, #, $, %, &, *, etc.).";
    }

    return null;
  }

  private boolean hasUppercaseLetter(String password) {
    return password.chars().anyMatch(Character::isUpperCase);
  }

  private boolean hasNumber(String password) {
    return password.chars().anyMatch(Character::isDigit);
  }

  private boolean hasSpecialCharacter(String password) {
    String specialChars = "@#$%&*!?+=()[]{}|;:,.<>^~`";
    return password.chars().anyMatch(c -> specialChars.indexOf(c) >= 0);
  }
}
