import services.HttpService;

public class Exercise7 implements IExercise {
  @Override
  public String getName() {
    return "POST para atualizar uma entidade";
  }

  @Override
  public void run() {
    var http = new HttpService();

    try {
      var body = "{\"name\":\"atualizado\"}";
      var response = http.post("https://apichallenges.eviltester.com/sim/entities/10", body);
      System.out.println("Status: " + response.statusCode + (response.isError() ? " (ERRO)" : ""));
      System.out.println(response.body);
      System.out.println();

      var response2 = http.get("https://apichallenges.eviltester.com/sim/entities/10");
      System.out.println("Status: " + response.statusCode + (response.isError() ? " (ERRO)" : ""));
      System.out.println(response2.body);
    } catch (Exception e) {
      System.out.println("Erro ao obter dados do servidor: " + e.getMessage());
    }
  }
}
