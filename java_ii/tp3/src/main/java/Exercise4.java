import services.HttpService;

public class Exercise4 implements IExercise {
  @Override
  public String getName() {
    return "GET com parâmetros na URL";
  }

  @Override
  public void run() {
    var http = new HttpService();

    try {
      var response = http.get("https://apichallenges.eviltester.com/sim/entities?categoria=teste&limite=5");
      System.out.println(response);
      System.out.println();
    } catch (Exception e) {
      System.out.println("Erro ao obter dados do servidor: " + e.getMessage());
    }
  }
}
