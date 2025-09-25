import utils.HttpRequestBuilder;

import java.util.Map;

public class Main {
  // O projeto "server" deve estar rodando para a execução do cliente.
  private static final String BASE_URL = "http://localhost:7119";
  private static final String MENSALIST_BASE = BASE_URL + "/mensalists";

  public static void main(String[] args) throws Exception {
    String newMensalistId;

    {
      var data = Map.of("name", "John", "salary", 1000.0);
      var result = HttpRequestBuilder.url(MENSALIST_BASE).post().sendJson(data);

      var mensalist = result.response.json();

      System.out.println("\n====\nRúbrica 3.1");
      System.out.println("Mensalista criado " + mensalist);
      newMensalistId = mensalist.get("id").toString();
    }


    {
      var result = HttpRequestBuilder.url(MENSALIST_BASE).get().send();
      var mensalists = result.response.jsonListOfMaps();

      System.out.println("\n====\nRúbrica 3.2");
      System.out.println("Mensalistas: " + mensalists);
    }


    {
      var result = HttpRequestBuilder.url(MENSALIST_BASE + "/" + newMensalistId).get().send();
      var mensalist = result.response.json();

      System.out.println("\n====\nRúbrica 3.3");
      System.out.println("Mensalista adiquirido por pesquisa por ID: " + mensalist);
    }

    {
      var result = HttpRequestBuilder.url(BASE_URL + "/status").get().send();

      var status = result.response.json();
      System.out.println("\n====\nRúbrica 3.4");
      System.out.println("Status: " + status);
    }
  }
}
