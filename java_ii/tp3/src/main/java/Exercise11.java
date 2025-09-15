public class Exercise11 implements IExercise {
  @Override
  public String getName() {
    return "OPTIONS com verificação de métodos";
  }

  @Override
  public void run() {
    var http = new services.HttpService();
    try {
      var response = http.options("https://apichallenges.eviltester.com/sim/entities");
      System.out.println(response);

      System.out.println("Métodos suportados: " + response.connection.getHeaderField("Allow"));
    } catch (Exception e) {
      System.out.println("Erro ao obter dados do servidor: " + e.getMessage());
    }
  }
}
