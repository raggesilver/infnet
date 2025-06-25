public class Exercise05 implements IExercise {
  @Override
  public String getName() {
    return "Criando um Programa CGI em Java";
  }

  @Override
  public void run() {
    System.out.println("=== Simulação de Script CGI ===\n");
    System.out.println("Saída do programa CGI:\n");

    // HTTP Headers
    System.out.println("Content-Type: text/html");

    // Blank line between headers and body (required for CGI)
    System.out.println();

    // HTML content
    System.out.println("<html>");
    System.out.println("<head><title>Saudação CGI</title></head>");
    System.out.println("<body>");
    System.out.println("<h1>Olá, Terráqueos!</h1>");
    System.out.println("</body>");
    System.out.println("</html>");
  }
}
