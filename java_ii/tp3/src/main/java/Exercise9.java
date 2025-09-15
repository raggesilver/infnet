public class Exercise9 implements IExercise {
  @Override
  public String getName() {
    return "DELETE de entidade válida";
  }

  @Override
  public void run() {
    var http = new services.HttpService();

    try {
      var response = http.delete("https://apichallenges.eviltester.com/sim/entities/9");
      System.out.println(response);
      System.out.println();

      var response2 = http.get("https://apichallenges.eviltester.com/sim/entities/9");
      System.out.println(response2);
    } catch (Exception e) {
      System.out.println("Erro ao obter dados do servidor: " + e.getMessage());
    }
  }
}
