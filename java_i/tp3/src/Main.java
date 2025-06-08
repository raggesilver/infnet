import java.util.Scanner;

public class Main {
  private final static IExercise[] exercises = {
    new Exercise01(),
    new EmptyExercise("Criando a Classe “Produto” (Com Contexto de Usuário)"),
    new EmptyExercise("Métodos Básicos da Classe “Produto”"),
    new Exercise04(),
    new Exercise05(),
    new Exercise06(),
    new EmptyExercise("Modelando uma Conta Bancária"),
    new EmptyExercise("Criando Métodos"),
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
