import services.HttpService;

public class Exercise3 implements IExercise {
  @Override
  public String getName() {
    return "GET de entidade inexistente";
  }

  @Override
  public void run() {
    var http = new HttpService();

    try {
      var response = http.get("https://apichallenges.eviltester.com/sim/entities/13");
      System.out.println("Status: " + response.statusCode + (response.isError() ? " (ERRO)" : ""));
      System.out.println(response.body);
      System.out.println();
    } catch (Exception e) {
      System.out.println("Erro ao obter dados do servidor: " + e.getMessage());
    }
  }
}
