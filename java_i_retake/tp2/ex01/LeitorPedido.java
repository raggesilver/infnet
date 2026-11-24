import java.util.Scanner;

public class LeitorPedido {
  public static void main(String[] args) {
    var scanner = new Scanner(System.in);
    System.out.print("Digite o pedido (codigo;peso;destino): ");
    var line = scanner.hasNextLine() ? scanner.nextLine() : "";

    if (line.isBlank()) {
      System.out.println("Erro: a linha está vazia.");
      return;
    }

    var parts = line.split(";", -1);
    if (parts.length != 3) {
      System.out.println("Erro: esperados 3 campos separados por ';', mas foram encontrados " + parts.length + ".");
      return;
    }

    System.out.println("Código: " + parts[0].trim());
    System.out.println("Peso: " + parts[1].trim());
    System.out.println("Destino: " + parts[2].trim());
  }
}
