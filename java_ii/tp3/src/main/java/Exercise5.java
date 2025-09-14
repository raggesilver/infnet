import services.HttpService;

public class Exercise5 implements IExercise {
  @Override
  public String getName() {
    return "POST criando uma nova entidade";
  }

  @Override
  public void run() {
    var http = new HttpService();

    try {
      var body = "{\"name\": \"aluno\"}";
      var response = http.post("https://apichallenges.eviltester.com/sim/entities", body);

      // Nos meus testes, o ID criado é 11.
      // Status: 201
      // {"id":11,"name":"bob","description":""}
      System.out.println("Status: " + response.statusCode + (response.isError() ? " (ERRO)" : ""));
      System.out.println(response.body);
      System.out.println();
    } catch (Exception e) {
      System.out.println("Erro ao obter dados do servidor: " + e.getMessage());
    }
  }
}
