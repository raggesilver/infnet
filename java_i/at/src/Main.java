import java.util.Scanner;

public class Main {
  private final static IExercise[] exercises = {
    new Exercise01(),
    new Exercise02(),
    new Exercise03(),
    new Exercise04(),
    new Exercise05(),
    new Exercise06(),
    new Exercise07(),
  };

  public static void main(String[] args) {
    var scanner = new Scanner(System.in);

    while (true) {
      System.out.println("AT — Paulo Queiroz\n\nEscolha algum dos exercícios:");

      for (var i = 0; i < exercises.length; i++) {
        System.out.printf("%2d. %s\n", (i + 1), exercises[i].getName());
      }
      System.out.printf("%2d. %s\n", 0, "Sair");

      var i = Utils.readInt("\nDigite o número do exercício que deseja executar: ", value -> new Utils.ValidationResult(value >= 0 && value <= exercises.length, "Opção inválida."));

      if (i == 0) break;

      exercises[i - 1].run();

      System.out.println("Pressione ENTER para continuar...");
      scanner.nextLine();
    }
  }
}
