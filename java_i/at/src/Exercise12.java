public class Exercise12 implements IExercise {
  @Override
  public String getName() {
    return "Sistema de Chat Simples com Arrays";
  }

  @Override
  public void run() {
    System.out.println("=== Sistema de Chat Simples ===\n");

    String user1 = Utils.readNonEmptyString("Digite o nome do primeiro usuário: ");
    String user2 = Utils.readNonEmptyString("Digite o nome do segundo usuário: ");

    String[] messages = new String[10];

    System.out.printf("%nIniciando chat entre %s e %s%n", user1, user2);
    System.out.println("Cada usuário pode enviar 5 mensagens alternadamente.\n");

    for (int i = 0; i < 10; i++) {
      String currentUser = (i % 2 == 0) ? user1 : user2;
      int messageNumber = (i / 2) + 1;

      String message = Utils.readNonEmptyString(String.format("%s, digite sua mensagem %d: ", currentUser, messageNumber));
      messages[i] = currentUser + ": " + message;
    }

    // Display message history
    System.out.println("\n===== Histórico de Mensagens =====");
    for (String message : messages) {
      System.out.println(message);
    }

    // Farewell message
    System.out.println("\nObrigado por utilizarem o sistema! Boa sorte para vocês!");
  }
}
