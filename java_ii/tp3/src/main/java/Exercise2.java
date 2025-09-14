import services.HttpService;

public class Exercise2 implements IExercise {
  @Override
  public String getName() {
    return "GET de entidade específica";
  }

  @Override
  public void run() {
    var http = new HttpService();
    var apiBaseUrl = "https://apichallenges.eviltester.com/sim/entities/";

    while (true) {
      var option = Utils.readInt("Digite o ID de uma entidade (1-8, ou 0 para sair): ", value -> new Utils.ValidationResult(value >= 0 && value <= 8, "Opção inválida."));

      if (option == 0) break;

      var url = apiBaseUrl + option;

      try {
        var response = http.get(url);
        System.out.println("Status: " + response.statusCode);
        System.out.println(response.body);
        System.out.println();
      } catch (Exception e) {
        System.out.println("Erro ao obter dados do servidor: " + e.getMessage());
      }
    }
  }
}
