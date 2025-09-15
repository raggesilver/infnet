import services.HttpService;

public class Exercise8 implements IExercise {
  @Override
  public String getName() {
    return "PUT para atualizar entidade";
  }

  @Override
  public void run() {
    var http = new HttpService();

    try {
      var body = "{\"name\":\"atualizado\"}";
      var response = http.put("https://apichallenges.eviltester.com/sim/entities/10", body);
      System.out.println(response);
      System.out.println();

      var response2 = http.get("https://apichallenges.eviltester.com/sim/entities/10");
      System.out.println(response2);

      // Criei minha própria API usando Node.js para testar o POST e o PUT dos
      // exercícios 7 e 8. A API indicada no trabalho parece ignorar
      // completamente tanto o PUT quanto o POST, e retornam a entidade sem
      // nenhuma alteração.

    } catch (Exception e) {
      System.out.println("Erro ao obter dados do servidor: " + e.getMessage());
    }
  }
}
