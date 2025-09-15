import java.util.Scanner;

public class App {
  private static final IExercise[] exercises = {
    new Exercise1(),
    new Exercise2(),
    new Exercise3(),
    new Exercise4(),
    new Exercise5(),
    new Exercise6(),
    new Exercise7(),
    new Exercise8(),
  };

  public static void main(String[] args) {
    var scanner = new Scanner(System.in);
    while (true) {
      System.out.println("TP3 — Paulo Queiroz\n\nEscolha algum dos exercícios:");

      for (var i = 0; i < exercises.length; i++) {
        System.out.println((i + 1) + ". " + exercises[i].getName());
      }
      System.out.println("0. Sair");

      var i = Utils.readInt("\nDigite o número do exercício que deseja executar: ", value -> new Utils.ValidationResult(value >= 0 && value <= exercises.length, "Opção inválida."));

      if (i == 0) break;

      exercises[i - 1].run();

      System.out.println("Pressione ENTER para continuar...");
      scanner.nextLine();
    }
  }
}
