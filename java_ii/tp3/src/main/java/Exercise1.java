import services.HttpService;

public class Exercise1 implements IExercise {
  @Override
  public String getName() {
    return "GET simples de todas as entidades";
  }

  @Override
  public void run() {
    var http = new HttpService();

    try {
      var response = http.get("https://apichallenges.eviltester.com/sim/entities");
      System.out.println("Status: " + response.statusCode);
      System.out.println(response.body);
    } catch (Exception e) {
      System.err.println("Erro ao obter dados do servidor: " + e.getMessage());
    }
  }
}
