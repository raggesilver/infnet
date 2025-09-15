import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Exercise12 implements IExercise {
  @Override
  public String getName() {
    return "Experimentos com a Simple API";
  }

  @Override
  public void run() {
    var http = new services.HttpService();
    try {
      var response = http.get("https://apichallenges.eviltester.com/simpleapi/items");
      System.out.println(response);

      var response2 = http.get("https://apichallenges.eviltester.com/simpleapi/randomisbn");
      System.out.println(response2);

      var newIsbn = response2.body;
      var newBook = "{\"type\": \"book\", \"isbn13\": \"" + newIsbn + "\", \"price\": 5.99, \"numberinstock\": 5}";
      var response3 = http.post("https://apichallenges.eviltester.com/simpleapi/items", newBook);
      System.out.println(response3);

      var newBookId = extractId(response3.body);
      if (newBookId == null) {
        throw new Exception("Não foi possível extrait o ID do novo livro");
      }

      var putBody = "{\"type\": \"book\", \"isbn13\": \"" + newIsbn + "\", \"price\": 5.99, \"numberinstock\": 10}";
      var response4 = http.put("https://apichallenges.eviltester.com/simpleapi/items/" + newBookId, putBody);
      System.out.println(response4);

      var response5 = http.delete("https://apichallenges.eviltester.com/simpleapi/items/" + newBookId);
      System.out.println(response5);
    } catch (Exception e) {
      System.out.println("Erro ao obter dados do servidor: " + e.getMessage());
    }
  }

  public static String extractId(String jsonString) {
    Pattern pattern = Pattern.compile("\"id\"\\s*:\\s*(\\d+)");
    Matcher matcher = pattern.matcher(jsonString);

    if (matcher.find()) {
      return matcher.group(1);
    }

    return null;
  }
}
